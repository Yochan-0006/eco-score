import { UserProfile, LoggedAction, LeaderboardUser } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alex Rivers',
  handle: '@arivers',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  dailyGoalPoints: 100,
  streakDays: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  ecoLevel: 'Canopy Guardian (Tier 3)',
  streakFreezeCount: 2,
  bio: 'Urban cyclist, plant-based foodie, and solar enthusiast striving for net-zero living.',
  joinedDate: 'October 2026'
};

// Generate realistic timestamps for recent logs
const now = new Date();
const getPastDate = (daysAgo: number, hoursAgo: number = 2) => {
  const d = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000));
  return d.toISOString();
};

export const INITIAL_LOGGED_ACTIONS: LoggedAction[] = [
  {
    id: 'log-01',
    actionId: 'bike-commute',
    title: 'Bicycle or E-Bike Commute',
    category: 'commute',
    quantity: 8,
    unit: 'km',
    pointsEarned: 40,
    co2SavedKg: 1.52,
    waterSavedL: 0,
    wasteSavedKg: 0,
    timestamp: getPastDate(0, 2),
    note: 'Cycled to the downtown studio along the river greenway.'
  },
  {
    id: 'log-02',
    actionId: 'plant-based-meal',
    title: 'Plant-Based Meal',
    category: 'food',
    quantity: 1,
    unit: 'meal',
    pointsEarned: 20,
    co2SavedKg: 1.6,
    waterSavedL: 780,
    wasteSavedKg: 0.1,
    timestamp: getPastDate(0, 4),
    note: 'Mediterranean lentil bowl with roasted veggies.'
  },
  {
    id: 'log-03',
    actionId: 'reusable-cup',
    title: 'Reusable Coffee / Beverage Mug',
    category: 'food',
    quantity: 1,
    unit: 'cup',
    pointsEarned: 10,
    co2SavedKg: 0.12,
    waterSavedL: 4,
    wasteSavedKg: 0.02,
    timestamp: getPastDate(0, 6),
    note: 'Used ceramic keeper cup at morning café.'
  },
  {
    id: 'log-04',
    actionId: 'line-dry-clothes',
    title: 'Air Dry / Line Dry Clothes',
    category: 'energy',
    quantity: 1,
    unit: 'load',
    pointsEarned: 25,
    co2SavedKg: 1.8,
    waterSavedL: 0,
    wasteSavedKg: 0,
    timestamp: getPastDate(1, 10),
    note: 'Breezy afternoon air dry on balcony rack.'
  },
  {
    id: 'log-05',
    actionId: 'composting-organic',
    title: 'Composted Organic Waste',
    category: 'waste',
    quantity: 2,
    unit: 'kg',
    pointsEarned: 26,
    co2SavedKg: 1.8,
    waterSavedL: 0,
    wasteSavedKg: 2.0,
    timestamp: getPastDate(1, 14),
    note: 'Emptied kitchen countertop compost bin into garden tumbler.'
  },
  {
    id: 'log-06',
    actionId: 'public-transit',
    title: 'Public Transit (Bus / Train / Metro)',
    category: 'commute',
    quantity: 14,
    unit: 'km',
    pointsEarned: 21,
    co2SavedKg: 1.54,
    waterSavedL: 0,
    wasteSavedKg: 0,
    timestamp: getPastDate(2, 8),
    note: 'Metro commute across the bay.'
  },
  {
    id: 'log-07',
    actionId: 'plant-based-meal',
    title: 'Plant-Based Meal',
    category: 'food',
    quantity: 2,
    unit: 'meal',
    pointsEarned: 40,
    co2SavedKg: 3.2,
    waterSavedL: 1560,
    wasteSavedKg: 0.2,
    timestamp: getPastDate(2, 19),
    note: 'Tofu stir fry with brown rice and greens.'
  },
  {
    id: 'log-08',
    actionId: 'short-shower',
    title: 'Speed Shower (< 5 mins)',
    category: 'water',
    quantity: 1,
    unit: 'session',
    pointsEarned: 15,
    co2SavedKg: 0.4,
    waterSavedL: 45,
    wasteSavedKg: 0,
    timestamp: getPastDate(3, 7)
  },
  {
    id: 'log-09',
    actionId: 'thrift-secondhand',
    title: 'Thrift / Buy Secondhand Item',
    category: 'waste',
    quantity: 1,
    unit: 'item',
    pointsEarned: 35,
    co2SavedKg: 5.5,
    waterSavedL: 2500,
    wasteSavedKg: 0.4,
    timestamp: getPastDate(3, 15),
    note: 'Found wool overcoat at local charity shop.'
  },
  {
    id: 'log-10',
    actionId: 'unplug-standby',
    title: 'Kill Vampire Power (Standby)',
    category: 'energy',
    quantity: 2,
    unit: 'room',
    pointsEarned: 20,
    co2SavedKg: 0.7,
    waterSavedL: 0,
    wasteSavedKg: 0,
    timestamp: getPastDate(4, 22),
    note: 'Switched off home office and TV power strips before bed.'
  },
  {
    id: 'log-11',
    actionId: 'tree-planted',
    title: 'Planted a Tree or Shrub',
    category: 'community',
    quantity: 1,
    unit: 'tree',
    pointsEarned: 60,
    co2SavedKg: 22.0,
    waterSavedL: 0,
    wasteSavedKg: 0,
    timestamp: getPastDate(5, 11),
    note: 'Weekend neighborhood orchard planting initiative.'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'lead-1',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    points: 1240,
    co2SavedKg: 78.4,
    streak: 24,
    rank: 1,
    badge: 'Diamond Earthkeeper',
    team: 'GreenTech Alliance',
    countryCode: 'SE',
    recentActionTitle: '18 km Bike Commute'
  },
  {
    id: 'lead-2',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    points: 1080,
    co2SavedKg: 64.2,
    streak: 18,
    rank: 2,
    badge: 'Emerald Vanguard',
    team: 'Solaris Co-op',
    countryCode: 'NL',
    recentActionTitle: 'Solar Panel Grid Feed-in'
  },
  {
    id: 'lead-3',
    name: 'Sophia Chen',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    points: 920,
    co2SavedKg: 52.8,
    streak: 14,
    rank: 3,
    badge: 'Emerald Vanguard',
    team: 'Zero Waste Collective',
    countryCode: 'CA',
    recentActionTitle: 'Zero-Waste Bulk Grocery Run'
  },
  {
    id: 'current-user',
    name: 'Alex Rivers',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    points: 622, // Dynamically recomputed from logged actions
    co2SavedKg: 40.2, // Dynamically recomputed
    streak: 5,
    rank: 4,
    badge: 'Canopy Guardian',
    isCurrentUser: true,
    team: 'Urban Climbers',
    countryCode: 'US',
    recentActionTitle: 'Bicycle Commute'
  },
  {
    id: 'lead-5',
    name: 'Liam O’Connor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    points: 580,
    co2SavedKg: 36.1,
    streak: 7,
    rank: 5,
    badge: 'Gold Canopy',
    team: 'Atlantic Clean Wave',
    countryCode: 'IE',
    recentActionTitle: 'Beach Plastic Cleanup'
  },
  {
    id: 'lead-6',
    name: 'Amina Diallo',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=250&q=80',
    points: 510,
    co2SavedKg: 31.9,
    streak: 9,
    rank: 6,
    badge: 'Gold Canopy',
    team: 'GreenTech Alliance',
    countryCode: 'FR',
    recentActionTitle: 'Cold Wash & Line Dry'
  },
  {
    id: 'lead-7',
    name: 'Hiroshi Tanaka',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80',
    points: 465,
    co2SavedKg: 28.5,
    streak: 4,
    rank: 7,
    badge: 'Silver Seedling',
    team: 'Tokyo Metro Riders',
    countryCode: 'JP',
    recentActionTitle: 'Public Transit Metro'
  },
  {
    id: 'lead-8',
    name: 'Beatriz Santos',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=250&q=80',
    points: 410,
    co2SavedKg: 24.3,
    streak: 6,
    rank: 8,
    badge: 'Silver Seedling',
    team: 'Urban Climbers',
    countryCode: 'BR',
    recentActionTitle: 'Organic Composting'
  }
];
