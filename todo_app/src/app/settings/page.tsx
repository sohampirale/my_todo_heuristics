'use client';

import { useState } from 'react';
import { SeededButton, SeededToggle } from '@/components/seeded';
import { isSeedEnabled } from '@/lib/seeds';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [deleteAccountChecked, setDeleteAccountChecked] = useState(false);

  const destructiveNoWarn = isSeedEnabled('settings', 'destructive_toggle_no_warn');
  const ambiguousLabels = isSeedEnabled('settings', 'ambiguous_toggle_labels');

  const handleDeleteAccount = () => {
    if (destructiveNoWarn || confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      console.log('Account deleted');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile saved');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2" data-testid="settings-title">
          ⚙️ Settings
        </h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="card p-8 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2" data-testid="settings-profile-title">
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Profile
        </h2>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              defaultValue="John Doe"
              className="input-modern"
              data-testid="settings-name-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue="john@example.com"
              className="input-modern"
              data-testid="settings-email-input"
            />
          </div>
          <SeededButton seedPage="settings" type="submit" data-testid="settings-save-profile">
            💾 Save Changes
          </SeededButton>
        </form>
      </div>

      {/* Preferences Section */}
      <div className="card p-8 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2" data-testid="settings-preferences-title">
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Preferences
        </h2>
        <div className="divide-y divide-gray-100">
          <SeededToggle
            seedPage="settings"
            label="🔔 Enable Notifications"
            description="Receive push notifications for task reminders"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            data-testid="settings-notifications"
          />
          <SeededToggle
            seedPage="settings"
            label="🌙 Dark Mode"
            description="Use dark theme across the app"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            data-testid="settings-dark-mode"
          />
          <SeededToggle
            seedPage="settings"
            label="📧 Email Updates"
            description="Receive weekly summary emails"
            checked={emailUpdates}
            onChange={(e) => setEmailUpdates(e.target.checked)}
            data-testid="settings-email-updates"
          />
          <SeededToggle
            seedPage="settings"
            label="🔐 Two-Factor Authentication"
            description="Add an extra layer of security"
            checked={twoFactor}
            onChange={(e) => setTwoFactor(e.target.checked)}
            data-testid="settings-two-factor"
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card p-8 mb-6 border-2 border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
        <h2 className="text-xl font-semibold text-red-600 mb-6 flex items-center gap-2" data-testid="settings-danger-title">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Danger Zone
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {ambiguousLabels ? 'Toggle' : '🗑️ Delete Account'}
              </p>
              <p className="text-sm text-gray-500">
                {ambiguousLabels ? 'Enable/Disable' : 'Permanently delete your account and all data'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={deleteAccountChecked}
                onChange={(e) => setDeleteAccountChecked(e.target.checked)}
                className="w-5 h-5 text-red-600 rounded-lg border-2 border-gray-300 focus:ring-red-500 focus:ring-2"
                data-testid="settings-delete-confirm"
              />
              <SeededButton
                seedPage="settings"
                variant="danger"
                onClick={handleDeleteAccount}
                disabled={!deleteAccountChecked}
                data-testid="settings-delete-account"
              >
                Delete Account
              </SeededButton>
            </div>
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="card p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2" data-testid="settings-info-title">
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          About
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Version</span>
            <span className="font-medium text-gray-900" data-testid="settings-version">1.0.0</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Build</span>
            <span className="font-medium text-gray-900" data-testid="settings-build">2026.03.15</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Environment</span>
            <span className="font-medium text-gray-900" data-testid="settings-environment">
              <span className="badge badge-success">Development</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
