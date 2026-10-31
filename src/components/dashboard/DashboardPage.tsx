import React, { useState, useMemo } from 'react';
import { useEco } from '../../context/EcoContext';
import { NavigationTab, ActionCategory, EcoActionDefinition } from '../../types';
import { 
  Flame, 
  Sparkles, 
  TrendingUp, 
  PlusCircle, 
  ArrowRight, 
  Trash2, 
  CheckCircle2, 
  Bike, 
  Salad, 
  Zap, 
  Repeat, 
  Calendar,
  Check,
  RefreshCw,
  Award,
  ChevronRight,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { IconHelper } from '../common/IconHelper';

interface DashboardPageProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ setActiveTab }) => {
  const { 
    user, 
    totalPoints, 
    weeklyEcoPoints, 
    totalActionsCount, 
    levelInfo, 
    loggedActions, 
    deleteLog, 
    logAction,
    allActions
  } = useEco();

  // Chart view mode: 'daily' points vs 'cumulative'
  const [chartMode, setChartMode] = useState<'daily' | 'cumulative'>('daily');

  // Quick win pool
  const quickWinList: { actionId: string; title: string; pts: number; unit: string; qty: number; tip: string; icon: string; category: ActionCategory }[] = [
    {
      actionId: 'reusable-water-bottle',
      title: 'Fill a Reusable Water Bottle',
      pts: 10,
      unit: 'bottle',
      qty: 1,
      tip: 'Takes 10 seconds. Keeps 1 disposable PET bottle out of landfills.',
      icon: 'Sparkles',
      category: 'waste'
    },
    {
      actionId: 'reusable-cup',
      title: 'Pack a Reusable Coffee Mug',
      pts: 10,
      unit: 'cup',
      qty: 1,
      tip: 'Bring your own tumbler to the café instead of a plastic-lined cup.',
      icon: 'Coffee',
      category: 'food'
    },
    {
      actionId: 'short-shower',
      title: 'Take a Speed Shower (< 5 mins)',
      pts: 15,
      unit: 'session',
      qty: 1,
      tip: 'Cut shower time by 3 minutes to conserve ~30 liters of warm water.',
      icon: 'Droplets',
      category: 'water'
    },
    {
      actionId: 'unplug-standby',
      title: 'Unplug Vampire Electronics',
      pts: 10,
      unit: 'room',
      qty: 1,
      tip: 'Switch off unused chargers and TV strips before leaving the room.',
      icon: 'ZapOff',
      category: 'energy'
    },
    {
      actionId: 'plant-based-meal',
      title: 'Choose a Plant-Based Lunch',
      pts: 20,
      unit: 'meal',
      qty: 1,
      tip: 'Swap meat for a hearty lentil, tofu, or grain bowl.',
      icon: 'Salad',
      category: 'food'
    },
    {
      actionId: 'cold-water-wash',
      title: 'Wash Laundry with Cold Water',
      pts: 15,
      unit: 'load',
      qty: 1,
      tip: 'Heating wash water consumes 90% of a washer’s energy. Go cold!',
      icon: 'Shirt',
      category: 'energy'
    }
  ];

  const [quickWinIndex, setQuickWinIndex] = useState(0);
  const currentQuickWin = quickWinList[quickWinIndex % quickWinList.length];

