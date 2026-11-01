import { UserProfile, LoggedAction, LeaderboardUser } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'New Eco Champion',
  handle: '@newuser',
  avatar: '', 
  dailyGoalPoints: 100,
  streakDays: 0,
  lastActiveDate: '',
  ecoLevel: 'Getting Started',
  streakFreezeCount: 0,
  bio: '',
  joinedDate: ''
};

export const INITIAL_LOGGED_ACTIONS: LoggedAction[] = [];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [];
