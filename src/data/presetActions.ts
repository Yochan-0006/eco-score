import { EcoActionDefinition } from '../types';

export const PRESET_ACTIONS: EcoActionDefinition[] = [
  // 1. TRANSPORT
  {
    id: 'walk',
    title: 'Walk',
    category: 'transport',
    basePoints: 20,
    unit: 'trip',
    defaultQuantity: 1,
    co2PerUnit: 0.8,
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Footprints',
    description: 'Zero-emission walking travel for commutes or daily errands.',
    impactFact: '100% emission-free travel that eliminates urban congestion.'
  },
  {
    id: 'bicycle',
    title: 'Bicycle',
    category: 'transport',
    basePoints: 25,
    unit: 'trip',
    defaultQuantity: 1,
    co2PerUnit: 1.2,
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Bike',
    description: 'Pedal power commute or recreational ride instead of driving.',
    impactFact: 'Prevents direct tailpipe carbon emissions and fuel combustion.'
  },
  {
    id: 'public-transport',
    title: 'Public Transport',
    category: 'transport',
    basePoints: 20,
    unit: 'trip',
    defaultQuantity: 1,
    co2PerUnit: 1.5,
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Train',
    description: 'Rode bus, train, or metro to reduce collective traffic emissions.',
    impactFact: 'Public transit reduces greenhouse gas emissions by up to 76% per passenger-mile.'
  },
  {
    id: 'carpool',
    title: 'Carpool',
    category: 'transport',
    basePoints: 15,
    unit: 'trip',
    defaultQuantity: 1,
    co2PerUnit: 1.0,
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Car',
    description: 'Shared a vehicle ride with friends, neighbors, or coworkers.',
    impactFact: 'Sharing vehicle seats halves emissions and fuel consumption per person.'
  },
  {
    id: 'car',
    title: 'Car',
    category: 'transport',
    basePoints: 5,
    unit: 'trip',
    defaultQuantity: 1,
    co2PerUnit: 0.2,
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Car',
    description: 'Eco-driving trip, EV charging, or chained multi-stop errand.',
    impactFact: 'Smooth acceleration and errand chaining save up to 20% in fuel.'
  },

  // 2. FOOD
  {
    id: 'vegan-meal',
    title: 'Vegan Meal',
    category: 'food',
    basePoints: 25,
    unit: 'meal',
    defaultQuantity: 1,
    co2PerUnit: 1.8,
    waterPerUnit: 900,
    wastePerUnit: 0.1,
    icon: 'Salad',
    description: '100% plant-based meal avoiding livestock carbon and water footprint.',
    impactFact: 'Saves ~1.8 kg CO2 and 900 liters of water compared to an animal protein meal.'
  },
  {
    id: 'vegetarian-meal',
    title: 'Vegetarian Meal',
    category: 'food',
    basePoints: 15,
    unit: 'meal',
    defaultQuantity: 1,
    co2PerUnit: 1.2,
    waterPerUnit: 500,
    wastePerUnit: 0.1,
    icon: 'Utensils',
    description: 'Meat-free meal packed with vegetables, legumes, or grains.',
    impactFact: 'Cuts diet-related carbon footprint by nearly 30% per meal.'
  },
  {
    id: 'avoided-food-waste',
    title: 'Avoided Food Waste',
    category: 'food',
    basePoints: 20,
    unit: 'meal',
    defaultQuantity: 1,
    co2PerUnit: 0.8,
    waterPerUnit: 200,
    wastePerUnit: 0.35,
    icon: 'CheckCircle2',
    description: 'Finished leftovers and discarded zero edible food into trash.',
    impactFact: 'Prevents rotting organic matter from generating potent methane in landfills.'
  },

  // 3. ENERGY
  {
    id: 'turned-off-lights',
    title: 'Turned Off Unused Lights',
    category: 'energy',
    basePoints: 10,
    unit: 'room',
    defaultQuantity: 1,
    co2PerUnit: 0.4,
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Lightbulb',
    description: 'Switched off lights in empty rooms and hallways.',
    impactFact: 'Eliminates standby residential electricity waste and extends bulb life.'
  },
  {
    id: 'reduced-ac-usage',
    title: 'Reduced AC Usage',
    category: 'energy',
    basePoints: 20,
    unit: 'day',
    defaultQuantity: 1,
    co2PerUnit: 1.5,
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Thermometer',
    description: 'Adjusted thermostat or used natural ventilation to conserve power.',
    impactFact: 'Each 1°C adjustment trims about 7-10% off cooling and heating power draw.'
  },
  {
    id: 'used-natural-light',
    title: 'Used Natural Light',
    category: 'energy',
    basePoints: 15,
    unit: 'day',
    defaultQuantity: 1,
    co2PerUnit: 0.6,
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Sun',
    description: 'Opened curtains and worked under sunlight instead of artificial lighting.',
    impactFact: 'Maximizes daylight harvesting while enhancing circadian focus.'
  },

  // 4. WASTE
  {
    id: 'recycled',
    title: 'Recycled',
    category: 'waste',
    basePoints: 15,
    unit: 'bin',
    defaultQuantity: 1,
    co2PerUnit: 0.7,
    waterPerUnit: 0,
    wastePerUnit: 1.2,
    icon: 'Repeat',
    description: 'Sorted paper, aluminum cans, glass, and rigid plastics for recycling.',
    impactFact: 'Recycling aluminum uses 95% less energy than producing primary metal.'
  },
  {
    id: 'avoided-single-use-plastic',
    title: 'Avoided Single-Use Plastic',
    category: 'waste',
    basePoints: 15,
    unit: 'item',
    defaultQuantity: 1,
    co2PerUnit: 0.3,
    waterPerUnit: 10,
    wastePerUnit: 0.08,
    icon: 'Sparkles',
    description: 'Declined disposable plastic bags, cups, straws, or cutlery.',
    impactFact: 'Single-use plastics persist in ecosystems for hundreds of years.'
  },
  {
    id: 'reused-container',
    title: 'Reused Container',
    category: 'waste',
    basePoints: 15,
    unit: 'item',
    defaultQuantity: 1,
    co2PerUnit: 0.5,
    waterPerUnit: 20,
    wastePerUnit: 0.2,
    icon: 'ShoppingBag',
    description: 'Used reusable lunchbox, stainless tumbler, or shopping tote bag.',
    impactFact: 'Reusing durable vessels stops packaging waste before it is created.'
  },

  // Legacy aliases for backward compatibility with initial data
  {
    id: 'bike-commute',
    title: 'Bicycle or E-Bike Commute',
    category: 'transport',
    basePoints: 25,
    unit: 'km',
    defaultQuantity: 5,
    co2PerUnit: 0.19,
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Bike',
    description: 'Swapped a motor vehicle trip for pedal power or micromobility.',
    impactFact: 'Cycling 5 km prevents ~1 kg of direct tailpipe carbon emissions.'
  },
  {
    id: 'plant-based-meal',
    title: 'Plant-Based Meal',
    category: 'food',
    basePoints: 20,
    unit: 'meal',
    defaultQuantity: 1,
    co2PerUnit: 1.6,
    waterPerUnit: 780,
    wastePerUnit: 0.1,
    icon: 'Salad',
    description: 'Enjoyed a fully plant-forward lunch, dinner, or breakfast.',
    impactFact: 'One plant-based meal saves equivalent water to 12 eight-minute showers.'
  },
  {
    id: 'reusable-cup',
    title: 'Reusable Coffee / Beverage Mug',
    category: 'food',
    basePoints: 10,
    unit: 'cup',
    defaultQuantity: 1,
    co2PerUnit: 0.12,
    waterPerUnit: 4,
    wastePerUnit: 0.02,
    icon: 'Coffee',
    description: 'Brought your own thermos or travel cup to a café.',
    impactFact: 'Over 16 billion single-use coffee cups end up in landfills each year.'
  },
  {
    id: 'line-dry-clothes',
    title: 'Air Dry / Line Dry Clothes',
    category: 'energy',
    basePoints: 25,
    unit: 'load',
    defaultQuantity: 1,
    co2PerUnit: 1.8,
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Sun',
    description: 'Hung clothes on a rack or clothesline instead of running an electric dryer.',
    impactFact: 'Electric tumble dryers are one of the most power-hungry home appliances.'
  },
  {
    id: 'composting-organic',
    title: 'Composted Organic Waste',
    category: 'waste',
    basePoints: 20,
    unit: 'kg',
    defaultQuantity: 1.5,
    co2PerUnit: 0.9,
    waterPerUnit: 0,
    wastePerUnit: 1.5,
    icon: 'Sprout',
    description: 'Diverted vegetable scraps, coffee grounds, and trimmings into rich compost.',
    impactFact: 'Composting prevents organic matter from generating potent methane in landfills.'
  },
  {
    id: 'short-shower',
    title: 'Speed Shower (< 5 mins)',
    category: 'water',
    basePoints: 15,
    unit: 'session',
    defaultQuantity: 1,
    co2PerUnit: 0.4,
    waterPerUnit: 45,
    wastePerUnit: 0,
    icon: 'Droplets',
    description: 'Kept shower under 5 minutes to conserve hot municipal water.',
    impactFact: 'Standard showerheads deliver ~9.5 liters per minute.'
  }
];

