/**
 * Contract Types & Interfaces
 * Type definitions for smart contract interactions and Stacks blockchain
 */

import type { ClarityValue } from '@stacks/transactions';

/**
 * Stacks network types
 */
export type StacksNetwork = 'mainnet' | 'testnet' | 'devnet';

/**
 * Transaction status during processing
 */
export type TransactionStatus = 
  | 'idle'
  | 'pending'
  | 'broadcasting'
  | 'confirmed'
  | 'failed'
  | 'cancelled';

/**
 * Contract function names
 */
export type ContractFunction =
  | 'register-player'
  | 'submit-score'
  | 'get-player-info'
  | 'get-player-best-score'
  | 'is-registered'
  | 'get-game-details'
  | 'get-total-games'
  | 'get-leaderboard-entry';

/**
 * Base contract call options
 */
interface BaseContractOptions {
  contractAddress: string;
  contractName: string;
  functionName: ContractFunction;
  functionArgs: ClarityValue[];
  network: StacksNetwork;
}

/**
 * Contract call options for write operations
 */
export interface ContractCallOptions extends BaseContractOptions {
  senderAddress: string;
  postConditions?: any[];
  onFinish?: (data: any) => void;
  onCancel?: () => void;
}

/**
 * Contract read-only call options
 */
export interface ContractReadOptions extends BaseContractOptions {
  senderAddress?: string;
}

/**
 * Generic contract response wrapper
 */
export interface ContractResponse<T = any> {
  success: boolean;
  data: T | null;
  error: ContractError | null;
}

/**
 * Contract error types and details
 */
export interface ContractError {
  code: number; // Error code from contract
  message: string; // Human-readable error message
  type: ContractErrorType; // Error category
  details?: string; // Additional error details
}

/**
 * Contract error categories
 */
export type ContractErrorType =
  | 'NOT_REGISTERED'
  | 'ALREADY_REGISTERED'
  | 'INVALID_NAME_LENGTH'
  | 'INVALID_SCORE'
  | 'UNAUTHORIZED'
  | 'NETWORK_ERROR'
  | 'TRANSACTION_FAILED'
  | 'USER_REJECTED'
  | 'UNKNOWN';

/**
 * Transaction state tracking
 */
export interface TransactionState {
  txId: string | null; // Transaction ID
  status: TransactionStatus; // Current status
  error: ContractError | null; // Error if failed
  startedAt: number | null; // When transaction started
  confirmedAt: number | null; // When transaction confirmed
  blockHeight: number | null; // Block height when confirmed
}

/** Player info from contract */
export interface ContractPlayerInfo {
  name: string;
  bestScore: number;
  totalGames: number;
  registeredAt: number;
}

/** Score submission result from contract */
export interface ContractScoreSubmission {
  gameId: number;
  score: number;
  timestamp: number;
  player: string;
}

/** Leaderboard entry from contract */
export interface ContractLeaderboardEntry {
  bestScore: number;
  lastPlayed: number;
  totalGames: number;
}

/** Contract configuration */
export interface ContractConfig {
  address: string;
  name: string;
  network: StacksNetwork;
  apiUrl: string;
}

/** Wallet connection state */
export interface WalletState {
  isConnected: boolean;
  address: string | null;
  network: StacksNetwork | null;
  publicKey: string | null;
}
