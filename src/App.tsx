/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EcoProvider } from './context/EcoContext';
import { NavigationTab } from './types';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/ToastContainer';
import { CelebrationModal } from './components/common/CelebrationModal';
import { AchievementModal } from './components/common/AchievementModal';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { LogActionPage } from './components/log/LogActionPage';
import { ChallengesPage } from './components/challenges/ChallengesPage';
import { LeaderboardPage } from './components/leaderboard/LeaderboardPage';
import { AchievementsPage } from './components/achievements/AchievementsPage';
import { AnalyticsPage } from './components/analytics/AnalyticsPage';
import { Sprout, Heart, ShieldCheck, Github } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {activeTab === 'landing' && <LandingPage setActiveTab={setActiveTab} />}
        {activeTab === 'dashboard' && <DashboardPage setActiveTab={setActiveTab} />}
        {activeTab === 'log' && <LogActionPage setActiveTab={setActiveTab} />}
        {activeTab === 'challenges' && <ChallengesPage setActiveTab={setActiveTab} />}
        {activeTab === 'leaderboard' && <LeaderboardPage />}
        {activeTab === 'achievements' && <AchievementsPage />}
        {activeTab === 'analytics' && <AnalyticsPage />}
      </main>

      {/* Global Notifications & Modals */}
      <ToastContainer />
      <CelebrationModal />
      <AchievementModal />

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-200/80 bg-white py-8 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Sprout className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-zinc-800">EcoScore</span>
            <span aria-hidden="true">·</span>
            <span>Gamified Sustainability & Carbon Engine</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-zinc-500">
            <button
              onClick={() => setActiveTab('landing')}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Explore Overview
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('log')}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Log Action
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Quests
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Badges
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Analytics
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Client-Side & Offline</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <EcoProvider>
      <AppContent />
    </EcoProvider>
  );
}
