/**
 * useContract Hook
 * Manages smart contract interactions (register player, submit score, check registration)
 */

import { useState, useCallback } from 'react';
import {
  registerPlayer as registerPlayerService,
  submitScore as submitScoreService,
  isPlayerRegistered as checkRegistrationService,
  pollTransactionStatus,
} from '@/services/contractService';
import { useGameStore } from '@/store/gameStore';
import { validatePlayerName, validateScore } from '@/utils/validators';

interface ContractState {
  loading: boolean;
  error: string | null;
  success: boolean;
  txId: string | null;
}

interface UseContractReturn {
  registerState: ContractState;
  submitState: ContractState;
  checkState: { loading: boolean; error: string | null; isRegistered: boolean };
  registerPlayer: (name: string) => Promise<boolean>;
  submitScore: (score: number) => Promise<boolean>;
  checkRegistration: (address: string) => Promise<boolean>;
  resetStates: () => void;
}

const INITIAL_STATE: ContractState = {
  loading: false,
  error: null,
  success: false,
  txId: null,
};

/**
 * Custom hook for contract interactions
 * Provides methods for player registration, score submission, and registration checks
 */
export function useContract(): UseContractReturn {
  const [registerState, setRegisterState] = useState<ContractState>(INITIAL_STATE);
  const [submitState, setSubmitState] = useState<ContractState>(INITIAL_STATE);
  const [checkState, setCheckState] = useState({ loading: false, error: null as string | null, isRegistered: false });

  const { address, setPlayer, setRegistrationStatus } = useGameStore();

  /**
   * Register a new player
   */
  const registerPlayer = useCallback(async (name: string): Promise<boolean> => {
    console.log('useContract.registerPlayer called with:', name, 'address:', address);
    
    if (!address) {
      console.error('Registration failed: No address');
      setRegisterState({ ...INITIAL_STATE, error: 'Wallet not connected' });
      return false;
    }

    // Validate player name
    const validation = validatePlayerName(name);
    if (!validation.isValid) {
      console.error('Registration failed: Validation error', validation.error);
      setRegisterState({ ...INITIAL_STATE, error: validation.error || 'Invalid player name' });
      return false;
    }

    console.log('Setting loading state...');
    setRegisterState({ ...INITIAL_STATE, loading: true });

    try {
      console.log('Calling registerPlayerService...');
      const result = await registerPlayerService(name);
      console.log('registerPlayerService result:', result);
      
      setRegisterState({
        loading: false,
        error: null,
        success: true,
        txId: result.txId,
      });

      // Poll transaction status
      console.log('Polling transaction status for:', result.txId);
      const status = await pollTransactionStatus(result.txId);
      console.log('Transaction status:', status);
      
      if (status === 'confirmed') {
        setPlayer(name);
        return true;
      } else {
        setRegisterState(prev => ({ ...prev, error: 'Transaction failed or pending' }));
        return false;
      }
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to register player';
      setRegisterState({
        loading: false,
        error: errorMessage,
        success: false,
        txId: null,
      });
      return false;
    }
  }, [address, setPlayer]);

  /**
   * Submit game score
   */
  const submitScore = useCallback(async (score: number): Promise<boolean> => {
    if (!address) {
      setSubmitState({ ...INITIAL_STATE, error: 'Wallet not connected' });
      return false;
    }

    // Validate score
    const validation = validateScore(score);
    if (!validation.isValid) {
      setSubmitState({ ...INITIAL_STATE, error: validation.error || 'Invalid score' });
      return false;
    }

    setSubmitState({ ...INITIAL_STATE, loading: true });

    try {
      const result = await submitScoreService(score);
      
      setSubmitState({
        loading: false,
        error: null,
        success: true,
        txId: result.txId,
      });

      // Poll transaction status
      const status = await pollTransactionStatus(result.txId);
      
      if (status === 'confirmed') {
        return true;
      } else {
        setSubmitState(prev => ({ ...prev, error: 'Transaction failed or pending' }));
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit score';
      setSubmitState({
        loading: false,
        error: errorMessage,
        success: false,
        txId: null,
      });
      return false;
    }
  }, [address]);

  /**
   * Check if player is registered
   */
  const checkRegistration = useCallback(async (checkAddress: string): Promise<boolean> => {
    setCheckState({ loading: true, error: null, isRegistered: false });

    try {
      const isRegistered = await checkRegistrationService(checkAddress);
      setCheckState({ loading: false, error: null, isRegistered });
      setRegistrationStatus(isRegistered);
      return isRegistered;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check registration';
      setCheckState({ loading: false, error: errorMessage, isRegistered: false });
      return false;
    }
  }, [setRegistrationStatus]);

  /**
   * Reset all states
   */
  const resetStates = useCallback(() => {
    setRegisterState(INITIAL_STATE);
    setSubmitState(INITIAL_STATE);
    setCheckState({ loading: false, error: null, isRegistered: false });
  }, []);

  return {
    registerState,
    submitState,
    checkState,
    registerPlayer,
    submitScore,
    checkRegistration,
    resetStates,
  };
}
