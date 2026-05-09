import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DifficultyCard } from '../components/DifficultyCard';
import { RevealView } from '../components/RevealView';
import {
  DifficultyId,
  DifficultyPreset,
  GameStatus,
  ThemePalette,
} from '../types/game';

type HomeScreenProps = {
  theme: ThemePalette;
  presets: DifficultyPreset[];
  selectedDifficultyId: DifficultyId;
  onSelectDifficulty: (id: DifficultyId) => void;
  onStartGame: () => void;
  onResumeGame: () => void;
  canResume: boolean;
  soundEnabled: boolean;
  onOpenSettings: () => void;
  activeGameSummary: {
    difficultyLabel: string;
    status: GameStatus;
    safeCellsLeft: number;
  } | null;
};

export function HomeScreen({
  theme,
  presets,
  selectedDifficultyId,
  onSelectDifficulty,
  onStartGame,
  onResumeGame,
  canResume,
  soundEnabled,
  onOpenSettings,
  activeGameSummary,
}: HomeScreenProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      style={{ backgroundColor: theme.background }}
    >
      <RevealView
        delay={0}
        style={[
          styles.hero,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <Text style={[styles.eyebrow, { color: theme.accent }]}>
          CLASSIC MINESWEEPER
        </Text>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Two-screen Expo build with classic reveal and flag mechanics.
        </Text>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>
          First dig is guaranteed safe, chain reveals spread across zero-cells,
          and flagged squares stay protected until you remove the flag.
        </Text>
      </RevealView>

      <RevealView delay={90} style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          Difficulty
        </Text>
        <Pressable
          onPress={onOpenSettings}
          style={[
            styles.settingsChip,
            {
              backgroundColor: theme.surfaceMuted,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.settingsText, { color: theme.textPrimary }]}>
            Sound {soundEnabled ? 'On' : 'Off'}
          </Text>
        </Pressable>
      </RevealView>

      <RevealView delay={160} style={styles.cardStack}>
        {presets.map((preset) => (
          <DifficultyCard
            key={preset.id}
            preset={preset}
            theme={theme}
            selected={preset.id === selectedDifficultyId}
            onPress={() => onSelectDifficulty(preset.id)}
          />
        ))}
      </RevealView>

      {activeGameSummary ? (
        <RevealView
          delay={220}
          style={[
            styles.resumeCard,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.resumeLabel, { color: theme.textMuted }]}>
            Current board
          </Text>
          <Text style={[styles.resumeTitle, { color: theme.textPrimary }]}>
            {activeGameSummary.difficultyLabel} •{' '}
            {formatStatus(activeGameSummary.status)}
          </Text>
          <Text style={[styles.resumeHint, { color: theme.textMuted }]}>
            {activeGameSummary.safeCellsLeft} safe cells still hidden.
          </Text>
        </RevealView>
      ) : null}

      <RevealView delay={280} style={styles.actions}>
        <Pressable
          onPress={onStartGame}
          style={[styles.primaryButton, { backgroundColor: theme.accent }]}
        >
          <Text style={styles.primaryLabel}>Start New Game</Text>
        </Pressable>
        {canResume ? (
          <Pressable
            onPress={onResumeGame}
            style={[
              styles.secondaryButton,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={[styles.secondaryLabel, { color: theme.textPrimary }]}>
              Resume Board
            </Text>
          </Pressable>
        ) : null}
      </RevealView>
    </ScrollView>
  );
}

function formatStatus(status: GameStatus) {
  if (status === 'won') {
    return 'Won';
  }

  if (status === 'lost') {
    return 'Lost';
  }

  if (status === 'playing') {
    return 'In progress';
  }

  return 'Ready';
}

const styles = StyleSheet.create({
  content: {
    gap: 22,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  hero: {
    borderRadius: 28,
    borderWidth: 1.4,
    gap: 12,
    padding: 24,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 4,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.6,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
  },
  settingsChip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  settingsText: {
    fontSize: 13,
    fontWeight: '700',
  },
  cardStack: {
    gap: 14,
  },
  resumeCard: {
    borderRadius: 22,
    borderWidth: 1,
    gap: 4,
    padding: 18,
  },
  resumeLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  resumeTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  resumeHint: {
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    gap: 12,
    paddingBottom: 18,
  },
  primaryButton: {
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 16,
  },
  primaryLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 16,
  },
  secondaryLabel: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
});
