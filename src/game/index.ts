import { Game } from 'boardgame.io';
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
      currentPos: RACK,
      moves: [ENTERING_SPACE, ...piece.moves, RACK],
      color: piece.id[0] === 'r' ? RED : BLUE,
      canMove: true,
      nextMove: ENTERING_SPACE,
    })),
  }),

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: { movePiece, toEnteringSpace, toRack },

  endIf: ({ G }) => {
    let redPieces = G.pieces.filter(
      (piece) => piece.color === RED && piece.currentPos !== CAPTURED
    );
    let bluePieces = G.pieces.filter(
      (piece) => piece.color === BLUE && piece.currentPos !== CAPTURED
    );
    if (redPieces.length === 0) {
      return { winner: BLUE };
    } else if (bluePieces.length === 0) {
      return { winner: RED };
    }
  },

  ai: { enumerate },
};
