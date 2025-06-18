import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import ServerGrid from '../components/ServerGrid';
import SearchPagination from '../components/SearchPagination';
import { servers } from '../data/mockData';

export default function ServersPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('players');
  const [timeRange, setTimeRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const serversPerPage = 12;

  const filteredServers = useMemo(() => {
    let filtered = [...servers];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(server =>
        server.name.toLowerCase().includes(query) ||
        server.description.toLowerCase().includes(query) ||
        server.type.toLowerCase().includes(query) ||
        server.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    switch (sortBy) {
      case 'players':
        filtered.sort((a, b) => b.players.online - a.players.online);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'uptime':
        filtered.sort((a, b) => b.uptime - a.uptime);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [servers, searchQuery, sortBy]);

  const paginatedServers = useMemo(() => {
    const startIndex = (currentPage - 1) * serversPerPage;
    return filteredServers.slice(startIndex, startIndex + serversPerPage);
  }, [filteredServers, currentPage]);

  const totalPages = Math.ceil(filteredServers.length / serversPerPage);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main className="animate-fade-in">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Minecraft Servers'}
            </h1>
            <p className="text-gray-600 dark:text-dark-300">{filteredServers.length} servers found</p>
          </div>
          
          <FilterBar
            sortBy={sortBy}
            onSortChange={setSortBy}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            isServerPage={true}
          />
          
          <ServerGrid servers={paginatedServers} />
          
          {totalPages > 1 && (
            <SearchPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </main>
      </div>
    </div>
  );
}