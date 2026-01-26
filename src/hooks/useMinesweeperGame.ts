import { useEffect, useRef, useState } from 'react';

import {
  countFlags,
  createHiddenBoard,
  initializeBoard,
  revealAllMines,
  revealCell,
  toggleFlag,
} from '../utils/board';
import {
  DifficultyPreset,
  GameMode,
  GameState,
  Position,
  SoundEffect,
} from '../types/game';

type UseMinesweeperGameOptions = {
  initialDifficulty: DifficultyPreset;
  onSoundEffect?: (effect: SoundEffect) => void;
};

type ApplyMoveResult = {
  state: GameState;
  effect?: SoundEffect;
};

function createInitialState(difficulty: DifficultyPreset): GameState {
  return {
    board: createHiddenBoard(difficulty),
    difficulty,
    mode: 'dig',
    status: 'idle',
    flagsUsed: 0,
    isBoardInitialized: false,
    revealedSafeCells: 0,
    explodedCell: null,
  };
}

export function useMinesweeperGame({
  initialDifficulty,
  onSoundEffect,
}: UseMinesweeperGameOptions) {
  const [state, setState] = useState<GameState>(() =>
    createInitialState(initialDifficulty)
  );
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const startGame = (difficulty: DifficultyPreset) => {
    const nextState = createInitialState(difficulty);
    stateRef.current = nextState;
    setState(nextState);
  };

  const restartGame = () => {
    const nextState = createInitialState(stateRef.current.difficulty);
    stateRef.current = nextState;
    setState(nextState);
  };

  const setMode = (mode: GameMode) => {
    const nextState = {
      ...stateRef.current,
      mode,
    };

    stateRef.current = nextState;
    setState(nextState);
  };

  const handleCellPress = (position: Position) => {
    const currentState = stateRef.current;

    if (currentState.status === 'won' || currentState.status === 'lost') {
      return;
    }

    const next = applyMove(currentState, position);

    if (next.state === currentState) {
      return;
    }

    stateRef.current = next.state;
    setState(next.state);

    if (next.effect) {
      onSoundEffect?.(next.effect);
    }
  };

  const totalSafeCells =
    state.difficulty.rows * state.difficulty.columns - state.difficulty.mines;

  return {
    state,
    startGame,
    restartGame,
    setMode,
    handleCellPress,
    safeCellsRemaining: Math.max(0, totalSafeCells - state.revealedSafeCells),
  };
}

function applyMove(state: GameState, position: Position): ApplyMoveResult {
  const cell = state.board[position.row]?.[position.column];

  if (!cell || cell.isRevealed) {
    return { state };
  }

  if (state.mode === 'flag') {
    const nextBoard = toggleFlag(state.board, position);

    if (nextBoard === state.board) {
      return { state };
    }

    return {
      state: {
        ...state,
        board: nextBoard,
        flagsUsed: countFlags(nextBoard),
      },
      effect: 'flag' as SoundEffect,
    };
  }

  if (cell.isFlagged) {
    return { state };
  }

  let workingBoard = state.board;
  let isBoardInitialized = state.isBoardInitialized;
  let status = state.status === 'idle' ? 'playing' : state.status;

  if (!isBoardInitialized) {
    workingBoard = initializeBoard(state.board, state.difficulty, position);
    isBoardInitialized = true;
  }

  const result = revealCell(workingBoard, position);

  if (result.exploded) {
    return {
      state: {
        ...state,
        board: revealAllMines(result.board),
        status: 'lost',
        isBoardInitialized,
        explodedCell: position,
      },
      effect: 'lose' as SoundEffect,
    };
  }

  const revealedSafeCells = state.revealedSafeCells + result.revealedSafeCells;
  const totalSafeCells =
    state.difficulty.rows * state.difficulty.columns - state.difficulty.mines;

  if (revealedSafeCells >= totalSafeCells) {
    return {
      state: {
        ...state,
        board: result.board,
        status: 'won',
        isBoardInitialized,
        revealedSafeCells,
        explodedCell: null,
      },
      effect: 'win' as SoundEffect,
    };
  }

  status = result.revealedSafeCells > 0 ? 'playing' : status;

  return {
    state: {
      ...state,
      board: result.board,
      status,
      isBoardInitialized,
      revealedSafeCells,
      explodedCell: null,
    },
    effect: result.revealedSafeCells > 0 ? ('dig' as SoundEffect) : undefined,
  };
}
