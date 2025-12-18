/**
 * Stacks Blockchain Service
 * Handles wallet connection and network configuration
 */
import { AppConfig, UserSession, request } from '@stacks/connect';
import { STACKS_TESTNET, STACKS_MAINNET } from '@stacks/network';
import type { StacksNetwork } from '@/types/contract.types';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

/**
 * Get network configuration based on environment
 */
export function getNetwork() {
  const networkType = import.meta.env.VITE_STACKS_NETWORK as StacksNetwork;
  
  if (networkType === 'mainnet') {
    return STACKS_MAINNET;
  }
  
  return STACKS_TESTNET;
}

/**
 * Get Stacks API URL from environment
 */
export function getApiUrl(): string {
  return import.meta.env.VITE_STACKS_API_URL || 'https://api.testnet.hiro.so';
}

/**
 * Connect wallet using Stacks Connect v8 API
 * Opens wallet selection modal and initiates connection
 */
export async function connectWallet(): Promise<string> {
  try {
    // Use Stacks Connect v8 request API to get addresses
    const result = await request('stx_getAddresses');
    
    // Get the first address from the result
    if (result && result.addresses && result.addresses.length > 0) {
      const address = result.addresses[0].address;
      return address;
    } else {
      throw new Error('No address found after connection');
    }
  } catch (error) {
    console.error('Connect wallet error:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Please install Hiro Wallet or Leather Wallet extension to connect.');
    }
  }
}

/**
 * Disconnect wallet and clear session
 */
export function disconnectWallet(): void {
  if (userSession.isUserSignedIn()) {
    userSession.signUserOut();
  }
}

/**
 * Check if user is currently connected
 */
export function isWalletConnected(): boolean {
  return userSession.isUserSignedIn();
}

/**
 * Get current connected wallet address
 * Returns null if not connected
 */
export function getAddress(): string | null {
  try {
    // Get address from localStorage where zustand persist stores it
    const storedState = localStorage.getItem('farmer-game-store');
    if (storedState) {
      const parsed = JSON.parse(storedState);
      return parsed.state?.address || null;
    }
    return null;
  } catch (error) {
    console.error('Error getting address:', error);
    return null;
  }
}

/**
 * Get user session instance
 */
export function getUserSession(): UserSession {
  return userSession;
}

/**
 * Get full user data
 */
export function getUserData() {
  if (!userSession.isUserSignedIn()) {
    return null;
  }

  try {
    return userSession.loadUserData();
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
}

/**
 * Check if wallet is authenticated and session is valid
 */
export function isAuthenticated(): boolean {
  try {
    return userSession.isUserSignedIn() && getAddress() !== null;
  } catch {
    return false;
  }
}

/**
 * Get contract configuration from environment
 */
export function getContractConfig() {
  return {
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    name: import.meta.env.VITE_CONTRACT_NAME,
    network: getNetwork(),
    networkType: import.meta.env.VITE_STACKS_NETWORK as StacksNetwork,
    apiUrl: getApiUrl(),
  };
}
