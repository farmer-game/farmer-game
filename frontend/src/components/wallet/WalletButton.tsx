/**
 * WalletButton Component
 * Shows wallet connection status with dropdown menu
 */

import React, { useState, useRef, useEffect } from 'react';
import { Wallet, ChevronDown, User, LogOut, Loader2 } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { truncateAddress } from '@/utils/formatters';
import { useGameStore } from '@/store/gameStore';

const WalletButton: React.FC = () => {
  const { isConnected, address, loading, connect, disconnect } = useWallet();
  const playerName = useGameStore((state) => state.playerName);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
  };

  // Not connected state
  if (!isConnected) {
    return (
      <button
        onClick={connect}
        disabled={loading}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transform hover:scale-105"
        aria-label="Connect wallet"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <Wallet size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Connect Wallet</span>
            <span className="sm:hidden">Connect</span>
          </>
        )}
      </button>
    );
  }

  // Connected state with dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Wallet menu"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <Wallet size={18} aria-hidden="true" />
        <span className="hidden sm:inline">{truncateAddress(address || '')}</span>
        <span className="sm:hidden">{address?.slice(0, 6)}...</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-slide-down"
          role="menu"
          aria-orientation="vertical"
        >
          {/* Player Info */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Connected Address</p>
            <p className="text-sm font-medium text-gray-900 break-all">{address}</p>
            {playerName && (
              <p className="text-sm text-primary mt-2">
                <span className="font-medium">Player:</span> {playerName}
              </p>
            )}
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                // Navigate to profile page when implemented
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              role="menuitem"
            >
              <User size={16} aria-hidden="true" />
              <span>View Profile</span>
            </button>

            <button
              onClick={handleDisconnect}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              role="menuitem"
            >
              <LogOut size={16} aria-hidden="true" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletButton;
