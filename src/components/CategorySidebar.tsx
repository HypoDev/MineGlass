import React from 'react';
import * as Icons from 'lucide-react';
import { Category } from '../types';

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export default function CategorySidebar({ categories, selectedCategory, onCategorySelect }: CategorySidebarProps) {
  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
    return IconComponent ? <IconComponent className="w-5 h-5" /> : <Icons.Folder className="w-5 h-5" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
      
      <div className="space-y-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
            selectedCategory === null 
              ? 'bg-green-100 text-green-800 font-medium' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Icons.Grid3X3 className="w-5 h-5" />
            <span>All Categories</span>
          </div>
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
              selectedCategory === category.id 
                ? 'bg-green-100 text-green-800 font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              {getIcon(category.icon)}
              <span>{category.name}</span>
            </div>
            <span className="text-sm text-gray-500">{category.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}