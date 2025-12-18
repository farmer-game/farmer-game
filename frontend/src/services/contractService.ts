/**
 * Contract Service - Handles smart contract interactions for farmer-game
 */

import {
  fetchCallReadOnlyFunction,
  cvToJSON,
  stringAsciiCV,
  uintCV,
  principalCV,
  AnchorMode,
} from '@stacks/transactions';
import { openContractCall } from '@stacks/connect';
import { getNetwork, getAddress, getContractConfig } from './stacksService';
import { CONTRACT_CONFIG, CONTRACT_FUNCTIONS } from '@/utils/constants';
import type { ContractPlayerInfo } from '@/types/contract.types';

/**
 * Register a new player in the game
 */
export async function registerPlayer(name: string): Promise<{ txId: string; success: boolean }> {
  const address = getAddress();
  if (!address) throw new Error('Wallet not connected');

  try {
    const network = getNetwork();
    
    return new Promise((resolve, reject) => {
      openContractCall({
        contractAddress: CONTRACT_CONFIG.ADDRESS,
        contractName: CONTRACT_CONFIG.NAME,
        functionName: CONTRACT_FUNCTIONS.REGISTER_PLAYER,
        functionArgs: [stringAsciiCV(name)],
        network,
        anchorMode: AnchorMode.Any,
        onFinish: (data) => resolve({ txId: data.txId, success: true }),
        onCancel: () => reject(new Error('User cancelled transaction')),
      });
    });
  } catch (error) {
    console.error('Error registering player:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to register player');
  }
}

/**
 * Submit a game score to the contract
 */
export async function submitScore(score: number): Promise<{ txId: string; success: boolean }> {
  const address = getAddress();
  if (!address) throw new Error('Wallet not connected');
  if (score <= 0) throw new Error('Score must be greater than 0');

  try {
    const network = getNetwork();
    
    return new Promise((resolve, reject) => {
      openContractCall({
        contractAddress: CONTRACT_CONFIG.ADDRESS,
        contractName: CONTRACT_CONFIG.NAME,
        functionName: CONTRACT_FUNCTIONS.SUBMIT_SCORE,
        functionArgs: [uintCV(score)],
        network,
        anchorMode: AnchorMode.Any,
        onFinish: (data) => resolve({ txId: data.txId, success: true }),
        onCancel: () => reject(new Error('User cancelled transaction')),
      });
    });
  } catch (error) {
    console.error('Error submitting score:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to submit score');
  }
}

/**
 * Check if a player is registered
 */
export async function isPlayerRegistered(address: string): Promise<boolean> {
  try {
    const network = getNetwork();
    const config = getContractConfig();

    const result = await fetchCallReadOnlyFunction({
      contractAddress: config.address,
      contractName: config.name,
      functionName: CONTRACT_FUNCTIONS.IS_REGISTERED,
      functionArgs: [principalCV(address)],
      network,
      senderAddress: address,
    });

    const jsonResult = cvToJSON(result);
    return jsonResult.value === true;
  } catch (error) {
    console.error('Error checking registration:', error);
    return false;
  }
}

/**
 * Get player's best score
 */
export async function getPlayerBestScore(address: string): Promise<number> {
  try {
    const network = getNetwork();
    const config = getContractConfig();

    const result = await fetchCallReadOnlyFunction({
      contractAddress: config.address,
      contractName: config.name,
      functionName: CONTRACT_FUNCTIONS.GET_PLAYER_BEST_SCORE,
      functionArgs: [principalCV(address)],
      network,
      senderAddress: address,
    });

    const jsonResult = cvToJSON(result);
    return jsonResult.value ? parseInt(jsonResult.value, 10) : 0;
  } catch (error) {
    console.error('Error getting best score:', error);
    return 0;
  }
}

/**
 * Get player information
 */
