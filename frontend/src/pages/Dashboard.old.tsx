/**
 * Dashboard Page
 * Main dashboard with welcome message, stats, leaderboard preview, and quick actions
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Trophy, TrendingUp, Users, RefreshCw } from 'lucide-react';
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable';
import { PlayerStats } from '@/components/leaderboard/PlayerStats';
import { useGameStore } from '@/store/gameStore';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { getTotalGames } from '@/services/contractService';

/**
 * Dashboard Page Component
 */
export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, playerName } = useGameStore();
  const { leaderboard, loading: leaderboardLoading, refresh } = useLeaderboard(5, true);
  const [totalGames, setTotalGames] = useState<number>(0);
  const [loadingStats, setLoadingStats] = useState(true);

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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Welcome Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-500 p-12 shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}></div>
          </div>

          {/* Floating Emojis */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-[10%] right-[15%] text-6xl animate-bounce" style={{animationDuration: '3s'}}>🍎</div>
            <div className="absolute bottom-[20%] left-[10%] text-5xl animate-bounce" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}>🍌</div>
            <div className="absolute top-[40%] right-[5%] text-7xl animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>🏆</div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-bold text-white">
                {isConnected ? 'Connected' : 'Ready to Start'}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
              {isConnected && playerName ? `Welcome back, ${playerName}! 👋` : 'Welcome to Farmer Game! 🎮'}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {isConnected
                ? 'Ready to catch some fruits and beat your high score? Let\'s get playing! 🍎🍌🍊'
                : 'Connect your wallet to start playing and compete on the global leaderboard! 🔗'}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Total Players */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
            <div className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent group-hover:border-purple-200">
              <div className="flex items-center justify-between mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl blur opacity-50"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Total Players</p>
                  <p className="text-4xl font-black text-gray-900">
                    {loadingStats ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      leaderboard.length
                    )}
                  </p>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
            </div>
          </div>

          {/* Total Games */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
            <div className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent group-hover:border-blue-200">
              <div className="flex items-center justify-between mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-2xl blur opacity-50"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Games Played</p>
                  <p className="text-4xl font-black text-gray-900">
                    {loadingStats ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      typeof totalGames === 'number' && !isNaN(totalGames) ? totalGames : 0
                    )}
                  </p>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"></div>
            </div>
          </div>

          {/* Your Rank (if connected) */}
          {isConnected && (
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent group-hover:border-orange-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl blur opacity-50"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Your Rank</p>
                    <p className="text-4xl font-black text-gray-900">
                      {leaderboardLoading ? (
                        <span className="animate-pulse">...</span>
                      ) : (
                        leaderboard.find((entry) => entry.isCurrentUser)?.rank || '-'
                      )}
                    </p>
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Game Card + Leaderboard */}
          <div className="lg:col-span-2 space-y-10">
            {/* Play Game Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-[2rem] p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-orange-200 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
                
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-10">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-3xl blur-lg opacity-50 animate-pulse"></div>
                      <div className="relative w-32 h-32 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-3xl flex items-center justify-center text-7xl shadow-2xl">
                        🎮
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-3xl font-black text-gray-900 mb-4">Ready to Play?</h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Test your reflexes, catch fruits, avoid bombs, and climb the leaderboard! Are you ready to become a legend?
                    </p>
                    <button
                      onClick={() => navigate('/game')}
                      className="group/btn relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <Play className="w-6 h-6" />
                        Start Playing Now
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Leaderboard Preview */}
            <div className="bg-white rounded-[2rem] p-12 shadow-xl border-2 border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    Top Champions
                  </h2>
                  <p className="text-gray-600">The best of the best fruit catchers</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={refresh}
                    disabled={leaderboardLoading}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
                  >
                    <RefreshCw className={`w-5 h-5 text-gray-600 ${leaderboardLoading ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={() => navigate('/leaderboard')}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    View All
                  </button>
                </div>
              </div>

              <LeaderboardTable entries={leaderboard} loading={leaderboardLoading} />

              {!leaderboardLoading && leaderboard.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Scores Yet</h3>
                  <p className="text-gray-500">Be the first to play and claim the top spot!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Player Stats */}
          <div className="lg:col-span-1">
            {isConnected ? (
              <div className="space-y-10">
                <PlayerStats stats={null} loading={false} />

                {/* Quick Tips Card */}
                <div className="bg-white rounded-[2rem] p-10 shadow-xl border-2 border-gray-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-4xl">💡</span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">Pro Tips</h3>
                  </div>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-5 p-5 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-100">
                      <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      <span className="text-gray-700 leading-relaxed">Focus on high-value fruits like watermelons (50 pts) and grapes (25 pts)</span>
                    </li>
                    <li className="flex items-start gap-5 p-5 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border-2 border-red-100">
                      <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                      <span className="text-gray-700 leading-relaxed">Avoid bombs at all costs - they cost you a precious life!</span>
                    </li>
                    <li className="flex items-start gap-5 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-100">
                      <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                      <span className="text-gray-700 leading-relaxed">The game speeds up over time, so stay alert and focused!</span>
                    </li>
                    <li className="flex items-start gap-5 p-5 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border-2 border-green-100">
                      <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                      <span className="text-gray-700 leading-relaxed">You have 2 minutes and 4 lives per game - use them wisely!</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] p-12 shadow-xl border-2 border-gray-100 text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-3xl blur-lg opacity-30"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-3xl flex items-center justify-center mx-auto">
                    <Users className="w-12 h-12 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">
                  Connect Your Wallet
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Connect your Stacks wallet to track your scores, compete on the leaderboard, and become a legend!
                </p>
                <button className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
