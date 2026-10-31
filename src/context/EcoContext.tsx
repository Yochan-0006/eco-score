import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  UserProfile, 
  LoggedAction, 
  EcoActionDefinition, 
  Challenge, 
  Achievement, 
  LeaderboardUser,
  ActionCategory
} from '../types';
import { PRESET_ACTIONS } from '../data/presetActions';
import { INITIAL_CHALLENGES } from '../data/presetChallenges';
import { INITIAL_ACHIEVEMENTS } from '../data/presetAchievements';
import { 
  INITIAL_USER_PROFILE, 
  INITIAL_LOGGED_ACTIONS, 
  INITIAL_LEADERBOARD 
} from '../data/initialData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'award';
  title: string;
  message: string;
  points?: number;
}

interface EcoContextType {
  user: UserProfile;
  loggedActions: LoggedAction[];
  challenges: Challenge[];
  achievements: Achievement[];
  customActions: EcoActionDefinition[];
  allActions: EcoActionDefinition[];
  leaderboard: LeaderboardUser[];
  userRank: number;
  
  // Aggregate Metrics
  totalPoints: number;
  todayPoints: number;
  todayLogsCount: number;
  todayGoalPercent: number;
  totalCo2SavedKg: number;
  totalWaterSavedL: number;
  totalWasteSavedKg: number;
  treesEquivalent: number;
  carMilesAvoided: number;
  smartphoneChargesSaved: number;
  weeklyEcoPoints: number;
  totalActionsCount: number;
  levelInfo: {
    currentLevel: string;
    levelNumber: number;
    currentMin: number;
    nextMax: number;
    progressPercent: number;
    pointsToNext: number;
    encouragingMessage: string;
  };
  unlockedAchievementModal: Achievement | null;
  dismissAchievementModal: () => void;

  // Actions
  logAction: (actionId: string, quantity: number, note?: string) => {
    prevScore: number;
    newScore: number;
    pointsEarned: number;
    actionTitle: string;
  } | null;
  deleteLog: (logId: string) => void;
  addCustomAction: (actionData: Omit<EcoActionDefinition, 'id' | 'isCustom'>) => void;
  deleteCustomAction: (id: string) => void;
  joinChallenge: (challengeId: string) => void;
  claimChallenge: (challengeId: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  resetAllData: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonStr: string) => boolean;
  
  // Toast & Notifications
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
  celebrationEvent: { show: boolean; title: string; subtitle: string; points?: number } | null;
  dismissCelebration: () => void;
}

const EcoContext = createContext<EcoContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'ecoscore_user_v1',
  LOGS: 'ecoscore_logs_v1',
  CHALLENGES: 'ecoscore_challenges_v1',
  ACHIEVEMENTS: 'ecoscore_achievements_v1',
  CUSTOM_ACTIONS: 'ecoscore_custom_actions_v1',
  INITIALIZED: 'ecoscore_initialized_v1'
};

