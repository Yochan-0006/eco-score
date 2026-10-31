import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { NavigationTab } from '../../types';
import { 
  Sprout, 
  ArrowRight, 
  Bike, 
  Flame, 
  Trophy, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Globe, 
  RotateCcw,
  Sliders,
  Award
} from 'lucide-react';

interface LandingPageProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setActiveTab }) => {
  const { totalPoints, totalCo2SavedKg, logAction, user } = useEco();

  // Interactive Live Simulator state
  const [selectedHabit, setSelectedHabit] = useState<'bike' | 'plant' | 'dry' | 'compost'>('bike');
  const [simulatorQuantity, setSimulatorQuantity] = useState<number>(10);

  const habitSpecs = {
    bike: {
      id: 'bike-commute',
      title: 'Bicycle Commute',
      unit: 'km',
      pointsPerUnit: 5,
      co2PerUnit: 0.19,
      waterPerUnit: 0,
      min: 1,
      max: 50,
      step: 1,
      fact: 'Replacing 10 km of car driving prevents ~1.9 kg of direct CO2 emissions.'
    },
    plant: {
      id: 'plant-based-meal',
      title: 'Plant-Based Meals',
      unit: 'meals',
      pointsPerUnit: 20,
      co2PerUnit: 1.6,
      waterPerUnit: 780,
      min: 1,
      max: 10,
      step: 1,
      fact: 'One meatless meal spares 780 liters of water and avoids 1.6 kg of emissions.'
    },
    dry: {
      id: 'line-dry-clothes',
      title: 'Air Dry Clothes',
      unit: 'loads',
      pointsPerUnit: 25,
      co2PerUnit: 1.8,
      waterPerUnit: 0,
      min: 1,
      max: 8,
      step: 1,
      fact: 'Skipping the tumble dryer saves ~1.8 kg CO2 per wash load.'
    },
    compost: {
      id: 'composting-organic',
      title: 'Compost Organics',
      unit: 'kg',
      pointsPerUnit: 13,
      co2PerUnit: 0.9,
      waterPerUnit: 0,
      min: 0.5,
      max: 15,
      step: 0.5,
      fact: 'Composting stops food scraps from generating dangerous methane in landfills.'
    }
  };

  const currentSpec = habitSpecs[selectedHabit];
  const simPoints = Math.round(simulatorQuantity * currentSpec.pointsPerUnit);
  const simCo2 = Number((simulatorQuantity * currentSpec.co2PerUnit).toFixed(2));
  const simWater = Math.round(simulatorQuantity * currentSpec.waterPerUnit);
  const simTrees = Number((simCo2 / 22).toFixed(2));

  const handleSimulateAndLog = () => {
    logAction(currentSpec.id, simulatorQuantity, `Logged via interactive impact simulator`);
    setActiveTab('dashboard');
  };

