import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { Board, Cell, Position, ThemePalette } from '../types/game';

type MinesweeperBoardProps = {
  board: Board;
  theme: ThemePalette;
  explodedCell: Position | null;
  onCellPress: (position: Position) => void;
};

export function MinesweeperBoard({
  board,
  theme,
  explodedCell,
  onCellPress,
}: MinesweeperBoardProps) {
  const { width } = useWindowDimensions();
  const columns = board[0]?.length ?? 1;
  const availableWidth = Math.min(width - 32, 560);
  const cellSize = Math.max(18, Math.floor(availableWidth / columns) - 2);

  return (
    <View
      style={[
        styles.board,
        {
          backgroundColor: theme.boardLine,
          shadowColor: theme.shadow,
        },
      ]}
    >
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell) => (
            <CellButton
              key={`${cell.row}-${cell.column}`}
              cell={cell}
              size={cellSize}
              theme={theme}
              isExploded={
                explodedCell?.row === cell.row &&
                explodedCell?.column === cell.column
              }
              onPress={() =>
                onCellPress({ row: cell.row, column: cell.column })
              }
            />
          ))}
        </View>
      ))}
    </View>
  );
}

function CellButton({
  cell,
  size,
  theme,
  isExploded,
  onPress,
}: {
  cell: Cell;
  size: number;
  theme: ThemePalette;
  isExploded: boolean;
  onPress: () => void;
}) {
  const { label, color } = getCellPresentation(cell, theme);

  const backgroundColor = cell.isRevealed
    ? cell.isMine && isExploded
      ? theme.danger
      : cell.isMine
        ? theme.boardDanger
        : theme.boardRevealed
    : theme.boardHidden;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cell,
        {
          width: size,
          height: size,
          backgroundColor,
          borderColor: theme.boardLine,
          opacity: pressed ? 0.86 : 1,
        },
      ]}
      android_ripple={{ color: theme.accentMuted }}
    >
      <Text style={[styles.cellLabel, { color, fontSize: size * 0.52 }]}>
        {label}
      </Text>
    </Pressable>
  );
}

function getCellPresentation(cell: Cell, theme: ThemePalette) {
  if (!cell.isRevealed) {
    if (cell.isFlagged) {
      return { label: 'F', color: theme.flag };
    }

    return { label: '', color: theme.textPrimary };
  }

  if (cell.isMine) {
    return { label: '*', color: '#FFFFFF' };
  }

  if (cell.adjacentMines === 0) {
    return { label: '', color: theme.textPrimary };
  }

  return {
    label: `${cell.adjacentMines}`,
    color: theme.numberColors[cell.adjacentMines],
  };
}

const styles = StyleSheet.create({
  board: {
    alignSelf: 'center',
    borderRadius: 18,
    gap: 2,
    padding: 6,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 6,
  },
  row: {
    flexDirection: 'row',
    gap: 2,
  },
  cell: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
  },
  cellLabel: {
    fontWeight: '900',
    lineHeight: 20,
  },
});
