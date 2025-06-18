import React from 'react';
import { Server } from '../types';
import ServerCard from './ServerCard';
import { Zap } from 'lucide-react';

interface FeaturedServersProps {
  servers: Server[];
}

export default function FeaturedServers({ servers }: FeaturedServersProps) {
  return (
    <section className="py-16 bg-white dark:bg-dark-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400 fill-current" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Servers</h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-dark-300 max-w-2xl mx-auto">
            Join the most popular and well-maintained Minecraft servers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.filter(server => server.featured).map((server) => (
            <ServerCard key={server.id} server={server} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
}