import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Globe, Zap, Star, Copy, ExternalLink, MessageCircle } from 'lucide-react';
import { servers } from '../data/mockData';

export default function ServerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const server = servers.find(s => s.id === id);

  if (!server) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Server not found</h1>
          <Link to="/servers" className="text-primary-600 hover:text-primary-700 transition-colors duration-200">
            Back to servers
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (uptime: number) => {
    if (uptime >= 99) return 'text-green-500';
    if (uptime >= 95) return 'text-yellow-500';
    return 'text-red-500';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{server.name}</h1>
                  <p className="text-gray-600 dark:text-dark-300 text-lg">{server.description}</p>
                </div>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-6 h-6 fill-current" />
                  <span className="text-xl font-bold text-gray-900 dark:text-white">{server.rating}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-1 text-primary-600 dark:text-primary-400" />
                  <div className="text-sm text-gray-500 dark:text-dark-400">Players</div>
                  <div className="font-bold text-gray-900 dark:text-white">{server.players.online}/{server.players.max}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  <Globe className="w-6 h-6 mx-auto mb-1 text-primary-600 dark:text-primary-400" />
                  <div className="text-sm text-gray-500 dark:text-dark-400">Location</div>
                  <div className="font-bold text-gray-900 dark:text-white">{server.country}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  <Zap className={`w-6 h-6 mx-auto mb-1 ${getStatusColor(server.uptime)}`} />
                  <div className="text-sm text-gray-500 dark:text-dark-400">Uptime</div>
                  <div className={`font-bold ${getStatusColor(server.uptime)}`}>{server.uptime}%</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  <Star className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
                  <div className="text-sm text-gray-500 dark:text-dark-400">Type</div>
                  <div className="font-bold text-gray-900 dark:text-white">{server.type}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {server.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 transition-all duration-200 hover:scale-105"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Server Image */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 overflow-hidden">
              <img 
                src={server.imageUrl} 
                alt={server.name}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* About */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About this server</h2>
              <p className="text-gray-700 dark:text-dark-200 leading-relaxed">
                {server.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Connect */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 p-6">
              <button className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg mb-4">
                Connect to Server
              </button>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-1">
                    Server IP
                  </label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-gray-100 dark:bg-dark-700 px-3 py-2 rounded text-sm font-mono text-gray-900 dark:text-white">
                      {server.ip}
                    </code>
                    <button
                      onClick={() => copyToClipboard(server.ip)}
                      className="p-2 text-gray-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {server.port !== 25565 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-1">
                      Port
                    </label>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 bg-gray-100 dark:bg-dark-700 px-3 py-2 rounded text-sm font-mono text-gray-900 dark:text-white">
                        {server.port}
                      </code>
                      <button
                        onClick={() => copyToClipboard(server.port.toString())}
                        className="p-2 text-gray-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Server Info */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Server Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-dark-400">Version:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{server.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-dark-400">Type:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{server.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-dark-400">Country:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{server.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-dark-400">Max Players:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{server.players.max}</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Links</h3>
              <div className="space-y-2">
                {server.website && (
                  <a 
                    href={server.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {server.discord && (
                  <a 
                    href={server.discord} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Discord</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}