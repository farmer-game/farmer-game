/**
 * RegisterModal Component
 * Player registration form with validation
 */

import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { useContract } from '@/hooks/useContract';
import { validatePlayerName } from '@/utils/validators';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [playerName, setPlayerName] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const { registerPlayer, registerState, resetStates } = useContract();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setPlayerName('');
      setValidationError(null);
      resetStates();
    }
  }, [isOpen, resetStates]);

  // Handle successful registration
  useEffect(() => {
    if (registerState.success && onSuccess) {
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    }
  }, [registerState.success, onSuccess, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPlayerName(value);

    // Clear validation error when user types
    if (validationError) {
      setValidationError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Register form submitted with name:', playerName);

    // Validate player name
    const validation = validatePlayerName(playerName);
    if (!validation.isValid) {
      console.log('Validation failed:', validation.error);
      setValidationError(validation.error || 'Invalid player name');
      return;
    }

    // Clear any previous errors
    setValidationError(null);

    // Register player
    console.log('Calling registerPlayer...');
    const result = await registerPlayer(playerName);
    console.log('registerPlayer returned:', result);
  };

  const isLoading = registerState.loading;
  const hasError = Boolean(registerState.error);
  const isSuccess = registerState.success;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Register as Player"
      size="md"
      closeOnBackdrop={!isLoading}
      closeOnEscape={!isLoading}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Info Message */}
        {!isSuccess && !hasError && (
          <div className="flex items-start gap-2 p-3 bg-info-light border border-info rounded-lg">
            <AlertCircle size={20} className="text-info flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-gray-900">First Time Setup</p>
              <p className="text-xs text-gray-700 mt-1">
                Register your player name on-chain to start playing and submit scores.
              </p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {isSuccess && (
          <div className="flex items-start gap-2 p-3 bg-success-light border border-success rounded-lg">
            <CheckCircle size={20} className="text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-gray-900">Registration Successful!</p>
              <p className="text-xs text-gray-700 mt-1">
                Your player profile has been created. Redirecting...
              </p>
              {registerState.txId && (
                <a
                  href={`https://explorer.stacks.co/txid/${registerState.txId}?chain=testnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-success hover:underline mt-2 inline-block"
                >
                  View transaction
                </a>
              )}
            </div>
          </div>
        )}

        {/* Error Message */}
        {hasError && (
          <div className="flex items-start gap-2 p-3 bg-error-light border border-error rounded-lg">
            <AlertCircle size={20} className="text-error flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-gray-900">Registration Failed</p>
              <p className="text-xs text-gray-700 mt-1">{registerState.error}</p>
            </div>
          </div>
        )}

        {/* Input Field */}
        {!isSuccess && (
          <>
            <div>
              <label
                htmlFor="playerName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Player Name
              </label>
              <input
                id="playerName"
                type="text"
                value={playerName}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="Enter your player name (3-50 characters)"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  validationError
                    ? 'border-error focus:ring-error'
                    : 'border-gray-300 focus:ring-primary'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                maxLength={50}
                required
                aria-invalid={Boolean(validationError)}
                aria-describedby={validationError ? 'name-error' : undefined}
              />
              {validationError && (
                <p id="name-error" className="text-sm text-error mt-1" role="alert">
                  {validationError}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {playerName.length}/50 characters
              </p>
            </div>

            {/* Testnet Warning */}
            <div className="p-3 bg-warning-light border border-warning rounded-lg">
              <p className="text-xs text-gray-700">
                <strong>Note:</strong> Registration requires a blockchain transaction on Stacks
                Testnet. Approve the transaction in your wallet.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={isLoading}
                disabled={isLoading || !playerName.trim()}
                className="flex-1"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
            </div>
          </>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-4">
            <Loader2 size={20} className="animate-spin text-primary" aria-hidden="true" />
            <p className="text-sm text-gray-600">
              Waiting for wallet confirmation...
            </p>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default RegisterModal;
