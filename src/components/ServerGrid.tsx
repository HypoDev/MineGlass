import React from 'react';
import { Server } from '../types';
import ServerCard from './ServerCard';

interface ServerGridProps {
  servers: Server[];
  loading?: boolean;
}

export default function ServerGrid({ servers, loading = false }: ServerGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 overflow-hidden animate-pulse">
            <div className="aspect-video bg-gray-200 dark:bg-dark-700"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-3/4 mb-4"></div>
              <div className="flex space-x-2 mb-4">
                <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded-full w-12"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-20"></div>
                <div className="h-8 bg-gray-200 dark:bg-dark-700 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (servers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-dark-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No servers found</h3>
        <p className="text-gray-500 dark:text-dark-400">Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {servers.map((server) => (
        <ServerCard key={server.id} server={server} />
      ))}
    </div>
  );
}