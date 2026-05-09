import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { MinesweeperBoard } from '../components/MinesweeperBoard';
import { ModeSwitch } from '../components/ModeSwitch';
import { RevealView } from '../components/RevealView';
import { StatCard } from '../components/StatCard';
import { GameState, Position, ThemePalette } from '../types/game';

type GameScreenProps = {
  theme: ThemePalette;
  state: GameState;
  safeCellsRemaining: number;
  onBack: () => void;
  onRestart: () => void;
  onCellPress: (position: Position) => void;
  onModeChange: (mode: GameState['mode']) => void;
  onOpenSettings: () => void;
};

export function GameScreen({
  theme,
  state,
  safeCellsRemaining,
  onBack,
  onRestart,
  onCellPress,
  onModeChange,
  onOpenSettings,
}: GameScreenProps) {
  const statusCopy = getStatusCopy(state.status);

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.content}
    >
      <RevealView delay={0} style={styles.toolbar}>
        <Pressable
          onPress={onBack}
          style={[
            styles.chromeButton,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.chromeButtonLabel, { color: theme.textPrimary }]}>
            Home
          </Text>
        </Pressable>
        <View
          style={[
            styles.toolbarCenter,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.toolbarLabel, { color: theme.textMuted }]}>
            {state.difficulty.label}
          </Text>
          <Text style={[styles.toolbarTitle, { color: theme.textPrimary }]}>
            {state.difficulty.rows}x{state.difficulty.columns} • {state.difficulty.mines}{' '}
            mines
          </Text>
        </View>
        <Pressable
          onPress={onRestart}
          style={[
            styles.chromeButton,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.chromeButtonLabel, { color: theme.textPrimary }]}>
            Reset
          </Text>
        </Pressable>
      </RevealView>

      <RevealView
        delay={90}
        style={[
          styles.statusPanel,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
          },
        ]}
      >
        <Text style={[styles.statusTitle, { color: theme.textPrimary }]}>
          {statusCopy.title}
        </Text>
        <Text style={[styles.statusText, { color: theme.textMuted }]}>
          {statusCopy.description}
        </Text>
        <Pressable
          onPress={onOpenSettings}
          style={[
            styles.inlineButton,
            { backgroundColor: theme.surfaceMuted, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.inlineButtonLabel, { color: theme.textPrimary }]}>
            Settings
          </Text>
        </Pressable>
      </RevealView>

      <RevealView delay={160} style={styles.statsRow}>
        <StatCard label="Mode" value={state.mode.toUpperCase()} theme={theme} />
        <StatCard
          label="Flags"
          value={`${state.flagsUsed}/${state.difficulty.mines}`}
          theme={theme}
        />
        <StatCard
          label="Safe Left"
          value={`${safeCellsRemaining}`}
          theme={theme}
        />
      </RevealView>

      <RevealView delay={220}>
        <ModeSwitch theme={theme} mode={state.mode} onChange={onModeChange} />
      </RevealView>

      <RevealView
        delay={290}
        style={[
          styles.boardSection,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
          },
        ]}
      >
        <Text style={[styles.boardLabel, { color: theme.textMuted }]}>
          Tap any cell. The selected mode will be applied immediately.
        </Text>
        <MinesweeperBoard
          board={state.board}
          theme={theme}
          explodedCell={state.explodedCell}
          onCellPress={onCellPress}
        />
      </RevealView>
    </ScrollView>
  );
}

function getStatusCopy(status: GameState['status']) {
  if (status === 'won') {
    return {
      title: 'Board cleared',
      description: 'All safe squares are revealed. Mines can stay flagged or hidden.',
    };
  }

  if (status === 'lost') {
    return {
      title: 'Mine triggered',
      description: 'A revealed mine ends the round immediately. Reset to try again.',
    };
  }

  if (status === 'playing') {
    return {
      title: 'Round in progress',
      description: 'Use Dig to reveal and Flag to mark suspected mines.',
    };
  }

  return {
    title: 'Ready to start',
    description: 'The first dig seeds the mines and guarantees the tapped square is safe.',
  };
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  toolbar: {
    flexDirection: 'row',
    gap: 10,
  },
  chromeButton: {
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    minWidth: 86,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  chromeButtonLabel: {
    fontSize: 14,
    fontWeight: '800',
  },
  toolbarCenter: {
    borderRadius: 22,
    borderWidth: 1,
    flex: 1,
    gap: 4,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  toolbarLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  toolbarTitle: {
    fontSize: 17,
    fontWeight: '900',
  },
  statusPanel: {
    borderRadius: 24,
    borderWidth: 1,
    gap: 10,
    padding: 18,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: '900',
  },
  statusText: {
    fontSize: 14,
    lineHeight: 20,
  },
  inlineButton: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inlineButtonLabel: {
    fontSize: 13,
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  boardSection: {
    borderRadius: 24,
    borderWidth: 1,
    gap: 14,
    padding: 16,
  },
  boardLabel: {
    fontSize: 13,
    lineHeight: 18,
  },
});
