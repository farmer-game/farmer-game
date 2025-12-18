/**
 * Player Types & Interfaces
 * Type definitions for player data, leaderboard, and statistics
 */

/**
 * Player account information
 */
export interface Player {
  address: string; // Stacks wallet address (principal)
  name: string; // Player display name (3-50 characters)
  registeredAt: number; // Registration timestamp (block height or unix timestamp)
  totalGames: number; // Total number of games played
  isRegistered: boolean; // Registration status
}

/**
 * Leaderboard entry with player info and ranking
 */
export interface LeaderboardEntry {
  rank: number; // Position on leaderboard (1-based)
  player: Player; // Player information
  score: number; // Best score achieved
  gameId: number; // Game ID from smart contract
  timestamp: number; // When the score was achieved
  isCurrentUser: boolean; // Whether this is the current user's entry
}

/**
 * Detailed player statistics
 */
export interface PlayerStats {
  address: string; // Player's wallet address
  bestScore: number; // Highest score achieved
  totalGames: number; // Total games played
  rank: number | null; // Current leaderboard rank (null if not ranked)
  avgScore: number; // Average score across all games
  lastPlayed: number; // Timestamp of last game
  totalPoints: number; // Cumulative points across all games
  winRate: number; // Percentage of games with score > 0
}

/**
 * Leaderboard filter options
 */
export type LeaderboardFilter = 'all-time' | 'weekly' | 'daily';

/**
 * Leaderboard time period configuration
 */
export interface LeaderboardPeriod {
  filter: LeaderboardFilter;
  label: string;
  startTimestamp: number | null; // null for all-time
  endTimestamp: number;
}

/**
 * Pagination parameters for leaderboard
 */
export interface LeaderboardPagination {
  limit: number; // Number of entries per page
  offset: number; // Starting position
  total: number; // Total number of entries
  hasMore: boolean; // Whether more entries exist
}

/**
 * Complete leaderboard state
 */
export interface LeaderboardState {
  entries: LeaderboardEntry[]; // Leaderboard entries
  filter: LeaderboardFilter; // Current filter
  pagination: LeaderboardPagination; // Pagination info
  loading: boolean; // Loading state
  error: string | null; // Error message if any
  lastFetched: number | null; // Last fetch timestamp
}

/**
 * Player registration data
 */
export interface PlayerRegistration {
  name: string; // Player name
  address: string; // Wallet address
  transactionId: string | null; // Registration transaction ID
  status: 'pending' | 'confirmed' | 'failed';
  error: string | null;
}

/**
 * Player profile with complete information
 */
export interface PlayerProfile {
  player: Player;
  stats: PlayerStats;
  recentGames: GameHistory[];
}

/**
 * Game history entry
 */
export interface GameHistory {
  gameId: number;
  score: number;
  timestamp: number;
  rank: number | null;
  duration: number;
}
