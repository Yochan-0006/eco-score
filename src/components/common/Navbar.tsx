import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { NavigationTab } from '../../types';
import { 
  Sprout, 
  Flame, 
  Sparkles, 
  Menu, 
  X, 
  LayoutDashboard, 
  PlusCircle, 
  Target, 
  Trophy, 
  Award, 
  BarChart3, 
  Compass
} from 'lucide-react';
import { ProfileModal } from './ProfileModal';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user, totalPoints, challenges } = useEco();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Count ready to claim challenges
  const claimableCount = challenges.filter(c => c.status === 'completed').length;

  const navItems: { id: NavigationTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'landing', label: 'Explore', icon: Compass },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'log', label: 'Log Action', icon: PlusCircle },
    { id: 'challenges', label: 'Challenges', icon: Target, badge: claimableCount },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'achievements', label: 'Badges', icon: Award },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2.5 text-left focus-visible:outline-emerald-600 rounded-lg group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:bg-emerald-700 transition-colors">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-lg tracking-tight text-zinc-900 flex items-center gap-1.5">
                    EcoScore
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.2 rounded">
                      Live
                    </span>
                  </span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-900 shadow-2xs font-bold'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="ml-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* User Quick Stats & Profile */}
            <div className="flex items-center gap-2.5">
              {/* Streak Widget */}
              <button
                onClick={() => setActiveTab('dashboard')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-200/80 bg-amber-50/70 text-amber-900 text-xs font-semibold hover:bg-amber-100/60 transition-colors cursor-pointer"
                title={`${user.streakDays} Day Sustainable Streak`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span className="font-mono font-bold">{user.streakDays}d</span>
                <span className="hidden sm:inline text-amber-700/80 font-normal">streak</span>
              </button>

              {/* EcoPoints Badge */}
              <button
                onClick={() => setActiveTab('leaderboard')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-200/80 bg-emerald-50/80 text-emerald-900 text-xs font-semibold hover:bg-emerald-100/60 transition-colors cursor-pointer"
                title="Total Lifetime EcoPoints"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-mono font-bold">{totalPoints}</span>
                <span className="hidden sm:inline text-emerald-700/80 font-normal">pts</span>
              </button>

              {/* Profile Avatar Trigger */}
              <button
                onClick={() => setProfileModalOpen(true)}
                className="relative rounded-full p-0.5 ring-1 ring-zinc-200 hover:ring-emerald-500 transition-all focus-visible:outline-emerald-600 cursor-pointer ml-1"
                aria-label="User Profile"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>

              {/* Mobile hamburger button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 focus-visible:outline-emerald-600 ml-1"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-200 bg-white px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-zinc-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-white">
                      {item.badge} claimable
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </>
  );
};
