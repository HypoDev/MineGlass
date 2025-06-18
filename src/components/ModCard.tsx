import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Star, Calendar, Tag, Eye } from 'lucide-react';
import { Mod } from '../types';

interface ModCardProps {
  mod: Mod;
  featured?: boolean;
}

export default function ModCard({ mod, featured = false }: ModCardProps) {
  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000000) {
      return `${(downloads / 1000000).toFixed(1)}M`;
    } else if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(1)}K`;
    }
    return downloads.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  return (
    <div className={`group bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-105 animate-fade-in ${featured ? 'ring-2 ring-primary-500 dark:ring-primary-400' : ''}`}>
      {featured && (
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold px-3 py-1 text-center animate-glow">
          FEATURED
        </div>
      )}
      
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={mod.imageUrl} 
          alt={mod.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Link
            to={`/mod/${mod.id}`}
            className="opacity-0 group-hover:opacity-100 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </Link>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Link to={`/mod/${mod.id}`}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
              {mod.title}
            </h3>
          </Link>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium text-gray-700 dark:text-dark-300">{mod.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-dark-300 text-sm mb-4 line-clamp-2">
          {mod.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-dark-400 mb-4">
          <span>by {mod.author}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {mod.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 transition-all duration-200 hover:scale-105"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-dark-400 mb-4">
          <div className="flex items-center space-x-1">
            <Download className="w-4 h-4" />
            <span>{formatDownloads(mod.downloads)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(mod.updated)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-500 dark:text-dark-400">Version:</span>
            <span className="ml-1 font-medium text-gray-900 dark:text-white">{mod.version}</span>
          </div>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
            Download
          </button>
        </div>
      </div>
    </div>
  );
}