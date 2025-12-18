/**
 * LeaderboardTable Component
 * Displays leaderboard entries in a responsive table format
 */

import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { truncateAddress, formatScore, formatDate } from '@/utils/formatters';
import { useGameStore } from '@/store/gameStore';
import type { LeaderboardEntry } from '@/types/player.types';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  loading?: boolean;
  showFullAddress?: boolean;
}

/**
 * Loading skeleton row for table
 */
const SkeletonRow: React.FC = () => (
  <tr className="animate-pulse">
    <td className="px-4 py-3">
      <div className="h-6 w-8 bg-gray-200 rounded"></div>
    </td>
    <td className="px-4 py-3">
      <div className="h-6 w-32 bg-gray-200 rounded"></div>
    </td>
    <td className="px-4 py-3">
      <div className="h-6 w-24 bg-gray-200 rounded"></div>
    </td>
    <td className="px-4 py-3 hidden md:table-cell">
      <div className="h-6 w-28 bg-gray-200 rounded"></div>
    </td>
  </tr>
);

/**
 * Empty state when no entries - Table version
 */
const EmptyStateRow: React.FC = () => (
  <tr>
    <td colSpan={4} className="px-4 py-12 text-center">
      <div className="flex flex-col items-center gap-3">
        <Trophy className="w-12 h-12 text-gray-300" />
        <p className="text-gray-500 text-lg">No scores yet</p>
        <p className="text-gray-400 text-sm">Be the first to play and set a high score!</p>
      </div>
    </td>
  </tr>
);

/**
 * Empty state when no entries - Mobile version
 */
const EmptyStateCard: React.FC = () => (
  <div className="flex flex-col items-center gap-3 py-12">
    <Trophy className="w-12 h-12 text-gray-300" />
    <p className="text-gray-500 text-lg">No scores yet</p>
    <p className="text-gray-400 text-sm">Be the first to play and set a high score!</p>
  </div>
);

/**
 * Get rank icon/badge for top 3 players
 */
const RankBadge: React.FC<{ rank: number }> = ({ rank }) => {
  if (rank === 1) {
    return (
      <div className="flex items-center gap-1 text-yellow-500">
        <Trophy className="w-5 h-5" />
        <span className="font-bold">{rank}</span>
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="flex items-center gap-1 text-gray-400">
        <Medal className="w-5 h-5" />
        <span className="font-bold">{rank}</span>
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="flex items-center gap-1 text-orange-600">
        <Award className="w-5 h-5" />
        <span className="font-bold">{rank}</span>
      </div>
    );
  }
  return <span className="font-semibold text-gray-700">{rank}</span>;
};

/**
 * LeaderboardTable Component
 */
export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  entries,
  loading = false,
  showFullAddress = false,
}) => {
  const { address: currentUserAddress } = useGameStore();

  // Determine if entry is current user
  const isCurrentUser = (entry: LeaderboardEntry): boolean => {
    return currentUserAddress
      ? entry.player.address.toLowerCase() === currentUserAddress.toLowerCase()
      : entry.isCurrentUser;
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Desktop Table View */}
      <table className="w-full border-collapse hidden md:table">
        <thead>
          <tr className="bg-gradient-to-r from-orange-50 to-orange-100 border-b-2 border-orange-200">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Player
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Score
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </>
          ) : entries.length === 0 ? (
            <EmptyStateRow />
          ) : (
            entries.map((entry) => {
              const isCurrent = isCurrentUser(entry);
              return (
                <tr
                  key={`${entry.player.address}-${entry.gameId}`}
                  className={`
                    transition-colors duration-150
                    ${isCurrent 
                      ? 'bg-orange-50 border-l-4 border-l-orange-500 font-medium' 
                      : 'hover:bg-gray-50'
                    }
                  `}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <RankBadge rank={entry.rank} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className={`text-sm ${isCurrent ? 'font-semibold text-orange-700' : 'text-gray-900'}`}>
                        {entry.player.name}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">
                        {showFullAddress 
                          ? entry.player.address 
                          : truncateAddress(entry.player.address)
                        }
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-lg font-game ${isCurrent ? 'text-orange-600' : 'text-gray-900'}`}>
                      {formatScore(entry.score)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(entry.timestamp)}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-200">
        {loading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded"></div>
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))
        ) : entries.length === 0 ? (
          <div className="p-8">
            <EmptyStateCard />
          </div>
        ) : (
          entries.map((entry) => {
            const isCurrent = isCurrentUser(entry);
            return (
              <div
                key={`${entry.player.address}-${entry.gameId}`}
                className={`
                  p-4 transition-colors duration-150
                  ${isCurrent 
                    ? 'bg-orange-50 border-l-4 border-l-orange-500' 
                    : ''
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <RankBadge rank={entry.rank} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isCurrent ? 'text-orange-700' : 'text-gray-900'}`}>
                      {entry.player.name}
                    </p>
                    <p className="text-xs text-gray-500 font-mono truncate">
                      {truncateAddress(entry.player.address)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(entry.timestamp)}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`text-xl font-game ${isCurrent ? 'text-orange-600' : 'text-gray-900'}`}>
                      {formatScore(entry.score)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LeaderboardTable;
