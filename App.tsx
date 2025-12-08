import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, View, useColorScheme } from 'react-native';

import { DEFAULT_DIFFICULTY, DIFFICULTY_PRESETS } from './src/constants/game';
import { useGameSettings } from './src/hooks/useGameSettings';
import { useMinesweeperGame } from './src/hooks/useMinesweeperGame';
import { useSoundEffects } from './src/hooks/useSoundEffects';
import { GameScreen } from './src/screens/GameScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { getTheme } from './src/theme/theme';
import { DifficultyId } from './src/types/game';

type Screen = 'home' | 'game' | 'settings';
type BaseScreen = Exclude<Screen, 'settings'>;

export default function App() {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme);
  const { settings, setSoundEnabled } = useGameSettings();
  const sounds = useSoundEffects(settings.soundEnabled);
  const game = useMinesweeperGame({
    initialDifficulty: DEFAULT_DIFFICULTY,
    onSoundEffect: sounds.play,
  });
  const [screen, setScreen] = useState<Screen>('home');
  const [previousScreen, setPreviousScreen] = useState<BaseScreen>('home');
  const [selectedDifficultyId, setSelectedDifficultyId] =
    useState<DifficultyId>(DEFAULT_DIFFICULTY.id);

  const selectedDifficulty =
    DIFFICULTY_PRESETS.find((preset) => preset.id === selectedDifficultyId) ??
    DEFAULT_DIFFICULTY;

  const canResume =
    game.state.isBoardInitialized || game.state.status !== 'idle';

  const openSettings = () => {
    if (screen !== 'settings') {
      setPreviousScreen(screen);
    }

    setScreen('settings');
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <StatusBar style={theme.statusBar} />
      <View style={styles.content}>
        {screen === 'home' ? (
          <HomeScreen
            theme={theme}
            presets={DIFFICULTY_PRESETS}
            selectedDifficultyId={selectedDifficultyId}
            onSelectDifficulty={setSelectedDifficultyId}
            onStartGame={() => {
              game.startGame(selectedDifficulty);
              setScreen('game');
            }}
            onResumeGame={() => setScreen('game')}
            canResume={canResume}
            soundEnabled={settings.soundEnabled}
            onOpenSettings={openSettings}
            activeGameSummary={
              canResume
                ? {
                    difficultyLabel: game.state.difficulty.label,
                    status: game.state.status,
                    safeCellsLeft: game.safeCellsRemaining,
                  }
                : null
            }
          />
        ) : screen === 'game' ? (
          <GameScreen
            theme={theme}
            state={game.state}
            safeCellsRemaining={game.safeCellsRemaining}
            onBack={() => setScreen('home')}
            onRestart={game.restartGame}
            onCellPress={game.handleCellPress}
            onModeChange={game.setMode}
            onOpenSettings={openSettings}
          />
        ) : (
          <SettingsScreen
            theme={theme}
            soundEnabled={settings.soundEnabled}
            schemeLabel={colorScheme === 'dark' ? 'Dark' : 'Light'}
            onBack={() => setScreen(previousScreen)}
            onToggleSound={setSoundEnabled}
            onPreviewSound={() => sounds.play('dig')}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
