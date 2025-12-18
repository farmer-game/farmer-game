/**
 * GameOverModal Component
 * End game results and actions
 */

import React from 'react';
import { Trophy, Play, Share2, TrendingUp } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { formatScore } from '@/utils/formatters';
import { useGameStore } from '@/store/gameStore';
import { useWallet } from '@/hooks/useWallet';

interface GameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
  onSubmitScore?: () => void;
  isSubmitting?: boolean;
  score: number;
  fruitsCaught?: Record<string, number>;
  rank?: number | null;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  onClose,
  onPlayAgain,
  onSubmitScore,
  isSubmitting = false,
  score,
  fruitsCaught = {},
  rank,
}) => {
  const { isConnected } = useWallet();
  const isRegistered = useGameStore((state) => state.isRegistered);

  const canSubmitScore = isConnected && isRegistered;

  const handleShare = async () => {
    const shareText = `I scored ${formatScore(score)} points in Farmer Game! 🎮🍎 Can you beat my score?`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Farmer Game Score',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        alert('Score copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  // Calculate total fruits caught
  const totalFruits = Object.values(fruitsCaught).reduce((sum, count) => sum + count, 0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Game Over!"
      size="md"
      closeOnBackdrop={false}
    >
      <div className="text-center space-y-6">
        {/* Trophy Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
            <Trophy size={40} className="text-primary" aria-hidden="true" />
          </div>
        </div>

        {/* Final Score */}
        <div>
          <p className="text-gray-600 mb-2">Final Score</p>
          <p className="text-5xl font-bold text-primary font-game">{formatScore(score)}</p>
          {rank && (
            <p className="text-lg text-gray-700 mt-2">
              <TrendingUp size={18} className="inline mr-1" aria-hidden="true" />
              Rank #{rank} on Leaderboard!
            </p>
          )}
        </div>

        {/* Fruits Caught Breakdown */}
        {totalFruits > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-3">Fruits Caught</p>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(fruitsCaught).map(([fruit, count]) => (
                <div key={fruit} className="text-center">
                  <div className="text-3xl mb-1">
                    {fruit === 'apple' && '🍎'}
                    {fruit === 'banana' && '🍌'}
                    {fruit === 'orange' && '🍊'}
                    {fruit === 'grape' && '🍇'}
                    {fruit === 'watermelon' && '🍉'}
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{typeof count === 'number' && !isNaN(count) ? count : 0}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Total: <strong>{totalFruits}</strong> fruits
            </p>
          </div>
        )}

        {/* Not Registered Warning */}
        {!canSubmitScore && isConnected && (
          <div className="bg-warning-light border border-warning rounded-lg p-3">
            <p className="text-sm text-gray-900">
              Register as a player to submit your score to the leaderboard!
            </p>
          </div>
        )}

        {/* Not Connected Info */}
        {!isConnected && (
          <div className="bg-info-light border border-info rounded-lg p-3">
            <p className="text-sm text-gray-900">
              Connect your wallet to save your score on-chain!
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Submit Score Button */}
          {canSubmitScore && onSubmitScore && (
            <Button
              variant="primary"
              size="lg"
              onClick={onSubmitScore}
              loading={isSubmitting}
              disabled={isSubmitting}
              className="flex-1"
            >
              <Trophy size={18} aria-hidden="true" />
              {isSubmitting ? 'Submitting...' : 'Submit Score'}
            </Button>
          )}

          {/* Play Again Button */}
          <Button
            variant={canSubmitScore ? 'secondary' : 'primary'}
            size="lg"
            onClick={onPlayAgain}
            disabled={isSubmitting}
            className="flex-1"
          >
            <Play size={18} aria-hidden="true" />
            Play Again
          </Button>

          {/* Share Button */}
          <Button
            variant="ghost"
            size="lg"
            onClick={handleShare}
            disabled={isSubmitting}
            className="flex-1"
          >
            <Share2 size={18} aria-hidden="true" />
            Share
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GameOverModal;
