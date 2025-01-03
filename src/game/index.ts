import { Game, FnContext } from 'boardgame.io';
import { RED, BLUE, PIECES, RACK, ENTERING_SPACE, CAPTURED } from '../config';
import { InputBoardGameState } from '../types';
import { movePiece, toEnteringSpace, toRack } from './moves';
import { enumerate } from './ai';

export const InputBoardGame: Game<InputBoardGameState> = {
  setup: (): InputBoardGameState => ({
    cells: Array(12).fill(null),
    enteringSpace: { [RED]: [], [BLUE]: [] },
    pieces: PIECES.map((piece) => ({
      id: piece.id,
      current_pos: RACK,
      moves: [ENTERING_SPACE, ...piece.moves, RACK],
      color: piece.id[0] === 'r' ? RED : BLUE,
      can_move: true,
      nextMove: ENTERING_SPACE,
    })),
  }),

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: { movePiece, toEnteringSpace, toRack },

  endIf: (context: FnContext<InputBoardGameState, Record<string, unknown>>): { winner: string } | undefined => {
    const { G } = context;
    let redPieces = G.pieces.filter(
      (piece) => piece.color === RED && piece.current_pos !== CAPTURED
    );
    let bluePieces = G.pieces.filter(
      (piece) => piece.color === BLUE && piece.current_pos !== CAPTURED
    );
    if (redPieces.length === 0) {
      return { winner: BLUE };
    }
    if (bluePieces.length === 0) {
      return { winner: RED };
    }
    return undefined;
  },

  ai: { enumerate },
};