export const CATEGORY_METADATA: Record<string, {
  label: string;
  color: string;
  iconName: string;
  bgLight: string;
  border: string;
  text: string;
  description: string;
}> = {
  transport: {
    label: 'Transport',
    color: 'emerald',
    iconName: 'Bike',
    bgLight: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    description: 'Low-carbon micromobility & transit'
  },
  commute: {
    label: 'Transport',
    color: 'emerald',
    iconName: 'Bike',
    bgLight: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    description: 'Low-carbon micromobility & transit'
  },
  food: {
    label: 'Food',
    color: 'teal',
    iconName: 'Salad',
    bgLight: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-700',
    description: 'Plant-forward & zero food waste'
  },
  energy: {
    label: 'Energy',
    color: 'amber',
    iconName: 'Zap',
    bgLight: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    description: 'Efficiency & natural light conservation'
  },
  waste: {
    label: 'Waste',
    color: 'indigo',
    iconName: 'Repeat',
    bgLight: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-700',
    description: 'Recycling, reuse & plastic reduction'
  },
  water: {
    label: 'Water',
    color: 'cyan',
    iconName: 'Droplets',
    bgLight: 'bg-cyan-50',
    border: 'border-cyan-200',
    text: 'text-cyan-700',
    description: 'Conserving freshwater reserves'
  },
  community: {
    label: 'Community',
    color: 'emerald',
    iconName: 'TreePine',
    bgLight: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    description: 'Greening spaces & collective cleanups'
  }
};
