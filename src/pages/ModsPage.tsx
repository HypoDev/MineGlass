import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategorySidebar from '../components/CategorySidebar';
import FilterBar from '../components/FilterBar';
import ModGrid from '../components/ModGrid';
import SearchPagination from '../components/SearchPagination';
import { allMods, categories } from '../data/mockData';
import { useSearch } from '../hooks/useSearch';

export default function ModsPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    timeRange,
    setTimeRange,
    filteredMods
  } = useSearch(allMods, initialQuery);

  const [currentPage, setCurrentPage] = useState(1);
  const modsPerPage = 12;

  const paginatedMods = useMemo(() => {
    const startIndex = (currentPage - 1) * modsPerPage;
    return filteredMods.slice(startIndex, startIndex + modsPerPage);
  }, [filteredMods, currentPage]);

  const totalPages = Math.ceil(filteredMods.length / modsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </aside>
          
          <main className="flex-1 animate-fade-in">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {searchQuery ? `Search results for "${searchQuery}"` : 
                 selectedCategory ? `${categories.find(c => c.id === selectedCategory)?.name || 'Category'} Mods` : 
                 'All Mods'}
              </h1>
              <p className="text-gray-600 dark:text-dark-300">{filteredMods.length} mods found</p>
            </div>
            
            <FilterBar
              sortBy={sortBy}
              onSortChange={setSortBy}
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
            />
            
            <ModGrid mods={paginatedMods} />
            
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
    </div>
  );
}