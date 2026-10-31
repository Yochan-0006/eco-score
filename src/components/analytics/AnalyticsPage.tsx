import React, { useState, useMemo } from 'react';
import { useEco } from '../../context/EcoContext';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  BarChart3, 
  Calendar, 
  TreePine, 
  Car, 
  Droplets, 
  Smartphone, 
  Repeat, 
  TrendingUp, 
  Sparkles, 
  Info 
} from 'lucide-react';
import { CATEGORY_METADATA } from '../../data/presetActions';

const CATEGORY_COLORS: Record<string, string> = {
  commute: '#059669', // emerald
  food: '#0d9488',    // teal
  energy: '#d97706',  // amber
  waste: '#4f46e5',   // indigo
  water: '#0891b2',   // cyan
  community: '#15803d'// green
};

export const AnalyticsPage: React.FC = () => {
  const { 
    loggedActions, 
    totalPoints, 
    totalCo2SavedKg, 
    totalWaterSavedL, 
    totalWasteSavedKg,
    treesEquivalent,
    carMilesAvoided,
    smartphoneChargesSaved
  } = useEco();

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');

  // Compute daily points and carbon timeline
  const dailyTimelineData = useMemo(() => {
    const daysCount = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 60;
    const dateMap = new Map<string, { date: string; label: string; points: number; co2: number; count: number }>();

    // Generate past consecutive days
    const now = new Date();
    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const isoKey = d.toISOString().split('T')[0];
      const label = d.toLocaleDateString(undefined, { weekday: daysCount <= 7 ? 'short' : undefined, month: 'short', day: 'numeric' });
      dateMap.set(isoKey, { date: isoKey, label, points: 0, co2: 0, count: 0 });
    }

    // Populate from logged actions
    for (const log of loggedActions) {
      if (!log.timestamp) continue;
      const isoKey = log.timestamp.split('T')[0];
      if (dateMap.has(isoKey)) {
        const item = dateMap.get(isoKey)!;
        item.points += log.pointsEarned;
        item.co2 = Number((item.co2 + log.co2SavedKg).toFixed(2));
        item.count += 1;
      }
    }

    return Array.from(dateMap.values());
  }, [loggedActions, timeRange]);

  // Compute category breakdown
  const categoryData = useMemo(() => {
    const map: Record<string, { name: string; co2: number; points: number; count: number; color: string }> = {};

    for (const log of loggedActions) {
      const cat = log.category;
      const label = CATEGORY_METADATA[cat]?.label || cat;
      if (!map[cat]) {
        map[cat] = {
          name: label,
          co2: 0,
          points: 0,
          count: 0,
          color: CATEGORY_COLORS[cat] || '#10b981'
        };
      }
      map[cat].co2 = Number((map[cat].co2 + log.co2SavedKg).toFixed(2));
      map[cat].points += log.pointsEarned;
      map[cat].count += 1;
    }

    return Object.values(map).sort((a, b) => b.co2 - a.co2);
  }, [loggedActions]);

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Impact & Climate Analytics
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Quantified carbon accounting, freshwater metrics, and behavioral trend analysis.
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-xl w-fit text-xs">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              timeRange === '7d' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              timeRange === '30d' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setTimeRange('all')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              timeRange === 'all' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            All History
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total EcoPoints</span>
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-900 mt-2">{totalPoints}</p>
          <p className="text-xs text-emerald-700 font-medium mt-1">Verified habit score</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">CO₂ Abated</span>
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-800 mt-2">
            {totalCo2SavedKg} <span className="text-sm font-sans font-normal text-zinc-500">kg</span>
          </p>
          <p className="text-xs text-zinc-500 mt-1">Equal to {treesEquivalent} tree-years</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Water Conserved</span>
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-800 mt-2">
            {totalWaterSavedL.toLocaleString()} <span className="text-sm font-sans font-normal text-zinc-500">L</span>
          </p>
          <p className="text-xs text-zinc-500 mt-1">~{Math.round(totalWaterSavedL / 45)} speed showers</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Landfill Diverted</span>
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-800 mt-2">
            {totalWasteSavedKg} <span className="text-sm font-sans font-normal text-zinc-500">kg</span>
          </p>
          <p className="text-xs text-zinc-500 mt-1">Compost and circularity</p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: EcoPoints Trend (AreaChart) & CO2 BarChart */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Chart 1: Daily EcoPoints Trend */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-zinc-900 tracking-tight">EcoPoints Accumulation</h2>
                <p className="text-xs text-zinc-500">Daily points earned through verified sustainable choices</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                Velocity Trend
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="pointsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                  <XAxis dataKey="label" stroke="#a1a1aa" fontSize={11} tickLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e4e4e7', fontSize: '12px' }}
                    formatter={(value: any) => [`${value} EcoPoints`, 'Points']}
                  />
                  <Area
                    type="monotone"
                    dataKey="points"
                    stroke="#059669"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#pointsGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Carbon Avoided by Day */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-zinc-900 tracking-tight">CO₂ Emissions Averted (kg)</h2>
                <p className="text-xs text-zinc-500">Atmospheric carbon offset achieved on each day</p>
              </div>
              <span className="text-xs font-mono font-bold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded">
                Daily Metric
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                  <XAxis dataKey="label" stroke="#a1a1aa" fontSize={11} tickLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e4e4e7', fontSize: '12px' }}
                    formatter={(value: any) => [`${value} kg CO₂`, 'Carbon Prevented']}
                  />
                  <Bar dataKey="co2" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column: Category Distribution & Real-World Equivalents */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Chart 3: Category Donut Chart */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-zinc-900 tracking-tight">Impact by Category</h2>
              <p className="text-xs text-zinc-500">Distribution of your carbon reductions</p>
            </div>

            {categoryData.length === 0 ? (
              <p className="text-xs text-zinc-400 py-10 text-center">No categories recorded yet</p>
            ) : (
              <>
                <div className="h-56 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="co2"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={3}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e4e4e7', fontSize: '12px' }}
                        formatter={(val: any) => [`${val} kg CO₂`, 'Averted']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-100 text-xs">
                  {categoryData.map(item => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-zinc-700 truncate max-w-36">{item.name}</span>
                      </div>
                      <span className="font-mono font-semibold text-zinc-900">{item.co2} kg</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Real-World Equivalency Impact Ledger */}
          <div className="p-6 rounded-2xl bg-zinc-900 text-white shadow-xs space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Planetary Impact
              </span>
              <h3 className="text-base font-bold text-white mt-1">Real-World Equivalents</h3>
              <p className="text-xs text-zinc-400">How your personal metrics translate physically</p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/70 border border-zinc-700/60">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <TreePine className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{treesEquivalent} Mature Trees</p>
                  <p className="text-[11px] text-zinc-400">Equivalent yearly carbon absorption</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/70 border border-zinc-700/60">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{carMilesAvoided} Car Miles</p>
                  <p className="text-[11px] text-zinc-400">Tailpipe emissions kept out of the air</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/70 border border-zinc-700/60">
                <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{smartphoneChargesSaved.toLocaleString()} Phone Charges</p>
                  <p className="text-[11px] text-zinc-400">Grid electricity demand eliminated</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
