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
  Filter
} from 'lucide-react';
import { IconHelper } from '../common/IconHelper';

export const AchievementsPage: React.FC = () => {
  const { achievements } = useEco();

  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked' | 'emerald' | 'gold' | 'silver' | 'bronze'>('all');
  const [selectedBadge, setSelectedBadge] = useState<Achievement | null>(null);

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const completionPercent = Math.round((unlockedCount / achievements.length) * 100);

  const filtered = achievements.filter(a => {
    if (filter === 'all') return true;
    if (filter === 'unlocked') return a.isUnlocked;
    if (filter === 'locked') return !a.isUnlocked;
    return a.tier === filter;
  });

  const getTierStyles = (tier: Achievement['tier']) => {
    switch (tier) {
      case 'emerald':
        return {
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          ring: 'border-emerald-400/80 shadow-emerald-500/10',
          iconBg: 'bg-emerald-600 text-white'
        };
      case 'gold':
        return {
          badge: 'bg-amber-100 text-amber-900 border-amber-300',
          ring: 'border-amber-400/80 shadow-amber-500/10',
          iconBg: 'bg-amber-500 text-white'
        };
      case 'silver':
        return {
          badge: 'bg-slate-100 text-slate-800 border-slate-300',
          ring: 'border-slate-300',
          iconBg: 'bg-slate-600 text-white'
        };
      case 'bronze':
      default:
        return {
          badge: 'bg-orange-100 text-orange-900 border-orange-200',
          ring: 'border-orange-300',
          iconBg: 'bg-orange-700 text-white'
        };
    }
  };

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Sustainability Badges & Honors
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Permanent proof-of-impact credentials earned through consistent climate habits.
          </p>
        </div>

        {/* Master Progress */}
        <div className="p-3.5 rounded-xl bg-white border border-zinc-200/90 shadow-2xs min-w-64">
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            <span className="text-zinc-600">Badges Unlocked</span>
            <span className="font-mono text-emerald-700 font-bold">{unlockedCount} / {achievements.length} ({completionPercent}%)</span>
          </div>
          <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/60">
            <div 
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
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
          All Badges ({achievements.length})
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
          In Progress ({achievements.length - unlockedCount})
        </button>
        <button
          onClick={() => setFilter('emerald')}
          className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
            filter === 'emerald' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Emerald (Legendary)
        </button>
        <button
          onClick={() => setFilter('gold')}
          className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
            filter === 'gold' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Gold
        </button>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(badge => {
          const styles = getTierStyles(badge.tier);
          const isUnlocked = badge.isUnlocked;

          return (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between cursor-pointer group shadow-2xs ${
                isUnlocked
                  ? `bg-white ${styles.ring} hover:shadow-md`
                  : 'bg-zinc-50/70 border-zinc-200/80 opacity-75 hover:opacity-100 hover:bg-white'
              }`}
            >
              <div>
                {/* Top tier pill & status */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${styles.badge}`}>
                    {badge.tier}
                  </span>

                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400">
                      <Lock className="w-3 h-3" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>

                {/* Badge Icon Emblem */}
                <div className="my-3 flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105 ${
                    isUnlocked ? styles.iconBg : 'bg-zinc-200 text-zinc-500'
                  }`}>
                    <IconHelper name={badge.icon} className="w-8 h-8" size={32} />
                  </div>
                </div>

                <div className="text-center mt-2 space-y-1">
                  <h3 className="text-sm font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-2">
                    {badge.description}
                  </p>
                </div>
              </div>

              {/* Bottom Condition or Unlock Date */}
              <div className="pt-4 mt-3 border-t border-zinc-100/90">
                {isUnlocked ? (
                  <p className="text-[11px] text-zinc-400 text-center flex items-center justify-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {badge.unlockedAt
                        ? `Unlocked ${new Date(badge.unlockedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`
                        : 'Unlocked'}
                    </span>
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[11px] text-zinc-500">
                      <span>Requirement: {badge.conditionText}</span>
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

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-2xl border border-zinc-200/90 shadow-2xl p-6 text-center space-y-4">
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100"
            >
              ✕
            </button>

            <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <IconHelper name={selectedBadge.icon} className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                {selectedBadge.tier} Tier Badge
              </span>
              <h3 className="text-lg font-bold text-zinc-900 mt-2">{selectedBadge.title}</h3>
              <p className="text-xs text-zinc-600 mt-1">{selectedBadge.description}</p>
            </div>

            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-xs text-left space-y-1">
              <p><strong className="text-zinc-800">Criteria:</strong> {selectedBadge.conditionText}</p>
              <p><strong className="text-zinc-800">Status:</strong> {selectedBadge.isUnlocked ? 'Unlocked & Verified ✓' : `${selectedBadge.progress}% Complete`}</p>
            </div>

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
