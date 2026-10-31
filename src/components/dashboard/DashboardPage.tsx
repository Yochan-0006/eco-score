import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { NavigationTab, ActionCategory } from '../../types';
import { 
  Flame, 
  Sparkles, 
  TrendingUp, 
  PlusCircle, 
  ArrowRight, 
  Trash2, 
  CheckCircle2, 
  Droplets, 
  TreePine, 
  Car, 
  Repeat, 
  Target, 
  Calendar,
  Zap,
  Info
} from 'lucide-react';
import { IconHelper } from '../common/IconHelper';

interface DashboardPageProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ setActiveTab }) => {
  const { 
    user, 
    totalPoints, 
    todayPoints, 
    todayGoalPercent,
    todayLogsCount,
    totalCo2SavedKg, 
    totalWaterSavedL, 
    totalWasteSavedKg, 
    treesEquivalent,
    carMilesAvoided,
    smartphoneChargesSaved,
    loggedActions, 
    deleteLog,
    logAction,
    challenges,
    claimChallenge,
    userRank
  } = useEco();

  const [categoryFilter, setCategoryFilter] = useState<'all' | ActionCategory>('all');

  // Greeting based on hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Filtered recent logs
  const filteredLogs = loggedActions.filter(log => {
    if (categoryFilter === 'all') return true;
    return log.category === categoryFilter;
  });

  // Top 4 quick actions for fast logging
  const quickHabits = [
    { id: 'bike-commute', label: 'Cycled 5 km', qty: 5, icon: 'Bike', pts: 25 },
    { id: 'plant-based-meal', label: 'Plant Meal', qty: 1, icon: 'Salad', pts: 20 },
    { id: 'reusable-cup', label: 'Reusable Cup', qty: 1, icon: 'Coffee', pts: 10 },
    { id: 'line-dry-clothes', label: 'Line Dry Load', qty: 1, icon: 'Sun', pts: 25 },
    { id: 'composting-organic', label: 'Compost 1kg', qty: 1, icon: 'Sprout', pts: 20 },
    { id: 'short-shower', label: 'Speed Shower', qty: 1, icon: 'Droplets', pts: 15 }
  ];

