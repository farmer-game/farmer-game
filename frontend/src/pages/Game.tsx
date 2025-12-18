/**
 * Game Page - Clean Design System
 * White background, clean controls, minimal design
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-white">
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

      {/* Game Controls - Fixed at top with clean white design */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>

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
              className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors font-medium"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="hidden sm:inline">How to Play</span>
            </button>
          </div>
        </div>
      </div>

      {/* Game Canvas - Clean Container */}
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
          <GameCanvas
            onScoreUpdate={() => {}}
            onLivesUpdate={() => {}}
            onTimerUpdate={() => {}}
            onGameEnd={handleGameOver}
            isPlaying={isPlaying}
          />
        </div>
      </div>

      {/* Instructions Overlay (when idle) - Clean White Card */}
      {gameStatus === 'idle' && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10 p-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-10 max-w-md mx-auto pointer-events-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">🎮</span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Ready to Play?
              </h2>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                {!isConnected
                  ? 'Connect your wallet to start playing!'
                  : !isRegistered
                  ? 'Register your player name to begin!'
                  : 'Click "Start Game" to begin catching fruits!'}
              </p>

              {isConnected && isRegistered && (
                <div className="space-y-3 text-sm text-left bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">⏱️</span>
                    <span className="text-gray-700">2 minutes to score as many points as possible</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">❤️</span>
                    <span className="text-gray-700">4 lives - avoid bombs!</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">🍉</span>
                    <span className="text-gray-700">High-value fruits = more points</span>
                  </div>
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
