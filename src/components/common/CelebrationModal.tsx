import React from 'react';
import { useEco } from '../../context/EcoContext';
import { Trophy, Award, Sparkles, X, ArrowRight } from 'lucide-react';

export const CelebrationModal: React.FC = () => {
  const { celebrationEvent, dismissCelebration } = useEco();

  // Close on Escape key
  React.useEffect(() => {
    if (!celebrationEvent?.show) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismissCelebration();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [celebrationEvent, dismissCelebration]);

  if (!celebrationEvent || !celebrationEvent.show) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismissCelebration();
      }}
    >
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/90 shadow-2xl text-center overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="celebration-title"
      >
        {/* Glow backdrop behind badge */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={dismissCelebration}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-600 cursor-pointer"
          aria-label="Close celebration dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Trophy emblem */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 mb-4 animate-bounce">
          <Trophy className="w-8 h-8" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
          Planet Impact Milestone
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mt-3">
          {celebrationEvent.title}
        </h3>

        <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
          {celebrationEvent.subtitle}
        </p>

        {celebrationEvent.points !== undefined && celebrationEvent.points > 0 && (
          <div className="my-5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="font-mono text-base font-bold text-emerald-800">
              +{celebrationEvent.points} EcoPoints Earned
            </span>
          </div>
        )}

        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={dismissCelebration}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 cursor-pointer"
          >
            <span>Awesome, keep going!</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
