/**
 * Score Calculator
 * Calculates points for caught fruits and handles bomb penalties
 */

import type { FruitType } from '@/types/game.types';
import { FruitType as FruitTypes } from '@/types/game.types';
import { FRUIT_POINTS } from '@/utils/constants';

export interface ScoreResult {
  points: number;
  isBomb: boolean;
  comboMultiplier: number;
  finalPoints: number;
}

/**
 * Calculate points for a caught object
 */
export function calculatePoints(
  fruitType: FruitType,
  comboCount: number = 0
): ScoreResult {
  // Check if it's a bomb
  const isBomb = fruitType === FruitTypes.BOMB;

  // Get base points
  const basePoints = FRUIT_POINTS[fruitType] || 0;

  // Calculate combo multiplier (max 2x)
  const comboMultiplier = Math.min(1 + comboCount * 0.1, 2);

  // Calculate final points
  const finalPoints = isBomb ? 0 : Math.floor(basePoints * comboMultiplier);

  return {
    points: basePoints,
    isBomb,
    comboMultiplier,
    finalPoints,
  };
}

/**
 * Calculate combo count based on time between catches
 */
export function calculateCombo(
  lastCatchTime: number,
  currentTime: number,
  currentCombo: number
): number {
  const timeDiff = currentTime - lastCatchTime;
  const COMBO_TIMEOUT = 1000; // 1 second to maintain combo

  if (timeDiff <= COMBO_TIMEOUT) {
    return currentCombo + 1;
  }

  return 1; // Reset combo
}

/**
 * Get combo bonus text for UI display
 */
export function getComboText(comboCount: number): string {
  if (comboCount < 2) return '';
  if (comboCount < 5) return `${comboCount}x Combo!`;
  if (comboCount < 10) return `🔥 ${comboCount}x COMBO! 🔥`;
  return `🌟 ${comboCount}x MEGA COMBO! 🌟`;
}

/**
 * Calculate level-based score multiplier
 */
export function getLevelMultiplier(elapsedSeconds: number): number {
  if (elapsedSeconds < 30) return 1.0;
  if (elapsedSeconds < 60) return 1.2;
  if (elapsedSeconds < 90) return 1.5;
  return 2.0;
}

/**
 * Calculate final score with all modifiers
 */
export function calculateFinalScore(
  baseScore: number,
  comboCount: number,
  elapsedSeconds: number
): number {
  const comboMultiplier = Math.min(1 + (comboCount - 1) * 0.1, 2);
  const levelMultiplier = getLevelMultiplier(elapsedSeconds);
  
  return Math.floor(baseScore * comboMultiplier * levelMultiplier);
}