  return (
    <div className="space-y-16 py-6 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white via-emerald-50/25 to-zinc-50 border border-zinc-200/80 p-8 sm:p-12 lg:p-16 shadow-xs">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Turn Climate Anxiety Into Everyday Action</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-[1.12]">
            Turn Everyday Habits Into Measurable <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2">Planetary Impact</span>.
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            EcoScore gamifies sustainable living. Log low-carbon commutes, plant-rich meals, energy savings, and circular habits. Earn EcoPoints, build daily streaks, climb the leaderboard, and unlock verified eco-badges.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-emerald-600 cursor-pointer"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('log')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-zinc-50 text-zinc-800 font-semibold text-sm rounded-xl border border-zinc-200 shadow-2xs transition-all cursor-pointer"
            >
              <Bike className="w-4 h-4 text-emerald-600" />
              <span>Log First Action</span>
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 font-medium text-sm rounded-xl transition-all cursor-pointer"
            >
              <span>Explore Quests</span>
            </button>
          </div>

          {/* Social Proof / Current Status */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 border-t border-zinc-200/60 max-w-xl mx-auto">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Offline-First (No tracking)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Real IPCC / EPA Conversion Math</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero Account Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Impact Simulator */}
      <section className="bg-white rounded-2xl border border-zinc-200/90 p-6 sm:p-10 shadow-xs">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
                <Sliders className="w-4 h-4" />
                <span>INTERACTIVE HABIT SIMULATOR</span>
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
                Simulate Your Real-World Impact
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Pick a sustainable choice below and adjust the slider to see how simple micro-habits compound.
              </p>
            </div>

            {/* Quick selector buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl">
              <button
                onClick={() => { setSelectedHabit('bike'); setSimulatorQuantity(10); }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedHabit === 'bike' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                🚴 Cycling
              </button>
              <button
                onClick={() => { setSelectedHabit('plant'); setSimulatorQuantity(3); }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedHabit === 'plant' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                🥗 Plant Meal
              </button>
              <button
                onClick={() => { setSelectedHabit('dry'); setSimulatorQuantity(2); }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedHabit === 'dry' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                ☀️ Air Dry
              </button>
              <button
                onClick={() => { setSelectedHabit('compost'); setSimulatorQuantity(3); }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedHabit === 'compost' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                ♻️ Compost
              </button>
            </div>
          </div>

          {/* Simulator Controls & Calculations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Slider Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-zinc-800">
                    {currentSpec.title} Volume
                  </label>
                  <span className="text-base font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200/60">
                    {simulatorQuantity} {currentSpec.unit}
                  </span>
                </div>

                <input
                  type="range"
                  min={currentSpec.min}
                  max={currentSpec.max}
                  step={currentSpec.step}
                  value={simulatorQuantity}
                  onChange={e => setSimulatorQuantity(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />

                <div className="flex justify-between text-xs text-zinc-400 mt-1 font-mono">
                  <span>{currentSpec.min} {currentSpec.unit}</span>
                  <span>{currentSpec.max} {currentSpec.unit}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Environmental Baseline</p>
                <p className="text-xs text-zinc-700 leading-relaxed font-sans">{currentSpec.fact}</p>
              </div>

              <button
                onClick={handleSimulateAndLog}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Log this action in EcoScore (+{simPoints} pts)</span>
              </button>
            </div>

            {/* Impact Output Cards */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
                <p className="text-xs font-medium text-emerald-800 uppercase tracking-wider">EcoPoints Earned</p>
                <p className="text-3xl font-extrabold font-mono text-emerald-900 mt-2">+{simPoints}</p>
                <p className="text-xs text-emerald-700/80 mt-1">Direct game score reward</p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/90">
                <p className="text-xs font-medium text-zinc-600 uppercase tracking-wider">CO₂ Prevented</p>
                <p className="text-3xl font-extrabold font-mono text-zinc-900 mt-2">-{simCo2} <span className="text-sm font-sans font-normal text-zinc-500">kg</span></p>
                <p className="text-xs text-zinc-500 mt-1">Equivalent to {simTrees} tree-months</p>
              </div>

              {simWater > 0 ? (
                <div className="p-5 rounded-2xl bg-cyan-50/60 border border-cyan-200/80 col-span-2">
                  <p className="text-xs font-medium text-cyan-800 uppercase tracking-wider">Freshwater Conserved</p>
                  <p className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-900 mt-2">{simWater.toLocaleString()} <span className="text-sm font-sans font-normal text-cyan-700">Liters</span></p>
                  <p className="text-xs text-cyan-700/80 mt-1">Equal to roughly {Math.round(simWater / 45)} speed showers</p>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 col-span-2">
                  <p className="text-xs font-medium text-amber-800 uppercase tracking-wider">Clean Energy Impact</p>
                  <p className="text-lg font-bold text-amber-900 mt-1">100% Zero Direct Grid Emissions</p>
                  <p className="text-xs text-amber-700/90 mt-1">Reduces peak fossil grid dispatch demand</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of EcoScore */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            How EcoScore Turns Action Into Long-term Habits
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            Built on behavioral science, habit stacking, and honest environmental metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Bike className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">1-Tap Action Logging</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Log rides, meals, washes, and compost in under 3 seconds. Pre-calibrated units make habit recording completely frictionless.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Streaks & Streak Shields</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Keep your daily momentum burning. Every consecutive day of green actions builds your multiplier and protects your score.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Dynamic Quests & Badges</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Tackle daily sprints and weekly community challenges. Collect collectible badges as you hit real carbon thresholds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Carbon & Water Analytics</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Watch your personal impact curve climb. Export transparent data or track carbon offset equivalents over time.
            </p>
          </div>
        </div>
      </section>

      {/* Community Call to Action Footer */}
      <section className="rounded-3xl bg-zinc-900 text-white p-8 sm:p-12 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Ready to Make Every Day Count for the Planet?
        </h2>
        <p className="text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed">
          Your current session has accumulated <span className="text-emerald-400 font-mono font-bold">{totalPoints} EcoPoints</span> and diverted <span className="text-emerald-400 font-mono font-bold">{totalCo2SavedKg} kg</span> of carbon emissions.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-sm transition-all shadow-md cursor-pointer"
          >
            Launch EcoScore Dashboard
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm transition-all cursor-pointer"
          >
            View Leaderboard
          </button>
        </div>
      </section>
    </div>
  );
};
