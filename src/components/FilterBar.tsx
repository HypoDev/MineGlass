import React from 'react';
import { Filter, SortDesc, Calendar } from 'lucide-react';

interface FilterBarProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  isServerPage?: boolean;
}

export default function FilterBar({ sortBy, onSortChange, timeRange, onTimeRangeChange, isServerPage = false }: FilterBarProps) {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 p-4 mb-6 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500 dark:text-dark-400" />
          <span className="font-medium text-gray-900 dark:text-white">Filters</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <SortDesc className="w-4 h-4 text-gray-500 dark:text-dark-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="border border-gray-300 dark:border-dark-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              {isServerPage ? (
                <>
                  <option value="players">Most Players</option>
                  <option value="rating">Highest Rated</option>
                  <option value="uptime">Best Uptime</option>
                  <option value="name">Alphabetical</option>
                </>
              ) : (
                <>
                  <option value="downloads">Most Downloaded</option>
                  <option value="updated">Recently Updated</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Alphabetical</option>
                </>
              )}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500 dark:text-dark-400" />
            <select
              value={timeRange}
              onChange={(e) => onTimeRangeChange(e.target.value)}
              className="border border-gray-300 dark:border-dark-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}