import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { NavigationTab, ActionCategory } from '../../types';
import { 
  Bike, 
  Footprints, 
  Train, 
  Car, 
  Salad, 
  Utensils, 
  CheckCircle2, 
  Lightbulb, 
  Thermometer, 
  Sun, 
  Repeat, 
  Sparkles, 
  ShoppingBag,
  Plus,
  Minus,
  Check,
  X,
  ArrowRight,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { IconHelper } from '../common/IconHelper';

interface LogActionPageProps {
  setActiveTab?: (tab: NavigationTab) => void;
}

interface ActionItem {
  id: string;
  title: string;
  category: 'transport' | 'food' | 'energy' | 'waste';
  icon: string;
  description: string;
  points: number;
  unit: string;
  co2SavedKg: number;
}

// 4 Exact Categories and Actions specified in brief
const ACTION_CATEGORIES: {
  id: 'transport' | 'food' | 'energy' | 'waste';
  title: string;
  icon: string;
  color: string;
  border: string;
  badgeBg: string;
  actions: ActionItem[];
}[] = [
  {
    id: 'transport',
    title: 'TRANSPORT',
    icon: 'Bike',
    color: 'text-emerald-700',
    border: 'border-emerald-200',
    badgeBg: 'bg-emerald-50',
    actions: [
      {
        id: 'walk',
        title: 'Walk',
        category: 'transport',
        icon: 'Footprints',
        description: 'Zero-emission walking travel for commutes or daily errands.',
        points: 20,
        unit: 'trip',
        co2SavedKg: 0.8
      },
      {
        id: 'bicycle',
        title: 'Bicycle',
        category: 'transport',
        icon: 'Bike',
        description: 'Pedal power commute or recreational ride instead of driving.',
        points: 25,
        unit: 'trip',
        co2SavedKg: 1.2
      },
      {
        id: 'public-transport',
        title: 'Public Transport',
        category: 'transport',
        icon: 'Train',
        description: 'Rode bus, train, or metro to reduce collective traffic emissions.',
        points: 20,
        unit: 'trip',
        co2SavedKg: 1.5
      },
      {
        id: 'carpool',
        title: 'Carpool',
        category: 'transport',
        icon: 'Car',
        description: 'Shared a vehicle ride with friends, neighbors, or coworkers.',
        points: 15,
        unit: 'trip',
        co2SavedKg: 1.0
      },
      {
        id: 'car',
        title: 'Car',
        category: 'transport',
        icon: 'Car',
        description: 'Eco-driving trip, EV trip, or chained multiple errands efficiently.',
        points: 5,
        unit: 'trip',
        co2SavedKg: 0.2
      }
    ]
  },
  {
    id: 'food',
    title: 'FOOD',
    icon: 'Salad',
    color: 'text-teal-700',
    border: 'border-teal-200',
    badgeBg: 'bg-teal-50',
    actions: [
      {
        id: 'vegan-meal',
        title: 'Vegan Meal',
        category: 'food',
        icon: 'Salad',
        description: '100% plant-based meal avoiding livestock carbon and water footprint.',
        points: 25,
        unit: 'meal',
        co2SavedKg: 1.8
      },
      {
        id: 'vegetarian-meal',
        title: 'Vegetarian Meal',
        category: 'food',
        icon: 'Utensils',
        description: 'Meat-free meal packed with vegetables, legumes, or grains.',
        points: 15,
        unit: 'meal',
        co2SavedKg: 1.2
      },
      {
        id: 'avoided-food-waste',
        title: 'Avoided Food Waste',
        category: 'food',
        icon: 'CheckCircle2',
        description: 'Finished leftovers and discarded zero edible food into trash.',
        points: 20,
        unit: 'meal',
        co2SavedKg: 0.8
      }
    ]
  },
  {
    id: 'energy',
    title: 'ENERGY',
    icon: 'Zap',
    color: 'text-amber-700',
    border: 'border-amber-200',
    badgeBg: 'bg-amber-50',
    actions: [
      {
        id: 'turned-off-lights',
        title: 'Turned Off Unused Lights',
        category: 'energy',
        icon: 'Lightbulb',
        description: 'Switched off lights in empty rooms and hallways.',
        points: 10,
        unit: 'room',
        co2SavedKg: 0.4
      },
      {
        id: 'reduced-ac-usage',
        title: 'Reduced AC Usage',
        category: 'energy',
        icon: 'Thermometer',
        description: 'Adjusted thermostat or used natural ventilation to conserve power.',
        points: 20,
        unit: 'day',
        co2SavedKg: 1.5
      },
      {
        id: 'used-natural-light',
        title: 'Used Natural Light',
        category: 'energy',
        icon: 'Sun',
        description: 'Opened curtains and worked under sunlight instead of artificial lighting.',
        points: 15,
        unit: 'day',
        co2SavedKg: 0.6
      }
    ]
  },
  {
    id: 'waste',
    title: 'WASTE',
    icon: 'Repeat',
    color: 'text-indigo-700',
    border: 'border-indigo-200',
    badgeBg: 'bg-indigo-50',
    actions: [
      {
        id: 'recycled',
        title: 'Recycled',
        category: 'waste',
        icon: 'Repeat',
        description: 'Sorted paper, aluminum cans, glass, and rigid plastics for recycling.',
        points: 15,
        unit: 'bin',
        co2SavedKg: 0.7
      },
      {
        id: 'avoided-single-use-plastic',
        title: 'Avoided Single-Use Plastic',
        category: 'waste',
        icon: 'Sparkles',
        description: 'Declined disposable plastic bags, cups, straws, or cutlery.',
        points: 15,
        unit: 'item',
        co2SavedKg: 0.3
      },
      {
        id: 'reused-container',
        title: 'Reused Container',
        category: 'waste',
        icon: 'ShoppingBag',
        description: 'Used reusable lunchbox, stainless tumbler, or shopping tote bag.',
        points: 15,
        unit: 'item',
        co2SavedKg: 0.5
      }
    ]
  }
];

export const LogActionPage: React.FC<LogActionPageProps> = ({ setActiveTab }) => {
  const { logAction, totalPoints, user } = useEco();

  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | 'transport' | 'food' | 'energy' | 'waste'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Success Modal State
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    pointsEarned: number;
    prevScore: number;
    newScore: number;
    actionTitle: string;
  } | null>(null);

  // Stepper helper
  const getQty = (actionId: string) => quantities[actionId] ?? 1;
  const updateQty = (actionId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [actionId]: Math.max(1, (prev[actionId] ?? 1) + delta)
    }));
  };

  // Select action and execute logging flow
  const handleSelectAction = (action: ActionItem) => {
    const qty = getQty(action.id);
    const result = logAction(action.id, qty);

    const prevScore = result?.prevScore ?? totalPoints;
    const pointsEarned = result?.pointsEarned ?? (action.points * qty);
    const newScore = result?.newScore ?? (prevScore + pointsEarned);

    // Trigger celebration animation
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#059669', '#10b981', '#34d399', '#f59e0b', '#3b82f6']
      });
    } catch {
      // fallback
    }

    // Open Success Modal
    setSuccessModal({
      isOpen: true,
      pointsEarned,
      prevScore,
      newScore,
      actionTitle: action.title
    });
  };

  // Filter categories and actions
  const filteredCategories = ACTION_CATEGORIES.map(cat => {
    if (activeCategoryTab !== 'all' && activeCategoryTab !== cat.id) {
      return null;
    }
    const filteredActions = cat.actions.filter(a => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q);
    });
    return {
      ...cat,
      actions: filteredActions
    };
  }).filter(Boolean) as typeof ACTION_CATEGORIES;

  const totalVisibleActions = filteredCategories.reduce((sum, c) => sum + c.actions.length, 0);

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Log Sustainable Action
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Select an eco action to record it to your activity history, earn points, and build your streak.
          </p>
        </div>

        {/* Live Score Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/90 text-emerald-950 text-xs font-bold self-start sm:self-auto">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Current Score: {totalPoints} EcoPoints</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl w-fit overflow-x-auto text-xs">
          <button
            onClick={() => setActiveCategoryTab('all')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              activeCategoryTab === 'all'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => setActiveCategoryTab('transport')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              activeCategoryTab === 'transport'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Bike className="w-3.5 h-3.5" />
            <span>Transport</span>
          </button>
          <button
            onClick={() => setActiveCategoryTab('food')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              activeCategoryTab === 'food'
                ? 'bg-teal-700 text-white shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Salad className="w-3.5 h-3.5" />
            <span>Food</span>
          </button>
          <button
            onClick={() => setActiveCategoryTab('energy')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              activeCategoryTab === 'energy'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Energy</span>
          </button>
          <button
            onClick={() => setActiveCategoryTab('waste')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              activeCategoryTab === 'waste'
                ? 'bg-indigo-700 text-white shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Waste</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search action..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white rounded-lg border border-zinc-200 text-xs text-zinc-900 focus:outline-emerald-600 shadow-2xs"
          />
        </div>
      </div>

      {/* 4 Categorized Sections */}
      {totalVisibleActions === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-zinc-200/80 space-y-3">
          <p className="text-sm font-bold text-zinc-800">No actions matched "{searchQuery}"</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategoryTab('all'); }}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {filteredCategories.map(category => (
            <div key={category.id} className="space-y-4">
              
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${category.border} ${category.badgeBg} ${category.color}`}>
                    <IconHelper name={category.icon} className="w-4 h-4" />
                  </div>
                  <h2 className="text-sm sm:text-base font-extrabold tracking-wider text-zinc-900">
                    {category.title}
                  </h2>
                </div>
                <span className="text-xs font-mono text-zinc-400 font-medium">
                  {category.actions.length} {category.actions.length === 1 ? 'action' : 'actions'}
                </span>
              </div>

              {/* Action Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.actions.map(action => {
                  const qty = getQty(action.id);
                  const totalActionPoints = action.points * qty;

                  return (
                    <div
                      key={action.id}
                      className="rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:shadow-xs hover:border-zinc-300 transition-all p-5 flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        {/* Header: Icon & Points */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-zinc-100 group-hover:bg-emerald-50 text-zinc-800 group-hover:text-emerald-700 flex items-center justify-center transition-colors shrink-0">
                              <IconHelper name={action.icon} className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-zinc-900 leading-snug">
                                {action.title}
                              </h3>
                              <span className="text-[11px] text-zinc-400 uppercase font-semibold">
                                {category.title}
                              </span>
                            </div>
                          </div>

                          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg shrink-0">
                            +{action.points} pts
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-zinc-600 leading-relaxed">
                          {action.description}
                        </p>
                      </div>

                      {/* Controls and Select Button */}
                      <div className="pt-4 mt-3 border-t border-zinc-100 space-y-3">
                        
                        {/* Optional Quantity Adjuster */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-500 font-medium">Quantity</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQty(action.id, -1)}
                              className="w-6 h-6 rounded-md border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 flex items-center justify-center text-zinc-600 cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono font-bold text-zinc-800 min-w-8 text-center">
                              {qty} {action.unit}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(action.id, 1)}
                              className="w-6 h-6 rounded-md border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 flex items-center justify-center text-zinc-600 cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Select Action Button */}
                        <button
                          onClick={() => handleSelectAction(action)}
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>Select Action (+{totalActionPoints} pts)</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 8. POLISHED SUCCESS MODAL */}
      {successModal && successModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-2xl text-center overflow-hidden animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Ambient emerald glow */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Dismiss button */}
            <button
              onClick={() => setSuccessModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Celebration Emblem Animation */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-4 animate-bounce">
              <span className="text-3xl" role="img" aria-label="sprout">🌱</span>
            </div>

            {/* Exact Required Title */}
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              Great choice! 🌱
            </h2>

            {/* Exact Required Points Badge */}
            <div className="my-3 inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-base font-extrabold font-mono text-emerald-800">
                +{successModal.pointsEarned} EcoPoints
              </span>
            </div>

            {/* Exact Required Score Change Text */}
            <div className="p-4 my-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <p className="text-sm font-semibold text-zinc-800">
                Your EcoScore increased from{' '}
                <span className="font-mono font-bold text-zinc-900">{successModal.prevScore}</span> to{' '}
                <span className="font-mono font-bold text-emerald-700">{successModal.newScore}</span>
              </p>

              {/* Visual Score Progress Bar */}
              <div className="w-full h-2.5 bg-zinc-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                  style={{ width: '100%' }}
                />
              </div>

              <p className="text-[11px] text-zinc-500">
                Action recorded in local activity history and streak maintained!
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <button
                onClick={() => setSuccessModal(null)}
                className="w-full sm:flex-1 py-2.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Log Another Action
              </button>

              {setActiveTab && (
                <button
                  onClick={() => {
                    setSuccessModal(null);
                    setActiveTab('dashboard');
                  }}
                  className="w-full sm:flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View in Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
