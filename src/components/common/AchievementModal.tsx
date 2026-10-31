import React from 'react';
import { useEco } from '../../context/EcoContext';
import { Trophy, Award, Sparkles, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { IconHelper } from './IconHelper';

export const AchievementModal: React.FC = () => {
  const { unlockedAchievementModal, dismissAchievementModal } = useEco();

  if (!unlockedAchievementModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-2xl text-center overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Glow ambient background */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-52 h-52 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={dismissAchievementModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge Icon Emblem */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 mb-4 animate-bounce">
          <IconHelper name={unlockedAchievementModal.icon} className="w-10 h-10" size={40} />
        </div>

        {/* Required Title */}
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-md">
          {unlockedAchievementModal.tier.toUpperCase()} TIER BADGE
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight mt-2">
          Achievement Unlocked!
        </h2>

        {/* Badge Name */}
        <p className="text-lg font-bold text-emerald-700 mt-1">
          {unlockedAchievementModal.title}
        </p>

        {/* Badge Description */}
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed max-w-sm mx-auto">
          {unlockedAchievementModal.description}
        </p>

        {/* Requirement verified pill */}
        <div className="my-4 p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-center gap-2 text-xs font-semibold text-zinc-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Requirement: {unlockedAchievementModal.conditionText}</span>
        </div>

        {/* Dismiss Button */}
        <div className="mt-4">
          <button
            onClick={dismissAchievementModal}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <span>Awesome, claim badge!</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
