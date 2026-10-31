export type ActionCategory = 
  | 'transport'
  | 'commute' 
  | 'food' 
  | 'energy' 
  | 'waste' 
  | 'water' 
  | 'community';

export interface EcoActionDefinition {
  id: string;
  title: string;
  category: ActionCategory;
  basePoints: number;
  unit: string;
  defaultQuantity: number;
  co2PerUnit: number;     // in kg CO2e
  waterPerUnit: number;   // in Liters
  wastePerUnit: number;   // in kg
  icon: string;
  description: string;
  impactFact: string;
  isCustom?: boolean;
}

export interface LoggedAction {
  id: string;
  actionId: string;
  title: string;
  category: ActionCategory;
  quantity: number;
  unit: string;
  pointsEarned: number;
  co2SavedKg: number;
  waterSavedL: number;
  wasteSavedKg: number;
  timestamp: string; // ISO string
  note?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ActionCategory | 'all';
  type: 'daily' | 'weekly' | 'monthly';
  targetCount: number;
  unitLabel: string;
  rewardPoints: number;
  actionMatch?: string[]; // IDs or category matched
  status: 'available' | 'active' | 'completed' | 'claimed';
  currentCount: number;
  expiresInDays: number;
  badgeIcon: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'emerald';
  category: 'streak' | 'points' | 'commute' | 'food' | 'energy' | 'waste' | 'special';
  unlockedAt?: string | null;
  progress: number; // 0 to 100
  conditionText: string;
  isUnlocked: boolean;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  points: number;
  co2SavedKg?: number;
  streak?: number;
  rank: number;
  level: string;
  badge?: string;
  isCurrentUser?: boolean;
  team?: string;
  countryCode?: string;
  recentActionTitle?: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  dailyGoalPoints: number;
  streakDays: number;
  lastActiveDate: string;
  ecoLevel: string;
  streakFreezeCount: number;
  bio: string;
  joinedDate: string;
}

export type NavigationTab = 
  | 'landing' 
  | 'dashboard' 
  | 'log' 
  | 'challenges' 
  | 'leaderboard' 
  | 'achievements' 
  | 'analytics';
