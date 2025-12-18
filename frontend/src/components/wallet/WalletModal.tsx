/**
 * WalletModal Component
 * Modal for selecting wallet provider
 */

import React from 'react';
import { Wallet, AlertCircle } from 'lucide-react';
import Modal from '@/components/ui/Modal';

interface WalletOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const walletOptions: WalletOption[] = [
  {
    id: 'hiro',
    name: 'Hiro Wallet',
    description: 'Official Stacks wallet with built-in browser extension',
    icon: '🔷',
  },
  {
    id: 'xverse',
    name: 'Xverse',
    description: 'Multi-chain wallet supporting Bitcoin and Stacks',
    icon: '⚡',
  },
  {
    id: 'leather',
    name: 'Leather Wallet',
    description: 'Modern wallet for Bitcoin and Stacks',
    icon: '🎯',
  },
];

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet: () => void;
  error?: string | null;
}

const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onSelectWallet,
  error,
}) => {
  const handleWalletClick = () => {
    onSelectWallet();
    // Close modal after short delay to show selection
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Connect Wallet" size="md">
      <div className="space-y-4">
        {/* Testnet Warning */}
        <div className="flex items-start gap-2 p-3 bg-warning-light border border-warning rounded-lg">
          <AlertCircle size={20} className="text-warning flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-gray-900">Testnet Only</p>
            <p className="text-xs text-gray-700 mt-1">
              This app uses Stacks Testnet. Make sure your wallet is connected to testnet.
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-2 p-3 bg-error-light border border-error rounded-lg">
            <AlertCircle size={20} className="text-error flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-gray-900">{error}</p>
          </div>
        )}

        {/* Wallet Options */}
        <div className="space-y-3">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.id}
              onClick={handleWalletClick}
              className="w-full flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary hover:bg-opacity-5 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span className="text-3xl" role="img" aria-label={wallet.name}>
                {wallet.icon}
              </span>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900 mb-1">{wallet.name}</h3>
                <p className="text-sm text-gray-600">{wallet.description}</p>
              </div>
              <Wallet size={20} className="text-gray-400 flex-shrink-0 mt-1" aria-hidden="true" />
            </button>
          ))}
        </div>

        {/* Help Text */}
        <p className="text-xs text-gray-500 text-center pt-2">
          Don't have a wallet?{' '}
          <a
            href="https://www.hiro.so/wallet/install-web"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Install Hiro Wallet
          </a>
        </p>
      </div>
    </Modal>
  );
};

export default WalletModal;
