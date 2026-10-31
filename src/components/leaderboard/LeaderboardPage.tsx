import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { LeaderboardUser } from '../../types';
import { 
  Trophy, 
  Crown, 
  Flame, 
  Search, 
  Users, 
  TrendingUp, 
  Sparkles, 
  Medal, 
  ArrowUp, 
  TreePine,
  ShieldCheck
} from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { leaderboard, userRank, user, totalPoints, totalCo2SavedKg } = useEco();

  const [activeTab, setActiveTab] = useState<'global' | 'weekly' | 'teams'>('global');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter leaderboard
  const filteredUsers = leaderboard.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.team && u.team.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === 'teams') {
      // Filter by same team as user
      return matchesSearch && u.team === 'Urban Climbers';
    }
    return matchesSearch;
  });

  // Top 3 for podium
  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  // Calculate distance to next rank
  const playerAhead = leaderboard[userRank - 2];
  const pointsToAdvance = playerAhead ? playerAhead.points - totalPoints + 1 : 0;

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Climate Vanguard Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Compare verified carbon reductions and daily streaks with sustainability champions worldwide.
          </p>
        </div>

        {/* User Rank Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-950 text-xs font-bold self-start sm:self-auto">
          <Trophy className="w-4 h-4 text-emerald-600" />
          <span>Your Standing: Rank #{userRank}</span>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl w-fit text-xs">
          <button
            onClick={() => setActiveTab('global')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'global' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Global Network
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'weekly' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Weekly Sprint
          </button>
          <button
            onClick={() => setActiveTab('teams')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'teams' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            My Circle (Urban Climbers)
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search players or teams..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white rounded-lg border border-zinc-200 text-xs text-zinc-900 focus:outline-emerald-600 shadow-2xs"
          />
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {top1 && top2 && top3 && !searchQuery && activeTab === 'global' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          
          {/* 2nd Place */}
          <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs flex flex-col items-center text-center relative order-2 md:order-1 md:mt-6">
            <div className="w-6 h-6 rounded-full bg-zinc-200 text-zinc-700 font-mono text-xs font-bold flex items-center justify-center absolute -top-3">
              2
            </div>
            <img
              src={top2.avatar}
              alt={top2.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-zinc-300 shadow-xs mb-3"
            />
            <h3 className="text-sm font-bold text-zinc-900">{top2.name}</h3>
            <p className="text-xs text-zinc-500">{top2.team} · {top2.countryCode}</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm font-mono font-bold text-zinc-900">{top2.points} pts</span>
              <span className="text-xs text-emerald-700 font-mono">-{top2.co2SavedKg} kg CO₂</span>
            </div>
            <div className="mt-2 text-[11px] font-semibold text-amber-600 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span>{top2.streak} day streak</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-50/50 via-white to-white border-2 border-amber-300/80 shadow-md flex flex-col items-center text-center relative order-1 md:order-2">
            <div className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-mono text-xs font-bold flex items-center justify-center absolute -top-3.5 shadow-xs">
              <Crown className="w-4 h-4 fill-amber-950" />
            </div>
            <img
              src={top1.avatar}
              alt={top1.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-300 shadow-md mb-3"
            />
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md mb-1">
              {top1.badge}
            </span>
            <h3 className="text-base font-bold text-zinc-900">{top1.name}</h3>
            <p className="text-xs text-zinc-500">{top1.team} · {top1.countryCode}</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-base font-mono font-extrabold text-zinc-900">{top1.points} pts</span>
              <span className="text-xs text-emerald-700 font-mono font-semibold">-{top1.co2SavedKg} kg CO₂</span>
            </div>
            <div className="mt-2 text-xs font-semibold text-amber-600 flex items-center gap-1">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>{top1.streak} day streak</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs flex flex-col items-center text-center relative order-3 md:order-3 md:mt-8">
            <div className="w-6 h-6 rounded-full bg-amber-700/20 text-amber-800 font-mono text-xs font-bold flex items-center justify-center absolute -top-3">
              3
            </div>
            <img
              src={top3.avatar}
              alt={top3.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-amber-700/30 shadow-xs mb-3"
            />
            <h3 className="text-sm font-bold text-zinc-900">{top3.name}</h3>
            <p className="text-xs text-zinc-500">{top3.team} · {top3.countryCode}</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm font-mono font-bold text-zinc-900">{top3.points} pts</span>
              <span className="text-xs text-emerald-700 font-mono">-{top3.co2SavedKg} kg CO₂</span>
            </div>
            <div className="mt-2 text-[11px] font-semibold text-amber-600 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span>{top3.streak} day streak</span>
            </div>
          </div>
        </div>
      )}

      {/* User Standing Spotlight Callout */}
      {userRank > 1 && playerAhead && (
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold font-mono">
              #{userRank}
            </div>
            <div>
              <p className="font-semibold text-emerald-950">
                You're in the top tier! ({totalPoints} pts)
              </p>
              <p className="text-emerald-800/80 mt-0.5">
                Log {Math.ceil(pointsToAdvance / 25)} more green actions (+{pointsToAdvance} pts) to pass <strong>{playerAhead.name}</strong> for rank #{userRank - 1}.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-800 font-semibold self-end sm:self-auto">
            Gap: {pointsToAdvance} pts
          </span>
        </div>
      )}

      {/* Full Leaderboard Table */}
      <div className="rounded-2xl bg-white border border-zinc-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50/80 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4 w-14 text-center">Rank</th>
                <th className="py-3 px-4">Sustainability Player</th>
                <th className="py-3 px-4 hidden md:table-cell">Team Circle</th>
                <th className="py-3 px-4 text-center">Streak</th>
                <th className="py-3 px-4 text-right">CO₂ Diverted</th>
                <th className="py-3 px-4 text-right">EcoPoints</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredUsers.map(player => {
                const isYou = player.isCurrentUser;

                return (
                  <tr
                    key={player.id}
                    className={`transition-colors ${
                      isYou
                        ? 'bg-emerald-50/60 font-semibold text-emerald-950'
                        : 'hover:bg-zinc-50/60 text-zinc-700'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3 px-4 text-center font-mono font-bold">
                      {player.rank === 1 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-amber-950">1</span>
                      ) : player.rank === 2 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-200 text-zinc-800">2</span>
                      ) : player.rank === 3 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-700/20 text-amber-800">3</span>
                      ) : (
                        <span>#{player.rank}</span>
                      )}
                    </td>

                    {/* User profile */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="w-9 h-9 rounded-full object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-zinc-900 truncate">
                              {player.name}
                            </span>
                            {isYou && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded shrink-0">
                                You
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-500 truncate">
                            {player.recentActionTitle || 'Sustainable habit'} · {player.countryCode}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Team Circle */}
                    <td className="py-3 px-4 hidden md:table-cell text-zinc-500">
                      {player.team || 'Solo Guardian'}
                    </td>

                    {/* Streak */}
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-mono font-bold text-amber-600 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                        <Flame className="w-3 h-3 fill-amber-500" />
                        <span>{player.streak}d</span>
                      </span>
                    </td>

                    {/* CO2 Diverted */}
                    <td className="py-3 px-4 text-right font-mono text-emerald-700 font-semibold">
                      -{player.co2SavedKg} kg
                    </td>

                    {/* EcoPoints */}
                    <td className="py-3 px-4 text-right font-mono font-extrabold text-zinc-900 text-sm">
                      {player.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