  // Dynamic greeting based on time of day
  const getGreetingWord = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Generate 7-day weekly timeline data for Recharts
  const weeklyChartData = useMemo(() => {
    const days = 7;
    const now = new Date();
    const result: { day: string; fullDate: string; points: number; cumulative: number; co2: number; count: number }[] = [];

    // Pre-create last 7 days
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const iso = d.toISOString().split('T')[0];
      const isToday = i === 0;
      const dayName = isToday ? 'Today' : d.toLocaleDateString(undefined, { weekday: 'short' });
      result.push({
        day: dayName,
        fullDate: iso,
        points: 0,
        cumulative: 0,
        co2: 0,
        count: 0
      });
    }

    // Populate points & co2 from loggedActions
    for (const log of loggedActions) {
      if (!log.timestamp) continue;
      const dateStr = log.timestamp.split('T')[0];
      const target = result.find(r => r.fullDate === dateStr);
      if (target) {
        target.points += log.pointsEarned;
        target.co2 = Number((target.co2 + log.co2SavedKg).toFixed(2));
        target.count += 1;
      }
    }

    // Compute rolling cumulative points for the week
    let running = 0;
    for (const r of result) {
      running += r.points;
      r.cumulative = running;
    }

    return result;
  }, [loggedActions]);

  // Dynamic Category Breakdown for the 4 core categories: Transport, Food, Energy, Waste
  const categoryStats = useMemo(() => {
    const cats: { key: 'commute' | 'food' | 'energy' | 'waste'; label: string; icon: string; color: string; barColor: string }[] = [
      { key: 'commute', label: 'Transport', icon: 'Bike', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', barColor: 'bg-emerald-600' },
      { key: 'food', label: 'Food', icon: 'Salad', color: 'text-teal-700 bg-teal-50 border-teal-200', barColor: 'bg-teal-600' },
      { key: 'energy', label: 'Energy', icon: 'Zap', color: 'text-amber-700 bg-amber-50 border-amber-200', barColor: 'bg-amber-500' },
      { key: 'waste', label: 'Waste', icon: 'Repeat', color: 'text-indigo-700 bg-indigo-50 border-indigo-200', barColor: 'bg-indigo-600' }
    ];

    const totals: Record<string, { points: number; count: number; co2: number }> = {
      commute: { points: 0, count: 0, co2: 0 },
      food: { points: 0, count: 0, co2: 0 },
      energy: { points: 0, count: 0, co2: 0 },
      waste: { points: 0, count: 0, co2: 0 }
    };

    let grandCategoryPoints = 0;

    for (const log of loggedActions) {
      const catKey = log.category;
      if (totals[catKey]) {
        totals[catKey].points += log.pointsEarned;
        totals[catKey].count += 1;
        totals[catKey].co2 = Number((totals[catKey].co2 + log.co2SavedKg).toFixed(2));
        grandCategoryPoints += log.pointsEarned;
      }
    }

    return cats.map(c => {
      const p = totals[c.key].points;
      const count = totals[c.key].count;
      const co2 = totals[c.key].co2;
      const percent = grandCategoryPoints > 0 ? Math.round((p / grandCategoryPoints) * 100) : 0;
      return {
        ...c,
        points: p,
        count,
        co2,
        percent
      };
    });
  }, [loggedActions]);

  // Handle Quick Win Click
  const handleLogQuickWin = () => {
    logAction(currentQuickWin.actionId, currentQuickWin.qty, `Completed quick win recommendation`);
    // Advance to next quick win for variety
    setQuickWinIndex(prev => prev + 1);
  };

  // Circular gauge math for EcoScore card
  // Radius = 58, Circumference = 2 * PI * 58 ≈ 364.42
  const circleRadius = 58;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (levelInfo.progressPercent / 100) * circumference;

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* 1. GREETING SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium mb-1">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span aria-hidden="true">·</span>
            <span>Personal Climate Dashboard</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
            <span>{getGreetingWord()}, {user.name}</span>
            <span role="img" aria-label="sprout">🌱</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 font-medium mt-1">
            Ready to make a greener choice today?
          </p>
        </div>

        {/* Action button CTA */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('log')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Eco Action</span>
          </button>
        </div>
      </div>

      {/* 2. CURRENT ECOSCORE CARD (Hero) */}
      <div className="rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950 text-white p-6 sm:p-8 shadow-sm relative overflow-hidden border border-zinc-800">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Circular Progress Gauge */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
                {/* Background Ring */}
                <circle
                  cx="70"
                  cy="70"
                  r={circleRadius}
                  className="text-zinc-800"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                />
                {/* Animated Progress Ring */}
                <circle
                  cx="70"
                  cy="70"
                  r={circleRadius}
                  className="text-emerald-500 transition-all duration-1000 ease-out"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>

              {/* Gauge Inner Score Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white">
                  {totalPoints}
                </span>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400 mt-0.5">
                  EcoScore
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  {levelInfo.progressPercent}% of Tier {levelInfo.levelNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Score Details & Encouraging Message */}
          <div className="md:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-900/60 border border-emerald-700/60 px-3 py-1 rounded-lg">
                Level {levelInfo.levelNumber}: {levelInfo.currentLevel}
              </span>
              <span className="text-xs text-zinc-400">
                Progress: {totalPoints} / {levelInfo.nextMax} pts
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Your Cumulative Planetary Standing
              </h2>
              {/* Short encouraging message */}
              <p className="text-sm text-emerald-100/90 leading-relaxed max-w-xl">
                {levelInfo.encouragingMessage}
              </p>
            </div>

            {/* Linear sub-progress indicator */}
            <div className="pt-2 max-w-lg">
              <div className="flex justify-between items-center text-xs text-zinc-400 mb-1 font-mono">
                <span>Tier Baseline: {levelInfo.currentMin} pts</span>
                <span>Next Milestone: {levelInfo.nextMax} pts</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700/50">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-zinc-300">
              <button
                onClick={() => setActiveTab('achievements')}
                className="hover:text-emerald-400 underline underline-offset-4 font-semibold transition-colors cursor-pointer"
              >
                View Badges & Perks →
              </button>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className="hover:text-emerald-400 underline underline-offset-4 font-semibold transition-colors cursor-pointer"
              >
                Compare on Leaderboard →
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. STATISTICS ROW: Weekly EcoPoints, Actions Completed, Current Streak */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Stat 1: Weekly EcoPoints */}
        <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:border-zinc-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Weekly EcoPoints
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-zinc-900">
              {weeklyEcoPoints}
            </span>
            <span className="text-xs text-emerald-700 font-semibold">pts / 7 days</span>
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            Points earned across the past 7 rolling days
          </p>
        </div>

        {/* Stat 2: Actions Completed */}
        <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:border-zinc-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Actions Completed
            </span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-zinc-900">
              {totalActionsCount}
            </span>
            <span className="text-xs text-zinc-500 font-medium">habits logged</span>
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            Total verified sustainable choices to date
          </p>
        </div>

        {/* Stat 3: Current Streak */}
        <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:border-zinc-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Current Streak
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-zinc-900">
              {user.streakDays}
            </span>
            <span className="text-xs text-amber-600 font-bold">Days in a Row</span>
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            Log at least 1 action today to maintain flame
          </p>
        </div>

      </div>

      {/* 4. WEEKLY ECOPOINT CHART USING RECHARTS */}
      <div className="rounded-2xl bg-white border border-zinc-200/90 p-6 sm:p-7 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h2 className="text-base font-bold text-zinc-900 tracking-tight">
                Weekly EcoScore Trend
              </h2>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Daily sustainability points recorded over the last 7 days
            </p>
          </div>

          {/* Toggle between Daily Points and Cumulative */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-lg text-xs self-start sm:self-auto">
            <button
              onClick={() => setChartMode('daily')}
              className={`px-3 py-1 font-semibold rounded-md transition-colors cursor-pointer ${
                chartMode === 'daily' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Daily Velocity
            </button>
            <button
              onClick={() => setChartMode('cumulative')}
              className={`px-3 py-1 font-semibold rounded-md transition-colors cursor-pointer ${
                chartMode === 'cumulative' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Weekly Cumulative
            </button>
          </div>
        </div>

        {/* Recharts Chart Canvas */}
        <div className="h-64 sm:h-72 w-full pt-3">
          <ResponsiveContainer width="100%" height="100%">
            {chartMode === 'daily' ? (
              <BarChart data={weeklyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis 
                  dataKey="day" 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={{ stroke: '#e4e4e7' }}
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={{ stroke: '#e4e4e7' }}
                />
                <Tooltip
                  cursor={{ fill: '#f4f4f5', opacity: 0.6 }}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e4e4e7', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
                  formatter={(value: any) => [`${value} EcoPoints`, 'Points']}
                  labelFormatter={(label) => `Day: ${label}`}
                />
                <Bar 
                  dataKey="points" 
                  fill="#059669" 
                  radius={[6, 6, 0, 0]} 
                  maxBarSize={42} 
                />
              </BarChart>
            ) : (
              <AreaChart data={weeklyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cumulGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis 
                  dataKey="day" 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={{ stroke: '#e4e4e7' }}
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={{ stroke: '#e4e4e7' }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e4e4e7', fontSize: '12px' }}
                  formatter={(value: any) => [`${value} EcoPoints`, 'Cumulative Total']}
                />
                <Area 
                  type="monotone" 
                  dataKey="cumulative" 
                  stroke="#059669" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#cumulGrad)" 
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. CATEGORY BREAKDOWN & 6. QUICK WIN RECOMMENDATION ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* CATEGORY BREAKDOWN: Transport, Food, Energy, Waste */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-zinc-200/90 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-zinc-900 tracking-tight">Category Breakdown</h2>
              <p className="text-xs text-zinc-500">EcoPoints distribution across core lifestyle areas</p>
            </div>
            <button
              onClick={() => setActiveTab('analytics')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Full Analytics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {categoryStats.map(cat => (
              <div key={cat.key} className="space-y-2 p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-200/70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${cat.color}`}>
                      <IconHelper name={cat.icon} className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-900">{cat.label}</p>
                      <p className="text-[11px] text-zinc-500">
                        {cat.count} {cat.count === 1 ? 'action' : 'actions'} · -{cat.co2} kg CO₂
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-sm font-extrabold text-zinc-900">
                      {cat.points} pts
                    </span>
                    <span className="text-[11px] text-zinc-400 block font-mono">
                      {cat.percent}% of total
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${cat.barColor} rounded-full transition-all duration-700`}
                    style={{ width: `${Math.max(4, cat.percent)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. QUICK WIN RECOMMENDATION CARD */}
        <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-white via-emerald-50/40 to-white border border-emerald-200/80 p-6 shadow-2xs space-y-4 relative overflow-hidden">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-300/60 px-2 py-0.5 rounded-md">
                Quick Win Recommendation
              </span>
            </div>

            <button
              onClick={() => setQuickWinIndex(prev => prev + 1)}
              className="text-xs text-zinc-500 hover:text-zinc-800 inline-flex items-center gap-1 cursor-pointer"
              title="Shuffle to another quick win"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Next</span>
            </button>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                <IconHelper name={currentQuickWin.icon} className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 leading-snug">
                  {currentQuickWin.title}
                </h3>
                <span className="inline-block mt-1 text-xs font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-200">
                  +{currentQuickWin.pts} EcoPoints Reward
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed pt-1">
              {currentQuickWin.tip}
            </p>
          </div>

          {/* Actionable Button */}
          <div className="pt-2">
            <button
              onClick={handleLogQuickWin}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Log This Quick Win (+{currentQuickWin.pts} pts)</span>
            </button>
          </div>

          <div className="pt-2 text-[11px] text-zinc-400 text-center flex items-center justify-center gap-1.5 border-t border-emerald-100/70">
            <Info className="w-3 h-3 text-emerald-600" />
            <span>Immediate 1-click update to your streak and score</span>
          </div>

        </div>

      </div>

      {/* 7. RECENT ACTIVITY LIST */}
      <div className="rounded-2xl bg-white border border-zinc-200/90 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-zinc-900 tracking-tight">Recent Activity</h2>
            <p className="text-xs text-zinc-500">Live journal of verified eco-actions stored locally</p>
          </div>
          <button
            onClick={() => setActiveTab('log')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Log New Habit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loggedActions.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-zinc-50 border border-zinc-200/60 space-y-2">
            <p className="text-sm font-semibold text-zinc-800">No actions recorded yet</p>
            <p className="text-xs text-zinc-500">Tap "Log Eco Action" above to add your first sustainable choice.</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {loggedActions.slice(0, 7).map(action => {
              const dateObj = new Date(action.timestamp);
              const dateFormatted = isNaN(dateObj.getTime())
                ? 'Recent'
                : dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' · ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <div 
                  key={action.id} 
                  className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center shrink-0">
                      <IconHelper 
                        name={
                          action.category === 'commute' ? 'Bike' : 
                          action.category === 'food' ? 'Salad' : 
                          action.category === 'energy' ? 'Sun' : 
                          action.category === 'waste' ? 'Repeat' : 'Droplets'
                        } 
                        className="w-4 h-4" 
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
                          {action.title}
                        </p>
                        <span className="text-[11px] font-mono text-zinc-500 shrink-0">
                          ({action.quantity} {action.unit})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                        <span>{dateFormatted}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-700 font-medium">-{action.co2SavedKg} kg CO₂</span>
                        {action.waterSavedL > 0 && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-cyan-700 font-medium">-{action.waterSavedL}L</span>
                          </>
                        )}
                      </div>

                      {action.note && (
                        <p className="text-[11px] text-zinc-500 italic mt-0.5 truncate">
                          "{action.note}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                      +{action.pointsEarned} pts
                    </span>
                    <button
                      onClick={() => deleteLog(action.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-rose-600 rounded transition-all cursor-pointer"
                      title="Delete action"
                      aria-label="Delete action"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
