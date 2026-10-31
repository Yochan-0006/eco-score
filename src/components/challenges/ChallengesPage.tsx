import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { Challenge, NavigationTab } from '../../types';
import { 
  Target, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Check
} from 'lucide-react';
import { IconHelper } from '../common/IconHelper';

interface ChallengesPageProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const ChallengesPage: React.FC<ChallengesPageProps> = ({ setActiveTab }) => {
  const { challenges, joinChallenge, claimChallenge } = useEco();

  const [activeFilter, setActiveFilter] = useState<'all' | 'daily' | 'weekly' | 'monthly' | 'completed'>('all');

  // Stats
  const completedCount = challenges.filter(c => c.status === 'completed' || c.status === 'claimed').length;
  const readyToClaimCount = challenges.filter(c => c.status === 'completed').length;
  const totalPotentialPoints = challenges.reduce((sum, c) => sum + c.rewardPoints, 0);

  const filteredChallenges = challenges.filter(ch => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'completed') return ch.status === 'completed' || ch.status === 'claimed';
    return ch.type === activeFilter;
  });

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Climate Quests & Challenges
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Complete time-boxed sustainability sprints to earn bonus points and boost community impact.
          </p>
        </div>

        {readyToClaimCount > 0 && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-300 text-amber-900 text-xs font-bold animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{readyToClaimCount} Reward{readyToClaimCount > 1 ? 's' : ''} Ready to Claim!</span>
          </div>
        )}
      </div>

      {/* Progress Metric Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Completed Quests</span>
          <p className="text-2xl font-bold font-mono text-zinc-900 mt-1">
            {completedCount} <span className="text-xs font-sans text-zinc-400">/ {challenges.length}</span>
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Rewards Ready</span>
          <p className="text-2xl font-bold font-mono text-amber-600 mt-1">
            {readyToClaimCount} <span className="text-xs font-sans text-zinc-400">claimable</span>
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total Quest Pool</span>
          <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">
            +{totalPotentialPoints} <span className="text-xs font-sans text-zinc-400">EcoPoints</span>
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl w-fit overflow-x-auto text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
            activeFilter === 'all' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          All Quests ({challenges.length})
        </button>
        <button
          onClick={() => setActiveFilter('daily')}
          className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
            activeFilter === 'daily' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Daily Sprints
        </button>
        <button
          onClick={() => setActiveFilter('weekly')}
          className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
            activeFilter === 'weekly' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Weekly Sprints
        </button>
        <button
          onClick={() => setActiveFilter('monthly')}
          className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
            activeFilter === 'monthly' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Monthly Milestones
        </button>
        <button
          onClick={() => setActiveFilter('completed')}
          className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
            activeFilter === 'completed' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredChallenges.map(challenge => {
          const percent = Math.min(100, Math.round((challenge.currentCount / challenge.targetCount) * 100));
          const isCompleted = challenge.status === 'completed';
          const isClaimed = challenge.status === 'claimed';
          const isActive = challenge.status === 'active';
          const isAvailable = challenge.status === 'available';

          return (
            <div
              key={challenge.id}
              className={`rounded-2xl bg-white border transition-all p-5 flex flex-col justify-between shadow-2xs ${
                isCompleted
                  ? 'border-amber-300 ring-2 ring-amber-400/20 shadow-amber-500/5'
                  : isClaimed
                  ? 'border-zinc-200/60 opacity-80'
                  : 'border-zinc-200/90 hover:border-zinc-300'
              }`}
            >
              <div className="space-y-3">
                {/* Header Tag & Icon */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isCompleted ? 'bg-amber-100 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      <IconHelper name={challenge.badgeIcon} className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                        {challenge.type} sprint · {challenge.category}
                      </span>
                      <h3 className="text-sm font-bold text-zinc-900 leading-snug">
                        {challenge.title}
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md shrink-0">
                    +{challenge.rewardPoints} pts
                  </span>
                </div>

                <p className="text-xs text-zinc-600 leading-relaxed">
                  {challenge.description}
                </p>

                {/* Progress Visual */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Progress</span>
                    <span className="font-mono font-bold text-zinc-800">
                      {challenge.currentCount} / {challenge.targetCount} {challenge.unitLabel} ({percent}%)
                    </span>
                  </div>

                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/60">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isClaimed
                          ? 'bg-zinc-400'
                          : isCompleted
                          ? 'bg-amber-500'
                          : 'bg-emerald-600'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {isClaimed
                      ? 'Quest completed and claimed'
                      : `Expires in ${challenge.expiresInDays} day${challenge.expiresInDays === 1 ? '' : 's'}`}
                  </span>
                </div>
              </div>

              {/* Status Action Button */}
              <div className="pt-4 mt-3 border-t border-zinc-100">
                {isCompleted && (
                  <button
                    onClick={() => claimChallenge(challenge.id)}
                    className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer animate-pulse"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Claim +{challenge.rewardPoints} EcoPoints</span>
                  </button>
                )}

                {isClaimed && (
                  <div className="w-full py-2 px-3 bg-zinc-100 text-zinc-500 text-xs font-semibold rounded-xl text-center flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Completed & Claimed</span>
                  </div>
                )}

                {isActive && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('log')}
                      className="flex-1 py-2 px-3 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-xl transition-colors text-center cursor-pointer"
                    >
                      Log Matching Action
                    </button>
                  </div>
                )}

                {isAvailable && (
                  <button
                    onClick={() => joinChallenge(challenge.id)}
                    className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Join Challenge
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
