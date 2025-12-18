/**
 * PlayerStats Component
 * Displays personal statistics for the connected player
 */

import React from 'react';
import { TrendingUp, Trophy, Target, Activity, User } from 'lucide-react';
import Card from '@/components/ui/Card';
import { formatScore } from '@/utils/formatters';
import { useGameStore } from '@/store/gameStore';
import type { PlayerStats as PlayerStatsType } from '@/types/player.types';

interface PlayerStatsProps {
  stats: PlayerStatsType | null;
  loading?: boolean;
}

/**
 * Skeleton loader for stats
 */
const StatSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
    <div className="h-8 w-24 bg-gray-200 rounded"></div>
  </div>
);

/**
 * Single stat card display
 */
interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value, color = 'orange' }) => {
  const colorClasses = {
    orange: 'bg-orange-100 text-orange-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
  };

  return (
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses] || colorClasses.orange}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

/**
 * Empty state when user not connected
 */
const NotConnectedState: React.FC = () => (
  <Card className="text-center py-8">
    <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
    <p className="text-gray-500 text-sm">Connect your wallet to see your stats</p>
  </Card>
);

/**
 * Empty state when no games played
 */
const NoGamesState: React.FC = () => (
  <Card className="text-center py-8">
    <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
    <p className="text-gray-500 text-sm">Play your first game to see stats here!</p>
  </Card>
);

/**
 * PlayerStats Component
 */
export const PlayerStats: React.FC<PlayerStatsProps> = ({ stats, loading = false }) => {
  const { isConnected, playerName } = useGameStore();

  // Not connected state
  if (!isConnected) {
    return <NotConnectedState />;
  }

  // Loading state
  if (loading) {
    return (
      <Card>
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </div>
        </div>
      </Card>
    );
  }

  // No stats available
  if (!stats || stats.totalGames === 0) {
    return <NoGamesState />;
  }

  return (
    <Card>
      <div className="space-y-6">
        {/* Player Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {playerName?.charAt(0).toUpperCase() || '?'}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{playerName || 'Player'}</h3>
            <p className="text-sm text-gray-500">Your Statistics</p>
          </div>
          {stats.rank && stats.rank <= 10 && (
            <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              <Trophy className="w-4 h-4" />
              <span>Top {stats.rank}</span>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Best Score */}
          <StatItem
            icon={<Trophy className="w-5 h-5" />}
            label="Best Score"
            value={formatScore(stats.bestScore)}
            color="yellow"
          />

          {/* Current Rank */}
          <StatItem
            icon={<TrendingUp className="w-5 h-5" />}
            label="Current Rank"
            value={stats.rank ? `#${stats.rank}` : 'Unranked'}
            color="blue"
          />

          {/* Total Games */}
          <StatItem
            icon={<Target className="w-5 h-5" />}
            label="Total Games"
            value={stats.totalGames}
            color="purple"
          />

          {/* Average Score */}
          <StatItem
            icon={<Activity className="w-5 h-5" />}
            label="Average Score"
            value={formatScore(Math.round(stats.avgScore))}
            color="green"
          />
        </div>

        {/* Additional Stats */}
        {stats.totalPoints > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-orange-600">
                  {formatScore(stats.totalPoints)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Total Points</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.winRate.toFixed(0)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Win Rate</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PlayerStats;
