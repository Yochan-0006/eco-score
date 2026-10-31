import { Achievement } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-step',
    title: 'First Step',
    description: 'Log your very first eco-friendly action in the app.',
    icon: 'Sprout',
    tier: 'bronze',
    category: 'special',
    unlockedAt: '2026-10-25T09:15:00Z',
    progress: 100,
    conditionText: 'Log 1 action',
    isUnlocked: true
  },
  {
    id: 'ach-green-traveler',
    title: 'Green Traveler',
    description: 'Log an active mobility or transit habit: walk, bicycle, carpool, or transit.',
    icon: 'Bike',
    tier: 'silver',
    category: 'commute',
    unlockedAt: '2026-10-26T14:30:00Z',
    progress: 100,
    conditionText: 'Log 1 transport action',
    isUnlocked: true
  },
  {
    id: 'ach-recycle-master',
    title: 'Recycle Master',
    description: 'Properly sort recyclables, eliminate single-use plastics, or reuse containers.',
    icon: 'Repeat',
    tier: 'silver',
    category: 'waste',
    unlockedAt: '2026-10-27T11:20:00Z',
    progress: 100,
    conditionText: 'Log 1 waste action',
    isUnlocked: true
  },
  {
    id: 'ach-energy-saver',
    title: 'Energy Saver',
    description: 'Conserve electricity by turning off lights, adjusting AC, or using daylight.',
    icon: 'Lightbulb',
    tier: 'silver',
    category: 'energy',
    unlockedAt: '2026-10-28T18:10:00Z',
    progress: 100,
    conditionText: 'Log 1 energy action',
    isUnlocked: true
  },
  {
    id: 'ach-conscious-eater',
    title: 'Conscious Eater',
    description: 'Eat a plant-based or vegetarian meal, or eliminate food waste.',
    icon: 'Salad',
    tier: 'silver',
    category: 'food',
    unlockedAt: '2026-10-29T13:45:00Z',
    progress: 100,
    conditionText: 'Log 1 food action',
    isUnlocked: true
  },
  {
    id: 'ach-week-warrior',
    title: 'Week Warrior',
    description: 'Maintain an unbroken 7-day sustainable action streak.',
    icon: 'Flame',
    tier: 'gold',
    category: 'streak',
    unlockedAt: null,
    progress: 71, // e.g. 5 / 7 days
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
    unlockedAt: '2026-10-30T10:00:00Z',
    progress: 100,
    conditionText: 'Earn 50 EcoPoints',
    isUnlocked: true
  },
  {
    id: 'ach-planet-hero',
    title: 'Planet Hero',
    description: 'Achieve the prestigious Planet Hero level with 80+ EcoPoints.',
    icon: 'Crown',
    tier: 'emerald',
    category: 'special',
    unlockedAt: null,
    progress: 85, // based on points to 80
    conditionText: 'Reach 80+ EcoPoints',
    isUnlocked: false
  }
];
