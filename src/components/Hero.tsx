import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Star, Users, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-900 dark:to-dark-800 py-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Discover the best
            <span className="block bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent animate-glow">
              Minecraft content
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-dark-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Find and download the best mods, resource packs, and join amazing servers. 
            Join millions of players enhancing their gaming experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              to="/mods"
              className="group bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 flex items-center space-x-2"
            >
              <span>Browse Mods</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/servers"
              className="group border-2 border-primary-600 text-primary-600 dark:text-primary-400 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-600 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Find Servers</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center animate-bounce-subtle" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-200">
                <Download className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">150M+</h3>
              <p className="text-gray-600 dark:text-dark-300">Total Downloads</p>
            </div>
            <div className="text-center animate-bounce-subtle" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-200">
                <Star className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">25K+</h3>
              <p className="text-gray-600 dark:text-dark-300">Quality Mods</p>
            </div>
            <div className="text-center animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-200">
                <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">5M+</h3>
              <p className="text-gray-600 dark:text-dark-300">Active Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}