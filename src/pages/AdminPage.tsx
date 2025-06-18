import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSubmissions } from '../contexts/SubmissionContext';
import { Navigate } from 'react-router-dom';
import { 
  Users, 
  Package, 
  BarChart3, 
  Settings, 
  Shield, 
  Upload, 
  Edit, 
  Trash2, 
  Eye,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Download,
  Server
} from 'lucide-react';
import { allMods, servers } from '../data/mockData';

export default function AdminPage() {
  const { isAdmin } = useAuth();
  const { submissions, approveSubmission, rejectSubmission, getPendingSubmissions } = useSubmissions();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const pendingSubmissions = getPendingSubmissions();
  const totalSubmissions = submissions.length;
  const approvedSubmissions = submissions.filter(sub => sub.status === 'approved').length;
  const rejectedSubmissions = submissions.filter(sub => sub.status === 'rejected').length;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'submissions', name: 'Submissions', icon: Upload, badge: pendingSubmissions.length },
    { id: 'mods', name: 'Manage Mods', icon: Package },
    { id: 'servers', name: 'Manage Servers', icon: Server },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000000) {
      return `${(downloads / 1000000).toFixed(1)}M`;
    } else if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(1)}K`;
    }
    return downloads.toString();
  };

  const totalDownloads = allMods.reduce((sum, mod) => sum + mod.downloads, 0);
  const totalUsers = 15420;
  const totalServers = servers.length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-dark-300 text-lg">Manage your platform and monitor performance</p>
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
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{allMods.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-dark-300">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Server className="w-7 h-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-dark-300">Total Servers</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalServers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Upload className="w-7 h-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-dark-300">Pending Reviews</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{pendingSubmissions.length}</p>
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
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 hover:scale-105 relative ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 dark:text-dark-400 hover:text-gray-700 dark:hover:text-dark-200 hover:border-gray-300 dark:hover:border-dark-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                  {tab.badge && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
                  <div className="space-y-4">
                    <button className="w-full flex items-center space-x-4 p-4 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl hover:from-primary-100 hover:to-primary-200 dark:hover:from-primary-800/30 dark:hover:to-primary-700/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-bold text-primary-700 dark:text-primary-300 block">Create New Mod</span>
                        <span className="text-sm text-primary-600 dark:text-primary-400">Add a new mod to the platform</span>
                      </div>
                    </button>
                    <button className="w-full flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl hover:from-green-100 hover:to-green-200 dark:hover:from-green-800/30 dark:hover:to-green-700/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                        <Upload className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-bold text-green-700 dark:text-green-300 block">Review Submissions</span>
                        <span className="text-sm text-green-600 dark:text-green-400">{pendingSubmissions.length} pending reviews</span>
                      </div>
                    </button>
                    <button className="w-full flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800/30 dark:hover:to-purple-700/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-bold text-purple-700 dark:text-purple-300 block">View Analytics</span>
                        <span className="text-sm text-purple-600 dark:text-purple-400">Platform performance metrics</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Submission Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                        <span className="font-medium text-gray-700 dark:text-dark-200">Pending</span>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white text-xl">{pendingSubmissions.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-gray-700 dark:text-dark-200">Approved</span>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white text-xl">{approvedSubmissions}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="font-medium text-gray-700 dark:text-dark-200">Rejected</span>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white text-xl">{rejectedSubmissions}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Review Submissions</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500 dark:text-dark-400">
                    {pendingSubmissions.length} pending reviews
                  </span>
                </div>
              </div>

              {pendingSubmissions.length > 0 ? (
                <div className="space-y-6">
                  {pendingSubmissions.map((submission) => (
                    <div key={submission.id} className="border border-gray-200 dark:border-dark-600 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-6">
                          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                            {submission.type === 'mod' ? <Package className="w-10 h-10 text-white" /> : <Server className="w-10 h-10 text-white" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-bold text-gray-900 dark:text-white text-xl">{submission.title}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                submission.type === 'mod' 
                                  ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200'
                                  : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                              }`}>
                                {submission.type.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-dark-300 mb-3 text-lg">{submission.description}</p>
                            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-dark-400">
                              <span>By {submission.submittedBy}</span>
                              <span>Submitted {new Date(submission.submittedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => approveSubmission(submission.id)}
                            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg font-medium"
                          >
                            <CheckCircle className="w-5 h-5" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => rejectSubmission(submission.id)}
                            className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg font-medium"
                          >
                            <XCircle className="w-5 h-5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Upload className="w-20 h-20 mx-auto text-gray-400 dark:text-dark-500 mb-6" />
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No pending submissions</h4>
                  <p className="text-gray-500 dark:text-dark-400 text-lg">All submissions have been reviewed!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'mods' && (
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Mods</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-dark-400" />
                    <input
                      type="text"
                      placeholder="Search mods..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                    />
                  </div>
                  <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2 font-medium">
                    <Plus className="w-5 h-5" />
                    <span>Add Mod</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-dark-600">
                      <th className="text-left py-4 px-6 font-bold text-gray-700 dark:text-dark-200">Mod</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 dark:text-dark-200">Author</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 dark:text-dark-200">Downloads</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 dark:text-dark-200">Rating</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 dark:text-dark-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allMods.filter(mod => 
                      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      mod.author.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((mod) => (
                      <tr key={mod.id} className="border-b border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700 transition-all duration-200">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-4">
                            <img src={mod.imageUrl} alt={mod.title} className="w-12 h-12 rounded-xl object-cover shadow-lg" />
                            <div>
                              <p className="font-bold text-gray-900 dark:text-white">{mod.title}</p>
                              <p className="text-sm text-gray-500 dark:text-dark-400">{mod.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-700 dark:text-dark-200 font-medium">{mod.author}</td>
                        <td className="py-4 px-6 text-gray-700 dark:text-dark-200 font-medium">{formatDownloads(mod.downloads)}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-gray-700 dark:text-dark-200 font-medium">{mod.rating}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all duration-200 hover:scale-110">
                              <Eye className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-500 dark:text-dark-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 hover:scale-110">
                              <Edit className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-500 dark:text-dark-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 hover:scale-110">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'servers' && (
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Servers</h3>
                <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2 font-medium">
                  <Plus className="w-5 h-5" />
                  <span>Add Server</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servers.map((server) => (
                  <div key={server.id} className="border border-gray-200 dark:border-dark-600 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={server.imageUrl} alt={server.name} className="w-full h-40 object-cover rounded-xl mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{server.name}</h4>
                    <p className="text-gray-600 dark:text-dark-300 mb-4">{server.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500 dark:text-dark-400" />
                        <span className="text-gray-600 dark:text-dark-300">{server.players.online}/{server.players.max}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${server.uptime >= 90 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <span className="text-gray-600 dark:text-dark-300">{server.uptime}% uptime</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-medium">
                        Edit Server
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">User Management</h3>
              <div className="text-center py-16">
                <Users className="w-24 h-24 mx-auto text-gray-400 dark:text-dark-500 mb-6" />
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">User management coming soon</h4>
                <p className="text-gray-500 dark:text-dark-400 text-lg">Advanced user management features will be available in the next update.</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Platform Settings</h3>
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">Platform Name</label>
                  <input
                    type="text"
                    defaultValue="MineGalss"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">Maximum Upload Size (MB)</label>
                  <input
                    type="number"
                    defaultValue="100"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="maintenance"
                    className="w-5 h-5 border-2 border-gray-300 dark:border-dark-600 rounded text-primary-600 focus:ring-primary-500 transition-colors duration-200"
                  />
                  <label htmlFor="maintenance" className="text-sm font-medium text-gray-700 dark:text-dark-200">
                    Enable maintenance mode
                  </label>
                </div>
                <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}