export const EcoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State Initialization from localStorage or fallbacks
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  const [loggedActions, setLoggedActions] = useState<LoggedAction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
      return saved ? JSON.parse(saved) : INITIAL_LOGGED_ACTIONS;
    } catch {
      return INITIAL_LOGGED_ACTIONS;
    }
  });

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHALLENGES);
      return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
    } catch {
      return INITIAL_CHALLENGES;
    }
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  });

  const [customActions, setCustomActions] = useState<EcoActionDefinition[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_ACTIONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [celebrationEvent, setCelebrationEvent] = useState<{
    show: boolean;
    title: string;
    subtitle: string;
    points?: number;
  } | null>(null);

  const [unlockedAchievementModal, setUnlockedAchievementModal] = useState<Achievement | null>(null);

  const dismissAchievementModal = useCallback(() => {
    setUnlockedAchievementModal(null);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user:', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(loggedActions));
    } catch (e) {
      console.error('Failed to save logs:', e);
    }
  }, [loggedActions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges));
    } catch (e) {
      console.error('Failed to save challenges:', e);
    }
  }, [challenges]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    } catch (e) {
      console.error('Failed to save achievements:', e);
    }
  }, [achievements]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_ACTIONS, JSON.stringify(customActions));
    } catch (e) {
      console.error('Failed to save custom actions:', e);
    }
  }, [customActions]);

  // Combined catalogue
  const allActions = useMemo(() => {
    return [...PRESET_ACTIONS, ...customActions];
  }, [customActions]);

  // Toast notification helper
  const addToast = useCallback((title: string, message: string, type: 'success' | 'info' | 'award' = 'success', points?: number) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev.slice(-3), { id, title, message, type, points }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const fireCelebration = useCallback((title: string, subtitle: string, points?: number) => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#10b981', '#34d399', '#6ee7b7', '#f59e0b']
      });
    } catch {
      // ignore
    }
    setCelebrationEvent({ show: true, title, subtitle, points });
  }, []);

  const dismissCelebration = useCallback(() => {
    setCelebrationEvent(null);
  }, []);

  // Aggregated totals
  const {
    totalPoints,
    todayPoints,
    todayLogsCount,
    totalCo2SavedKg,
    totalWaterSavedL,
    totalWasteSavedKg
  } = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    let points = 0;
    let tPoints = 0;
    let tCount = 0;
    let co2 = 0;
    let water = 0;
    let waste = 0;

    for (const log of loggedActions) {
      points += log.pointsEarned;
      co2 += log.co2SavedKg;
      water += log.waterSavedL;
      waste += log.wasteSavedKg;

      if (log.timestamp && log.timestamp.startsWith(todayStr)) {
        tPoints += log.pointsEarned;
        tCount += 1;
      }
    }

    // Include points from claimed challenges
    for (const ch of challenges) {
      if (ch.status === 'claimed') {
        points += ch.rewardPoints;
      }
    }

    return {
      totalPoints: Math.round(points),
      todayPoints: Math.round(tPoints),
      todayLogsCount: tCount,
      totalCo2SavedKg: Number(co2.toFixed(2)),
      totalWaterSavedL: Math.round(water),
      totalWasteSavedKg: Number(waste.toFixed(2))
    };
  }, [loggedActions, challenges]);

  const todayGoalPercent = useMemo(() => {
    const target = user.dailyGoalPoints || 100;
    return Math.min(100, Math.round((todayPoints / target) * 100));
  }, [todayPoints, user.dailyGoalPoints]);

  const treesEquivalent = useMemo(() => {
    return Number((totalCo2SavedKg / 22).toFixed(1));
  }, [totalCo2SavedKg]);

  const carMilesAvoided = useMemo(() => {
    // 0.19 kg CO2 per km => miles = km * 0.621371
    return Number((totalCo2SavedKg / 0.19 * 0.621371).toFixed(1));
  }, [totalCo2SavedKg]);

  const smartphoneChargesSaved = useMemo(() => {
    // ~0.008 kg CO2 per full smartphone charge
    return Math.round(totalCo2SavedKg / 0.008);
  }, [totalCo2SavedKg]);

  const weeklyEcoPoints = useMemo(() => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    let sum = 0;
    for (const log of loggedActions) {
      const time = new Date(log.timestamp).getTime();
      if (!isNaN(time) && time >= sevenDaysAgo) {
        sum += log.pointsEarned;
      }
    }
    return sum;
  }, [loggedActions]);

  const totalActionsCount = loggedActions.length;

  const levelInfo = useMemo(() => {
    if (totalPoints < 30) {
      const rem = 30 - totalPoints;
      const progressPercent = Math.min(100, Math.max(0, Math.round((totalPoints / 30) * 100)));
      return {
        currentLevel: 'Getting Started',
        levelNumber: 1,
        currentMin: 0,
        nextMax: 30,
        progressPercent,
        pointsToNext: rem,
        encouragingMessage: `You're ${rem} pts away from becoming an Eco Explorer! Log daily actions to level up.`
      };
    } else if (totalPoints < 60) {
      const rem = 60 - totalPoints;
      const progressPercent = Math.min(100, Math.max(0, Math.round(((totalPoints - 30) / (60 - 30)) * 100)));
      return {
        currentLevel: 'Eco Explorer',
        levelNumber: 2,
        currentMin: 30,
        nextMax: 60,
        progressPercent,
        pointsToNext: rem,
        encouragingMessage: `Awesome momentum! ${rem} more points to reach Green Champion.`
      };
    } else if (totalPoints < 80) {
      const rem = 80 - totalPoints;
      const progressPercent = Math.min(100, Math.max(0, Math.round(((totalPoints - 60) / (80 - 60)) * 100)));
      return {
        currentLevel: 'Green Champion',
        levelNumber: 3,
        currentMin: 60,
        nextMax: 80,
        progressPercent,
        pointsToNext: rem,
        encouragingMessage: `Almost there! Just ${rem} points until you become a Planet Hero.`
      };
    } else {
      const progressPercent = totalPoints >= 100 ? 100 : Math.min(100, Math.max(0, Math.round(((totalPoints - 80) / (100 - 80)) * 100)));
      return {
        currentLevel: 'Planet Hero',
        levelNumber: 4,
        currentMin: 80,
        nextMax: 100,
        progressPercent,
        pointsToNext: Math.max(0, 100 - totalPoints),
        encouragingMessage: `Top tier unlocked! You are a recognized Planet Hero.`
      };
    }
  }, [totalPoints]);

  // Dynamic Leaderboard: Place current user in the leaderboard and re-sort dynamically
  const { leaderboard, userRank } = useMemo(() => {
    const others = INITIAL_LEADERBOARD.filter(u => !u.isCurrentUser);
    const currentUserItem: LeaderboardUser = {
      id: 'current-user',
      name: user.name,
      avatar: user.avatar,
      points: totalPoints,
      co2SavedKg: totalCo2SavedKg,
      streak: user.streakDays,
      rank: 1,
      badge: totalPoints >= 80 ? 'Planet Hero' : totalPoints >= 60 ? 'Green Champion' : totalPoints >= 30 ? 'Eco Explorer' : 'Getting Started',
      isCurrentUser: true,
      team: 'Urban Climbers',
      countryCode: 'US',
      recentActionTitle: loggedActions[0]?.title || 'Sustainable Living'
    };

    const combined = [...others, currentUserItem].sort((a, b) => b.points - a.points);
    const ranked = combined.map((item, index) => ({
      ...item,
      rank: index + 1
    }));

    const myRank = ranked.findIndex(u => u.isCurrentUser) + 1;
    return { leaderboard: ranked, userRank: myRank || 1 };
  }, [user, totalPoints, totalCo2SavedKg, loggedActions]);

  // Check achievements against current stats
  const evaluateAchievements = useCallback((currentActions: LoggedAction[], points: number, co2: number, water: number) => {
    setAchievements(prev => {
      let newlyUnlocked: Achievement | null = null;
      const updated = prev.map(ach => {
        if (ach.isUnlocked) return ach;
        let progress = ach.progress;
        let shouldUnlock = false;

        switch (ach.id) {
          case 'ach-first-step':
            progress = currentActions.length >= 1 ? 100 : 0;
            shouldUnlock = currentActions.length >= 1;
            break;
          case 'ach-green-traveler': {
            const hasTravel = currentActions.some(a => a.category === 'transport' || a.category === 'commute');
            progress = hasTravel ? 100 : 0;
            shouldUnlock = hasTravel;
            break;
          }
          case 'ach-recycle-master': {
            const hasRecycle = currentActions.some(a => a.category === 'waste');
            progress = hasRecycle ? 100 : 0;
            shouldUnlock = hasRecycle;
            break;
          }
          case 'ach-energy-saver': {
            const hasEnergy = currentActions.some(a => a.category === 'energy');
            progress = hasEnergy ? 100 : 0;
            shouldUnlock = hasEnergy;
            break;
          }
          case 'ach-conscious-eater': {
            const hasFood = currentActions.some(a => a.category === 'food');
            progress = hasFood ? 100 : 0;
            shouldUnlock = hasFood;
            break;
          }
          case 'ach-week-warrior':
            progress = Math.min(100, Math.round((user.streakDays / 7) * 100));
            shouldUnlock = user.streakDays >= 7;
            break;
          case 'ach-green-warrior': {
            const val = Math.max((points / 50) * 100, (currentActions.length / 5) * 100);
            progress = Math.min(100, Math.round(val));
            shouldUnlock = points >= 50 || currentActions.length >= 5;
            break;
          }
          case 'ach-planet-hero':
            progress = Math.min(100, Math.round((points / 80) * 100));
            shouldUnlock = points >= 80;
            break;
          default:
            break;
        }

        if (shouldUnlock) {
          newlyUnlocked = {
            ...ach,
            progress: 100,
            isUnlocked: true,
            unlockedAt: new Date().toISOString()
          };
          return newlyUnlocked;
        }

        return { ...ach, progress };
      });

      if (newlyUnlocked) {
        const u = newlyUnlocked as Achievement;
        setUnlockedAchievementModal(u);
        fireCelebration(`Achievement Unlocked!`, `You earned the "${u.title}" badge.`);
        addToast(`Achievement Unlocked: ${u.title}`, u.description, 'award');
      }

      return updated;
    });
  }, [user.streakDays, fireCelebration, addToast]);

  // Hook challenges progress when an action is logged
  const updateChallengeProgress = useCallback((loggedAction: LoggedAction) => {
    setChallenges(prev => {
      return prev.map(ch => {
        if (ch.status === 'completed' || ch.status === 'claimed') return ch;

        // Check if action matches
        let isMatch = false;
        if (ch.category === 'all' || ch.category === loggedAction.category) {
          isMatch = true;
        }
        if (ch.actionMatch && ch.actionMatch.length > 0) {
          isMatch = ch.actionMatch.includes(loggedAction.actionId) || ch.actionMatch.includes(loggedAction.category);
        }

        if (isMatch) {
          const increment = ch.unitLabel === 'kg CO2' ? loggedAction.co2SavedKg : loggedAction.quantity;
          const nextCount = Number((ch.currentCount + increment).toFixed(2));
          const isNowCompleted = nextCount >= ch.targetCount;

          if (isNowCompleted && ch.status === 'active') {
            addToast(`Challenge Completed!`, `"${ch.title}" is ready to claim (+${ch.rewardPoints} pts)`, 'award');
            return {
              ...ch,
              currentCount: nextCount,
              status: 'completed'
            };
          }
          return {
            ...ch,
            currentCount: nextCount
          };
        }
        return ch;
      });
    });
  }, [addToast]);

  // Log an Action
  const logAction = useCallback((actionId: string, quantity: number, note?: string) => {
    const def = allActions.find(a => a.id === actionId);
    if (!def) return null;

    const qty = Math.max(0.1, Number(quantity) || 1);
    const pointsEarned = Math.round(def.basePoints * qty);
    const prevScore = totalPoints;
    const newScore = totalPoints + pointsEarned;
    const co2SavedKg = Number((def.co2PerUnit * qty).toFixed(2));
    const waterSavedL = Math.round(def.waterPerUnit * qty);
    const wasteSavedKg = Number((def.wastePerUnit * qty).toFixed(2));

    const newLog: LoggedAction = {
      id: 'log-' + Date.now(),
      actionId: def.id,
      title: def.title,
      category: def.category,
      quantity: qty,
      unit: def.unit,
      pointsEarned,
      co2SavedKg,
      waterSavedL,
      wasteSavedKg,
      timestamp: new Date().toISOString(),
      note: note?.trim() || undefined
    };

    setLoggedActions(prev => {
      const nextLogs = [newLog, ...prev];
      // Evaluate streak
      const todayStr = new Date().toISOString().split('T')[0];
      setUser(u => {
        if (u.lastActiveDate !== todayStr) {
          return {
            ...u,
            streakDays: u.streakDays + 1,
            lastActiveDate: todayStr
          };
        }
        return u;
      });

      // Recalculate totals for achievements
      const newTotalCo2 = nextLogs.reduce((acc, l) => acc + l.co2SavedKg, 0);
      const newTotalWater = nextLogs.reduce((acc, l) => acc + l.waterSavedL, 0);
      const newTotalPts = nextLogs.reduce((acc, l) => acc + l.pointsEarned, 0);
      evaluateAchievements(nextLogs, newTotalPts, newTotalCo2, newTotalWater);

      return nextLogs;
    });

    updateChallengeProgress(newLog);

    addToast(
      `Logged: ${def.title}`,
      `+${pointsEarned} EcoPoints · -${co2SavedKg} kg CO2`,
      'success',
      pointsEarned
    );

    return {
      prevScore,
      newScore,
      pointsEarned,
      actionTitle: def.title
    };
  }, [allActions, totalPoints, evaluateAchievements, updateChallengeProgress, addToast]);

  // Delete / Undo a log
  const deleteLog = useCallback((logId: string) => {
    setLoggedActions(prev => {
      const target = prev.find(l => l.id === logId);
      if (target) {
        addToast('Action Removed', `Removed ${target.title} (-${target.pointsEarned} pts)`, 'info');
      }
      return prev.filter(l => l.id !== logId);
    });
  }, [addToast]);

  // Add Custom Action
  const addCustomAction = useCallback((actionData: Omit<EcoActionDefinition, 'id' | 'isCustom'>) => {
    const id = 'custom-' + Date.now();
    const newAction: EcoActionDefinition = {
      ...actionData,
      id,
      isCustom: true
    };
    setCustomActions(prev => [...prev, newAction]);
    addToast('Custom Habit Created', `"${newAction.title}" is ready to log anytime!`, 'success');
  }, [addToast]);

  // Delete Custom Action
  const deleteCustomAction = useCallback((id: string) => {
    setCustomActions(prev => prev.filter(a => a.id !== id));
    addToast('Habit Deleted', 'Custom habit has been removed from catalogue.', 'info');
  }, [addToast]);

  // Join a challenge
  const joinChallenge = useCallback((challengeId: string) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId && ch.status === 'available') {
        addToast('Challenge Joined!', `You joined "${ch.title}". Make each action count!`, 'info');
        return { ...ch, status: 'active' };
      }
      return ch;
    }));
  }, [addToast]);

  // Claim challenge reward
  const claimChallenge = useCallback((challengeId: string) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId && ch.status === 'completed') {
        fireCelebration(`Quest Victory!`, `Claimed +${ch.rewardPoints} EcoPoints for ${ch.title}!`, ch.rewardPoints);
        addToast(`Reward Claimed!`, `+${ch.rewardPoints} EcoPoints credited to your balance`, 'award', ch.rewardPoints);
        return { ...ch, status: 'claimed' };
      }
      return ch;
    }));
  }, [fireCelebration, addToast]);

  // Update profile
  const updateProfile = useCallback((profileUpdates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...profileUpdates }));
    addToast('Profile Updated', 'Your eco preferences have been updated.', 'info');
  }, [addToast]);

  // Reset all data
  const resetAllData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.removeItem(STORAGE_KEYS.CHALLENGES);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_ACTIONS);
    
    setUser(INITIAL_USER_PROFILE);
    setLoggedActions(INITIAL_LOGGED_ACTIONS);
    setChallenges(INITIAL_CHALLENGES);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setCustomActions([]);
    addToast('Data Reset', 'Demo records and profile have been reset to factory state.', 'info');
  }, [addToast]);

  // Export JSON
  const exportDataJson = useCallback(() => {
    const bundle = {
      user,
      loggedActions,
      challenges,
      achievements,
      customActions,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(bundle, null, 2);
  }, [user, loggedActions, challenges, achievements, customActions]);

  // Import JSON
  const importDataJson = useCallback((jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.user && Array.isArray(parsed.loggedActions)) {
        setUser(parsed.user);
        setLoggedActions(parsed.loggedActions);
        if (Array.isArray(parsed.challenges)) setChallenges(parsed.challenges);
        if (Array.isArray(parsed.achievements)) setAchievements(parsed.achievements);
        if (Array.isArray(parsed.customActions)) setCustomActions(parsed.customActions);
        addToast('Import Successful', 'Your EcoScore data was restored from JSON backup.', 'success');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [addToast]);

  return (
    <EcoContext.Provider
      value={{
        user,
        loggedActions,
        challenges,
        achievements,
        customActions,
        allActions,
        leaderboard,
        userRank,
        totalPoints,
        todayPoints,
        todayLogsCount,
        todayGoalPercent,
        totalCo2SavedKg,
        totalWaterSavedL,
        totalWasteSavedKg,
        treesEquivalent,
        carMilesAvoided,
        smartphoneChargesSaved,
        weeklyEcoPoints,
        totalActionsCount,
        levelInfo,
        logAction,
        deleteLog,
        addCustomAction,
        deleteCustomAction,
        joinChallenge,
        claimChallenge,
        updateProfile,
        resetAllData,
        exportDataJson,
        importDataJson,
        toasts,
        removeToast,
        celebrationEvent,
        dismissCelebration,
        unlockedAchievementModal,
        dismissAchievementModal
      }}
    >
      {children}
    </EcoContext.Provider>
  );
};

export const useEco = () => {
  const context = useContext(EcoContext);
  if (!context) {
    throw new Error('useEco must be used within an EcoProvider');
  }
  return context;
};
