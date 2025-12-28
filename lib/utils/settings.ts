import { UserSettings } from '../types';

const SETTINGS_KEY = 'mathed_settings';

const DEFAULT_SETTINGS: UserSettings = {
  angleUnit: 'degrees',
  answerPreference: 'decimal',
  tolerance: 0.01,
  darkMode: false,
};

export const getSettings = (): UserSettings => {
  if (typeof window === 'undefined') {
    return DEFAULT_SETTINGS;
  }

  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }

  return DEFAULT_SETTINGS;
};

export const saveSettings = (settings: UserSettings): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
};

export const updateSettings = (
  partial: Partial<UserSettings>
): UserSettings => {
  const current = getSettings();
  const updated = { ...current, ...partial };
  saveSettings(updated);
  return updated;
};
