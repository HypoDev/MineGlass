import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Star, Calendar, Tag, ExternalLink, Github, AlertTriangle, Users, Eye } from 'lucide-react';
import { allMods } from '../data/mockData';

export default function ModDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mod = allMods.find(m => m.id === id);

  if (!mod) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mod not found</h1>
          <Link to="/mods" className="text-primary-600 hover:text-primary-700 transition-colors duration-200">
            Back to mods
          </Link>
        </div>
      </div>
    );
  }

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
      month: 'long', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-all duration-200 hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{mod.title}</h1>
                  <p className="text-gray-600 dark:text-dark-300 text-lg">{mod.description}</p>
                </div>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-6 h-6 fill-current" />
                  <span className="text-xl font-bold text-gray-900 dark:text-white">{mod.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-dark-400 mb-6">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>by {mod.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="w-4 h-4" />
                  <span>{formatDownloads(mod.downloads)} downloads</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Updated {formatDate(mod.updated)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {mod.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 transition-all duration-200 hover:scale-105"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Screenshots */}
            {mod.screenshots && mod.screenshots.length > 0 && (
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Screenshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mod.screenshots.map((screenshot, index) => (
                    <div key={index} className="aspect-video overflow-hidden rounded-lg">
                      <img 
                        src={screenshot} 
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About this mod</h2>
              <p className="text-gray-700 dark:text-dark-200 leading-relaxed">
                {mod.longDescription || mod.description}
              </p>
            </div>

            {/* Changelog */}
            {mod.changelog && (
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changelog</h2>
                <p className="text-gray-700 dark:text-dark-200">{mod.changelog}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Download */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 p-6">
              <button className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg mb-4">
                Download {mod.version}
              </button>
              <div className="text-sm text-gray-500 dark:text-dark-400 space-y-2">
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{mod.version}</span>
                </div>
                <div className="flex justify-between">
                  <span>Downloads:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatDownloads(mod.downloads)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Updated:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatDate(mod.updated)}</span>
                </div>
              </div>
            </div>

            {/* Game Versions */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Game Versions</h3>
              <div className="flex flex-wrap gap-2">
                {mod.gameVersions.map((version) => (
                  <span 
                    key={version}
                    className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-dark-200 rounded-lg text-sm font-medium"
                  >
                    {version}
                  </span>
                ))}
              </div>
            </div>

            {/* Dependencies */}
            {mod.dependencies && mod.dependencies.length > 0 && (
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Dependencies</h3>
                <div className="space-y-2">
                  {mod.dependencies.map((dep) => (
                    <div key={dep} className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span className="text-gray-700 dark:text-dark-200">{dep}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Links</h3>
              <div className="space-y-2">
                {mod.sourceUrl && (
                  <a 
                    href={mod.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {mod.issuesUrl && (
                  <a 
                    href={mod.issuesUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Report Issues</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* License */}
            {mod.license && (
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">License</h3>
                <p className="text-gray-700 dark:text-dark-200">{mod.license}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}