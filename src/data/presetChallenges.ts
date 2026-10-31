import { Challenge } from '../types';

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'ch-green-commute',
    title: 'Green Commute',
    description: 'Walk or cycle instead of driving.',
    category: 'transport',
    type: 'daily',
    targetCount: 1,
    unitLabel: 'trip',
    rewardPoints: 10,
    actionMatch: ['walk', 'bicycle', 'public-transport', 'carpool'],
    status: 'available',
    currentCount: 0,
    expiresInDays: 1,
    badgeIcon: 'Bike'
  },
  {
    id: 'ch-plastic-free',
    title: 'Plastic-Free Day',
    description: 'Avoid one single-use plastic item.',
    category: 'waste',
    type: 'daily',
    targetCount: 1,
    unitLabel: 'action',
    rewardPoints: 8,
    actionMatch: ['avoided-single-use-plastic', 'reused-container', 'reusable-cup', 'reusable-water-bottle'],
    status: 'available',
    currentCount: 0,
    expiresInDays: 1,
    badgeIcon: 'Sparkles'
  },
  {
    id: 'ch-energy-saver',
    title: 'Energy Saver',
    description: 'Turn off unused lights and devices.',
    category: 'energy',
    type: 'daily',
    targetCount: 1,
    unitLabel: 'room',
    rewardPoints: 5,
    actionMatch: ['turned-off-lights', 'reduced-ac-usage', 'used-natural-light'],
    status: 'available',
    currentCount: 0,
    expiresInDays: 1,
    badgeIcon: 'Lightbulb'
  },
  {
    id: 'ch-waste-warrior',
    title: 'Waste Warrior',
    description: 'Recycle or reuse something today.',
    category: 'waste',
    type: 'daily',
    targetCount: 1,
    unitLabel: 'item',
    rewardPoints: 7,
    actionMatch: ['recycled', 'reused-container', 'composting-organic'],
    status: 'available',
    currentCount: 0,
    expiresInDays: 1,
    badgeIcon: 'Repeat'
  },
  {
    id: 'ch-green-meal',
    title: 'Green Meal',
    description: 'Choose a vegetarian or vegan meal.',
    category: 'food',
    type: 'daily',
    targetCount: 1,
    unitLabel: 'meal',
    rewardPoints: 6,
    actionMatch: ['vegan-meal', 'vegetarian-meal', 'avoided-food-waste'],
    status: 'available',
    currentCount: 0,
    expiresInDays: 1,
    badgeIcon: 'Salad'
  }
];
