/**
 * Application Constants & Configuration
 * Centralized configuration for contract, game mechanics, and UI
 */

import type { FruitType as FruitTypeValue, FallSpeed, SpawnRates, FruitPoints } from '@/types';

// ============================================
// CONTRACT CONFIGURATION
// ============================================

/**
 * Smart contract configuration from environment variables
 */
export const CONTRACT_CONFIG = {
  ADDRESS: import.meta.env.VITE_CONTRACT_ADDRESS as string,
  NAME: import.meta.env.VITE_CONTRACT_NAME as string,
  NETWORK: import.meta.env.VITE_STACKS_NETWORK as 'mainnet' | 'testnet' | 'devnet',
  API_URL: import.meta.env.VITE_STACKS_API_URL as string,
} as const;

/**
 * Contract function names
 */
export const CONTRACT_FUNCTIONS = {
  REGISTER_PLAYER: 'register-player',
  SUBMIT_SCORE: 'submit-score',
  GET_PLAYER_INFO: 'get-player-info',
  GET_PLAYER_BEST_SCORE: 'get-player-best-score',
  IS_REGISTERED: 'is-registered',
  GET_GAME_DETAILS: 'get-game-details',
  GET_TOTAL_GAMES: 'get-total-games',
  GET_LEADERBOARD_ENTRY: 'get-leaderboard-entry',
} as const;

// ============================================
// GAME CONFIGURATION
// ============================================

/**
 * Core game settings
 */
export const GAME_CONFIG = {
  DURATION: 120, // Game duration in seconds
  MAX_LIVES: 4, // Maximum lives
  SPAWN_INTERVAL_MIN: 800, // Minimum spawn interval in ms
  SPAWN_INTERVAL_MAX: 1200, // Maximum spawn interval in ms
  DIFFICULTY_INCREASE_INTERVAL: 30, // Increase difficulty every N seconds
  SPEED_INCREASE_MULTIPLIER: 1.1, // Speed multiplier per difficulty level
  MAX_FALLING_OBJECTS: 20, // Maximum concurrent falling objects
  OBJECT_SIZE: 60, // Object size in pixels
} as const;

/**
 * Points awarded for catching each fruit type
 */
export const FRUIT_POINTS: FruitPoints = {
  apple: 10,
  banana: 15,
  orange: 20,
  grape: 25,
  watermelon: 50,
  bomb: 0, // Bombs don't award points
} as const;

/**
 * Spawn rate probabilities for each fruit type (should sum to 1.0)
 */
export const SPAWN_RATES: SpawnRates = {
  apple: 0.30, // 30%
  banana: 0.25, // 25%
  orange: 0.20, // 20%
  grape: 0.15, // 15%
  watermelon: 0.10, // 10%
  bomb: 0.20, // 20% (adjusted, total > 1.0 handled in logic)
} as const;

/**
 * Fall speed configurations (pixels per frame at 60 FPS)
 */
export const FALL_SPEEDS = {
  'very-slow': 1.5,
  slow: 2.5,
  medium: 3.5,
  fast: 5.0,
} as const;

/**
 * Fall speed mapping for each fruit type
 */
export const FRUIT_FALL_SPEEDS: Record<FruitTypeValue, FallSpeed> = {
  apple: 'medium',
  banana: 'slow',
  orange: 'medium',
  grape: 'fast',
  watermelon: 'very-slow',
  bomb: 'medium',
} as const;

/** Fruit emoji/visual representations */
export const FRUIT_EMOJIS: Record<FruitTypeValue, string> = {
  apple: '🍎', banana: '🍌', orange: '🍊', grape: '🍇', watermelon: '🍉', bomb: '💣',
} as const;

// ============================================
// PLAYER & UI CONFIGURATION
// ============================================

/** Player name validation rules */
export const PLAYER_VALIDATION = {
  MIN_NAME_LENGTH: 3,
  MAX_NAME_LENGTH: 50,
  NAME_PATTERN: /^[a-zA-Z0-9_-\s]+$/,
} as const;

/** Application routes */
export const ROUTES = {
  HOME: '/', DASHBOARD: '/dashboard', GAME: '/game', 
  LEADERBOARD: '/leaderboard', HOW_TO_PLAY: '/how-to-play',
} as const;

/** Animation durations (ms) */
export const ANIMATION_DURATION = {
  FAST: 150, NORMAL: 200, SLOW: 300, MODAL: 250, TOAST: 200, PAGE_TRANSITION: 300,
} as const;

/** Toast notification settings */
export const TOAST_CONFIG = {
  DURATION: 3000, POSITION: 'top-right', MAX_TOASTS: 3,
} as const;

/** Leaderboard settings */
export const LEADERBOARD_CONFIG = {
  ITEMS_PER_PAGE: 10, REFRESH_INTERVAL: 30000, CACHE_DURATION: 30000, TOP_PREVIEW_COUNT: 5,
} as const;

/** Local storage keys */
export const STORAGE_KEYS = {
  WALLET_ADDRESS: 'farmer-game-wallet-address',
  PLAYER_NAME: 'farmer-game-player-name',
  TUTORIAL_SHOWN: 'farmer-game-tutorial-shown',
  HIGH_SCORE: 'farmer-game-high-score',
} as const;

/** User-friendly error messages */
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet first',
  NOT_REGISTERED: 'Please register before playing',
  INVALID_NAME: 'Name must be 3-50 characters (letters, numbers, spaces, _, -)',
  NETWORK_ERROR: 'Network error. Please check your connection',
  TRANSACTION_FAILED: 'Transaction failed. Please try again',
  CONTRACT_ERROR: 'Smart contract error. Please try again later',
  REGISTRATION_EXISTS: 'This address is already registered',
  SCORE_SUBMISSION_FAILED: 'Failed to submit score. Please try again',
} as const;
