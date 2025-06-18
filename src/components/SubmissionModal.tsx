import React, { useState } from 'react';
import { X, Upload, Package, Server, Image, Tag, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubmissions } from '../contexts/SubmissionContext';
import { Mod, Server as ServerType } from '../types';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'mod' | 'server';
}

export default function SubmissionModal({ isOpen, onClose, type }: SubmissionModalProps) {
  const { user } = useAuth();
  const { addSubmission } = useSubmissions();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    tags: '',
    category: 'technology',
    version: '',
    gameVersions: '1.20.1',
    // Server specific
    ip: '',
    port: 25565,
    serverType: 'Survival',
    country: 'US',
    maxPlayers: 100,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'mod') {
      const modData: Mod = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        author: user?.username || 'Unknown',
        downloads: 0,
        updated: new Date().toISOString(),
        version: formData.version,
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        imageUrl: formData.imageUrl || 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
        rating: 0,
        gameVersions: formData.gameVersions.split(',').map(v => v.trim()),
        status: 'pending',
        submittedBy: user?.username || 'Unknown',
        submittedAt: new Date().toISOString(),
      };

      addSubmission({
        type: 'mod',
        title: formData.title,
        description: formData.description,
        submittedBy: user?.username || 'Unknown',
        status: 'pending',
        data: modData,
      });
    } else {
      const serverData: ServerType = {
        id: Date.now().toString(),
        name: formData.title,
        description: formData.description,
        ip: formData.ip,
        port: formData.port,
        version: formData.gameVersions,
        players: { online: 0, max: formData.maxPlayers },
        type: formData.serverType,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        imageUrl: formData.imageUrl || 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
        rating: 0,
        uptime: 99.9,
        country: formData.country,
        status: 'pending',
        submittedBy: user?.username || 'Unknown',
        submittedAt: new Date().toISOString(),
      };

      addSubmission({
        type: 'server',
        title: formData.title,
        description: formData.description,
        submittedBy: user?.username || 'Unknown',
        status: 'pending',
        data: serverData,
      });
    }

    onClose();
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      tags: '',
      category: 'technology',
      version: '',
      gameVersions: '1.20.1',
      ip: '',
      port: 25565,
      serverType: 'Survival',
      country: 'US',
      maxPlayers: 100,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-600">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              {type === 'mod' ? <Package className="w-5 h-5 text-white" /> : <Server className="w-5 h-5 text-white" />}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Submit {type === 'mod' ? 'Mod' : 'Server'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-xl transition-all duration-200 hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                {type === 'mod' ? 'Mod' : 'Server'} Name *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                placeholder={`Enter ${type} name`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                <Image className="w-4 h-4 inline mr-1" />
                Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
              placeholder={`Describe your ${type}...`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                placeholder="survival, adventure, magic"
              />
            </div>

            {type === 'mod' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                >
                  <option value="technology">Technology</option>
                  <option value="adventure">Adventure</option>
                  <option value="magic">Magic</option>
                  <option value="decoration">Decoration</option>
                  <option value="utility">Utility</option>
                  <option value="storage">Storage</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                  Server Type
                </label>
                <select
                  value={formData.serverType}
                  onChange={(e) => setFormData({ ...formData, serverType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                >
                  <option value="Survival">Survival</option>
                  <option value="Creative">Creative</option>
                  <option value="Minigames">Minigames</option>
                  <option value="PvP">PvP</option>
                  <option value="Roleplay">Roleplay</option>
                </select>
              </div>
            )}
          </div>

          {type === 'mod' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                  Version *
                </label>
                <input
                  type="text"
                  required
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                  placeholder="1.0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                  Game Versions
                </label>
                <input
                  type="text"
                  value={formData.gameVersions}
                  onChange={(e) => setFormData({ ...formData, gameVersions: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                  placeholder="1.20.1, 1.19.2"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Server IP *
                </label>
                <input
                  type="text"
                  required
                  value={formData.ip}
                  onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                  placeholder="play.example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                  Port
                </label>
                <input
                  type="number"
                  value={formData.port}
                  onChange={(e) => setFormData({ ...formData, port: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                  placeholder="25565"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                  Max Players
                </label>
                <input
                  type="number"
                  value={formData.maxPlayers}
                  onChange={(e) => setFormData({ ...formData, maxPlayers: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                  placeholder="100"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-dark-600">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 dark:text-dark-200 bg-gray-100 dark:bg-dark-700 rounded-xl hover:bg-gray-200 dark:hover:bg-dark-600 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-medium transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Submit for Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}