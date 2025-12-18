/**
 * ScoreDisplay Component
 * Top overlay showing score, lives, and timer
 */

import React from 'react';
import { Heart } from 'lucide-react';
import { formatScore, formatTime } from '@/utils/formatters';
import { GAME_CONFIG } from '@/utils/constants';

interface ScoreDisplayProps {
  score: number;
  lives: number;
  timer: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, lives, timer }) => {
  const maxLives = GAME_CONFIG.MAX_LIVES;

  // Calculate time percentage for color coding
  const timePercentage = (timer / GAME_CONFIG.DURATION) * 100;
  const isLowTime = timePercentage < 25;
  const isMediumTime = timePercentage < 50 && timePercentage >= 25;

  return (
    <div className="fixed top-0 left-0 right-0 z-30 bg-white bg-opacity-95 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Score */}
          <div className="flex-1">
            <p className="text-xs text-gray-600 mb-1">Score</p>
            <p className="text-2xl sm:text-3xl font-bold text-primary font-game">
              {formatScore(score)}
            </p>
          </div>

          {/* Timer */}
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-600 mb-1">Time</p>
            <p
              className={`text-2xl sm:text-3xl font-bold font-game ${
                isLowTime
                  ? 'text-error animate-pulse'
                  : isMediumTime
                  ? 'text-warning'
                  : 'text-gray-900'
              }`}
            >
              {formatTime(timer)}
            </p>
          </div>

          {/* Lives */}
          <div className="flex-1 text-right">
            <p className="text-xs text-gray-600 mb-1">Lives</p>
            <div className="flex items-center justify-end gap-1">
              {Array.from({ length: maxLives }).map((_, index) => (
                <Heart
                  key={index}
                  size={24}
                  className={`${
                    index < lives
                      ? 'fill-error text-error'
                      : 'fill-gray-300 text-gray-300'
                  } transition-all duration-200`}
                  aria-hidden="true"
                />
              ))}
              <span className="sr-only">{lives} lives remaining</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
