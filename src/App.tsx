import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedMods from './components/FeaturedMods';
import CategorySidebar from './components/CategorySidebar';
import FilterBar from './components/FilterBar';
import ModGrid from './components/ModGrid';
import Footer from './components/Footer';
import { featuredMods, categories } from './data/mockData';
import { useSearch } from './hooks/useSearch';

function App() {
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
  } = useSearch(featuredMods);

  const showingResults = searchQuery || selectedCategory;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      {!showingResults && <Hero />}
      {!showingResults && <FeaturedMods mods={featuredMods} />}
      
      {showingResults && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <CategorySidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </aside>
            
            <main className="flex-1">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {searchQuery ? `Search results for "${searchQuery}"` : 
                   selectedCategory ? `${categories.find(c => c.id === selectedCategory)?.name || 'Category'} Mods` : 
                   'All Mods'}
                </h1>
                <p className="text-gray-600">{filteredMods.length} mods found</p>
              </div>
              
              <FilterBar
                sortBy={sortBy}
                onSortChange={setSortBy}
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
              />
              
              <ModGrid mods={filteredMods} />
            </main>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default App;