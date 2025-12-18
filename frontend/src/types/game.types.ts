/**
 * Game Types & Interfaces
 * Type definitions for game state, objects, and mechanics
 */

/**
 * Game status states
 */
export type GameStatus = 'idle' | 'playing' | 'paused' | 'ended';

/**
 * Fruit and bomb types in the game
 */
export const FruitType = {
  APPLE: 'apple',
  BANANA: 'banana',
  ORANGE: 'orange',
  GRAPE: 'grape',
  WATERMELON: 'watermelon',
  BOMB: 'bomb',
} as const;

export type FruitType = typeof FruitType[keyof typeof FruitType];

/**
 * Position coordinates for falling objects
 */
export interface Position {
  x: number; // Horizontal position (0-100% of container width)
  y: number; // Vertical position (pixels from top)
}

/**
 * Fall speed configurations
 */
export type FallSpeed = 'slow' | 'medium' | 'fast' | 'very-slow';

/**
 * Individual falling object (fruit or bomb)
 */
export interface FallingObject {
  id: string; // Unique identifier
  type: FruitType; // Type of fruit or bomb
  position: Position; // Current position
  speed: number; // Fall speed in pixels per frame
  speedCategory: FallSpeed; // Speed category for visual reference
  points: number; // Points awarded when caught (0 for bombs)
  createdAt: number; // Timestamp when spawned
}

/**
 * Game configuration and difficulty settings
 */
export interface GameConfig {
  duration: number; // Game duration in seconds (120)
  maxLives: number; // Maximum lives (4)
  spawnIntervalMin: number; // Min spawn interval ms (800)
  spawnIntervalMax: number; // Max spawn interval ms (1200)
  difficultyIncreaseInterval: number; // Difficulty increase interval
}

/**
 * Statistics for a completed game session
 */
export interface GameStats {
  fruitsCaught: Record<FruitType, number>;
  totalFruitsCaught: number;
  bombsHit: number;
  missedFruits: number;
  accuracy: number;
  longestCombo: number;
}

/**
 * Complete game state
 */
export interface GameState {
  status: GameStatus; // Current game status
  score: number; // Current score
  lives: number; // Remaining lives
  timer: number; // Remaining time in seconds
  objects: FallingObject[]; // Active falling objects
  stats: GameStats; // Game statistics
  isPaused: boolean; // Pause state
  gameId: string | null; // Game session ID
  startedAt: number | null; // Timestamp when game started
  endedAt: number | null; // Timestamp when game ended
}

/**
 * Game difficulty level
 */
export interface DifficultyLevel {
  level: number; // Current difficulty level (1-10)
  speedMultiplier: number; // Speed increase multiplier
  spawnRateMultiplier: number; // Spawn rate increase multiplier
  bombSpawnRate: number; // Probability of bomb spawns (0-1)
}

/**
 * Spawn rate configuration for each fruit type
 */
export interface SpawnRates {
  [FruitType.APPLE]: number;
  [FruitType.BANANA]: number;
  [FruitType.ORANGE]: number;
  [FruitType.GRAPE]: number;
  [FruitType.WATERMELON]: number;
  [FruitType.BOMB]: number;
}

/**
 * Points awarded for each fruit type
 */
export interface FruitPoints {
  [FruitType.APPLE]: number;
  [FruitType.BANANA]: number;
  [FruitType.ORANGE]: number;
  [FruitType.GRAPE]: number;
  [FruitType.WATERMELON]: number;
  [FruitType.BOMB]: number;
}
