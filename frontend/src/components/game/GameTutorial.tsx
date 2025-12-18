/**
 * GameTutorial Component
 * First-time player instructions overlay
 */

import React, { useState, useEffect } from 'react';
import { X, MousePointer, Target, Trophy } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const TUTORIAL_KEY = 'farmer-game-tutorial-seen';

interface GameTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameTutorial: React.FC<GameTutorialProps> = ({ isOpen, onClose }) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Check if tutorial was dismissed permanently
  useEffect(() => {
    const tutorialSeen = localStorage.getItem(TUTORIAL_KEY);
    if (tutorialSeen === 'true' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem(TUTORIAL_KEY, 'true');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How to Play</h2>
            <p className="text-gray-600">Master the art of fruit catching!</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close tutorial"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tutorial Steps */}
        <div className="space-y-6 mb-6">
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <MousePointer size={24} className="text-white" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                1. Click or Tap Fruits
              </h3>
              <p className="text-gray-600">
                Click (or tap on mobile) falling fruits to catch them and earn points. Each fruit
                type has different point values!
              </p>
              <div className="mt-2 flex gap-2 text-2xl">
                <span title="Apple: 10 points">🍎</span>
                <span title="Banana: 15 points">🍌</span>
                <span title="Orange: 20 points">🍊</span>
                <span title="Grape: 25 points">🍇</span>
                <span title="Watermelon: 50 points">🍉</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-error rounded-full flex items-center justify-center">
              <Target size={24} className="text-white" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Avoid Bombs</h3>
              <p className="text-gray-600">
                Watch out for bombs (💣)! Clicking a bomb will cost you one life. You start with 4
                lives.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-success rounded-full flex items-center justify-center">
              <Trophy size={24} className="text-white" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                3. Beat the Clock
              </h3>
              <p className="text-gray-600">
                You have 2 minutes (120 seconds) to score as many points as possible. The game ends
                when time runs out or you lose all lives!
              </p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-info-light border border-info rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-900">
            <strong>💡 Pro Tips:</strong> Watermelons give the most points but are larger targets.
            Speed increases as you progress. Stay focused and aim carefully!
          </p>
        </div>

        {/* Don't Show Again Checkbox */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            id="dontShowAgain"
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="dontShowAgain" className="text-sm text-gray-700 cursor-pointer">
            Don't show this again
          </label>
        </div>

        {/* Action Button */}
        <Button variant="primary" size="lg" onClick={handleClose} className="w-full">
          Got it, Let's Play!
        </Button>
      </Card>
    </div>
  );
};

export default GameTutorial;
