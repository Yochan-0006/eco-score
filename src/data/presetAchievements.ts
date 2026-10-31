import { Achievement } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-step',
    title: 'First Green Step',
    description: 'Log your very first eco-friendly action in the journal.',
    icon: 'Sprout',
    tier: 'bronze',
    category: 'special',
    unlockedAt: '2026-10-25T09:15:00Z',
    progress: 100,
    conditionText: 'Log 1 action',
    isUnlocked: true
  },
  {
    id: 'ach-streak-3',
    title: 'Habit Catalyst',
    description: 'Maintain a 3-day continuous sustainable action streak.',
    icon: 'Flame',
    tier: 'bronze',
    category: 'streak',
    unlockedAt: '2026-10-27T18:30:00Z',
    progress: 100,
    conditionText: '3-day streak',
    isUnlocked: true
  },
  {
    id: 'ach-streak-7',
    title: 'Week of Planet First',
    description: 'Keep a clean 7-day sustainable streak without missing a day.',
    icon: 'Zap',
    tier: 'silver',
    category: 'streak',
    unlockedAt: null,
    progress: 71, // 5 / 7 days
    conditionText: '7-day streak',
    isUnlocked: false
  },
  {
    id: 'ach-carbon-25',
    title: 'Carbon Cutter',
    description: 'Prevent 25 kg of greenhouse emissions through verified actions.',
    icon: 'CloudSun',
    tier: 'silver',
    category: 'points',
    unlockedAt: '2026-10-29T14:20:00Z',
    progress: 100,
    conditionText: 'Save 25 kg CO2',
    isUnlocked: true
  },
  {
    id: 'ach-carbon-100',
    title: 'Atmospheric Guardian',
    description: 'Divert over 100 kg of carbon dioxide from the atmosphere.',
    icon: 'ShieldCheck',
    tier: 'emerald',
    category: 'points',
    unlockedAt: null,
    progress: 32, // 32.4 / 100 kg
    conditionText: 'Save 100 kg CO2',
    isUnlocked: false
  },
  {
    id: 'ach-water-1000',
    title: 'Aquifer Protector',
    description: 'Conserve more than 3,000 liters of fresh water via plant diet and smart water habits.',
    icon: 'Droplets',
    tier: 'gold',
    category: 'special',
    unlockedAt: '2026-10-30T12:00:00Z',
    progress: 100,
    conditionText: 'Save 3,000L water',
    isUnlocked: true
  },
  {
    id: 'ach-pedal-50',
    title: 'Pedal Pioneer',
    description: 'Replace car miles with 50 km of bicycle or walking trips.',
    icon: 'Bike',
    tier: 'silver',
    category: 'commute',
    unlockedAt: null,
    progress: 68, // 34 / 50 km
    conditionText: '50 km micromobility',
    isUnlocked: false
  },
  {
    id: 'ach-plant-10',
    title: 'Flora Feast',
    description: 'Record 10 delicious plant-based or zero-food-waste meals.',
    icon: 'Salad',
    tier: 'silver',
    category: 'food',
    unlockedAt: '2026-10-30T19:40:00Z',
    progress: 100,
    conditionText: '10 plant meals',
    isUnlocked: true
  },
  {
    id: 'ach-sun-dry',
    title: 'Solar & Wind Master',
    description: 'Air dry laundry or adjust thermostat 5 times to cut peak grid demand.',
    icon: 'Sun',
    tier: 'gold',
    category: 'energy',
    unlockedAt: null,
    progress: 60, // 3 / 5 times
    conditionText: '5 clean energy actions',
    isUnlocked: false
  },
  {
    id: 'ach-circular-15',
    title: 'Zero-Waste Maven',
    description: 'Compost organic scraps or reuse shopping supplies 15 times.',
    icon: 'Repeat',
    tier: 'gold',
    category: 'waste',
    unlockedAt: null,
    progress: 53, // 8 / 15 actions
    conditionText: '15 circular actions',
    isUnlocked: false
  },
  {
    id: 'ach-points-500',
    title: 'Centurion Club',
    description: 'Reach a milestone total of 500 lifetime EcoPoints.',
    icon: 'Award',
    tier: 'silver',
    category: 'points',
    unlockedAt: '2026-10-30T21:10:00Z',
    progress: 100,
    conditionText: '500 EcoPoints',
    isUnlocked: true
  },
  {
    id: 'ach-diamond-eco',
    title: 'Biosphere Sentinel',
    description: 'Earn 1,500 EcoPoints and complete 10 challenges.',
    icon: 'Crown',
    tier: 'emerald',
    category: 'special',
    unlockedAt: null,
    progress: 42, // based on points & challenges
    conditionText: '1,500 EcoPoints + 10 challenges',
    isUnlocked: false
  }
];
