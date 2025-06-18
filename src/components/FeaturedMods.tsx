import React from 'react';
import { Mod } from '../types';
import ModCard from './ModCard';
import { Star } from 'lucide-react';

interface FeaturedModsProps {
  mods: Mod[];
}

export default function FeaturedMods({ mods }: FeaturedModsProps) {
  return (
    <section className="py-12 bg-gray-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Featured Mods
          </h2>
          <p className="text-gray-600 dark:text-dark-300 max-w-2xl mx-auto">
            Discover creative mods chosen by our community
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mods.filter(mod => mod.featured).map((mod) => (
            <ModCard key={mod.id} mod={mod} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
}