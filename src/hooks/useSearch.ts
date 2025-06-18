import { useState, useMemo } from 'react';
import { Mod } from '../types';

export function useSearch(mods: Mod[], initialQuery: string = '') {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('downloads');
  const [timeRange, setTimeRange] = useState('all');

  const filteredMods = useMemo(() => {
    let filtered = [...mods];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(mod =>
        mod.title.toLowerCase().includes(query) ||
        mod.description.toLowerCase().includes(query) ||
        mod.author.toLowerCase().includes(query) ||
        mod.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(mod => mod.category === selectedCategory);
    }

    // Sort results
    switch (sortBy) {
      case 'downloads':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'updated':
        filtered.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  }, [mods, searchQuery, selectedCategory, sortBy, timeRange]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    timeRange,
    setTimeRange,
    filteredMods
  };
}