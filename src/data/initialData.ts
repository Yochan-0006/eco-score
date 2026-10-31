import { UserProfile, LoggedAction, LeaderboardUser } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alex Rivers',
  handle: '@arivers',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  dailyGoalPoints: 100,
  streakDays: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  ecoLevel: 'Eco Explorer (Level 2)',
  streakFreezeCount: 2,
  bio: 'Urban commuter, plant-based foodie, and green living enthusiast.',
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
    actionId: 'bicycle',
    title: 'Bicycle',
    category: 'transport',
    quantity: 1,
    unit: 'trip',
    pointsEarned: 25,
    co2SavedKg: 1.2,
    waterSavedL: 0,
    wasteSavedKg: 0,
    timestamp: getPastDate(0, 2),
    note: 'Cycled along river greenway instead of driving.'
  },
  {
    id: 'log-02',
    actionId: 'vegan-meal',
    title: 'Vegan Meal',
    category: 'food',
    quantity: 1,
    unit: 'meal',
    pointsEarned: 25,
    co2SavedKg: 1.8,
    waterSavedL: 900,
    wasteSavedKg: 0.1,
    timestamp: getPastDate(0, 4),
    note: 'Roasted chickpea and grain bowl.'
  },
  {
    id: 'log-03',
    actionId: 'turned-off-lights',
    title: 'Turned Off Unused Lights',
    category: 'energy',
    quantity: 1,
    unit: 'room',
    pointsEarned: 10,
    co2SavedKg: 0.4,
    waterSavedL: 0,
    wasteSavedKg: 0,
    timestamp: getPastDate(1, 8),
    note: 'Switched off ambient fixtures in home studio.'
  },
  {
    id: 'log-04',
    actionId: 'recycled',
    title: 'Recycled',
    category: 'waste',
    quantity: 1,
    unit: 'bin',
    pointsEarned: 12,
    co2SavedKg: 0.7,
    waterSavedL: 0,
    wasteSavedKg: 1.2,
    timestamp: getPastDate(1, 14),
    note: 'Sorted aluminum cans and cardboards.'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'lead-ananya',
    name: 'Ananya',
    initials: 'AN',
    points: 235,
    streak: 18,
    rank: 1,
    level: 'Planet Hero',
    badge: 'Diamond Champion'
  },
  {
    id: 'lead-rahul',
    name: 'Rahul',
    initials: 'RA',
    points: 198,
    streak: 12,
    rank: 2,
    level: 'Planet Hero',
    badge: 'Emerald Guardian'
  },
  {
    id: 'lead-priya',
    name: 'Priya',
    initials: 'PR',
    points: 187, // 187 - 72 (user's initial points) = exactly 115 pts away!
    streak: 10,
    rank: 3,
    level: 'Planet Hero',
    badge: 'Emerald Guardian'
  },
  {
    id: 'lead-swathi',
    name: 'Swathi',
    initials: 'SW',
    points: 68,
    streak: 6,
    rank: 5,
    level: 'Green Champion',
    badge: 'Gold Defender'
  },
  {
    id: 'lead-arjun',
    name: 'Arjun',
    initials: 'AR',
    points: 52,
    streak: 5,
    rank: 6,
    level: 'Eco Explorer',
    badge: 'Silver Sprout'
  },
  {
    id: 'lead-kiran',
    name: 'Kiran',
    initials: 'KI',
    points: 44,
    streak: 4,
    rank: 7,
    level: 'Eco Explorer',
    badge: 'Silver Sprout'
  },
  {
    id: 'lead-meera',
    name: 'Meera',
    initials: 'ME',
    points: 22,
    streak: 2,
    rank: 8,
    level: 'Getting Started',
    badge: 'Sprout Starter'
  }
];
