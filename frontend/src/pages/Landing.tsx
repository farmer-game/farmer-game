/**
 * Landing Page - Clean Design System
 * White background, orange accents, modern minimalist layout
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Trophy, Zap, Users, Target, Clock, Heart, AlertCircle } from 'lucide-react';

/**
 * Landing Page Component
 */
export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Subtle Orange Gradient */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-orange-50 to-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-gray-700">Built on Stacks Blockchain</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Catch Fruits,<br />Earn Glory!
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Test your reflexes in this addictive blockchain game. Catch falling fruits, avoid bombs, and climb the global leaderboard!
            </p>

            {/* CTA Button */}
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              <Play className="w-5 h-5" />
              Start Playing Free
            </button>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">2 Min</div>
                <div className="text-sm text-gray-600">Game Duration</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">5 Types</div>
                <div className="text-sm text-gray-600">Collectible Fruits</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">Global</div>
                <div className="text-sm text-gray-600">Leaderboard</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - White Background */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
              WHY PLAY
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Built for Champions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Experience the perfect blend of classic arcade fun and cutting-edge Web3 technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center mb-6 hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-orange-500" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Quick 2-minute rounds packed with non-stop action. Perfect for gaming on the go!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center mb-6 hover:scale-110 transition-transform">
                <Trophy className="w-8 h-8 text-orange-500" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Global Rankings</h3>
              <p className="text-gray-600 leading-relaxed">
                Compete with players worldwide. Climb the leaderboard and claim your spot at the top!
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center mb-6 hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-orange-500" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Web3 Gaming</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect your Stacks wallet and join the decentralized gaming revolution today!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Play Section - Gray Background */}
      <section id="how-to-play" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
              GAME RULES
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Simple to Learn
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Master the game in minutes with these three easy steps
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full font-bold text-xl flex items-center justify-center shadow-md">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="w-6 h-6 text-orange-500" />
                    Catch the Fruits
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Click or tap on falling fruits to catch them and earn points. Each fruit has different point values.
                  </p>
                  <div className="grid grid-cols-5 gap-3">
                    <div className="bg-gray-50 border border-gray-200 px-3 py-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🍎</div>
                      <div className="text-xs font-semibold text-gray-900">10 pts</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 px-3 py-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🍌</div>
                      <div className="text-xs font-semibold text-gray-900">15 pts</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 px-3 py-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🍊</div>
                      <div className="text-xs font-semibold text-gray-900">20 pts</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 px-3 py-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🍇</div>
                      <div className="text-xs font-semibold text-gray-900">25 pts</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 px-3 py-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🍉</div>
                      <div className="text-xs font-semibold text-gray-900">50 pts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full font-bold text-xl flex items-center justify-center shadow-md">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-orange-500" />
                    Avoid the Bombs
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Watch out for bombs! 💣 Clicking on a bomb will cost you one life. You start with 4 lives.
                  </p>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-orange-900 mb-1">Game Over Conditions</h4>
                        <p className="text-orange-800 text-sm leading-relaxed">
                          Game ends when you run out of lives or time runs out. Stay focused!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full font-bold text-xl flex items-center justify-center shadow-md">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-orange-500" />
                    Beat the Clock
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    You have 2 minutes (120 seconds) to score as many points as possible. The game speeds up over time!
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl flex-shrink-0">💡</div>
                      <div>
                        <h4 className="font-bold text-blue-900 mb-1">Pro Strategy</h4>
                        <p className="text-blue-800 text-sm leading-relaxed">
                          Focus on high-value fruits like watermelons (50 pts) for maximum points!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              <Play className="w-5 h-5" />
              Ready to Play? Start Now!
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section - White Background */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-gray-700">Join Players Worldwide</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Ready to Become a<br />Fruit Catching Legend?
            </h2>

            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Connect your Stacks wallet, register your player name, and start competing today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
              >
                <Play className="w-5 h-5" />
                Start Playing Free
              </button>

              <button
                onClick={() => navigate('/leaderboard')}
                className="inline-flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
              >
                <Trophy className="w-5 h-5" />
                View Leaderboard
              </button>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-l-4 border-orange-500 bg-white border border-gray-200 rounded-xl p-8 text-left">
                <div className="text-4xl mb-4">🎮</div>
                <div className="text-xl font-bold text-gray-900 mb-2">Play Now</div>
                <div className="text-gray-600">Fast-paced arcade action</div>
              </div>

              <div className="border-l-4 border-orange-500 bg-white border border-gray-200 rounded-xl p-8 text-left">
                <div className="text-4xl mb-4">🏆</div>
                <div className="text-xl font-bold text-gray-900 mb-2">Compete</div>
                <div className="text-gray-600">Climb the global ranks</div>
              </div>

              <div className="border-l-4 border-orange-500 bg-white border border-gray-200 rounded-xl p-8 text-left">
                <div className="text-4xl mb-4">🔗</div>
                <div className="text-xl font-bold text-gray-900 mb-2">Web3 Secure</div>
                <div className="text-gray-600">Blockchain verified scores</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
