export interface Mod {
  id: string;
  title: string;
  description: string;
  author: string;
  downloads: number;
  updated: string;
  version: string;
  category: string;
  tags: string[];
  imageUrl: string;
  featured?: boolean;
  rating: number;
  gameVersions: string[];
  longDescription?: string;
  screenshots?: string[];
  dependencies?: string[];
  changelog?: string;
  license?: string;
  sourceUrl?: string;
  issuesUrl?: string;
  wikiUrl?: string;
  status?: 'pending' | 'approved' | 'rejected';
  submittedAt?: string;
  submittedBy?: string;
}

export interface Server {
  id: string;
  name: string;
  description: string;
  ip: string;
  port: number;
  version: string;
  players: {
    online: number;
    max: number;
  };
  type: string;
  tags: string[];
  imageUrl: string;
  featured?: boolean;
  rating: number;
  uptime: number;
  country: string;
  website?: string;
  discord?: string;
  status?: 'pending' | 'approved' | 'rejected';
  submittedAt?: string;
  submittedBy?: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  joinDate: string;
  modCount: number;
  role?: 'user' | 'admin';
  email?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  description?: string;
}

export interface SearchFilters {
  query: string;
  category: string | null;
  sortBy: string;
  timeRange: string;
  gameVersion: string | null;
  modLoader: string | null;
}

export interface Submission {
  id: string;
  type: 'mod' | 'server';
  title: string;
  description: string;
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  data: Mod | Server;
}