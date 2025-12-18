/**
 * GameControls Component
 * Start, pause, and resume game controls
 */

import React from 'react';
import { Play, Pause } from 'lucide-react';
import Button from '@/components/ui/Button';
import type { GameStatus } from '@/types/game.types';

interface GameControlsProps {
  gameStatus: GameStatus;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  isCheckingRegistration?: boolean;
  disabled?: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameStatus,
  onStart,
  onPause,
  onResume,
  isCheckingRegistration = false,
  disabled = false,
}) => {
  // Idle state - show start button
  if (gameStatus === 'idle') {
    return (
      <div className="flex justify-center">
        <Button
          variant="primary"
          size="lg"
          onClick={onStart}
          disabled={disabled || isCheckingRegistration}
          loading={isCheckingRegistration}
          className="min-w-[200px]"
        >
          <Play size={20} aria-hidden="true" />
          {isCheckingRegistration ? 'Checking...' : 'Start Game'}
        </Button>
      </div>
    );
  }

  // Playing state - show pause button
  if (gameStatus === 'playing') {
    return (
      <div className="flex justify-center">
        <Button
          variant="secondary"
          size="md"
          onClick={onPause}
          disabled={disabled}
          className="min-w-[150px]"
        >
          <Pause size={18} aria-hidden="true" />
          Pause
        </Button>
      </div>
    );
  }

  // Paused state - show resume button
  if (gameStatus === 'paused') {
    return (
      <div className="flex justify-center gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={onResume}
          disabled={disabled}
          className="min-w-[150px]"
        >
          <Play size={18} aria-hidden="true" />
          Resume
        </Button>
      </div>
    );
  }

  return null;
};

export default GameControls;
