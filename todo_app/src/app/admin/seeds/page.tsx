'use client';

import { useState, useEffect } from 'react';
import { SeededButton } from '@/components/seeded';

interface SeedData {
  mode: 'lite' | 'full';
  home?: Record<string, boolean>;
  auth?: Record<string, boolean>;
  tasks?: Record<string, boolean>;
  task?: Record<string, boolean>;
  projects?: Record<string, boolean>;
  calendar?: Record<string, boolean>;
  search?: Record<string, boolean>;
  settings?: Record<string, boolean>;
  onboarding?: Record<string, boolean>;
}

export default function AdminSeedsPage() {
  const [seeds, setSeeds] = useState<SeedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchSeeds();
  }, []);

  const fetchSeeds = async () => {
    try {
      const res = await fetch('/api/seed');
      if (!res.ok) throw new Error('Failed to fetch seeds');
      const data = await res.json();
      setSeeds(data);
    } catch (error) {
      console.error('Error fetching seeds:', error);
      setMessage({ type: 'error', text: 'Failed to load seeds' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (page: string, flag: string) => {
    if (!seeds) return;

    const pageData = seeds[page as keyof Omit<SeedData, 'mode'>];
    if (!pageData) return;

    setSeeds({
      ...seeds,
      [page]: {
        ...pageData,
        [flag]: !(pageData[flag] ?? false),
      },
    });
  };

  const handleSave = async () => {
    if (!seeds) return;
    
    setSaving(true);
    try {
      const res = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seeds),
      });
      
      if (!res.ok) throw new Error('Failed to save seeds');
      
      setMessage({ type: 'success', text: 'Seeds saved successfully! Changes persisted to MongoDB.' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving seeds:', error);
      setMessage({ type: 'error', text: 'Failed to save seeds' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: seeds?.mode || 'lite' }),
      });
      
      if (!res.ok) throw new Error('Failed to reset seeds');
      
      setMessage({ type: 'success', text: 'Seeds reset to defaults' });
      fetchSeeds();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error resetting seeds:', error);
      setMessage({ type: 'error', text: 'Failed to reset seeds' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!seeds) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">Failed to load seeds</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6" data-testid="admin-title">
        Admin - Seed Configuration
      </h1>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <p className={message.type === 'success' ? 'text-green-600' : 'text-red-600'}>
            {message.text}
          </p>
        </div>
      )}

      {/* Mode Selector */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4" data-testid="admin-mode-title">
          Mode
        </h2>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="lite"
              checked={seeds.mode === 'lite'}
              onChange={(e) => setSeeds({ ...seeds, mode: e.target.value as 'lite' | 'full' })}
              className="w-4 h-4 text-blue-600"
              data-testid="admin-mode-lite"
            />
            <span className="text-gray-700">Lite (low/medium severity)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="full"
              checked={seeds.mode === 'full'}
              onChange={(e) => setSeeds({ ...seeds, mode: e.target.value as 'lite' | 'full' })}
              className="w-4 h-4 text-blue-600"
              data-testid="admin-mode-full"
            />
            <span className="text-gray-700">Full (all severities)</span>
          </label>
        </div>
      </div>

      {/* Seed Flags by Page */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {Object.entries(seeds)
          .filter(([key]) => key !== 'mode')
          .map(([page, flags]) => (
            <div key={page} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 capitalize" data-testid={`admin-page-${page}`}>
                {page}
              </h2>
              <div className="space-y-3">
                {Object.entries(flags as Record<string, boolean>).map(([flag, value]) => (
                  <div key={flag} className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700" data-testid={`admin-flag-${page}-${flag}`}>
                        {flag.replace(/_/g, ' ')}
                      </label>
                      <p className="text-xs text-gray-500">
                        Current: <span className={value ? 'text-red-600 font-medium' : 'text-green-600'}>
                          {value ? 'ENABLED' : 'DISABLED'}
                        </span>
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleToggle(page, flag)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      data-testid={`admin-toggle-${page}-${flag}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <SeededButton
          seedPage="settings"
          onClick={handleSave}
          disabled={saving}
          data-testid="admin-save"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </SeededButton>
        <SeededButton
          seedPage="settings"
          variant="secondary"
          onClick={handleReset}
          disabled={saving}
          data-testid="admin-reset"
        >
          Reset to Defaults
        </SeededButton>
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">How it works</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Toggle flags to enable/disable specific UI faults</li>
          <li>• Click &quot;Save Changes&quot; to persist to MongoDB</li>
          <li>• Changes take effect immediately on page refresh</li>
          <li>• Use Lite mode for minor issues, Full for all issues</li>
        </ul>
      </div>
    </div>
  );
}
