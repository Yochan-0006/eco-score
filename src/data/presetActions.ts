import { EcoActionDefinition } from '../types';

export const PRESET_ACTIONS: EcoActionDefinition[] = [
  // Commute & Mobility
  {
    id: 'bike-commute',
    title: 'Bicycle or E-Bike Commute',
    category: 'commute',
    basePoints: 25,
    unit: 'km',
    defaultQuantity: 5,
    co2PerUnit: 0.19, // kg CO2 per km replaced vs average petrol car
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Bike',
    description: 'Swapped a motor vehicle trip for pedal power or micromobility.',
    impactFact: 'Cycling 5 km prevents ~1 kg of direct tailpipe carbon emissions.'
  },
  {
    id: 'public-transit',
    title: 'Public Transit (Bus / Train / Metro)',
    category: 'commute',
    basePoints: 15,
    unit: 'km',
    defaultQuantity: 10,
    co2PerUnit: 0.11, // kg CO2 saved per km vs solo driving
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Train',
    description: 'Rode a collective transit vehicle instead of driving a single-occupancy car.',
    impactFact: 'Subways and buses reduce commuter emissions by over 65% per passenger-km.'
  },
  {
    id: 'walk-run',
    title: 'Walking or Running Commute',
    category: 'commute',
    basePoints: 30,
    unit: 'km',
    defaultQuantity: 2,
    co2PerUnit: 0.19,
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Footprints',
    description: 'Zero-emission, zero-fuel personal human transit.',
    impactFact: '100% emission-free travel while enhancing cardiovascular health.'
  },
  {
    id: 'carpool-ev',
    title: 'Carpool or Shared EV Ride',
    category: 'commute',
    basePoints: 12,
    unit: 'km',
    defaultQuantity: 15,
    co2PerUnit: 0.08,
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Car',
    description: 'Shared an empty passenger seat or used clean renewable electric mobility.',
    impactFact: 'Carpooling halves the fuel and emissions footprint per person.'
  },

  // Food & Diet
  {
    id: 'plant-based-meal',
    title: 'Plant-Based Meal',
    category: 'food',
    basePoints: 20,
    unit: 'meal',
    defaultQuantity: 1,
    co2PerUnit: 1.6, // kg CO2 saved per meal vs meat-heavy diet
    waterPerUnit: 780, // Liters of water spared per meal
    wastePerUnit: 0.1,
    icon: 'Salad',
    description: 'Enjoyed a fully plant-forward lunch, dinner, or breakfast.',
    impactFact: 'One plant-based meal saves equivalent water to 12 eight-minute showers.'
  },
  {
    id: 'zero-food-waste',
    title: 'Clean Plate / Zero Food Waste',
    category: 'food',
    basePoints: 15,
    unit: 'meal',
    defaultQuantity: 1,
    co2PerUnit: 0.7,
    waterPerUnit: 150,
    wastePerUnit: 0.35,
    icon: 'Utensils',
    description: 'Ate leftovers, planned portions, and discarded zero edible food.',
    impactFact: 'Global food waste accounts for 8-10% of all greenhouse gas emissions.'
  },
  {
    id: 'local-produce',
    title: 'Local / Farmers Market Produce',
    category: 'food',
    basePoints: 15,
    unit: 'item',
    defaultQuantity: 2,
    co2PerUnit: 0.45,
    waterPerUnit: 30,
    wastePerUnit: 0.05,
    icon: 'Apple',
    description: 'Purchased seasonal vegetables or fruits grown within 150 km.',
    impactFact: 'Cuts food miles and avoids excessive refrigerated cargo transport.'
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

  // Energy & Home
  {
    id: 'line-dry-clothes',
    title: 'Air Dry / Line Dry Clothes',
    category: 'energy',
    basePoints: 25,
    unit: 'load',
    defaultQuantity: 1,
    co2PerUnit: 1.8, // kg CO2 saved by skipping tumble dryer
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Sun',
    description: 'Hung clothes on a rack or clothesline instead of running an electric dryer.',
    impactFact: 'Electric tumble dryers are one of the most power-hungry home appliances.'
  },
  {
    id: 'cold-water-wash',
    title: 'Cold Water Laundry Wash',
    category: 'energy',
    basePoints: 15,
    unit: 'load',
    defaultQuantity: 1,
    co2PerUnit: 0.75,
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Shirt',
    description: 'Washed garments at 30°C or cold tap setting.',
    impactFact: 'Heating water accounts for up to 90% of a washing machine energy usage.'
  },
  {
    id: 'thermostat-eco',
    title: 'Eco Thermostat Adjustment',
    category: 'energy',
    basePoints: 20,
    unit: 'day',
    defaultQuantity: 1,
    co2PerUnit: 1.4,
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'Thermometer',
    description: 'Adjusted temperature by 1-2°C (lower in winter, higher in summer).',
    impactFact: 'Each 1°C adjustment trims about 7-10% off annual heating/cooling emissions.'
  },
  {
    id: 'unplug-standby',
    title: 'Kill Vampire Power (Standby)',
    category: 'energy',
    basePoints: 10,
    unit: 'room',
    defaultQuantity: 1,
    co2PerUnit: 0.35,
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'ZapOff',
    description: 'Turned off power strips and chargers when devices were not in use.',
    impactFact: 'Vampire draw costs average households 5-10% of their electricity bill.'
  },

  // Waste & Circularity
  {
    id: 'composting-organic',
    title: 'Composted Organic Waste',
    category: 'waste',
    basePoints: 20,
    unit: 'kg',
    defaultQuantity: 1.5,
    co2PerUnit: 0.9, // Avoided methane production in anaerobic landfills
    waterPerUnit: 0,
    wastePerUnit: 1.5,
    icon: 'Sprout',
    description: 'Diverted vegetable scraps, coffee grounds, and trimmings into rich compost.',
    impactFact: 'Composting prevents organic matter from generating potent methane in landfills.'
  },
  {
    id: 'reusable-shopping-bag',
    title: 'Reusable Shopping Bag Used',
    category: 'waste',
    basePoints: 10,
    unit: 'bag',
    defaultQuantity: 2,
    co2PerUnit: 0.05,
    waterPerUnit: 8,
    wastePerUnit: 0.03,
    icon: 'ShoppingBag',
    description: 'Carried your own tote bags for grocery or retail shopping.',
    impactFact: 'A plastic bag is used for an average of 12 minutes but persists for 500+ years.'
  },
  {
    id: 'thrift-secondhand',
    title: 'Thrift / Buy Secondhand Item',
    category: 'waste',
    basePoints: 35,
    unit: 'item',
    defaultQuantity: 1,
    co2PerUnit: 5.5, // Avoids manufacturing of brand new fast-fashion item
    waterPerUnit: 2500, // Water required to cultivate & dye cotton for new garment
    wastePerUnit: 0.4,
    icon: 'Repeat',
    description: 'Purchased vintage, secondhand, or refurbished goods instead of new.',
    impactFact: 'Making a single new cotton t-shirt consumes up to 2,700 liters of fresh water.'
  },
  {
    id: 'reusable-water-bottle',
    title: 'Filled Reusable Water Bottle',
    category: 'waste',
    basePoints: 10,
    unit: 'bottle',
    defaultQuantity: 1,
    co2PerUnit: 0.08,
    waterPerUnit: 3,
    wastePerUnit: 0.025,
    icon: 'Sparkles',
    description: 'Hydrated using stainless steel or glass bottle instead of single-use PET.',
    impactFact: 'Producing one PET plastic bottle consumes up to 3 times the volume of water it holds.'
  },

  // Water & Resources
  {
    id: 'short-shower',
    title: 'Speed Shower (< 5 mins)',
    category: 'water',
    basePoints: 15,
    unit: 'session',
    defaultQuantity: 1,
    co2PerUnit: 0.4, // Reduced water heating
    waterPerUnit: 45, // Liters conserved vs 10+ min shower
    wastePerUnit: 0,
    icon: 'Droplets',
    description: 'Kept shower under 5 minutes to conserve hot municipal water.',
    impactFact: 'Standard showerheads deliver ~9.5 liters per minute; halving shower time saves ~45L.'
  },
  {
    id: 'plant-watering-greywater',
    title: 'Water Plants with Rain / Greywater',
    category: 'water',
    basePoints: 15,
    unit: 'bucket',
    defaultQuantity: 1,
    co2PerUnit: 0.05,
    waterPerUnit: 15,
    wastePerUnit: 0,
    icon: 'CloudRain',
    description: 'Reused rinse water or collected rainwater for garden and house plants.',
    impactFact: 'Captures and cycles clean water locally rather than draining treated tap water.'
  },

  // Community & Nature
  {
    id: 'tree-planted',
    title: 'Planted a Tree or Shrub',
    category: 'community',
    basePoints: 60,
    unit: 'tree',
    defaultQuantity: 1,
    co2PerUnit: 22.0, // Lifetime annualized CO2 sequestration per tree
    waterPerUnit: 0,
    wastePerUnit: 0,
    icon: 'TreePine',
    description: 'Planted native flora that creates biodiversity habitat and absorbs carbon.',
    impactFact: 'A mature tree absorbs roughly 22 kg of carbon dioxide every single year.'
  },
  {
    id: 'litter-cleanup',
    title: 'Park or Beach Cleanup',
    category: 'community',
    basePoints: 40,
    unit: 'bag',
    defaultQuantity: 1,
    co2PerUnit: 0.2,
    waterPerUnit: 0,
    wastePerUnit: 3.5, // 3.5 kg trash picked up
    icon: 'Trash2',
    description: 'Collected plastic trash and debris from public spaces or waterways.',
    impactFact: 'Prevents macroplastics from degrading into toxic marine microplastics.'
  }
];

export const CATEGORY_METADATA = {
  commute: {
    label: 'Commute & Travel',
    color: 'emerald',
    iconName: 'Bike',
    bgLight: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    description: 'Low-carbon micromobility & transit'
  },
  food: {
    label: 'Food & Diet',
    color: 'green',
    iconName: 'Salad',
    bgLight: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-700',
    description: 'Plant-forward & waste-free nutrition'
  },
  energy: {
    label: 'Energy & Home',
    color: 'amber',
    iconName: 'Zap',
    bgLight: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    description: 'Efficiency & smart conservation'
  },
  waste: {
    label: 'Waste & Circularity',
    color: 'indigo',
    iconName: 'Repeat',
    bgLight: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-700',
    description: 'Composting, reuse & zero-plastic'
  },
  water: {
    label: 'Water & Resources',
    color: 'cyan',
    iconName: 'Droplets',
    bgLight: 'bg-cyan-50',
    border: 'border-cyan-200',
    text: 'text-cyan-700',
    description: 'Conserving freshwater reserves'
  },
  community: {
    label: 'Nature & Community',
    color: 'emerald',
    iconName: 'TreePine',
    bgLight: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    description: 'Greening spaces & collective cleanups'
  }
};
