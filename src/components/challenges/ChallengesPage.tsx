import React from 'react';
import { useEco } from '../../context/EcoContext';
import { NavigationTab, Challenge } from '../../types';
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  Check, 
  Clock, 
  Flame, 
  Award, 
  ArrowRight,
  RotateCcw,
  Bike,
  Lightbulb,
  Salad,
  Repeat,
  Info
} from 'lucide-react';
import { IconHelper } from '../common/IconHelper';

interface ChallengesPageProps {
  setActiveTab?: (tab: NavigationTab) => void;
}

export const ChallengesPage: React.FC<ChallengesPageProps> = ({ setActiveTab }) => {
  const { 
    challenges, 
    completeDailyChallenge, 
    resetChallenges, 
    totalPoints, 
    user 
  } = useEco();

  // Filter 5 daily challenges
  const dailyChallenges = challenges.filter(c => c.type === 'daily' || !c.type).slice(0, 5);

  // Compute completed count
  const completedCount = dailyChallenges.filter(c => c.status === 'completed' || c.status === 'claimed').length;
  const totalCount = dailyChallenges.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Total daily bonus points available from remaining
  const remainingPoints = dailyChallenges
    .filter(c => c.status !== 'completed' && c.status !== 'claimed')
    .reduce((sum, c) => sum + c.rewardPoints, 0);

  const totalPossibleDaily = dailyChallenges.reduce((sum, c) => sum + c.rewardPoints, 0);

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Daily Climate Challenges
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Complete quick daily sustainability habits to earn bonus EcoPoints, maintain your streak, and level up.
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Score: {totalPoints} EcoPoints</span>
          </div>

          <button
            onClick={resetChallenges}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title="Reset daily challenges to test again"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Daily Progress Banner (e.g. 3/5 challenges completed) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-zinc-900 text-white shadow-sm border border-emerald-700/60 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/70 border border-emerald-700/60 px-2.5 py-0.5 rounded-md">
              Daily Mission Tracker
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {completedCount}/{totalCount} challenges completed.
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80">
              {completedCount === totalCount
                ? 'All 5 daily challenges completed! You maximized today’s sustainability rewards.'
                : `Complete ${totalCount - completedCount} more challenge${totalCount - completedCount > 1 ? 's' : ''} to claim +${remainingPoints} additional EcoPoints.`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center min-w-28">
              <span className="text-[10px] uppercase font-bold text-emerald-200 block">Streak Status</span>
              <span className="text-lg font-mono font-bold text-white flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{user.streakDays} Days</span>
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center min-w-28">
              <span className="text-[10px] uppercase font-bold text-emerald-200 block">Daily Pool</span>
              <span className="text-lg font-mono font-bold text-white">
                +{totalPossibleDaily} pts
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="pt-2">
          <div className="flex justify-between items-center text-xs text-emerald-200 mb-1.5 font-mono">
            <span>Overall Completion</span>
            <span className="font-bold text-emerald-300">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-emerald-950/80 rounded-full overflow-hidden border border-emerald-700/50">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 5 Daily Challenges Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-1 border-b border-zinc-200">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
              Today's 5 Challenges
            </h2>
          </div>
          <span className="text-xs text-zinc-500 font-mono">
            Resets at midnight local time
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dailyChallenges.map((challenge, index) => {
            const isCompleted = challenge.status === 'completed' || challenge.status === 'claimed';

            return (
              <div
                key={challenge.id}
                className={`rounded-3xl p-6 border transition-all flex flex-col justify-between shadow-2xs ${
                  isCompleted
                    ? 'bg-emerald-50/40 border-emerald-300 shadow-emerald-500/5 ring-1 ring-emerald-300'
                    : 'bg-white border-zinc-200/90 hover:border-zinc-300 hover:shadow-xs'
                }`}
              >
                <div className="space-y-3.5">
                  {/* Top Bar: Icon, Title, and Points */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors shadow-2xs ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-zinc-100 text-zinc-800'
                      }`}>
                        <IconHelper name={challenge.badgeIcon} className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                          Challenge #{index + 1}
                        </span>
                        <h3 className="text-base font-bold text-zinc-900 leading-snug">
                          {challenge.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-extrabold tabular-nums text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg shrink-0">
                      +{challenge.rewardPoints} pts
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {challenge.description}
                  </p>

                  {/* Progress State Indicator */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-zinc-500">Progress State</span>
                      {isCompleted ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>1/1 Completed</span>
                        </span>
                      ) : (
                        <span className="text-zinc-600 font-mono font-semibold">
                          0/1 Incomplete
                        </span>
                      )}
                    </div>

                    <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden mt-1.5 border border-zinc-200/60">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCompleted ? 'bg-emerald-600' : 'bg-zinc-300'
                        }`}
                        style={{ width: isCompleted ? '100%' : '0%' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Complete Button with Duplicate Prevention */}
                <div className="pt-5 mt-4 border-t border-zinc-100">
                  {isCompleted ? (
                    <button
                      type="button"
                      disabled
                      className="w-full py-2.5 px-4 bg-emerald-100/80 text-emerald-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-not-allowed opacity-90"
                    >
                      <Check className="w-4 h-4 text-emerald-700" />
                      <span>Completed ✓ (+{challenge.rewardPoints} pts awarded)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => completeDailyChallenge(challenge.id)}
                      className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-600"
                    >
                      <Check className="w-4 h-4" />
                      <span>Complete Challenge (+{challenge.rewardPoints} EcoPoints)</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Motivation Callout Footer */}
      <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-600">
        <div className="flex items-center gap-2.5">
          <Info className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Completing challenges automatically increments your EcoScore, keeps your daily streak on fire, and updates leaderboard standings in real time.
          </span>
        </div>

        {setActiveTab && (
          <button
            onClick={() => setActiveTab('dashboard')}
            className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 shrink-0 cursor-pointer self-start sm:self-auto"
          >
            <span>View Updated Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </div>
  );
};
