/**
 * Object Generator
 * Spawns falling fruits and bombs with difficulty progression
 */

import type { FallingObject, FruitType, FallSpeed } from '@/types/game.types';
import { FruitType as FruitTypes } from '@/types/game.types';
import {
  SPAWN_RATES,
  FRUIT_FALL_SPEEDS,
  FALL_SPEEDS,
  FRUIT_POINTS,
} from '@/utils/constants';

export class ObjectGenerator {
  private objectIdCounter: number = 0;
  private gameStartTime: number = 0;
  private difficultyLevel: number = 1;

  /**
   * Initialize generator
   */
  start(): void {
    this.gameStartTime = Date.now();
    this.objectIdCounter = 0;
    this.difficultyLevel = 1;
  }

  /**
   * Generate a new falling object
   */
  generate(): FallingObject {
    const fruitType = this.selectFruitType();
    const position = this.generatePosition();
    const speedCategory = this.selectSpeed(fruitType);
    const speed = this.calculateSpeed(speedCategory);

    return {
      id: `obj-${++this.objectIdCounter}-${Date.now()}`,
      type: fruitType,
      position,
      speed,
      speedCategory,
      points: this.getPoints(fruitType),
      createdAt: Date.now(),
    };
  }

  /**
   * Select fruit type based on spawn rates
   */
  private selectFruitType(): FruitType {
    const rand = Math.random() * 100;
    let cumulative = 0;

    const types: FruitType[] = [
      FruitTypes.APPLE,
      FruitTypes.BANANA,
      FruitTypes.ORANGE,
      FruitTypes.GRAPE,
      FruitTypes.WATERMELON,
      FruitTypes.BOMB,
    ];

    for (const type of types) {
      cumulative += SPAWN_RATES[type];
      if (rand <= cumulative) {
        return type;
      }
    }

    return FruitTypes.APPLE; // Default fallback
  }

  /**
   * Generate random position (10-90% of screen width)
   */
  private generatePosition(): { x: number; y: number } {
    const minX = window.innerWidth * 0.1;
    const maxX = window.innerWidth * 0.9;
    const x = minX + Math.random() * (maxX - minX);

    return {
      x,
      y: -50, // Start above screen
    };
  }

  /**
   * Select speed category for fruit type
   */
  private selectSpeed(fruitType: FruitType): FallSpeed {
    // Bombs fall faster
    if (fruitType === FruitTypes.BOMB) {
      return Math.random() < 0.7 ? 'fast' : 'medium';
    }

    // Get speed from config or random
    const configSpeed = FRUIT_FALL_SPEEDS[fruitType];
    if (configSpeed) {
      return configSpeed;
    }

    // Random speed for other fruits (fallback)
    const rand = Math.random();

    if (rand < 0.1) return 'very-slow';
    if (rand < 0.4) return 'slow';
    if (rand < 0.8) return 'medium';
    return 'fast';
  }

  /**
   * Calculate actual speed value with difficulty scaling
   */
  private calculateSpeed(category: FallSpeed): number {
    const baseSpeed = FALL_SPEEDS[category];
    
    // Increase speed over time (difficulty progression)
    const elapsedSeconds = (Date.now() - this.gameStartTime) / 1000;
    const speedMultiplier = 1 + Math.min(elapsedSeconds / 60, 0.5); // Max 50% increase
    
    return baseSpeed * speedMultiplier * this.difficultyLevel;
  }

  /**
   * Get points for fruit type
   */
  private getPoints(fruitType: FruitType): number {
    return FRUIT_POINTS[fruitType] || 10;
  }

  /**
   * Adjust difficulty level
   */
  setDifficulty(level: number): void {
    this.difficultyLevel = Math.max(1, Math.min(3, level));
  }

  /**
   * Get current difficulty based on elapsed time
   */
  getCurrentDifficulty(): number {
    const elapsedSeconds = (Date.now() - this.gameStartTime) / 1000;
    
    if (elapsedSeconds < 30) return 1;
    if (elapsedSeconds < 60) return 1.2;
    if (elapsedSeconds < 90) return 1.5;
    return 2;
  }

  /**
   * Reset generator
   */
  reset(): void {
    this.objectIdCounter = 0;
    this.gameStartTime = Date.now();
    this.difficultyLevel = 1;
  }
}

/**
 * Create a generator instance
 */
export function createObjectGenerator(): ObjectGenerator {
  return new ObjectGenerator();
}
