'use client';

import { useEffect, useState } from 'react';
import { UserSettings } from '@/lib/types';
import { getSettings, updateSettings } from '@/lib/utils/settings';
import { resetProgress } from '@/lib/utils/progress';

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(getSettings());
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleChange = (key: keyof UserSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    updateSettings(newSettings);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const handleResetProgress = () => {
    resetProgress();
    setShowResetConfirm(false);
    window.location.reload();
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-lg text-gray-600 mb-8">Customize your learning experience</p>

      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
        {/* Angle Unit */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Angle Unit</h3>
          <p className="text-sm text-gray-600 mb-3">Default unit for trigonometry problems</p>
          <div className="flex space-x-3">
            <button
              onClick={() => handleChange('angleUnit', 'degrees')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                settings.angleUnit === 'degrees'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Degrees
            </button>
            <button
              onClick={() => handleChange('angleUnit', 'radians')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                settings.angleUnit === 'radians'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Radians
            </button>
          </div>
        </div>

        {/* Answer Preference */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Answer Preference</h3>
          <p className="text-sm text-gray-600 mb-3">Preferred format for displaying answers</p>
          <div className="flex space-x-3">
            <button
              onClick={() => handleChange('answerPreference', 'decimal')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                settings.answerPreference === 'decimal'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Decimal
            </button>
            <button
              onClick={() => handleChange('answerPreference', 'fraction')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                settings.answerPreference === 'fraction'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Fraction
            </button>
          </div>
        </div>

        {/* Tolerance */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Numerical Tolerance</h3>
          <p className="text-sm text-gray-600 mb-3">
            Acceptable margin of error for decimal answers
          </p>
          <input
            type="number"
            value={settings.tolerance}
            onChange={e => handleChange('tolerance', parseFloat(e.target.value))}
            step="0.01"
            min="0.001"
            max="1"
            className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-600">
            (currently ±{settings.tolerance})
          </span>
        </div>

        {/* Dark Mode */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Dark Mode</h3>
          <p className="text-sm text-gray-600 mb-3">Toggle dark mode (coming soon)</p>
          <button
            onClick={() => handleChange('darkMode', !settings.darkMode)}
            disabled
            className={`px-4 py-2 rounded-lg font-medium transition-colors opacity-50 cursor-not-allowed ${
              settings.darkMode
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {settings.darkMode ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Reset Progress */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Reset Progress</h3>
          <p className="text-sm text-gray-600 mb-3">
            Delete all progress data and start fresh
          </p>
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Reset All Progress
            </button>
          ) : (
            <div className="space-x-3">
              <button
                onClick={handleResetProgress}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Confirm Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Saved Message */}
      {savedMessage && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
          Settings saved successfully!
        </div>
      )}
    </div>
  );
}
