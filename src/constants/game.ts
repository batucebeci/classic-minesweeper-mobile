import { DifficultyPreset } from '../types/game';

export const DIFFICULTY_PRESETS: DifficultyPreset[] = [
  {
    id: 'beginner',
    label: 'Beginner',
    description: 'Compact grid for quick rounds.',
    rows: 9,
    columns: 9,
    mines: 10,
    accent: '#3D9A6C',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    description: 'Balanced board for most sessions.',
    rows: 12,
    columns: 12,
    mines: 24,
    accent: '#C66B3D',
  },
  {
    id: 'expert',
    label: 'Expert',
    description: 'Dense grid with tight margins.',
    rows: 16,
    columns: 16,
    mines: 40,
    accent: '#B64646',
  },
];

export const DEFAULT_DIFFICULTY = DIFFICULTY_PRESETS[1];

export const NEIGHBOR_DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
] as const;
