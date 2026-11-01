import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { LeaderboardUser } from '../../types';
import { 
  Trophy, 
  Crown, 
  Flame, 
  Search, 
  Sparkles, 
  Medal,
  Info,
  X
} from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { leaderboard, userRank, user, totalPoints, levelInfo } = useEco();

  const [searchQuery, setSearchQuery] = useState('');

  // Filter leaderboard by search
  const filteredUsers = leaderboard.filter(u => {
    return u.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Top 3 for podium
  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  // Dynamic Personal Ranking calculation
  const playerAhead = userRank > 1 ? leaderboard[userRank - 2] : null;
  const pointsToAdvance = playerAhead ? Math.max(0, playerAhead.points - totalPoints) : 0;

  const getPersonalRankingMessage = () => {
    if (userRank === 1) {
      return "You are #1 — leading the Eco Champions! 👑";
    }
    return `You are #${userRank} — ${pointsToAdvance} points away from #${userRank - 1}.`;
  };

  const getInitialsBadgeStyle = (name: string, isCurrentUser?: boolean) => {
    if (isCurrentUser) {
      return 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white ring-2 ring-emerald-400 ring-offset-2';
    }
    switch (name.toLowerCase()) {
      case 'ananya': return 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-amber-950 ring-2 ring-amber-300';
      case 'rahul': return 'bg-gradient-to-tr from-slate-600 to-zinc-500 text-white ring-2 ring-slate-300';
      case 'priya': return 'bg-gradient-to-tr from-amber-700 to-orange-500 text-white ring-2 ring-amber-400';
      case 'swathi': return 'bg-gradient-to-tr from-teal-600 to-emerald-500 text-white';
      case 'arjun': return 'bg-gradient-to-tr from-indigo-600 to-blue-500 text-white';
      case 'kiran': return 'bg-gradient-to-tr from-purple-600 to-pink-500 text-white';
      case 'meera': return 'bg-gradient-to-tr from-rose-500 to-amber-500 text-white';
      default: return 'bg-zinc-700 text-white';
    }
  };

  const getLevelBadgeStyle = (level: string) => {
    switch (level) {
      case 'Planet Hero': return 'text-emerald-800 bg-emerald-50 border-emerald-300';
      case 'Green Champion': return 'text-teal-800 bg-teal-50 border-teal-300';
      case 'Eco Explorer': return 'text-blue-800 bg-blue-50 border-blue-300';
      default: return 'text-zinc-700 bg-zinc-100 border-zinc-200';
    }
  };

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-2.5">
            <span>Eco Champions Leaderboard</span>
            <Trophy className="w-6 h-6 text-amber-500" />
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Real-time standings based on verified sustainable actions, streaks, and EcoPoints.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search champions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-white rounded-xl border border-zinc-200 text-xs text-zinc-900 focus:outline-emerald-600 shadow-2xs"
            aria-label="Search champions"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-zinc-400 hover:text-zinc-600 rounded-md cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* PERSONAL RANKING BANNER */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-sm border border-emerald-700/60 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-mono font-extrabold text-2xl text-emerald-300 shrink-0 shadow-xs">
              #{userRank}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/70 border border-emerald-700/60 px-2.5 py-0.5 rounded-md">
                Your Personal Standing
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                {getPersonalRankingMessage()}
              </h2>
              <p className="text-xs text-emerald-100/80 mt-0.5">
                Current Score: <strong className="font-mono text-white">{totalPoints} EcoPoints</strong> · Level: <span className="font-semibold text-emerald-200">{levelInfo.currentLevel}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-emerald-100 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{user.streakDays} Day Streak</span>
            </span>
          </div>
        </div>
      </div>

      {/* PODIUM STYLING */}
      {!searchQuery && top1 && top2 && top3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto items-end pt-4">
          <div className="order-2 md:order-1 rounded-3xl p-6 bg-white border border-zinc-200 shadow-xs flex flex-col items-center text-center">
            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-800 font-mono text-xs font-extrabold flex items-center justify-center mb-2">2</div>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-lg mb-3 shadow-md ${getInitialsBadgeStyle(top2.name, top2.isCurrentUser)}`}>
              {top2.initials || top2.name.slice(0, 2).toUpperCase()}
            </div>
            <h3 className="text-sm font-bold">{top2.name}</h3>
            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border mt-1 ${getLevelBadgeStyle(top2.level)}`}>{top2.level}</span>
            <span className="text-xl font-extrabold font-mono mt-2">{top2.points}</span>
          </div>
          <div className="order-1 md:order-2 rounded-3xl p-7 bg-white border-2 border-amber-300 shadow-md flex flex-col items-center text-center -translate-y-2">
            <Crown className="w-8 h-8 text-amber-400 mb-2" />
            <div className={`w-20 h-20 rounded-full flex items-center justify-center font-extrabold text-2xl mb-3 shadow-lg ${getInitialsBadgeStyle(top1.name, top1.isCurrentUser)}`}>
              {top1.initials || top1.name.slice(0, 2).toUpperCase()}
            </div>
            <h3 className="text-base font-bold">{top1.name}</h3>
            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border mt-1 ${getLevelBadgeStyle(top1.level)}`}>{top1.level}</span>
            <span className="text-3xl font-extrabold font-mono mt-2">{top1.points}</span>
          </div>
          <div className="order-3 md:order-3 rounded-3xl p-6 bg-white border border-zinc-200 shadow-xs flex flex-col items-center text-center">
            <div className="w-7 h-7 rounded-full bg-orange-200 text-orange-900 font-mono text-xs font-extrabold flex items-center justify-center mb-2">3</div>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-lg mb-3 shadow-md ${getInitialsBadgeStyle(top3.name, top3.isCurrentUser)}`}>
              {top3.initials || top3.name.slice(0, 2).toUpperCase()}
            </div>
            <h3 className="text-sm font-bold">{top3.name}</h3>
            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border mt-1 ${getLevelBadgeStyle(top3.level)}`}>{top3.level}</span>
            <span className="text-xl font-extrabold font-mono mt-2">{top3.points}</span>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-2">
          All Eco Champions ({filteredUsers.length})
        </h2>
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-zinc-50 border border-zinc-200/80 text-sm text-zinc-500">
            No leaderboard data yet.
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredUsers.map(champion => {
              const isYou = champion.isCurrentUser;
              const initials = champion.initials || champion.name.slice(0, 2).toUpperCase();
              return (
                <div key={champion.id} className={`p-4 rounded-2xl border flex items-center justify-between ${isYou ? 'bg-emerald-50 border-emerald-400' : 'bg-white border-zinc-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 font-mono font-bold text-zinc-500">#{champion.rank}</div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${getInitialsBadgeStyle(champion.name, isYou)}`}>{initials}</div>
                    <div>
                      <div className="font-bold text-sm">{champion.name}</div>
                      <div className="text-[10px] uppercase font-bold text-zinc-500">{champion.level}</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-sm">{champion.points} pts</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
