import { StatusBarStyle } from 'expo-status-bar';

export type GameMode = 'dig' | 'flag';
export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';
export type DifficultyId = 'beginner' | 'intermediate' | 'expert';
export type SoundEffect = 'dig' | 'flag' | 'win' | 'lose';

export type Position = {
  row: number;
  column: number;
};

export type Cell = Position & {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

export type Board = Cell[][];

export type DifficultyPreset = {
  id: DifficultyId;
  label: string;
  description: string;
  rows: number;
  columns: number;
  mines: number;
  accent: string;
};

export type GameState = {
  board: Board;
  difficulty: DifficultyPreset;
  mode: GameMode;
  status: GameStatus;
  flagsUsed: number;
  isBoardInitialized: boolean;
  revealedSafeCells: number;
  explodedCell: Position | null;
};

export type ThemePalette = {
  background: string;
  surface: string;
  surfaceMuted: string;
  surfaceStrong: string;
  border: string;
  textPrimary: string;
  textMuted: string;
  accent: string;
  accentMuted: string;
  success: string;
  danger: string;
  flag: string;
  boardHidden: string;
  boardRevealed: string;
  boardDanger: string;
  boardLine: string;
  shadow: string;
  overlay: string;
  statusBar: StatusBarStyle;
  numberColors: Record<number, string>;
};
