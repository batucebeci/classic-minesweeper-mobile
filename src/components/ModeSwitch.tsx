import { Pressable, StyleSheet, Text, View } from 'react-native';

import { GameMode, ThemePalette } from '../types/game';

type ModeSwitchProps = {
  theme: ThemePalette;
  mode: GameMode;
  onChange: (mode: GameMode) => void;
};

export function ModeSwitch({ theme, mode, onChange }: ModeSwitchProps) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.surfaceMuted, borderColor: theme.border },
      ]}
    >
      <ModeButton
        label="Dig"
        active={mode === 'dig'}
        theme={theme}
        onPress={() => onChange('dig')}
      />
      <ModeButton
        label="Flag"
        active={mode === 'flag'}
        theme={theme}
        onPress={() => onChange('flag')}
      />
    </View>
  );
}

function ModeButton({
  label,
  active,
  theme,
  onPress,
}: {
  label: string;
  active: boolean;
  theme: ThemePalette;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: active ? theme.accent : 'transparent',
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: active ? '#FFFFFF' : theme.textPrimary,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1.2,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 4,
  },
  button: {
    alignItems: 'center',
    borderRadius: 16,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
