/**
 * LeaderboardCard Component
 * Card display for single leaderboard entry (optimized for mobile)
 */

import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { truncateAddress, formatScore } from '@/utils/formatters';
import Card from '@/components/ui/Card';
import type { LeaderboardEntry } from '@/types/player.types';

interface LeaderboardCardProps {
  entry: LeaderboardEntry;
  isCurrentUser?: boolean;
  onClick?: () => void;
}

/**
 * Get trophy icon for top 3 ranks
 */
const getTrophyIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-6 h-6 text-yellow-500" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Award className="w-6 h-6 text-orange-600" />;
    default:
      return null;
  }
};

/**
 * Get rank badge color based on position
 */
const getRankColor = (rank: number): string => {
  if (rank === 1) return 'bg-yellow-500 text-white';
  if (rank === 2) return 'bg-gray-400 text-white';
  if (rank === 3) return 'bg-orange-600 text-white';
  return 'bg-gray-200 text-gray-700';
};

/**
 * LeaderboardCard Component
 */
export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  entry,
  isCurrentUser = false,
  onClick,
}) => {
  const trophyIcon = getTrophyIcon(entry.rank);
  const rankColor = getRankColor(entry.rank);

  return (
    <Card
      className={`
        transition-all duration-200 cursor-pointer
        ${isCurrentUser 
          ? 'border-2 border-orange-500 bg-orange-50 shadow-lg scale-[1.02]' 
          : 'hover:shadow-md hover:scale-[1.01]'
        }
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Rank Badge */}
        <div className="flex-shrink-0">
          {trophyIcon ? (
            <div className="relative">
              <div className={`w-12 h-12 rounded-full ${rankColor} flex items-center justify-center font-bold text-lg`}>
                {entry.rank}
              </div>
              <div className="absolute -top-1 -right-1">
                {trophyIcon}
              </div>
            </div>
          ) : (
            <div className={`w-12 h-12 rounded-full ${rankColor} flex items-center justify-center font-bold text-lg`}>
              {entry.rank}
            </div>
          )}
        </div>

        {/* Player Info */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-base font-semibold truncate ${isCurrentUser ? 'text-orange-700' : 'text-gray-900'}`}>
            {entry.player.name}
            {isCurrentUser && (
              <span className="ml-2 text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full">
                You
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-500 font-mono truncate">
            {truncateAddress(entry.player.address)}
          </p>
        </div>

        {/* Score */}
        <div className="flex-shrink-0 text-right">
          <p className={`text-2xl font-game ${isCurrentUser ? 'text-orange-600' : 'text-gray-900'}`}>
            {formatScore(entry.score)}
          </p>
          <p className="text-xs text-gray-400">points</p>
        </div>
      </div>
    </Card>
  );
};

export default LeaderboardCard;
