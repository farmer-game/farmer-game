/**
 * Dashboard Page - Clean Design System
 * White cards, orange accents, modern minimalist layout
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Trophy, Users, RefreshCw, Lightbulb, Wallet } from 'lucide-react';
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable';
import RegisterModal from '@/components/wallet/RegisterModal';
import { useGameStore } from '@/store/gameStore';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { useWallet } from '@/hooks/useWallet';
import { useContract } from '@/hooks/useContract';
import { getTotalGames } from '@/services/contractService';

/**
 * Dashboard Page Component
 */
export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, playerName, address } = useGameStore();
  const { connect: connectWallet } = useWallet();
  const { checkRegistration } = useContract();
  const { leaderboard, loading: leaderboardLoading, refresh } = useLeaderboard(5, true);
  const [totalGames, setTotalGames] = useState<number>(0);
  const [loadingStats, setLoadingStats] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isCheckingRegistration, setIsCheckingRegistration] = useState(false);

  // Fetch global stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const games = await getTotalGames();
        setTotalGames(games);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  /**
   * Handle start game - check if wallet is connected and user is registered
   */
  const handleStartGame = async () => {
    // First check if wallet is connected
    if (!isConnected || !address) {
      await connectWallet();
      return;
    }

    // Check registration
    setIsCheckingRegistration(true);
    try {
      const registered = await checkRegistration(address);
      if (!registered) {
        setShowRegisterModal(true);
      } else {
        navigate('/game');
      }
    } catch (error) {
      console.error('Error checking registration:', error);
      navigate('/game');
    } finally {
      setIsCheckingRegistration(false);
    }
  };

  /**
   * Handle successful registration
   */
  const handleRegistrationSuccess = () => {
    setShowRegisterModal(false);
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Welcome Banner */}
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-2xl p-10 mb-12">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                {isConnected && playerName ? `Welcome back, ${playerName}! 👋` : 'Welcome to Farmer Game! 🎮'}
              </h1>
              <p className="text-lg text-gray-600">
                {isConnected
                  ? 'Ready to catch some fruits and beat your high score?'
                  : 'Connect your wallet to start playing and compete on the leaderboard!'}
              </p>
            </div>
            {!isConnected && (
              <button
                onClick={connectWallet}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Total Players */}
          <div className="bg-white border-l-4 border-orange-500 border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center">
                <Users className="w-8 h-8 text-orange-500" strokeWidth={2.5} />
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Players</p>
                <p className="text-4xl font-bold text-gray-900">
                  {loadingStats ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    leaderboard.length
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Total Games */}
          <div className="bg-white border-l-4 border-orange-500 border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center">
                <Trophy className="w-8 h-8 text-orange-500" strokeWidth={2.5} />
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Games Played</p>
                <p className="text-4xl font-bold text-gray-900">
                  {loadingStats ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    typeof totalGames === 'number' && !isNaN(totalGames) ? totalGames : 0
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Your Rank (if connected) */}
          {isConnected ? (
            <div className="bg-white border-l-4 border-orange-500 border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-orange-500" strokeWidth={2.5} />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Your Rank</p>
                  <p className="text-4xl font-bold text-gray-900">
                    {leaderboardLoading ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      leaderboard.find((entry) => entry.isCurrentUser)?.rank || '-'
                    )}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Connect Wallet</p>
                <p className="text-gray-600 text-sm">To see your rank</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Game Card + Leaderboard */}
          <div className="lg:col-span-2 space-y-8">
            {/* Play Game Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-orange-50 rounded-2xl flex items-center justify-center text-6xl shadow-sm">
                    🎮
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Ready to Play?</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Test your reflexes, catch fruits, avoid bombs, and climb the leaderboard!
                  </p>
                  <button
                    onClick={handleStartGame}
                    disabled={isCheckingRegistration}
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCheckingRegistration ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        Start Playing Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Leaderboard Preview */}
            <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Top Players</h2>
                    <p className="text-sm text-gray-600">Global Leaderboard Rankings</p>
                  </div>
                </div>
                <button
                  onClick={refresh}
                  disabled={leaderboardLoading}
                  className="p-2 text-gray-600 hover:text-orange-500 transition-colors disabled:opacity-50"
                  aria-label="Refresh leaderboard"
                >
                  <RefreshCw className={`w-5 h-5 ${leaderboardLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Leaderboard Table */}
              <LeaderboardTable 
                entries={leaderboard}
                loading={leaderboardLoading}
              />

              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate('/leaderboard')}
                  className="text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors"
                >
                  View Full Leaderboard →
                </button>
              </div>
            </div>

            {/* Player Stats Section - Removed for now */}
          </div>

          {/* Right Column - Tips + Actions */}
          <div className="space-y-8">
            {/* Pro Tips */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Pro Tips</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-6 h-6 bg-orange-500 text-white rounded-full font-bold text-sm flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <span className="font-semibold">Focus on watermelons</span> - They give 50 points each, the highest value!
                  </p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-6 h-6 bg-orange-500 text-white rounded-full font-bold text-sm flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <span className="font-semibold">Avoid bombs</span> - One bomb click costs you a life. You only have 4!
                  </p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-6 h-6 bg-orange-500 text-white rounded-full font-bold text-sm flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <span className="font-semibold">Speed matters</span> - The game gets faster. Stay alert and focused!
                  </p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-6 h-6 bg-orange-500 text-white rounded-full font-bold text-sm flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <span className="font-semibold">Practice makes perfect</span> - Play multiple rounds to improve your score!
                  </p>
                </div>
              </div>
            </div>

            {/* Connect Wallet Card (if not connected) */}
            {!isConnected && (
              <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm text-center">
                <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Wallet className="w-10 h-10 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Connect Your Wallet</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Connect your Stacks wallet to save your scores and compete on the leaderboard!
                </p>
                <button
                  onClick={connectWallet}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Connect Wallet
                </button>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleStartGame}
                  disabled={isCheckingRegistration}
                  className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 rounded-xl transition-all duration-200 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingRegistration ? (
                    <>
                      <RefreshCw className="w-5 h-5 text-orange-500 animate-spin" />
                      <span className="font-semibold text-gray-900">Checking...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold text-gray-900">Play Game</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => navigate('/leaderboard')}
                  className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 rounded-xl transition-all duration-200 flex items-center gap-3"
                >
                  <Trophy className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold text-gray-900">View Leaderboard</span>
                </button>

                <button
                  onClick={() => document.getElementById('how-to-play')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 rounded-xl transition-all duration-200 flex items-center gap-3"
                >
                  <Lightbulb className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold text-gray-900">How to Play</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSuccess={handleRegistrationSuccess}
      />
    </div>
  );
};

export default Dashboard;
