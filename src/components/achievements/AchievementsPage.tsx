import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { Achievement } from '../../types';
import { 
  Award, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Crown, 
  Calendar,
  Filter,
  Check,
  TrendingUp,
  Target
} from 'lucide-react';
import { IconHelper } from '../common/IconHelper';

export const AchievementsPage: React.FC = () => {
  const { achievements, levelInfo, totalPoints, user } = useEco();

  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<Achievement | null>(null);

  // Close badge detail modal on Escape key
  React.useEffect(() => {
    if (!selectedBadge) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedBadge(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBadge]);

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const completionPercent = Math.round((unlockedCount / achievements.length) * 100);

  const filtered = achievements.filter(a => {
    if (filter === 'all') return true;
    if (filter === 'unlocked') return a.isUnlocked;
    if (filter === 'locked') return !a.isUnlocked;
    return true;
  });

  // Gamification Tier Milestones
  const tiers = [
    { name: 'Getting Started', range: '0 - 29 pts', min: 0, max: 29 },
    { name: 'Eco Explorer', range: '30 - 59 pts', min: 30, max: 59 },
    { name: 'Green Champion', range: '60 - 79 pts', min: 60, max: 79 },
    { name: 'Planet Hero', range: '80 - 100+ pts', min: 80, max: 100 }
  ];

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Gamification & Achievements
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Level up from Getting Started to Planet Hero by building daily streaks and logging eco actions.
          </p>
        </div>

        {/* Master Progress */}
        <div className="p-3.5 rounded-xl bg-white border border-zinc-200/90 shadow-2xs min-w-64">
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            <span className="text-zinc-600">Achievements Unlocked</span>
            <span className="font-mono tabular-nums text-emerald-700 font-bold">{unlockedCount} / {achievements.length} ({completionPercent}%)</span>
          </div>
          <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/60">
            <div 
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Gamification Level Stepper Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950 text-white shadow-sm border border-zinc-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-2.5 py-0.5 rounded-md">
              Level {levelInfo.levelNumber} Status
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              {levelInfo.currentLevel}
            </h2>
            <p className="text-xs text-zinc-300 mt-0.5">
              {levelInfo.encouragingMessage}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">EcoPoint Total</span>
              <span className="text-lg font-mono tabular-nums font-bold text-white">{totalPoints} pts</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-amber-500/20 backdrop-blur-md border border-amber-400/30 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">Daily Streak</span>
              <span className="text-lg font-mono tabular-nums font-bold text-amber-400 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>{user.streakDays}d</span>
              </span>
            </div>
          </div>
        </div>

        {/* 4 Levels Roadmap */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {tiers.map((t, idx) => {
            const isCurrent = levelInfo.currentLevel === t.name;
            const isPassed = totalPoints > t.max;

            return (
              <div 
                key={t.name}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-emerald-900/60 border-emerald-400 ring-2 ring-emerald-400/30'
                    : isPassed
                    ? 'bg-white/10 border-emerald-500/40 text-emerald-100'
                    : 'bg-zinc-800/40 border-zinc-700/60 text-zinc-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-semibold uppercase">
                    Level {idx + 1}
                  </span>
                  {isPassed ? (
                    <span className="w-4 h-4 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  ) : isCurrent ? (
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                      Active
                    </span>
                  ) : (
                    <Lock className="w-3 h-3 text-zinc-500" />
                  )}
                </div>
                <p className="text-xs font-bold text-white truncate">{t.name}</p>
                <p className="text-[11px] font-mono tabular-nums text-zinc-400 mt-0.5">{t.range}</p>
              </div>
            );
          })}
        </div>

        {/* Level progress bar */}
        <div className="pt-2">
          <div className="flex justify-between items-center text-xs text-zinc-300 mb-1.5 font-mono">
            <span>Progress to Next Level ({levelInfo.nextMax} pts target)</span>
            <span className="text-emerald-400 font-bold">{levelInfo.progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
              style={{ width: `${levelInfo.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl w-fit overflow-x-auto text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
            filter === 'all' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          All Achievements ({achievements.length})
        </button>
        <button
          onClick={() => setFilter('unlocked')}
          className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
            filter === 'unlocked' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Unlocked ({unlockedCount})
        </button>
        <button
          onClick={() => setFilter('locked')}
          className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
            filter === 'locked' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Locked ({achievements.length - unlockedCount})
        </button>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map(badge => {
          const isUnlocked = badge.isUnlocked;

          return (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`rounded-3xl p-5 border transition-all flex flex-col justify-between cursor-pointer group shadow-2xs ${
                isUnlocked
                  ? 'bg-white border-zinc-200/90 hover:border-emerald-300 hover:shadow-md'
                  : 'bg-zinc-50/70 border-zinc-200/60 opacity-60 grayscale hover:grayscale-0 hover:opacity-85'
              }`}
            >
              <div>
                {/* Status indicator */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Badge
                  </span>

                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-400 bg-zinc-200/60 px-2 py-0.5 rounded-full">
                      <Lock className="w-3 h-3" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>

                {/* Badge Icon Emblem */}
                <div className="my-4 flex items-center justify-center">
                  <div className={`w-18 h-18 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105 ${
                    isUnlocked 
                      ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-emerald-500/25' 
                      : 'bg-zinc-200 text-zinc-400 shadow-none'
                  }`}>
                    <IconHelper name={badge.icon} className="w-9 h-9" size={36} />
                  </div>
                </div>

                <div className="text-center mt-2 space-y-1">
                  <h3 className={`text-base font-bold transition-colors ${
                    isUnlocked ? 'text-zinc-900 group-hover:text-emerald-700' : 'text-zinc-600'
                  }`}>
                    {badge.title}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>

              {/* Bottom Condition or Unlock Status */}
              <div className="pt-4 mt-3 border-t border-zinc-100">
                {isUnlocked ? (
                  <p className="text-[11px] text-zinc-400 text-center flex items-center justify-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-600" />
                    <span>
                      {badge.unlockedAt
                        ? `Earned ${new Date(badge.unlockedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`
                        : 'Unlocked & Verified'}
                    </span>
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[11px] text-zinc-500">
                      <span className="truncate pr-1">Target: {badge.conditionText}</span>
                      <span className="font-mono font-bold">{badge.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 px-6 text-center rounded-2xl bg-white border border-zinc-200/80 space-y-3 shadow-2xs">
          <p className="text-sm font-bold text-zinc-800">No {filter} badges found</p>
          <p className="text-xs text-zinc-500">
            {filter === 'unlocked' ? 'Log your first daily action to unlock the First Step achievement!' : 'You have unlocked all badges! Incredible work.'}
          </p>
          <button
            onClick={() => setFilter('all')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors cursor-pointer"
          >
            Show All Badges
          </button>
        </div>
      )}

      {/* Selected Badge Detail Modal */}
      {selectedBadge && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-xs animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedBadge(null);
          }}
        >
          <div 
            className="relative w-full max-w-sm bg-white rounded-3xl border border-zinc-200/90 shadow-2xl p-6 text-center space-y-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="badge-detail-title"
          >
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-emerald-600 cursor-pointer"
              aria-label="Close badge details"
            >
              ✕
            </button>

            <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
              selectedBadge.isUnlocked ? 'bg-emerald-600 text-white shadow-emerald-500/20' : 'bg-zinc-200 text-zinc-500'
            }`}>
              <IconHelper name={selectedBadge.icon} className="w-8 h-8" />
            </div>

            <div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                selectedBadge.isUnlocked ? 'text-emerald-800 bg-emerald-50' : 'text-zinc-500 bg-zinc-100'
              }`}>
                {selectedBadge.isUnlocked ? 'Unlocked Badge' : 'Locked Badge'}
              </span>
              <h3 id="badge-detail-title" className="text-xl font-bold text-zinc-900 mt-2">{selectedBadge.title}</h3>
              <p className="text-xs text-zinc-600 mt-1">{selectedBadge.description}</p>
            </div>

            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-xs text-left space-y-1.5">
              <p><strong className="text-zinc-800">Criteria:</strong> {selectedBadge.conditionText}</p>
              <p>
                <strong className="text-zinc-800">Status:</strong>{' '}
                {selectedBadge.isUnlocked ? (
                  <span className="text-emerald-700 font-semibold">Unlocked & Verified ✓</span>
                ) : (
                  <span className="text-zinc-500 font-mono tabular-nums">{selectedBadge.progress}% Complete</span>
                )}
              </p>
            </div>

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-xl cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
