/**
 * useLeaderboard Hook
 * Fetches and manages leaderboard data with auto-refresh functionality
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { getLeaderboard } from '@/services/contractService';
import { useGameStore } from '@/store/gameStore';
import type { LeaderboardEntry } from '@/types/player.types';

interface UseLeaderboardReturn {
  leaderboard: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  lastFetched: number | null;
}

const REFRESH_INTERVAL = 30000; // 30 seconds
const CACHE_DURATION = 30000; // 30 seconds

/**
 * Custom hook for leaderboard management
 * Fetches leaderboard data and provides auto-refresh every 30s
 */
export function useLeaderboard(count: number = 10, autoRefresh: boolean = true): UseLeaderboardReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const {
    leaderboardData,
    lastFetched,
    setLeaderboard,
    setLoading: setStoreLoading,
    address,
  } = useGameStore();

  /**
   * Fetch leaderboard data from contract
   */
  const fetchLeaderboard = useCallback(async (force: boolean = false) => {
    // Use cache if data is fresh (< 30s old)
    if (!force && lastFetched && Date.now() - lastFetched < CACHE_DURATION) {
      return;
    }

    setLoading(true);
    setStoreLoading(true);
    setError(null);

    try {
      const entries = await getLeaderboard(count);

      // Transform to LeaderboardEntry format with current user flag
      const leaderboardEntries: LeaderboardEntry[] = entries.map((entry) => ({
        rank: entry.rank,
        player: {
          address: entry.player,
          name: entry.player.slice(0, 10), // Will be replaced with actual name when available
          registeredAt: entry.timestamp,
          totalGames: 1,
          isRegistered: true,
        },
        score: entry.score,
        gameId: entry.gameId,
        timestamp: entry.timestamp,
        isCurrentUser: address ? entry.player === address : false,
      }));

      setLeaderboard(leaderboardEntries);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch leaderboard';
      setError(errorMessage);
      console.error('Leaderboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [count, lastFetched, address, setLeaderboard, setStoreLoading]);

  /**
   * Manual refresh function
   */
  const refresh = useCallback(async () => {
    await fetchLeaderboard(true);
  }, [fetchLeaderboard]);

  /**
   * Initial fetch and auto-refresh setup
   */
  useEffect(() => {
    // Initial fetch
    fetchLeaderboard();

    // Setup auto-refresh if enabled
    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        fetchLeaderboard();
      }, REFRESH_INTERVAL);
    }

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchLeaderboard, autoRefresh]);

  /**
   * Refetch when count changes
   */
  useEffect(() => {
    fetchLeaderboard(true);
  }, [count]);

  return {
    leaderboard: leaderboardData,
    loading,
    error,
    refresh,
    lastFetched,
  };
}
