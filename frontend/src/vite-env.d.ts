/// <reference types="vite/client" />

/**
 * Environment variable type definitions for Vite
 * This provides TypeScript autocomplete and type safety for env variables
 */

interface ImportMetaEnv {
  // Stacks blockchain configuration
  readonly VITE_CONTRACT_ADDRESS: string
  readonly VITE_CONTRACT_NAME: string
  readonly VITE_STACKS_NETWORK: 'mainnet' | 'testnet' | 'devnet'
  readonly VITE_STACKS_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
