import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DifficultyPreset, ThemePalette } from '../types/game';

type DifficultyCardProps = {
  preset: DifficultyPreset;
  theme: ThemePalette;
  selected: boolean;
  onPress: () => void;
};

export function DifficultyCard({
  preset,
  theme,
  selected,
  onPress,
}: DifficultyCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: selected ? theme.surface : theme.surfaceMuted,
          borderColor: selected ? preset.accent : theme.border,
          opacity: pressed ? 0.92 : 1,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <View style={[styles.accent, { backgroundColor: preset.accent }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            {preset.label}
          </Text>
          <Text style={[styles.description, { color: theme.textMuted }]}>
            {preset.description}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <MetaPill
            label={`${preset.rows}x${preset.columns}`}
            theme={theme}
            selected={selected}
          />
          <MetaPill
            label={`${preset.mines} mines`}
            theme={theme}
            selected={selected}
          />
        </View>
      </View>
    </Pressable>
  );
}

function MetaPill({
  label,
  theme,
  selected,
}: {
  label: string;
  theme: ThemePalette;
  selected: boolean;
}) {
  return (
    <View
      style={[
        styles.pill,
        {
          backgroundColor: selected ? theme.accentMuted : theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <Text style={[styles.pillText, { color: theme.textPrimary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    borderWidth: 1.5,
    flexDirection: 'row',
    overflow: 'hidden',
    minHeight: 108,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 3,
  },
  accent: {
    width: 14,
  },
  content: {
    flex: 1,
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