export async function getPlayerInfo(address: string): Promise<ContractPlayerInfo | null> {
  try {
    const network = getNetwork();
    const config = getContractConfig();

    const result = await fetchCallReadOnlyFunction({
      contractAddress: config.address,
      contractName: config.name,
      functionName: CONTRACT_FUNCTIONS.GET_PLAYER_INFO,
      functionArgs: [principalCV(address)],
      network,
      senderAddress: address,
    });

    const jsonResult = cvToJSON(result);
    if (jsonResult.value === null) return null;

    return {
      name: jsonResult.value.name.value,
      bestScore: parseInt(jsonResult.value['best-score'].value, 10),
      totalGames: parseInt(jsonResult.value['total-games'].value, 10),
      registeredAt: parseInt(jsonResult.value['registered-at'].value, 10),
    };
  } catch (error) {
    console.error('Error getting player info:', error);
    return null;
  }
}

/**
 * Get total number of games played globally
 */
export async function getTotalGames(): Promise<number> {
  try {
    const network = getNetwork();
    const config = getContractConfig();
    const address = getAddress() || config.address;

    const result = await fetchCallReadOnlyFunction({
      contractAddress: config.address,
      contractName: config.name,
      functionName: CONTRACT_FUNCTIONS.GET_TOTAL_GAMES,
      functionArgs: [],
      network,
      senderAddress: address,
    });

    const jsonResult = cvToJSON(result);
    return jsonResult.value ? parseInt(jsonResult.value, 10) : 0;
  } catch (error) {
    console.error('Error getting total games:', error);
    return 0;
  }
}

/**
 * Get leaderboard entry for a specific rank
 */
export async function getLeaderboardEntry(rank: number): Promise<{
  player: string;
  score: number;
  gameId: number;
  timestamp: number;
} | null> {
  try {
    const network = getNetwork();
    const config = getContractConfig();
    const address = getAddress() || config.address;

    const result = await fetchCallReadOnlyFunction({
      contractAddress: config.address,
      contractName: config.name,
      functionName: CONTRACT_FUNCTIONS.GET_LEADERBOARD_ENTRY,
      functionArgs: [uintCV(rank)],
      network,
      senderAddress: address,
    });

    const jsonResult = cvToJSON(result);
    if (jsonResult.value === null) return null;

    return {
      player: jsonResult.value.player.value,
      score: parseInt(jsonResult.value.score.value, 10),
      gameId: parseInt(jsonResult.value['game-id'].value, 10),
      timestamp: parseInt(jsonResult.value.timestamp.value, 10),
    };
  } catch (error) {
    console.error('Error getting leaderboard entry:', error);
    return null;
  }
}

/**
 * Fetch multiple leaderboard entries
 */
export async function getLeaderboard(count: number = 10): Promise<Array<{
  rank: number;
  player: string;
  score: number;
  gameId: number;
  timestamp: number;
}>> {
  const entries = [];
  
  for (let rank = 1; rank <= count; rank++) {
    try {
      const entry = await getLeaderboardEntry(rank);
      if (entry) {
        entries.push({ rank, ...entry });
      } else {
        break;
      }
    } catch (error) {
      console.error(`Error fetching rank ${rank}:`, error);
      break;
    }
  }

  return entries;
}

/**
 * Poll transaction status until confirmed or failed
 */
export async function pollTransactionStatus(
  txId: string,
  maxAttempts: number = 30
): Promise<'confirmed' | 'failed' | 'pending'> {
  const config = getContractConfig();
  const apiUrl = config.apiUrl;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await fetch(`${apiUrl}/extended/v1/tx/${txId}`);
      const data = await response.json();

      if (data.tx_status === 'success') return 'confirmed';
      if (data.tx_status === 'abort_by_response' || data.tx_status === 'abort_by_post_condition') {
        return 'failed';
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Error polling transaction:', error);
      if (attempt === maxAttempts - 1) return 'pending';
    }
  }

  return 'pending';
}
