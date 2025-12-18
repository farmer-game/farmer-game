/**
 * Landing Page
 * Welcome page with hero section, features, and how to play
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Trophy, Zap, Users, Target, Clock, Heart } from 'lucide-react';

/**
 * Landing Page Component
 */
export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-500">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>

        {/* Floating Fruits */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[8%] text-6xl animate-bounce opacity-30" style={{animationDuration: '3s'}}>🍎</div>
          <div className="absolute top-[25%] right-[12%] text-7xl animate-bounce opacity-25" style={{animationDuration: '3.5s', animationDelay: '0.2s'}}>🍌</div>
          <div className="absolute bottom-[30%] left-[15%] text-8xl animate-bounce opacity-20" style={{animationDuration: '4s', animationDelay: '0.4s'}}>🍊</div>
          <div className="absolute bottom-[20%] right-[20%] text-6xl animate-bounce opacity-35" style={{animationDuration: '3.2s', animationDelay: '0.6s'}}>🍇</div>
          <div className="absolute top-[40%] left-[5%] text-5xl animate-bounce opacity-30" style={{animationDuration: '3.8s'}}>🍓</div>
          <div className="absolute top-[60%] right-[10%] text-7xl animate-bounce opacity-25" style={{animationDuration: '3.3s', animationDelay: '0.3s'}}>🍉</div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <div className="text-white space-y-8 animate-fade-in">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-5 py-2.5 rounded-full">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium">Built on Stacks Blockchain</span>
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 font-heading">
                    Catch Fruits,
                    <br />
                    <span className="text-white/90">Earn Glory!</span>
                  </h1>
                  <p className="text-xl sm:text-2xl text-white/90 font-medium leading-relaxed">
                    Test your reflexes in this addictive blockchain game. Catch falling fruits, avoid bombs, and climb the global leaderboard!
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="group relative px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Play className="w-5 h-5" />
                      Start Playing Free
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                  <button
                    onClick={() => document.getElementById('how-to-play')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  >
                    How It Works
                  </button>
                </div>

                {/* Stats */}
                <div className="flex gap-8 pt-4">
                  <div>
                    <div className="text-3xl font-black">2 Min</div>
                    <div className="text-sm text-white/80">Game Duration</div>
                  </div>
                  <div className="h-12 w-px bg-white/30"></div>
                  <div>
                    <div className="text-3xl font-black">5 Types</div>
                    <div className="text-sm text-white/80">Collectible Fruits</div>
                  </div>
                  <div className="h-12 w-px bg-white/30"></div>
                  <div>
                    <div className="text-3xl font-black">∞</div>
                    <div className="text-sm text-white/80">Ways to Win</div>
                  </div>
                </div>
              </div>

              {/* Right: Visual */}
              <div className="relative animate-slide-up">
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full"></div>
                  
                  {/* Main game preview */}
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-[3rem] p-8 border-4 border-white/20 shadow-2xl">
                    <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-[2rem] aspect-square flex items-center justify-center relative overflow-hidden">
                      {/* Floating preview fruits */}
                      <div className="absolute inset-0">
                        <div className="absolute top-[20%] left-[20%] text-5xl animate-bounce" style={{animationDuration: '2s'}}>🍎</div>
                        <div className="absolute top-[30%] right-[25%] text-6xl animate-bounce" style={{animationDuration: '2.3s', animationDelay: '0.2s'}}>🍌</div>
                        <div className="absolute bottom-[25%] left-[30%] text-7xl animate-bounce" style={{animationDuration: '2.5s', animationDelay: '0.4s'}}>🍊</div>
                        <div className="absolute bottom-[35%] right-[20%] text-5xl animate-bounce" style={{animationDuration: '2.2s', animationDelay: '0.6s'}}>🍇</div>
                        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-8xl animate-bounce" style={{animationDuration: '2.8s'}}>🎮</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating score cards */}
                  <div className="absolute -left-4 top-[20%] bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-slide-up" style={{animationDelay: '0.2s'}}>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">🏆</div>
                      <div>
                        <div className="text-2xl font-black text-orange-600">+250</div>
                        <div className="text-xs text-gray-600">High Score!</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -right-4 bottom-[25%] bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-slide-up" style={{animationDelay: '0.4s'}}>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">⚡</div>
                      <div>
                        <div className="text-2xl font-black text-orange-600">x3</div>
                        <div className="text-xs text-gray-600">Combo!</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
              WHY CHOOSE US
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
              Built for <span className="text-primary">Champions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the perfect blend of classic arcade fun, competitive gameplay, and cutting-edge Web3 technology
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full border-2 border-transparent group-hover:border-orange-200">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl blur opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-orange-400 to-yellow-400 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-4 text-gray-900">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  Quick 2-minute rounds packed with non-stop action. Perfect for gaming on the go!
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full border-2 border-transparent group-hover:border-blue-200">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl blur opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-blue-400 to-purple-400 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-4 text-gray-900">Global Rankings</h3>
                <p className="text-gray-600 leading-relaxed">
                  Compete with players worldwide. Climb the leaderboard and claim your spot at the top!
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-400 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full border-2 border-transparent group-hover:border-green-200">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl blur opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-green-400 to-teal-400 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-4 text-gray-900">Web3 Gaming</h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect your Stacks wallet and join the decentralized gaming revolution today!
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-400 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full border-2 border-transparent group-hover:border-pink-200">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl blur opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-pink-400 to-red-400 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-4 text-gray-900">Easy to Master</h3>
                <p className="text-gray-600 leading-relaxed">
                  Simple controls, addictive gameplay. Start playing in seconds, master over time!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section id="how-to-play" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
              GAME RULES
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
              Simple to <span className="text-primary">Learn</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Master the game in minutes with these three easy steps
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-12">
            {/* Step 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="relative bg-white border-2 border-gray-100 rounded-3xl p-10 lg:p-14 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-orange-200">
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl blur opacity-50"></div>
                      <div className="relative w-24 h-24 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center text-white text-4xl font-black shadow-xl">
                        1
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-black text-gray-900 mb-4 flex items-center gap-3">
                      <Target className="w-7 h-7 text-orange-600" />
                      Catch the Fruits
                    </h3>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Click or tap on falling fruits to catch them and earn points. Each fruit has different point values - aim for the high scorers!
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-100 px-5 py-4 rounded-xl text-center hover:scale-105 transition-transform">
                        <div className="text-4xl mb-2">🍎</div>
                        <div className="text-sm font-bold text-gray-900">10 pts</div>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-100 px-5 py-4 rounded-xl text-center hover:scale-105 transition-transform">
                        <div className="text-4xl mb-2">🍌</div>
                        <div className="text-sm font-bold text-gray-900">15 pts</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-100 px-5 py-4 rounded-xl text-center hover:scale-105 transition-transform">
                        <div className="text-4xl mb-2">🍊</div>
                        <div className="text-sm font-bold text-gray-900">20 pts</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100 px-5 py-4 rounded-xl text-center hover:scale-105 transition-transform">
                        <div className="text-4xl mb-2">🍇</div>
                        <div className="text-sm font-bold text-gray-900">25 pts</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100 px-5 py-4 rounded-xl text-center hover:scale-105 transition-transform">
                        <div className="text-4xl mb-2">🍉</div>
                        <div className="text-sm font-bold text-gray-900">50 pts</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="relative bg-white border-2 border-gray-100 rounded-3xl p-10 lg:p-14 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-red-200">
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-400 rounded-2xl blur opacity-50"></div>
                      <div className="relative w-24 h-24 bg-gradient-to-br from-red-400 to-pink-400 rounded-2xl flex items-center justify-center text-white text-4xl font-black shadow-xl">
                        2
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-black text-gray-900 mb-4 flex items-center gap-3">
                      <Heart className="w-7 h-7 text-red-600" />
                      Avoid the Bombs
                    </h3>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Watch out for bombs! 💣 Clicking on a bomb will cost you one precious life. You start with 4 lives - use them wisely!
                    </p>
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-7">
                      <div className="flex items-start gap-5">
                        <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-black text-xl">!</span>
                        </div>
                        <div>
                          <h4 className="font-black text-red-900 mb-2">Game Over Conditions</h4>
                          <p className="text-red-800 text-sm leading-relaxed">
                            Game ends when you run out of lives or time runs out. Stay focused and keep those lives!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="relative bg-white border-2 border-gray-100 rounded-3xl p-10 lg:p-14 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-blue-200">
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl blur opacity-50"></div>
                      <div className="relative w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center text-white text-4xl font-black shadow-xl">
                        3
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-black text-gray-900 mb-4 flex items-center gap-3">
                      <Clock className="w-7 h-7 text-blue-600" />
                      Beat the Clock
                    </h3>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      You have 2 minutes (120 seconds) to score as many points as possible. The game speeds up over time, so stay sharp and focused!
                    </p>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-7">
                      <div className="flex items-start gap-5">
                        <div className="flex-shrink-0 text-5xl">💡</div>
                        <div>
                          <h4 className="font-black text-blue-900 mb-2">Pro Strategy</h4>
                          <p className="text-blue-800 text-sm leading-relaxed">
                            Focus on high-value fruits like watermelons (50 pts) and grapes (25 pts) for maximum points. Speed and accuracy are key to topping the leaderboard!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-black text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Play className="w-6 h-6" />
                Ready to Play? Start Now!
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-500">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>

        {/* Floating Emojis */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[20%] left-[10%] text-7xl animate-bounce" style={{animationDuration: '3s'}}>🍎</div>
          <div className="absolute top-[30%] right-[15%] text-8xl animate-bounce" style={{animationDuration: '3.5s', animationDelay: '0.3s'}}>🏆</div>
          <div className="absolute bottom-[25%] left-[20%] text-6xl animate-bounce" style={{animationDuration: '4s', animationDelay: '0.6s'}}>🍌</div>
          <div className="absolute bottom-[30%] right-[25%] text-7xl animate-bounce" style={{animationDuration: '3.2s', animationDelay: '0.9s'}}>⚡</div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-5 py-2.5 rounded-full mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-bold text-white">Join Players Worldwide</span>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Ready to Become a<br />
              <span className="text-white/90">Fruit Catching Legend?</span>
            </h2>

            <p className="text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Connect your Stacks wallet, register your player name, and start competing on the global leaderboard today!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button
                onClick={() => navigate('/dashboard')}
                className="group relative px-12 py-6 bg-white text-orange-600 rounded-2xl font-black text-xl shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Play className="w-6 h-6" />
                  Start Playing Free
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button
                onClick={() => navigate('/leaderboard')}
                className="px-12 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-2xl font-black text-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                <Trophy className="w-6 h-6" />
                View Leaderboard
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4">🎮</div>
                <div className="text-3xl font-black text-white mb-2">Play Now</div>
                <div className="text-white/80">Fast-paced arcade action</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4">🏆</div>
                <div className="text-3xl font-black text-white mb-2">Compete</div>
                <div className="text-white/80">Climb the global ranks</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4">🔗</div>
                <div className="text-3xl font-black text-white mb-2">Web3 Secure</div>
                <div className="text-white/80">Blockchain verified scores</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Top */}
        <div className="absolute top-0 left-0 right-0 rotate-180">
          <svg className="w-full h-24 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Landing;
