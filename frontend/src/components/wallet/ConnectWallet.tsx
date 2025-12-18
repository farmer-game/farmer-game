/**
 * ConnectWallet Component
 * Simple wallet connection button with modal
 */

import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import Button from '@/components/ui/Button';
import WalletModal from './WalletModal';
import { useWallet } from '@/hooks/useWallet';

interface ConnectWalletProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isConnected, loading, connect, error } = useWallet();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConnect = async () => {
    await connect();
  };

  // Don't show button if already connected
  if (isConnected) {
    return null;
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={openModal}
        loading={loading}
        className={className}
      >
        <Wallet size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} aria-hidden="true" />
        {children || 'Connect Wallet'}
      </Button>

      <WalletModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelectWallet={handleConnect}
        error={error}
      />
    </>
  );
};

export default ConnectWallet;
