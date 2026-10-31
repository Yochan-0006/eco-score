import React from 'react';
import { useEco } from '../../context/EcoContext';
import { X, CheckCircle, Info, Trophy, Sparkles } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useEco();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const isAward = toast.type === 'award';
        const isSuccess = toast.type === 'success';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 animate-in slide-in-from-bottom-3 ${
              isAward
                ? 'bg-amber-500/10 border-amber-300/40 text-amber-950 dark:text-amber-100 bg-white'
                : isSuccess
                ? 'bg-white border-emerald-200 text-zinc-900 shadow-emerald-500/5'
                : 'bg-white border-zinc-200 text-zinc-900 shadow-zinc-500/5'
            }`}
          >
            <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
              isAward ? 'bg-amber-100 text-amber-600' : isSuccess ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-600'
            }`}>
              {isAward ? <Trophy className="w-4 h-4" /> : isSuccess ? <Sparkles className="w-4 h-4" /> : <Info className="w-4 h-4" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold tracking-tight truncate text-zinc-900">
                  {toast.title}
                </p>
                {toast.points !== undefined && toast.points > 0 && (
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    +{toast.points} pts
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-zinc-600 p-1 -mr-1 -mt-1 rounded-md transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
