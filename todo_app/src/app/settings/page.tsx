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
      <h1 className="text-2xl font-bold text-gray-900 mb-6" data-testid="settings-title">
        Settings
      </h1>

      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4" data-testid="settings-profile-title">
          Profile
        </h2>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="settings-name-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              defaultValue="john@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="settings-email-input"
            />
          </div>
          <SeededButton seedPage="settings" type="submit" data-testid="settings-save-profile">
            Save Changes
          </SeededButton>
        </form>
      </div>

      {/* Preferences Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4" data-testid="settings-preferences-title">
          Preferences
        </h2>
        <div className="divide-y">
          <SeededToggle
            seedPage="settings"
            label="Enable Notifications"
            description="Receive push notifications for task reminders"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            data-testid="settings-notifications"
          />
          <SeededToggle
            seedPage="settings"
            label="Dark Mode"
            description="Use dark theme across the app"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            data-testid="settings-dark-mode"
          />
          <SeededToggle
            seedPage="settings"
            label="Email Updates"
            description="Receive weekly summary emails"
            checked={emailUpdates}
            onChange={(e) => setEmailUpdates(e.target.checked)}
            data-testid="settings-email-updates"
          />
          <SeededToggle
            seedPage="settings"
            label="Two-Factor Authentication"
            description="Add an extra layer of security"
            checked={twoFactor}
            onChange={(e) => setTwoFactor(e.target.checked)}
            data-testid="settings-two-factor"
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-red-200">
        <h2 className="text-xl font-semibold text-red-600 mb-4" data-testid="settings-danger-title">
          Danger Zone
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {ambiguousLabels ? 'Toggle' : 'Delete Account'}
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
                className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4" data-testid="settings-info-title">
          About
        </h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p data-testid="settings-version">Version: 1.0.0</p>
          <p data-testid="settings-build">Build: 2026.03.15</p>
          <p data-testid="settings-environment">Environment: {process.env.NODE_ENV || 'development'}</p>
        </div>
      </div>
    </div>
  );
}
