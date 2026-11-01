import { Achievement } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-step',
    title: 'First Step',
    description: 'Log your very first eco-friendly action in the app.',
    icon: 'Sprout',
    tier: 'bronze',
    category: 'special',
    unlockedAt: null,
    progress: 0,
    conditionText: 'Log 1 action',
    isUnlocked: false
  },
  {
    id: 'ach-green-traveler',
    title: 'Green Traveler',
    description: 'Log an active mobility or transit habit: walk, bicycle, carpool, or transit.',
    icon: 'Bike',
    tier: 'silver',
    category: 'commute',
    unlockedAt: null,
    progress: 0,
    conditionText: 'Log 1 transport action',
    isUnlocked: false
  },
  {
    id: 'ach-recycle-master',
    title: 'Recycle Master',
    description: 'Properly sort recyclables, eliminate single-use plastics, or reuse containers.',
    icon: 'Repeat',
    tier: 'silver',
    category: 'waste',
    unlockedAt: null,
    progress: 0,
    conditionText: 'Log 1 waste action',
    isUnlocked: false
  },
  {
    id: 'ach-energy-saver',
    title: 'Energy Saver',
    description: 'Conserve electricity by turning off lights, adjusting AC, or using daylight.',
    icon: 'Lightbulb',
    tier: 'silver',
    category: 'energy',
    unlockedAt: null,
    progress: 0,
    conditionText: 'Log 1 energy action',
    isUnlocked: false
  },
  {
    id: 'ach-conscious-eater',
    title: 'Conscious Eater',
    description: 'Eat a plant-based or vegetarian meal, or eliminate food waste.',
    icon: 'Salad',
    tier: 'silver',
    category: 'food',
    unlockedAt: null,
    progress: 0,
    conditionText: 'Log 1 food action',
    isUnlocked: false
  },
  {
    id: 'ach-week-warrior',
    title: 'Week Warrior',
    description: 'Maintain an unbroken 7-day sustainable action streak.',
    icon: 'Flame',
    tier: 'gold',
    category: 'streak',
    unlockedAt: null,
    progress: 0,
    conditionText: 'Maintain 7-day streak',
    isUnlocked: false
  },
  {
    id: 'ach-green-warrior',
    title: 'Green Warrior',
    description: 'Accumulate 50 EcoPoints or record at least 5 sustainable choices.',
    icon: 'ShieldCheck',
    tier: 'gold',
    category: 'points',
    unlockedAt: null,
    progress: 0,
    conditionText: 'Earn 50 EcoPoints',
    isUnlocked: false
  },
  {
    id: 'ach-planet-hero',
    title: 'Planet Hero',
    description: 'Achieve the prestigious Planet Hero level with 80+ EcoPoints.',
    icon: 'Crown',
    tier: 'emerald',
    category: 'special',
    unlockedAt: null,
    progress: 0,
    conditionText: 'Reach 80+ EcoPoints',
    isUnlocked: false
  }
];
