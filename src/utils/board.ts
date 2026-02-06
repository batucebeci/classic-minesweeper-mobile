import { NEIGHBOR_DIRECTIONS } from '../constants/game';
import { Board, Cell, DifficultyPreset, Position } from '../types/game';

type RevealResult = {
  board: Board;
  exploded: boolean;
  revealedSafeCells: number;
};

export function createHiddenBoard(difficulty: DifficultyPreset): Board {
  return Array.from({ length: difficulty.rows }, (_, row) =>
    Array.from({ length: difficulty.columns }, (_, column) => ({
      row,
      column,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );
}

export function initializeBoard(
  currentBoard: Board,
  difficulty: DifficultyPreset,
  safeCell: Position
): Board {
  const nextBoard = currentBoard.map((row) =>
    row.map((cell) => ({
      ...cell,
      isMine: false,
      adjacentMines: 0,
    }))
  );

  const candidates: Position[] = [];

  for (let row = 0; row < difficulty.rows; row += 1) {
    for (let column = 0; column < difficulty.columns; column += 1) {
      if (row === safeCell.row && column === safeCell.column) {
        continue;
      }

      candidates.push({ row, column });
    }
  }

  shuffle(candidates);

  for (let index = 0; index < difficulty.mines; index += 1) {
    const position = candidates[index];
    nextBoard[position.row][position.column].isMine = true;
  }

  for (let row = 0; row < difficulty.rows; row += 1) {
    for (let column = 0; column < difficulty.columns; column += 1) {
      if (nextBoard[row][column].isMine) {
        continue;
      }

      nextBoard[row][column].adjacentMines = getNeighbors(nextBoard, row, column)
        .filter((neighbor) => neighbor.isMine).length;
    }
  }

  return nextBoard;
}

export function revealCell(board: Board, position: Position): RevealResult {
  const startCell = board[position.row]?.[position.column];

  if (!startCell || startCell.isFlagged || startCell.isRevealed) {
    return { board, exploded: false, revealedSafeCells: 0 };
  }

  const nextBoard = cloneBoard(board);
  const current = nextBoard[position.row][position.column];

  if (current.isMine) {
    current.isRevealed = true;
    return { board: nextBoard, exploded: true, revealedSafeCells: 0 };
  }

  let revealedSafeCells = 0;
  const queue: Position[] = [position];

  while (queue.length > 0) {
    const next = queue.shift();

    if (!next) {
      continue;
    }

    const cell = nextBoard[next.row][next.column];

    if (!cell || cell.isRevealed || cell.isFlagged) {
      continue;
    }

    cell.isRevealed = true;
    revealedSafeCells += 1;

    if (cell.adjacentMines > 0) {
      continue;
    }

    for (const neighbor of getNeighborPositions(nextBoard, next.row, next.column)) {
      const neighborCell = nextBoard[neighbor.row][neighbor.column];

      if (
        neighborCell &&
        !neighborCell.isMine &&
        !neighborCell.isRevealed &&
        !neighborCell.isFlagged
      ) {
        queue.push(neighbor);
      }
    }
  }

  return { board: nextBoard, exploded: false, revealedSafeCells };
}

export function toggleFlag(board: Board, position: Position): Board {
  const cell = board[position.row]?.[position.column];

  if (!cell || cell.isRevealed) {
    return board;
  }

  const nextBoard = cloneBoard(board);
  nextBoard[position.row][position.column].isFlagged =
    !nextBoard[position.row][position.column].isFlagged;
  return nextBoard;
}

export function revealAllMines(board: Board): Board {
  return board.map((row) =>
    row.map((cell) =>
      cell.isMine
        ? {
            ...cell,
            isRevealed: true,
          }
        : cell
    )
  );
}

export function countFlags(board: Board): number {
  return board.flat().filter((cell) => cell.isFlagged).length;
}

function cloneBoard(board: Board): Board {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

function getNeighbors(board: Board, row: number, column: number): Cell[] {
  return getNeighborPositions(board, row, column)
    .map((position) => board[position.row]?.[position.column])
    .filter((cell): cell is Cell => Boolean(cell));
}

function getNeighborPositions(board: Board, row: number, column: number): Position[] {
  return NEIGHBOR_DIRECTIONS.map(([rowOffset, columnOffset]) => ({
    row: row + rowOffset,
    column: column + columnOffset,
  })).filter(
    (position) =>
      position.row >= 0 &&
      position.column >= 0 &&
      position.row < board.length &&
      position.column < board[0].length
  );
}

function shuffle<T>(items: T[]) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = items[index];
    items[index] = items[swapIndex];
    items[swapIndex] = current;
  }
}
