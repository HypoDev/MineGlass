import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, Download, Bell, Menu, X, Moon, Sun, LogOut, Settings, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export default function Header({ onSearch, searchQuery = '' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mock suggestions - replace with your actual API calls
  useEffect(() => {
    if (localSearchQuery.trim() && showSuggestions) {
      const mockSuggestions = [
        `"${localSearchQuery}" in mods`,
        `"${localSearchQuery}" in servers`,
        `"${localSearchQuery}" in plugins`,
        `Create "${localSearchQuery}"`
      ];
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [localSearchQuery, showSuggestions]);

  const handleSearch = (query: string) => {
    setLocalSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
    // Don't navigate here - we'll handle it on form submit or suggestion click
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(localSearchQuery)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocalSearchQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <Download className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
                MineGalss
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 dark:text-dark-400" />
              </div>
              <input
                type="text"
                value={localSearchQuery}
                onChange={(e) => {
                  handleSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search for mods, servers, and more..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-dark-600 rounded-full leading-5 bg-white dark:bg-dark-800 placeholder-gray-500 dark:placeholder-dark-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
              
              {/* Suggestions dropdown */}
              {showSuggestions && localSearchQuery && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-600 overflow-hidden animate-fade-in">
                  <div className="py-1">
                    {suggestions.length > 0 ? (
                      suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-200"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <div className="flex items-center">
                            <Search className="w-4 h-4 mr-2 text-gray-400 dark:text-dark-400" />
                            {suggestion}
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500 dark:text-dark-400">
                        No results found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Rest of your header code remains the same */}
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <Link 
                to="/mods" 
                className={`font-medium transition-all duration-200 hover:scale-105 ${
                  location.pathname === '/mods' 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                Mods
              </Link>
              <Link 
                to="/servers" 
                className={`font-medium transition-all duration-200 hover:scale-105 ${
                  location.pathname === '/servers' 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                Servers
              </Link>
              <Link 
                to="/about" 
                className={`font-medium transition-all duration-200 hover:scale-105 ${
                  location.pathname === '/about' 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                About
              </Link>
            </nav>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-all duration-200 hover:scale-110"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-all duration-200"
                  >
                    <img 
                      src={user?.avatar} 
                      alt={user?.username}
                      className="w-8 h-8 rounded-full border-2 border-primary-500"
                    />
                    <span className="text-gray-900 dark:text-white font-medium">{user?.username}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-600 animate-slide-down">
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-200"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Shield className="w-4 h-4 mr-2" />
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-200"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-all duration-200 font-medium transform hover:scale-105 hover:shadow-lg"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-800 transition-all duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-dark-700">
              <div className="px-2 pb-2">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 dark:text-dark-400" />
                  </div>
                  <input
                    type="text"
                    value={localSearchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-dark-600 rounded-full leading-5 bg-white dark:bg-dark-800 placeholder-gray-500 dark:placeholder-dark-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </form>
              </div>
              <Link 
                to="/mods" 
                className="block px-3 py-2 text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Mods
              </Link>
              <Link 
                to="/servers" 
                className="block px-3 py-2 text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Servers
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-gray-600 dark:text-dark-300 font-medium">Dark Mode</span>
                <button 
                  onClick={toggleTheme}
                  className="p-1 text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="w-full mt-3 flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-all duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}