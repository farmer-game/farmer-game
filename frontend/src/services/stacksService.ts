/**
 * Stacks Blockchain Service
 * Handles wallet connection and network configuration
 */

import { AppConfig, UserSession, showConnect } from '@stacks/connect';
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
 * Connect wallet using Stacks Connect
 * Opens wallet selection modal and initiates connection
 */
export async function connectWallet(): Promise<string> {
  return new Promise((resolve, reject) => {
    showConnect({
      appDetails: {
        name: 'Farmer Game',
        icon: window.location.origin + '/logo.png',
      },
      redirectTo: '/',
      onFinish: () => {
        const userData = userSession.loadUserData();
        const address = userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet;
        resolve(address);
      },
      onCancel: () => {
        reject(new Error('User cancelled wallet connection'));
      },
      userSession,
    });
  });
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
  if (!userSession.isUserSignedIn()) {
    return null;
  }

  try {
    const userData = userSession.loadUserData();
    const networkType = import.meta.env.VITE_STACKS_NETWORK as StacksNetwork;
    
    if (networkType === 'mainnet') {
      return userData.profile.stxAddress.mainnet;
    }
    
    return userData.profile.stxAddress.testnet;
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
