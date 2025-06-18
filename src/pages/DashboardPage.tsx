import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSubmissions } from '../contexts/SubmissionContext';
import { Download, Star, Calendar, Package, Settings, User, Upload, BarChart3, Heart, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';
import { allMods } from '../data/mockData';
import SubmissionModal from '../components/SubmissionModal';

export default function DashboardPage() {
  const { user } = useAuth();
  const { submissions } = useSubmissions();
  const [activeTab, setActiveTab] = useState('overview');
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submissionType, setSubmissionType] = useState<'mod' | 'server'>('mod');

  const userMods = allMods.filter(mod => mod.author === user?.username);
  const userSubmissions = submissions.filter(sub => sub.submittedBy === user?.username);
  const totalDownloads = userMods.reduce((sum, mod) => sum + mod.downloads, 0);

  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000000) {
      return `${(downloads / 1000000).toFixed(1)}M`;
    } else if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(1)}K`;
    }
    return downloads.toString();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      default:
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'mods', name: 'My Mods', icon: Package },
    { id: 'submissions', name: 'Submissions', icon: Upload },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const handleSubmit = (type: 'mod' | 'server') => {
    setSubmissionType(type);
    setShowSubmissionModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <img 
                src={user?.avatar} 
                alt={user?.username}
                className="w-20 h-20 rounded-2xl border-4 border-primary-500 shadow-xl transform hover:scale-105 transition-all duration-300"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-dark-900 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.username}!</h1>
              <p className="text-gray-600 dark:text-dark-300">Manage your content and track your progress</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-dark-300">Total Mods</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{userMods.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Download className="w-7 h-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-dark-300">Total Downloads</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatDownloads(totalDownloads)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-dark-300">Avg Rating</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {userMods.length > 0 ? (userMods.reduce((sum, mod) => sum + mod.rating, 0) / userMods.length).toFixed(1) : '0.0'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Upload className="w-7 h-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-dark-300">Submissions</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{userSubmissions.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-dark-600 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 hover:scale-105 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 dark:text-dark-400 hover:text-gray-700 dark:hover:text-dark-200 hover:border-gray-300 dark:hover:border-dark-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <button 
                    onClick={() => handleSubmit('mod')}
                    className="group flex flex-col items-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl hover:from-primary-100 hover:to-primary-200 dark:hover:from-primary-800/30 dark:hover:to-primary-700/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <span className="font-bold text-primary-700 dark:text-primary-300 text-lg">Submit Mod</span>
                    <span className="text-sm text-primary-600 dark:text-primary-400 text-center mt-1">Upload your mod for review</span>
                  </button>

                  <button 
                    onClick={() => handleSubmit('server')}
                    className="group flex flex-col items-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl hover:from-green-100 hover:to-green-200 dark:hover:from-green-800/30 dark:hover:to-green-700/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <span className="font-bold text-green-700 dark:text-green-300 text-lg">Submit Server</span>
                    <span className="text-sm text-green-600 dark:text-green-400 text-center mt-1">Add your server to the list</span>
                  </button>

                  <button className="group flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800/30 dark:hover:to-purple-700/30 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <span className="font-bold text-purple-700 dark:text-purple-300 text-lg">View Analytics</span>
                    <span className="text-sm text-purple-600 dark:text-purple-400 text-center mt-1">Track your performance</span>
                  </button>

                  <button className="group flex flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl hover:from-orange-100 hover:to-orange-200 dark:hover:from-orange-800/30 dark:hover:to-orange-700/30 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Settings className="w-8 h-8 text-white" />
                    </div>
                    <span className="font-bold text-orange-700 dark:text-orange-300 text-lg">Settings</span>
                    <span className="text-sm text-orange-600 dark:text-orange-400 text-center mt-1">Manage your account</span>
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {userMods.slice(0, 3).map((mod) => (
                    <div key={mod.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-dark-600 transition-all duration-300 hover:scale-105">
                      <img src={mod.imageUrl} alt={mod.title} className="w-16 h-16 rounded-2xl object-cover shadow-lg" />
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 dark:text-white text-lg">{mod.title}</p>
                        <p className="text-sm text-gray-500 dark:text-dark-400">Updated {mod.updated}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white text-lg">{formatDownloads(mod.downloads)}</p>
                        <p className="text-sm text-gray-500 dark:text-dark-400">downloads</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">My Submissions</h3>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleSubmit('mod')}
                    className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg font-medium flex items-center space-x-2"
                  >
                    <Package className="w-4 h-4" />
                    <span>Submit Mod</span>
                  </button>
                  <button 
                    onClick={() => handleSubmit('server')}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg font-medium flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Submit Server</span>
                  </button>
                </div>
              </div>

              {userSubmissions.length > 0 ? (
                <div className="space-y-4">
                  {userSubmissions.map((submission) => (
                    <div key={submission.id} className="border border-gray-200 dark:border-dark-600 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                            {submission.type === 'mod' ? <Package className="w-8 h-8 text-white" /> : <Upload className="w-8 h-8 text-white" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg">{submission.title}</h4>
                            <p className="text-gray-600 dark:text-dark-300 mb-2">{submission.description}</p>
                            <p className="text-sm text-gray-500 dark:text-dark-400">
                              Submitted {new Date(submission.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(submission.status)}
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Upload className="w-16 h-16 mx-auto text-gray-400 dark:text-dark-500 mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No submissions yet</h4>
                  <p className="text-gray-500 dark:text-dark-400 mb-6">Submit your first mod or server to get started!</p>
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={() => handleSubmit('mod')}
                      className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                    >
                      Submit Mod
                    </button>
                    <button 
                      onClick={() => handleSubmit('server')}
                      className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                    >
                      Submit Server
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'mods' && (
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">My Mods</h3>
                <button 
                  onClick={() => handleSubmit('mod')}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg font-medium"
                >
                  Upload New Mod
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userMods.map((mod) => (
                  <div key={mod.id} className="border border-gray-200 dark:border-dark-600 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={mod.imageUrl} alt={mod.title} className="w-full h-40 object-cover rounded-2xl mb-4 shadow-lg" />
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{mod.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-dark-300 mb-4">{mod.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-dark-400">{formatDownloads(mod.downloads)} downloads</span>
                      <span className="text-yellow-500 flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        {mod.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Favorite Mods</h3>
              <div className="text-center py-12">
                <Heart className="w-16 h-16 mx-auto text-gray-400 dark:text-dark-500 mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No favorites yet</h4>
                <p className="text-gray-500 dark:text-dark-400">Start exploring mods and add them to your favorites!</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">Username</label>
                  <input
                    type="text"
                    value={user?.username}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">Email</label>
                  <input
                    type="email"
                    value={user?.email}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                    readOnly
                  />
                </div>
                <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <SubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        type={submissionType}
      />
    </div>
  );
}