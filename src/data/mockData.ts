import { Mod, Server, Category } from '../types';

export const categories: Category[] = [
  { id: 'technology', name: 'Technology', icon: 'Cpu', count: 1420, description: 'Tech mods and automation' },
  { id: 'adventure', name: 'Adventure', icon: 'Map', count: 980, description: 'Adventure and exploration mods' },
  { id: 'magic', name: 'Magic', icon: 'Sparkles', count: 756, description: 'Magic and mystical mods' },
  { id: 'decoration', name: 'Decoration', icon: 'Palette', count: 623, description: 'Decorative blocks and items' },
  { id: 'utility', name: 'Utility', icon: 'Tool', count: 892, description: 'Utility and helper mods' },
  { id: 'storage', name: 'Storage', icon: 'Package', count: 445, description: 'Storage and organization' },
  { id: 'transportation', name: 'Transportation', icon: 'Car', count: 334, description: 'Transportation mods' },
  { id: 'food', name: 'Food', icon: 'Apple', count: 267, description: 'Food and cooking mods' }
];

export const featuredMods: Mod[] = [
  {
    id: '1',
    title: 'Create',
    description: 'Building Tools and Aesthetic Technology',
    longDescription: 'Create is a mod that focuses on building tools and aesthetic technology. It adds many mechanical components and block variants to the game. This mod is perfect for players who love automation and building complex contraptions.',
    author: 'simibubi',
    downloads: 12500000,
    updated: '2024-01-15',
    version: '0.5.1',
    category: 'technology',
    tags: ['machinery', 'building', 'automation'],
    imageUrl: 'https://images.pexels.com/photos/159306/gears-cogs-machine-machinery-159306.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    rating: 4.9,
    gameVersions: ['1.20.1', '1.19.2', '1.18.2'],
    screenshots: [
      'https://images.pexels.com/photos/159306/gears-cogs-machine-machinery-159306.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dependencies: ['Forge'],
    changelog: 'Fixed major bugs and added new mechanical components',
    license: 'MIT',
    sourceUrl: 'https://github.com/Creators-of-Create/Create',
    issuesUrl: 'https://github.com/Creators-of-Create/Create/issues'
  },
  {
    id: '2',
    title: 'JEI (Just Enough Items)',
    description: 'Item and recipe viewing mod for Minecraft',
    longDescription: 'JEI is an item and recipe viewing mod for Minecraft, built from the ground up for stability and performance. It provides a clean interface for viewing recipes and items in your game.',
    author: 'mezz',
    downloads: 45600000,
    updated: '2024-01-20',
    version: '15.2.0.27',
    category: 'utility',
    tags: ['recipes', 'items', 'gui'],
    imageUrl: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    rating: 4.8,
    gameVersions: ['1.20.1', '1.19.2'],
    screenshots: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dependencies: ['Forge', 'Fabric'],
    changelog: 'Updated for latest Minecraft version',
    license: 'MIT'
  },
  {
    id: '3',
    title: 'Biomes O\' Plenty',
    description: 'Adds over 80 unique biomes to enhance your world',
    longDescription: 'Biomes O\' Plenty is an expansive biome mod for Minecraft that adds a diverse assortment of over 80 unique biomes to the Overworld and Nether! From mystical forests to volcanic wastelands, this mod transforms your world generation experience.',
    author: 'Forstride',
    downloads: 28900000,
    updated: '2024-01-18',
    version: '18.0.0.592',
    category: 'adventure',
    tags: ['biomes', 'world-gen', 'exploration'],
    imageUrl: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    rating: 4.7,
    gameVersions: ['1.20.1', '1.19.2', '1.18.2'],
    screenshots: [
      'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/268941/pexels-photo-268941.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dependencies: ['Forge'],
    changelog: 'Added new biomes and fixed generation issues',
    license: 'Creative Commons'
  }
];

export const servers: Server[] = [
  {
    id: '1',
    name: 'Hypixel',
    description: 'The largest Minecraft server with unique games and experiences',
    ip: 'mc.hypixel.net',
    port: 25565,
    version: '1.8-1.20',
    players: { online: 45000, max: 100000 },
    type: 'Minigames',
    tags: ['minigames', 'skyblock', 'bedwars'],
    imageUrl: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    rating: 4.9,
    uptime: 99.9,
    country: 'US',
    website: 'https://hypixel.net',
    discord: 'https://discord.gg/hypixel'
  },
  {
    id: '2',
    name: 'Mineplex',
    description: 'Family-friendly server with amazing minigames',
    ip: 'us.mineplex.com',
    port: 25565,
    version: '1.8-1.19',
    players: { online: 2500, max: 10000 },
    type: 'Minigames',
    tags: ['family-friendly', 'minigames', 'survival'],
    imageUrl: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    rating: 4.6,
    uptime: 98.5,
    country: 'US',
    website: 'https://mineplex.com'
  }
];

export const allMods: Mod[] = [
  ...featuredMods,
  {
    id: '4',
    title: 'Applied Energistics 2',
    description: 'Revolutionary storage and automation system',
    longDescription: 'Applied Energistics 2 is a mod that focuses on storage compactness and ease of use. It revolutionizes storage by introducing a network-based digital storage system.',
    author: 'AlgorithmX2',
    downloads: 18700000,
    updated: '2024-01-12',
    version: '12.9.5',
    category: 'technology',
    tags: ['storage', 'automation', 'tech'],
    imageUrl: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    gameVersions: ['1.20.1', '1.19.2'],
    screenshots: [
      'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dependencies: ['Forge'],
    license: 'LGPL'
  },
  {
    id: '5',
    title: 'Botania',
    description: 'Tech mod themed around natural magic',
    longDescription: 'Botania is a tech mod themed around natural magic. The mod focuses on automation without being overpowered, and provides a unique magical experience.',
    author: 'Vazkii',
    downloads: 22100000,
    updated: '2024-01-16',
    version: '446',
    category: 'magic',
    tags: ['magic', 'flowers', 'mana'],
    imageUrl: 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    gameVersions: ['1.20.1', '1.19.2', '1.18.2'],
    screenshots: [
      'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=800'
    ],
    dependencies: ['Forge', 'Fabric'],
    license: 'CC BY-NC-SA'
  }
];