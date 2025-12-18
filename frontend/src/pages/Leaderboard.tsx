/**
 * Leaderboard Page
 * Full leaderboard view with filters and player stats
 */

import React, { useState } from 'react';
import { RefreshCw, Trophy } from 'lucide-react';
import Button from '@/components/ui/Button';
import { LeaderboardFilters } from '@/components/leaderboard/LeaderboardFilters';
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable';
import { PlayerStats } from '@/components/leaderboard/PlayerStats';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { useGameStore } from '@/store/gameStore';
import type { LeaderboardFilter } from '@/types/player.types';

/**
 * Leaderboard Page Component
 */
export const Leaderboard: React.FC = () => {
  const { isConnected } = useGameStore();
  const [activeFilter, setActiveFilter] = useState<LeaderboardFilter>('all-time');
  const { leaderboard, loading, refresh } = useLeaderboard(50, true);

  /**
   * Filter leaderboard based on time period
   */
  const getFilteredLeaderboard = () => {
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    const oneWeekMs = 7 * oneDayMs;

    switch (activeFilter) {
      case 'daily':
        return leaderboard.filter((entry) => {
          const entryTime = entry.timestamp < 10000000000 ? entry.timestamp * 1000 : entry.timestamp;
          return now - entryTime <= oneDayMs;
        });
      case 'weekly':
        return leaderboard.filter((entry) => {
          const entryTime = entry.timestamp < 10000000000 ? entry.timestamp * 1000 : entry.timestamp;
          return now - entryTime <= oneWeekMs;
        });
      case 'all-time':
      default:
        return leaderboard;
    }
  };

  const filteredLeaderboard = getFilteredLeaderboard();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-orange-600" />
                Leaderboard
              </h1>
              <p className="text-gray-600 mt-2">
                Compete with players worldwide and climb to the top!
              </p>
            </div>

            <Button
              variant="secondary"
              size="md"
              onClick={refresh}
              disabled={loading}
              className="hidden sm:flex"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Mobile Refresh Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={refresh}
            disabled={loading}
            className="sm:hidden w-full"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <LeaderboardFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leaderboard Table */}
          <div className="lg:col-span-2">
            <LeaderboardTable
              entries={filteredLeaderboard}
              loading={loading}
              showFullAddress={false}
            />

            {/* Empty State for Filtered Results */}
            {!loading && filteredLeaderboard.length === 0 && leaderboard.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No scores in this time period
                </h3>
                <p className="text-gray-600 mb-4">
                  Try a different filter or be the first to score!
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setActiveFilter('all-time')}
                >
                  View All Time
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Player Stats */}
            {isConnected ? (
              <PlayerStats stats={null} loading={false} />
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Track Your Progress
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Connect your wallet to see your personal stats and ranking
                </p>
                <Button variant="primary" size="md" className="w-full">
                  Connect Wallet
                </Button>
              </div>
            )}

            {/* Info Card */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border-2 border-orange-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                🏆 Leaderboard Info
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold mt-0.5">•</span>
                  <span>Rankings are based on your best score</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold mt-0.5">•</span>
                  <span>All scores are verified on the blockchain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold mt-0.5">•</span>
                  <span>Leaderboard updates automatically every 30 seconds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold mt-0.5">•</span>
                  <span>Play more to improve your ranking!</span>
                </li>
              </ul>
            </div>

            {/* Top 3 Highlight */}
            {filteredLeaderboard.length >= 3 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  🏅 Top 3 Players
                </h3>
                <div className="space-y-3">
                  {filteredLeaderboard.slice(0, 3).map((entry, index) => {
                    const medals = ['🥇', '🥈', '🥉'];
                    return (
                      <div
                        key={entry.player.address}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-2xl">{medals[index]}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {entry.player.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {entry.score.toLocaleString()} points
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
