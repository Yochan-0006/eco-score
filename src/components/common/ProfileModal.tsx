import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { X, User, Target, Flame, RotateCcw, Download, Upload, Check, AlertTriangle, Sparkles } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80'
];

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { 
    user, 
    updateProfile, 
    resetAllData, 
    exportDataJson, 
    importDataJson,
    totalPoints,
    userRank
  } = useEco();

  const [name, setName] = useState(user.name);
  const [handle, setHandle] = useState(user.handle);
  const [dailyGoal, setDailyGoal] = useState(user.dailyGoalPoints || 100);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || 'Eco Champion',
      handle: handle.trim().startsWith('@') ? handle.trim() : `@${handle.trim()}`,
      dailyGoalPoints: Number(dailyGoal) || 100,
      bio: bio.trim(),
      avatar
    });
    onClose();
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecoscore-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const ok = importDataJson(importJsonText.trim());
    if (ok) {
      setShowImportBox(false);
      setImportJsonText('');
      onClose();
    } else {
      alert('Invalid EcoScore JSON file format. Please check the text.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-zinc-200/90 shadow-2xl p-6 sm:p-7"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight">EcoProfile & Preferences</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Manage your climate persona, goals, and offline storage</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Snapshot Header */}
        <div className="my-5 p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img 
              src={avatar} 
              alt={user.name} 
              className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20"
            />
            <div>
              <p className="text-sm font-bold text-zinc-900">{name || 'Your Name'}</p>
              <p className="text-xs text-zinc-500">{handle} · Member since {user.joinedDate}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
              Rank #{userRank}
            </span>
            <p className="text-xs text-zinc-500 mt-1">{totalPoints} EcoPoints</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Avatar selector */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1.5">Choose Avatar</label>
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {AVATAR_OPTIONS.map((imgUrl, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setAvatar(imgUrl)}
                  className={`relative shrink-0 rounded-full overflow-hidden p-0.5 transition-all ${
                    avatar === imgUrl ? 'ring-2 ring-emerald-600 ring-offset-2' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="avatar option" className="w-10 h-10 rounded-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full text-sm px-3 py-2 bg-white rounded-lg border border-zinc-200 focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-600 text-zinc-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Username / Handle</label>
              <input
                type="text"
                value={handle}
                onChange={e => setHandle(e.target.value)}
                required
                className="w-full text-sm px-3 py-2 bg-white rounded-lg border border-zinc-200 focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-600 text-zinc-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">Bio / Climate Mission</label>
            <input
              type="text"
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="e.g. Aiming for zero food waste and commuting by bike"
              className="w-full text-sm px-3 py-2 bg-white rounded-lg border border-zinc-200 focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-600 text-zinc-900"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-zinc-700">Daily EcoPoints Target</label>
              <span className="text-xs font-mono font-semibold text-emerald-700">{dailyGoal} pts / day</span>
            </div>
            <div className="flex gap-2">
              {[50, 75, 100, 150, 200].map(val => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setDailyGoal(val)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                    dailyGoal === val
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Data Backup & Restore */}
          <div className="pt-3 border-t border-zinc-100">
            <p className="text-xs font-medium text-zinc-700 mb-2">Offline Data & Portability</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleDownloadBackup}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON Backup</span>
              </button>
              <button
                type="button"
                onClick={() => setShowImportBox(!showImportBox)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Restore JSON</span>
              </button>
            </div>

            {showImportBox && (
              <div className="mt-2.5 p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
                <p className="text-zinc-600 mb-1.5 font-medium">Paste exported EcoScore JSON below:</p>
                <textarea
                  rows={3}
                  value={importJsonText}
                  onChange={e => setImportJsonText(e.target.value)}
                  placeholder='{"user": {...}, "loggedActions": [...]}'
                  className="w-full p-2 bg-white font-mono text-xs border border-zinc-200 rounded-md focus:outline-emerald-600"
                />
                <div className="mt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowImportBox(false)}
                    className="px-2.5 py-1 text-zinc-600 hover:text-zinc-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleImportSubmit}
                    className="px-3 py-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 font-medium"
                  >
                    Load Backup
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Danger zone reset */}
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
            {!showResetConfirm ? (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to demo sample data</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-rose-600">Reset everything?</span>
                <button
                  type="button"
                  onClick={() => {
                    resetAllData();
                    setShowResetConfirm(false);
                    onClose();
                  }}
                  className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium rounded"
                >
                  Yes, reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="text-xs text-zinc-500 hover:text-zinc-700"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors cursor-pointer"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
