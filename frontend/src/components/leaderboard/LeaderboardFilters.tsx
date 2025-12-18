/**
 * LeaderboardFilters Component
 * Tab-based filtering for leaderboard time periods
 */

import React from 'react';
import type { LeaderboardFilter } from '@/types/player.types';

interface LeaderboardFiltersProps {
  activeFilter: LeaderboardFilter;
  onFilterChange: (filter: LeaderboardFilter) => void;
  disabled?: boolean;
}

interface FilterTab {
  value: LeaderboardFilter;
  label: string;
  description: string;
}

const FILTER_TABS: FilterTab[] = [
  {
    value: 'all-time',
    label: 'All Time',
    description: 'Best scores ever',
  },
  {
    value: 'weekly',
    label: 'Weekly',
    description: 'Last 7 days',
  },
  {
    value: 'daily',
    label: 'Daily',
    description: 'Last 24 hours',
  },
];

/**
 * LeaderboardFilters Component
 */
export const LeaderboardFilters: React.FC<LeaderboardFiltersProps> = ({
  activeFilter,
  onFilterChange,
  disabled = false,
}) => {
  return (
    <div className="w-full">
      {/* Desktop: Horizontal Tabs */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="flex gap-2" aria-label="Leaderboard filters">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => !disabled && onFilterChange(tab.value)}
                  disabled={disabled}
                  className={`
                    px-6 py-3 text-sm font-medium transition-all duration-200
                    border-b-2 whitespace-nowrap
                    ${isActive
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="block">{tab.label}</span>
                  <span className="block text-xs text-gray-400 mt-0.5">
                    {tab.description}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile: Button Group */}
      <div className="sm:hidden">
        <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Leaderboard filters">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => !disabled && onFilterChange(tab.value)}
                disabled={disabled}
                role="tab"
                aria-selected={isActive}
                className={`
                  flex-1 min-w-[100px] px-4 py-3 rounded-lg text-sm font-medium
                  transition-all duration-200 whitespace-nowrap
                  ${isActive
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <span className="block">{tab.label}</span>
                <span className={`block text-xs mt-0.5 ${isActive ? 'text-orange-100' : 'text-gray-400'}`}>
                  {tab.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardFilters;
