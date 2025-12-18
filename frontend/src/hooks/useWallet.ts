/**
 * useWallet Hook
 * Manages wallet connection state and provides connect/disconnect functionality
 */

import { useState, useEffect, useCallback } from 'react';
import { connectWallet, disconnectWallet, getAddress, isWalletConnected } from '@/services/stacksService';
import { useGameStore } from '@/store/gameStore';

interface UseWalletReturn {
  isConnected: boolean;
  address: string | null;
  loading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

/**
 * Custom hook for wallet connection management
 * Syncs with Zustand store and provides loading/error states
 */
export function useWallet(): UseWalletReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isConnected, address, connect: storeConnect, disconnect: storeDisconnect } = useGameStore();

  // Check wallet connection on mount
  useEffect(() => {
    const checkConnection = () => {
      if (isWalletConnected()) {
        const addr = getAddress();
        if (addr && !isConnected) {
          storeConnect(addr);
        }
      }
    };

    checkConnection();
  }, [isConnected, storeConnect]);

  /**
   * Connect wallet and update store
   */
  const connect = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const walletAddress = await connectWallet();
      storeConnect(walletAddress);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(errorMessage);
      console.error('Wallet connection error:', err);
    } finally {
      setLoading(false);
    }
  }, [loading, storeConnect]);

  /**
   * Disconnect wallet and clear store
   */
  const disconnect = useCallback(() => {
    try {
      disconnectWallet();
      storeDisconnect();
      setError(null);
    } catch (err) {
      console.error('Wallet disconnection error:', err);
      setError('Failed to disconnect wallet');
    }
  }, [storeDisconnect]);

  return {
    isConnected,
    address,
    loading,
    error,
    connect,
    disconnect,
  };
}
