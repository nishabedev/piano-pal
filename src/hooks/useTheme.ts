import { useState, useEffect, useCallback } from 'react';
import { getPreferences, savePreferences } from '../utils/storage';

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    getPreferences().then(prefs => {
      setTheme(prefs.theme);
      applyTheme(prefs.theme);
    });
  }, []);

  const applyTheme = (t: 'dark' | 'light') => {
    if (t === 'light') {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    } else {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    }
  };

  const toggle = useCallback(async () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    await savePreferences({ theme: next });
  }, [theme]);

  return { theme, toggle };
}
