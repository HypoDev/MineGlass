import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Globe, Zap, Star, Eye } from 'lucide-react';
import { Server } from '../types';

interface ServerCardProps {
  server: Server;
  featured?: boolean;
}

export default function ServerCard({ server, featured = false }: ServerCardProps) {
  const getStatusColor = (uptime: number) => {
    if (uptime >= 99) return 'text-green-500';
    if (uptime >= 95) return 'text-yellow-500';
    return 'text-red-500';
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
          src={server.imageUrl} 
          alt={server.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Link
            to={`/server/${server.id}`}
            className="opacity-0 group-hover:opacity-100 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </Link>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Link to={`/server/${server.id}`}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
              {server.name}
            </h3>
          </Link>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium text-gray-700 dark:text-dark-300">{server.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-dark-300 text-sm mb-4 line-clamp-2">
          {server.description}
        </p>
        
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center space-x-1 text-gray-500 dark:text-dark-400">
            <Users className="w-4 h-4" />
            <span>{server.players.online}/{server.players.max}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 dark:text-dark-400">
            <Globe className="w-4 h-4" />
            <span>{server.country}</span>
          </div>
          <div className={`flex items-center space-x-1 ${getStatusColor(server.uptime)}`}>
            <Zap className="w-4 h-4" />
            <span>{server.uptime}%</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {server.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 transition-all duration-200 hover:scale-105"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-500 dark:text-dark-400">IP:</span>
            <span className="ml-1 font-mono text-gray-900 dark:text-white">{server.ip}</span>
          </div>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}