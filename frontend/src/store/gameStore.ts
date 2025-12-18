/** Global Game Store - Zustand with wallet, player, game, and leaderboard slices */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { GameStatus } from '@/types/game.types';
import type { LeaderboardEntry } from '@/types/player.types';

interface WalletSlice {
  isConnected: boolean;
  address: string | null;
  connect: (address: string) => void;
  disconnect: () => void;
}

interface PlayerSlice {
  isRegistered: boolean;
  playerName: string | null;
  setPlayer: (name: string) => void;
  setRegistrationStatus: (status: boolean) => void;
  clearPlayer: () => void;
}

interface GameSlice {
  gameStatus: GameStatus;
  score: number;
  lives: number;
  timer: number;
  gameId: string | null;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  updateScore: (points: number) => void;
  loseLife: () => void;
  updateTimer: (seconds: number) => void;
  resetGame: () => void;
}

interface LeaderboardSlice {
  leaderboardData: LeaderboardEntry[];
  lastFetched: number | null;
  isLoading: boolean;
  setLeaderboard: (data: LeaderboardEntry[]) => void;
  setLoading: (loading: boolean) => void;
  refreshLeaderboard: () => void;
}

type GameStore = WalletSlice & PlayerSlice & GameSlice & LeaderboardSlice;
export const useGameStore = create<GameStore>()(
  persist(
    immer((set) => ({
      // Wallet
      isConnected: false,
      address: null,
      connect: (address: string) => set((s) => { s.isConnected = true; s.address = address; }),
      disconnect: () => set((s) => { s.isConnected = false; s.address = null; s.isRegistered = false; s.playerName = null; }),

      // Player
      isRegistered: false,
      playerName: null,
      setPlayer: (name: string) => set((s) => { s.playerName = name; s.isRegistered = true; }),
      setRegistrationStatus: (status: boolean) => set((s) => { s.isRegistered = status; }),
      clearPlayer: () => set((s) => { s.isRegistered = false; s.playerName = null; }),

      // Game
      gameStatus: 'idle' as GameStatus,
      score: 0,
      lives: 4,
      timer: 120,
      gameId: null,
      startGame: () => set((s) => { s.gameStatus = 'playing'; s.score = 0; s.lives = 4; s.timer = 120; s.gameId = `game-${Date.now()}`; }),
      pauseGame: () => set((s) => { if (s.gameStatus === 'playing') s.gameStatus = 'paused'; }),
      resumeGame: () => set((s) => { if (s.gameStatus === 'paused') s.gameStatus = 'playing'; }),
      endGame: () => set((s) => { s.gameStatus = 'ended'; }),
      updateScore: (points: number) => set((s) => { s.score += points; }),
      loseLife: () => set((s) => { if (s.lives > 0) { s.lives -= 1; if (s.lives === 0) s.gameStatus = 'ended'; } }),
      updateTimer: (seconds: number) => set((s) => { s.timer = seconds; if (seconds <= 0 && s.gameStatus === 'playing') s.gameStatus = 'ended'; }),
      resetGame: () => set((s) => { s.gameStatus = 'idle'; s.score = 0; s.lives = 4; s.timer = 120; s.gameId = null; }),

      // Leaderboard
      leaderboardData: [],
      lastFetched: null,
      isLoading: false,
      setLeaderboard: (data: LeaderboardEntry[]) => set((s) => { s.leaderboardData = data; s.lastFetched = Date.now(); s.isLoading = false; }),
      setLoading: (loading: boolean) => set((s) => { s.isLoading = loading; }),
      refreshLeaderboard: () => set((s) => { s.isLoading = true; s.lastFetched = null; }),
    })),
    {
      name: 'farmer-game-storage',
      partialize: (state) => ({ address: state.address, isConnected: state.isConnected, playerName: state.playerName, isRegistered: state.isRegistered }),
    }
  )
);

// Selectors
export const selectWallet = (s: GameStore) => ({ isConnected: s.isConnected, address: s.address });
export const selectPlayer = (s: GameStore) => ({ isRegistered: s.isRegistered, playerName: s.playerName });
export const selectGame = (s: GameStore) => ({ gameStatus: s.gameStatus, score: s.score, lives: s.lives, timer: s.timer, gameId: s.gameId });
export const selectLeaderboard = (s: GameStore) => ({ leaderboardData: s.leaderboardData, lastFetched: s.lastFetched, isLoading: s.isLoading });
