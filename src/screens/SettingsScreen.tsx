import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { RevealView } from '../components/RevealView';
import { ThemePalette } from '../types/game';

type SettingsScreenProps = {
  theme: ThemePalette;
  soundEnabled: boolean;
  schemeLabel: 'Light' | 'Dark';
  onBack: () => void;
  onToggleSound: (enabled: boolean) => void;
  onPreviewSound: () => void;
};

export function SettingsScreen({
  theme,
  soundEnabled,
  schemeLabel,
  onBack,
  onToggleSound,
  onPreviewSound,
}: SettingsScreenProps) {
  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.content}
    >
      <RevealView delay={0} style={styles.toolbar}>
        <Pressable
          onPress={onBack}
          style={[
            styles.backButton,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.backLabel, { color: theme.textPrimary }]}>
            Back
          </Text>
        </Pressable>
      </RevealView>

      <RevealView
        delay={70}
        style={[
          styles.hero,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <Text style={[styles.eyebrow, { color: theme.accent }]}>SETTINGS</Text>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Fine-tune feedback without leaving the local-only build.
        </Text>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>
          Sound preference is persisted on-device, and the visual theme follows
          the active system appearance automatically.
        </Text>
      </RevealView>

      <RevealView
        delay={140}
        style={[
          styles.card,
          { backgroundColor: theme.surface, borderColor: theme.border },
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
            Audio
          </Text>
          <Text style={[styles.cardHint, { color: theme.textMuted }]}>
            Toggle feedback for dig, flag, win and lose events
          </Text>
        </View>
        <View
          style={[
            styles.row,
            {
              backgroundColor: theme.surfaceMuted,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.rowText}>
            <Text style={[styles.rowTitle, { color: theme.textPrimary }]}>
              Sound effects
            </Text>
            <Text style={[styles.rowDescription, { color: theme.textMuted }]}>
              Stored locally with AsyncStorage
            </Text>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={onToggleSound}
            thumbColor={soundEnabled ? theme.accent : theme.surfaceStrong}
            trackColor={{ false: theme.border, true: theme.accentMuted }}
          />
        </View>
        <Pressable
          onPress={onPreviewSound}
          disabled={!soundEnabled}
          style={[
            styles.previewButton,
            {
              backgroundColor: soundEnabled ? theme.accent : theme.surfaceMuted,
              opacity: soundEnabled ? 1 : 0.55,
            },
          ]}
        >
          <Text style={styles.previewLabel}>Preview Sound</Text>
        </Pressable>
      </RevealView>

      <RevealView
        delay={210}
        style={[
          styles.card,
          { backgroundColor: theme.surface, borderColor: theme.border },
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
            Theme
          </Text>
          <Text style={[styles.cardHint, { color: theme.textMuted }]}>
            Automatic light and dark support
          </Text>
        </View>
        <View style={styles.themeRow}>
          <View
            style={[
              styles.themeSwatch,
              { backgroundColor: theme.surfaceMuted, borderColor: theme.border },
            ]}
          />
          <View style={styles.rowText}>
            <Text style={[styles.rowTitle, { color: theme.textPrimary }]}>
              Current appearance: {schemeLabel}
            </Text>
            <Text style={[styles.rowDescription, { color: theme.textMuted }]}>
              The UI adapts to the device color scheme in real time.
            </Text>
          </View>
        </View>
      </RevealView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 18,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  toolbar: {
    alignItems: 'flex-start',
  },
  backButton: {
    borderRadius: 18,
    borderWidth: 1,
    minWidth: 88,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backLabel: {
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
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
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    gap: 14,
    padding: 18,
  },
  cardHeader: {
    gap: 4,
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: '900',
  },
  cardHint: {
    fontSize: 13,
    lineHeight: 18,
  },
  row: {
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
    padding: 16,
  },
  rowText: {
    flex: 1,
    gap: 4,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  rowDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  previewButton: {
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 14,
  },
  previewLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  themeRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  themeSwatch: {
    borderRadius: 18,
    borderWidth: 1,
    height: 54,
    width: 54,
  },
});
