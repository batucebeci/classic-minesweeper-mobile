import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const SETTINGS_STORAGE_KEY = 'classic-minesweeper.settings';

type GameSettings = {
  soundEnabled: boolean;
};

const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
};

export function useGameSettings() {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      try {
        const storedValue = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);

        if (!storedValue || !isMounted) {
          return;
        }

        const parsed = JSON.parse(storedValue) as Partial<GameSettings>;

        setSettings({
          soundEnabled:
            typeof parsed.soundEnabled === 'boolean'
              ? parsed.soundEnabled
              : DEFAULT_SETTINGS.soundEnabled,
        });
      } catch {
        setSettings(DEFAULT_SETTINGS);
      }
    }

    void loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const setSoundEnabled = async (soundEnabled: boolean) => {
    const nextSettings = { soundEnabled };
    setSettings(nextSettings);

    try {
      await AsyncStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(nextSettings)
      );
    } catch {
      // Keep the in-memory preference even if persistence fails.
    }
  };

  return {
    settings,
    setSoundEnabled,
  };
}
