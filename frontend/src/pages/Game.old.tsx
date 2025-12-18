/**
 * Game Page
 * Main game page with canvas, controls, and modals
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCanvas from '@/components/game/GameCanvas';
import GameControls from '@/components/game/GameControls';
import GameTutorial from '@/components/game/GameTutorial';
import RegisterModal from '@/components/wallet/RegisterModal';
import GameOverModal from '@/components/game/GameOverModal';
import { useGameStore } from '@/store/gameStore';
import { useContract } from '@/hooks/useContract';

/**
 * Game Page Component
 */
export const Game: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, isRegistered, address, gameStatus, score, startGame, pauseGame, resumeGame } = useGameStore();
  const { checkRegistration } = useContract();

  const [showTutorial, setShowTutorial] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isCheckingRegistration, setIsCheckingRegistration] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Check tutorial on mount
  useEffect(() => {
    const tutorialSeen = localStorage.getItem('farmer-game-tutorial-seen');
    if (!tutorialSeen) {
      setShowTutorial(true);
    }
  }, []);

  // Handle game status changes
  useEffect(() => {
    if (gameStatus === 'ended') {
      setGameEnded(true);
    }
  }, [gameStatus]);

  /**
   * Handle start game - check registration first
   */
  const handleStartGame = async () => {
    // Check if wallet is connected
    if (!isConnected || !address) {
      return;
    }

    // Check registration
    setIsCheckingRegistration(true);
    try {
      const registered = await checkRegistration(address);
      if (!registered) {
        setShowRegisterModal(true);
      } else {
        startGame();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error checking registration:', error);
    } finally {
      setIsCheckingRegistration(false);
    }
  };

  /**
   * Handle registration success
   */
  const handleRegistrationSuccess = () => {
    setShowRegisterModal(false);
  };

  /**
   * Handle game over
   */
  const handleGameOver = () => {
    setGameEnded(true);
  };

  /**
   * Handle play again
   */
  const handlePlayAgain = () => {
    setGameEnded(false);
    setIsPlaying(false);
  };

  /**
   * Handle submit score and navigate to leaderboard
   */
  const handleSubmitScore = () => {
    navigate('/leaderboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-green-100">
      {/* Game Tutorial */}
      <GameTutorial isOpen={showTutorial} onClose={() => setShowTutorial(false)} />

      {/* Register Modal */}
      {showRegisterModal && (
        <RegisterModal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onSuccess={handleRegistrationSuccess}
        />
      )}

      {/* Game Over Modal */}
      <GameOverModal
        isOpen={gameEnded && gameStatus === 'ended'}
        onClose={() => setGameEnded(false)}
        onPlayAgain={handlePlayAgain}
        onSubmitScore={handleSubmitScore}
        score={score}
      />

      {/* Game Controls - Fixed at top */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Dashboard
              </button>
            </div>

            <GameControls
              gameStatus={gameStatus}
              onStart={handleStartGame}
              onPause={() => { pauseGame(); setIsPlaying(false); }}
              onResume={() => { resumeGame(); setIsPlaying(true); }}
              isCheckingRegistration={isCheckingRegistration}
              disabled={!isConnected || !isRegistered}
            />

            <button
              onClick={() => setShowTutorial(true)}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              How to Play
            </button>
          </div>
        </div>
      </div>

      {/* Game Canvas */}
      <GameCanvas
        onScoreUpdate={() => {}}
        onLivesUpdate={() => {}}
        onTimerUpdate={() => {}}
        onGameEnd={handleGameOver}
        isPlaying={isPlaying}
      />

      {/* Instructions Overlay (when idle) */}
      {gameStatus === 'idle' && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md mx-4 pointer-events-auto">
            <div className="text-center">
              <div className="text-6xl mb-4">🎮</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to Play?
              </h2>
              <p className="text-gray-600 mb-6">
                {!isConnected
                  ? 'Connect your wallet to start playing!'
                  : !isRegistered
                  ? 'Register your player name to begin!'
                  : 'Click "Start Game" to begin catching fruits!'}
              </p>

              {isConnected && isRegistered && (
                <div className="space-y-3 text-sm text-left bg-orange-50 rounded-lg p-4">
                  <p className="flex items-center gap-2">
                    <span className="text-orange-500">⏱️</span>
                    <span>2 minutes to score as many points as possible</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-orange-500">❤️</span>
                    <span>4 lives - avoid bombs!</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-orange-500">🍉</span>
                    <span>High-value fruits = more points</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