  // Active or ready to claim challenges
  const activeChallenges = challenges.filter(c => c.status === 'active' || c.status === 'completed').slice(0, 3);

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span aria-hidden="true">·</span>
            <span>Local Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight mt-1">
            {getGreeting()}, {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            You're currently ranked <span className="font-semibold text-emerald-700">#{userRank}</span> with a <span className="font-semibold text-amber-600">{user.streakDays}-day streak</span>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('log')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Sustainable Action</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-white hover:bg-zinc-50 text-zinc-700 text-xs sm:text-sm font-semibold rounded-xl border border-zinc-200 shadow-2xs transition-all cursor-pointer"
          >
            <TrendingUp className="w-4 h-4 text-zinc-500" />
            <span>Analytics</span>
          </button>
        </div>
      </div>

      {/* Hero EcoScore & Daily Goal Card */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-zinc-900 text-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left score & status */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-700/50 px-2.5 py-0.5 rounded-md">
                {user.ecoLevel}
              </span>
              <span className="text-xs text-emerald-200/70">
                Streak Shield: {user.streakFreezeCount} Available
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-white">
                {totalPoints}
              </span>
              <span className="text-lg text-emerald-200 font-medium">EcoPoints Balance</span>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-xl">
              Every point represents a real-world verifiable reduction in atmospheric greenhouse gas or freshwater depletion.
            </p>

            {/* Daily Goal Bar */}
            <div className="pt-2 max-w-md">
              <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                <span className="text-emerald-200">Today's Daily Target</span>
                <span className="font-mono text-emerald-300 font-bold">{todayPoints} / {user.dailyGoalPoints || 100} pts ({todayGoalPercent}%)</span>
              </div>
              <div className="w-full h-2.5 bg-emerald-950/80 rounded-full overflow-hidden border border-emerald-700/40">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, todayGoalPercent)}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-emerald-300/70 mt-1">
                <span>{todayLogsCount} {todayLogsCount === 1 ? 'action' : 'actions'} recorded today</span>
                {todayGoalPercent >= 100 ? (
                  <span className="text-emerald-300 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Goal Reached!
                  </span>
                ) : (
                  <span>{Math.max(0, (user.dailyGoalPoints || 100) - todayPoints)} pts to hit goal</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Streak & Status Card */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <div className="flex-1 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center">
                  <Flame className="w-6 h-6 fill-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-emerald-200 font-medium">Active Streak</p>
                  <p className="text-2xl font-bold font-mono text-white">{user.streakDays} Days</p>
                </div>
              </div>
              <span className="text-xs text-emerald-200/90 font-medium bg-emerald-900/60 px-2 py-1 rounded-md border border-emerald-700/40">
                On Fire 🔥
              </span>
            </div>

            <div className="flex-1 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400/30 text-teal-300 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-emerald-200 font-medium">Global Ranking</p>
                  <p className="text-2xl font-bold font-mono text-white">#{userRank} <span className="text-xs font-sans text-emerald-300">of 1,240</span></p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className="text-xs text-white hover:text-emerald-200 font-semibold underline underline-offset-2 cursor-pointer"
              >
                Board
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Impact Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total CO2 Saved */}
        <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:border-zinc-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">CO₂ Diverted</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TreePine className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-900">{totalCo2SavedKg}</span>
            <span className="text-xs text-zinc-500 font-medium">kg CO₂e</span>
          </div>
          <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1.5">
            <span>≈ Equal to</span>
            <strong className="text-zinc-800">{treesEquivalent} tree-years</strong>
            <span>of carbon</span>
          </p>
        </div>

        {/* Metric 2: Freshwater Saved */}
        <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:border-zinc-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Water Conserved</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-900">{totalWaterSavedL.toLocaleString()}</span>
            <span className="text-xs text-zinc-500 font-medium">Liters</span>
          </div>
          <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1.5">
            <span>≈ Spared</span>
            <strong className="text-zinc-800">{Math.round(totalWaterSavedL / 45)}</strong>
            <span>eight-minute showers</span>
          </p>
        </div>

        {/* Metric 3: Travel Avoided */}
        <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:border-zinc-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Tailpipe Averted</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-900">{carMilesAvoided}</span>
            <span className="text-xs text-zinc-500 font-medium">car miles</span>
          </div>
          <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1.5">
            <span>Replaced with pedal & transit</span>
          </p>
        </div>

        {/* Metric 4: Waste Diverted */}
        <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:border-zinc-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Landfill Diverted</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Repeat className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-900">{totalWasteSavedKg}</span>
            <span className="text-xs text-zinc-500 font-medium">kg solid</span>
          </div>
          <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1.5">
            <span>Composted & reused material</span>
          </p>
        </div>
      </div>

      {/* Quick 1-Click Fast Log Bar */}
      <div className="rounded-2xl bg-white border border-zinc-200/90 p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-zinc-900 tracking-tight">Quick Action Shortcuts</h2>
            <span className="text-xs text-zinc-500 hidden sm:inline">(Tap to log in 1-second)</span>
          </div>
          <button
            onClick={() => setActiveTab('log')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Full Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {quickHabits.map(habit => (
            <button
              key={habit.id}
              onClick={() => logAction(habit.id, habit.qty, 'Quick 1-tap shortcut')}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 hover:bg-emerald-50/60 hover:border-emerald-200 transition-all text-center group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200/70 group-hover:border-emerald-300 text-zinc-700 group-hover:text-emerald-700 flex items-center justify-center mb-1.5 shadow-2xs transition-colors">
                <IconHelper name={habit.icon} className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-zinc-800 group-hover:text-zinc-950 truncate w-full">
                {habit.label}
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-700 mt-0.5">
                +{habit.pts} pts
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Split: Recent Activity Stream & Active Quests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Recent Activity Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-zinc-900 tracking-tight">Activity Log</h2>
              <p className="text-xs text-zinc-500">Your recent verified sustainability records</p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-lg">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  categoryFilter === 'all' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCategoryFilter('commute')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  categoryFilter === 'commute' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Mobility
              </button>
              <button
                onClick={() => setCategoryFilter('food')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  categoryFilter === 'food' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Food
              </button>
              <button
                onClick={() => setCategoryFilter('energy')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  categoryFilter === 'energy' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Energy
              </button>
            </div>
          </div>

          {filteredLogs.length === 0 ? (
            <div className="rounded-2xl bg-white border border-zinc-200/80 p-8 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-400 mx-auto flex items-center justify-center">
                <Info className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-zinc-800">No actions logged in this view yet</p>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Log your commute, meals, or recycling to track real carbon savings here.
              </p>
              <button
                onClick={() => setActiveTab('log')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Log Now</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredLogs.slice(0, 8).map(log => {
                const dateObj = new Date(log.timestamp);
                const timeString = isNaN(dateObj.getTime())
                  ? 'Recent'
                  : dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' · ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl bg-white border border-zinc-200/80 shadow-2xs flex items-center justify-between gap-3 group hover:border-zinc-300 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center shrink-0">
                        <IconHelper name={log.category === 'commute' ? 'Bike' : log.category === 'food' ? 'Salad' : log.category === 'energy' ? 'Sun' : log.category === 'waste' ? 'Repeat' : 'Droplets'} className="w-4 h-4" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs sm:text-sm font-semibold text-zinc-900 truncate">
                            {log.title}
                          </p>
                          <span className="text-[11px] font-mono text-zinc-500 shrink-0">
                            ({log.quantity} {log.unit})
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                          <span>{timeString}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-700 font-medium">-{log.co2SavedKg} kg CO₂</span>
                          {log.waterSavedL > 0 && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-cyan-700 font-medium">-{log.waterSavedL}L</span>
                            </>
                          )}
                        </div>

                        {log.note && (
                          <p className="text-[11px] text-zinc-500 italic mt-0.5 truncate">
                            "{log.note}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                        +{log.pointsEarned} pts
                      </span>
                      <button
                        onClick={() => deleteLog(log.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-rose-600 rounded transition-all cursor-pointer"
                        title="Delete log record"
                        aria-label="Delete"
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

        {/* Right Column: Active Quests & Milestones */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active Challenges Widget */}
          <div className="rounded-2xl bg-white border border-zinc-200/90 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 tracking-tight">Active Quests</h3>
                <p className="text-xs text-zinc-500">Earn bonus EcoPoints for completing missions</p>
              </div>
              <button
                onClick={() => setActiveTab('challenges')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <span>View All ({challenges.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {activeChallenges.map(ch => {
                const percent = Math.min(100, Math.round((ch.currentCount / ch.targetCount) * 100));
                const isReady = ch.status === 'completed';

                return (
                  <div key={ch.id} className="p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-200/70 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-md bg-white border border-zinc-200 flex items-center justify-center text-zinc-700">
                          <IconHelper name={ch.badgeIcon} className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-900">{ch.title}</p>
                          <p className="text-[11px] text-zinc-500">{ch.type.toUpperCase()} · Expires in {ch.expiresInDays}d</p>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-emerald-700">
                        +{ch.rewardPoints} pts
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-[11px] text-zinc-500 mb-1">
                        <span>Progress</span>
                        <span className="font-mono font-semibold">{ch.currentCount} / {ch.targetCount} {ch.unitLabel}</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${isReady ? 'bg-amber-500' : 'bg-emerald-600'}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    {isReady && (
                      <button
                        onClick={() => claimChallenge(ch.id)}
                        className="w-full mt-1 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer animate-pulse"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Claim Reward (+{ch.rewardPoints} pts)</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Streak Tip & Motivation Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/70 to-emerald-50/50 border border-amber-200/60 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>STREAK MULTIPLIER ACTIVE</span>
            </div>
            <p className="text-xs text-zinc-700 leading-relaxed">
              Logging at least 1 action every day maintains your streak multiplier. Hit 7 days to unlock the <em>"Week of Planet First"</em> achievement!
            </p>
            <div className="pt-1 flex items-center justify-between text-xs font-semibold text-emerald-800">
              <button
                onClick={() => setActiveTab('achievements')}
                className="hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>View Badges & Perks</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <span className="font-mono text-zinc-500">Level 3</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
