import React from 'react';
import Hero from '../components/Hero';
import FeaturedMods from '../components/FeaturedMods';
import FeaturedServers from '../components/FeaturedServers';
import { featuredMods, servers } from '../data/mockData';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
      <Hero />
      <FeaturedMods mods={featuredMods} />
      <FeaturedServers servers={servers} />
    </div>
  );
}