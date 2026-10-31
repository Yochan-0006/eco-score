import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { ActionCategory, EcoActionDefinition } from '../../types';
import { CATEGORY_METADATA } from '../../data/presetActions';
import { 
  Search, 
  Plus, 
  Minus, 
  Check, 
  Sparkles, 
  X, 
  MessageSquare, 
  Filter,
  Trash2,
  TreePine,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { IconHelper } from '../common/IconHelper';

export const LogActionPage: React.FC = () => {
  const { allActions, logAction, addCustomAction, deleteCustomAction } = useEco();

  const [activeCategory, setActiveCategory] = useState<'all' | ActionCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  // Custom Action Modal Form State
  const [customTitle, setCustomTitle] = useState('');
  const [customCategory, setCustomCategory] = useState<ActionCategory>('waste');
  const [customUnit, setCustomUnit] = useState('times');
  const [customPoints, setCustomPoints] = useState(20);
  const [customCo2, setCustomCo2] = useState(1.0);
  const [customWater, setCustomWater] = useState(0);
  const [customDesc, setCustomDesc] = useState('');
  const [customFact, setCustomFact] = useState('');

  // Handle quantity changes per action
  const getQty = (action: EcoActionDefinition) => {
    return quantities[action.id] ?? action.defaultQuantity;
  };

  const setQty = (id: string, val: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0.1, Number(val.toFixed(1)))
    }));
  };

  // Filter actions
  const filteredActions = allActions.filter(action => {
    const matchesCategory = activeCategory === 'all' || action.category === activeCategory;
    const matchesSearch = 
      action.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      action.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      action.impactFact.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLogClick = (action: EcoActionDefinition) => {
    const qty = getQty(action);
    const note = notes[action.id] || '';
    logAction(action.id, qty, note);
    // clear specific note after logging
    if (note) {
      setNotes(prev => ({ ...prev, [action.id]: '' }));
    }
  };

  const handleCreateCustomAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    addCustomAction({
      title: customTitle.trim(),
      category: customCategory,
      unit: customUnit.trim() || 'action',
      defaultQuantity: 1,
      basePoints: Number(customPoints) || 15,
      co2PerUnit: Number(customCo2) || 0.5,
      waterPerUnit: Number(customWater) || 0,
      wastePerUnit: 0,
      icon: customCategory === 'commute' ? 'Bike' : customCategory === 'food' ? 'Salad' : customCategory === 'energy' ? 'Sun' : customCategory === 'waste' ? 'Repeat' : 'Droplets',
      description: customDesc.trim() || 'Custom sustainable daily habit.',
      impactFact: customFact.trim() || 'Every mindful choice avoids unnecessary carbon and resource usage.'
    });

    setIsCustomModalOpen(false);
    // Reset form
    setCustomTitle('');
    setCustomDesc('');
    setCustomFact('');
    setCustomPoints(20);
    setCustomCo2(1.0);
  };

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Log Sustainable Action
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Choose from science-backed categories or create your own custom green habit.
          </p>
        </div>

        <button
          onClick={() => setIsCustomModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Custom Habit</span>
        </button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search habits (e.g., bicycle, compost, cold wash, produce, transit)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-zinc-200 text-sm text-zinc-900 focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills / Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 font-semibold rounded-lg shrink-0 transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-zinc-900 text-white shadow-2xs'
                : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            All Actions ({allActions.length})
          </button>
          
          {(['commute', 'food', 'energy', 'waste', 'water', 'community'] as ActionCategory[]).map(cat => {
            const meta = CATEGORY_METADATA[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold rounded-lg shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <IconHelper name={meta.iconName} className="w-3.5 h-3.5" />
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions Grid */}
      {filteredActions.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-zinc-200/80 space-y-3">
          <p className="text-base font-bold text-zinc-800">No matching eco habits found</p>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try searching for another keyword or create this action as a custom habit.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredActions.map(action => {
            const qty = getQty(action);
            const calculatedPoints = Math.round(action.basePoints * qty);
            const calculatedCo2 = Number((action.co2PerUnit * qty).toFixed(2));
            const calculatedWater = Math.round(action.waterPerUnit * qty);
            const isNoteOpen = expandedNotes[action.id];

            return (
              <div
                key={action.id}
                className="rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between p-5 relative group"
              >
                {/* Custom badge or delete button if custom */}
                {action.isCustom && (
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Custom
                    </span>
                    <button
                      onClick={() => deleteCustomAction(action.id)}
                      className="p-1 text-zinc-400 hover:text-rose-600 rounded transition-colors"
                      title="Delete custom habit"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="space-y-3">
                  {/* Category & Icon */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-800 flex items-center justify-center shrink-0">
                      <IconHelper name={action.icon} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 pr-12">
                      <p className="text-xs text-zinc-500 capitalize">{action.category}</p>
                      <h3 className="text-sm font-bold text-zinc-900 leading-snug truncate">
                        {action.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 line-clamp-2">
                    {action.description}
                  </p>

                  <div className="p-2.5 rounded-lg bg-zinc-50 text-[11px] text-zinc-600 border border-zinc-100">
                    <strong className="text-zinc-700">Impact math: </strong>
                    <span>{action.impactFact}</span>
                  </div>
                </div>

                {/* Interactive Controls & Live Calculation */}
                <div className="pt-4 mt-3 border-t border-zinc-100 space-y-3">
                  
                  {/* Stepper */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-700">Quantity</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQty(action.id, Math.max(0.5, qty - (action.unit === 'km' ? 2 : 1)))}
                        className="w-7 h-7 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-600 cursor-pointer"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex items-center gap-1 font-mono text-xs font-bold text-zinc-900 min-w-14 justify-center">
                        <input
                          type="number"
                          step={action.unit === 'kg' ? 0.5 : 1}
                          min={0.1}
                          value={qty}
                          onChange={e => setQty(action.id, parseFloat(e.target.value) || 1)}
                          className="w-10 text-center bg-transparent border-b border-zinc-300 focus:outline-emerald-600"
                        />
                        <span className="text-[11px] font-sans font-normal text-zinc-500">{action.unit}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setQty(action.id, qty + (action.unit === 'km' ? 2 : 1))}
                        className="w-7 h-7 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-600 cursor-pointer"
                        aria-label="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Dynamic calculation live badge */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/70 border border-emerald-100 text-xs">
                    <span className="font-mono font-bold text-emerald-800">
                      +{calculatedPoints} EcoPoints
                    </span>
                    <div className="flex items-center gap-2 text-zinc-600 font-mono text-[11px]">
                      <span>-{calculatedCo2} kg CO₂</span>
                      {calculatedWater > 0 && <span>· -{calculatedWater}L H₂O</span>}
                    </div>
                  </div>

                  {/* Optional Note Toggle */}
                  <div>
                    {!isNoteOpen ? (
                      <button
                        type="button"
                        onClick={() => setExpandedNotes(p => ({ ...p, [action.id]: true }))}
                        className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-800 transition-colors"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Add note or detail (optional)</span>
                      </button>
                    ) : (
                      <div className="space-y-1">
                        <input
                          type="text"
                          placeholder="e.g. Cycled via sunny river trail..."
                          value={notes[action.id] || ''}
                          onChange={e => setNotes(prev => ({ ...prev, [action.id]: e.target.value }))}
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 focus:outline-emerald-600"
                        />
                      </div>
                    )}
                  </div>

                  {/* Primary Log Button */}
                  <button
                    onClick={() => handleLogClick(action)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Log Action (+{calculatedPoints} pts)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Custom Action Creator Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-xs animate-in fade-in">
          <div 
            className="relative w-full max-w-md bg-white rounded-2xl border border-zinc-200/90 shadow-2xl p-6"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div>
                <h3 className="text-base font-bold text-zinc-900">Create Custom Habit</h3>
                <p className="text-xs text-zinc-500">Add an eco-friendly activity unique to your lifestyle</p>
              </div>
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomAction} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Habit Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mended Vintage Clothing, Solar Balcony Run"
                  value={customTitle}
                  onChange={e => setCustomTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-zinc-200 rounded-lg focus:outline-emerald-600 text-zinc-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Category</label>
                  <select
                    value={customCategory}
                    onChange={e => setCustomCategory(e.target.value as ActionCategory)}
                    className="w-full text-xs px-3 py-2 border border-zinc-200 rounded-lg focus:outline-emerald-600 bg-white text-zinc-900"
                  >
                    <option value="commute">Commute</option>
                    <option value="food">Food</option>
                    <option value="energy">Energy</option>
                    <option value="waste">Waste</option>
                    <option value="water">Water</option>
                    <option value="community">Community</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Unit of Measure</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. km, item, hr, load"
                    value={customUnit}
                    onChange={e => setCustomUnit(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-zinc-200 rounded-lg focus:outline-emerald-600 text-zinc-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Base EcoPoints</label>
                  <input
                    type="number"
                    min={5}
                    max={200}
                    value={customPoints}
                    onChange={e => setCustomPoints(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 border border-zinc-200 rounded-lg focus:outline-emerald-600 font-mono text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">CO₂ Saved per Unit (kg)</label>
                  <input
                    type="number"
                    step={0.1}
                    min={0}
                    value={customCo2}
                    onChange={e => setCustomCo2(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 border border-zinc-200 rounded-lg focus:outline-emerald-600 font-mono text-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Short note explaining this action"
                  value={customDesc}
                  onChange={e => setCustomDesc(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-zinc-200 rounded-lg focus:outline-emerald-600 text-zinc-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCustomModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs cursor-pointer"
                >
                  Create Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
