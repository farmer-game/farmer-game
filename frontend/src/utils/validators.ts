/**
 * Validation Utilities
 * Pure functions for validating user input and data
 */

import { PLAYER_VALIDATION } from './constants';

/** Validation result interface */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates player name (3-50 chars, alphanumeric + spaces/hyphens/underscores)
 * @example validatePlayerName("John Doe") // { isValid: true }
 */
export function validatePlayerName(name: string): ValidationResult {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: 'Name is required' };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < PLAYER_VALIDATION.MIN_NAME_LENGTH) {
    return {
      isValid: false,
      error: `Name must be at least ${PLAYER_VALIDATION.MIN_NAME_LENGTH} characters`,
    };
  }

  if (trimmedName.length > PLAYER_VALIDATION.MAX_NAME_LENGTH) {
    return {
      isValid: false,
      error: `Name must be no more than ${PLAYER_VALIDATION.MAX_NAME_LENGTH} characters`,
    };
  }

  if (!PLAYER_VALIDATION.NAME_PATTERN.test(trimmedName)) {
    return {
      isValid: false,
      error: 'Name can only contain letters, numbers, spaces, hyphens, and underscores',
    };
  }

  return { isValid: true };
}

/**
 * Validates game score (must be positive integer)
 * @example validateScore(100) // { isValid: true }
 */
export function validateScore(score: number): ValidationResult {
  if (typeof score !== 'number' || isNaN(score)) {
    return { isValid: false, error: 'Score must be a valid number' };
  }

  if (score <= 0) {
    return { isValid: false, error: 'Score must be greater than 0' };
  }

  if (!Number.isInteger(score)) {
    return { isValid: false, error: 'Score must be a whole number' };
  }

  return { isValid: true };
}

/**
 * Validates Stacks address format (SP/ST + 39 alphanumeric chars)
 * @example validateAddress("ST1XHPEWSZYNN2QA9QG9JG9GHRVF6GZSFRWTFB5VV") // { isValid: true }
 */
export function validateAddress(address: string): ValidationResult {
  if (!address || typeof address !== 'string') {
    return { isValid: false, error: 'Address is required' };
  }

  const stacksAddressPattern = /^(SP|ST)[0-9A-Z]{39}$/;

  if (!stacksAddressPattern.test(address)) {
    return { isValid: false, error: 'Invalid Stacks address format' };
  }

  return { isValid: true };
}
