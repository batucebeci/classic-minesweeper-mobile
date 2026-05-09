import { ColorSchemeName } from 'react-native';

import { ThemePalette } from '../types/game';

const lightTheme: ThemePalette = {
  background: '#F4EFE7',
  surface: '#FFF9F0',
  surfaceMuted: '#E9DFC9',
  surfaceStrong: '#E0D1B1',
  border: '#C9B89A',
  textPrimary: '#2B241B',
  textMuted: '#6B6257',
  accent: '#8A5A28',
  accentMuted: '#E8C895',
  success: '#2D7D57',
  danger: '#B13A3A',
  flag: '#B4511F',
  boardHidden: '#D8C8A6',
  boardRevealed: '#F9F4E8',
  boardDanger: '#F3C6C6',
  boardLine: '#A58F69',
  shadow: 'rgba(60, 40, 10, 0.12)',
  overlay: 'rgba(15, 11, 7, 0.4)',
  statusBar: 'dark',
  numberColors: {
    1: '#2F5BD1',
    2: '#2D7D57',
    3: '#B13A3A',
    4: '#6B4BC1',
    5: '#A0522D',
    6: '#1F8C8C',
    7: '#3D3D3D',
    8: '#7B6752',
  },
};

const darkTheme: ThemePalette = {
  background: '#16130F',
  surface: '#211B15',
  surfaceMuted: '#33281F',
  surfaceStrong: '#4B3828',
  border: '#6C563E',
  textPrimary: '#F4EBDD',
  textMuted: '#C4B7A4',
  accent: '#E19A53',
  accentMuted: '#5E432A',
  success: '#5FC78E',
  danger: '#F07B7B',
  flag: '#F6A45A',
  boardHidden: '#6B5238',
  boardRevealed: '#2B231B',
  boardDanger: '#5D2C2C',
  boardLine: '#8D6C4A',
  shadow: 'rgba(0, 0, 0, 0.32)',
  overlay: 'rgba(0, 0, 0, 0.52)',
  statusBar: 'light',
  numberColors: {
    1: '#89A6FF',
    2: '#7EE2A7',
    3: '#FF9494',
    4: '#B8A2FF',
    5: '#FFC09A',
    6: '#87E2E2',
    7: '#F0E2CF',
    8: '#C7B6A0',
  },
};

export function getTheme(colorScheme: ColorSchemeName): ThemePalette {
  return colorScheme === 'dark' ? darkTheme : lightTheme;
}
