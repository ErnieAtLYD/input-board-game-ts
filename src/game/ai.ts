import { Ctx } from 'boardgame.io';
import {
  CAPTURED,
  RACK,
  MAX_TILES_IN_QUEUE,
  ENTERING_SPACE,
  RED,
  BLUE,
} from '../config';
import { InputBoardGameState } from '../types';
import { isInPlayingArea } from './utils';

export const enumerate = (G: InputBoardGameState, ctx: Ctx) => {
  const moves = [];
  let nextCell;
  const enteringSpace = G.enteringSpace[ctx.currentPlayer];
  const filteredPieces = G.pieces.filter(
    (piece) =>
      piece.color === ctx.currentPlayer && piece.currentPos !== CAPTURED
  );

  for (let piece of filteredPieces) {
    const { id, currentPos, nextMove } = piece;

    nextCell = G.cells[nextMove];

    if (nextMove === RACK) {
      moves.push({ move: 'toRack', args: [id] });
      if (enteringSpace.length >= MAX_TILES_IN_QUEUE) continue;
      moves.push({ move: 'toEnteringSpace', args: [id] });
    } else if (currentPos === RACK) {
      if (enteringSpace.length >= MAX_TILES_IN_QUEUE) continue;
      moves.push({ move: 'movePiece', args: [id] });
    } else if (currentPos === ENTERING_SPACE) {
      if (enteringSpace[enteringSpace.length - 1] !== id) continue;
      if (
        nextCell !== null &&
        (nextCell[0] === 'r' ? RED : BLUE) === ctx.currentPlayer
      ) {
        continue;
      }
      moves.push({ move: 'movePiece', args: [id] });
    } else {
      if (isInPlayingArea(nextMove) && nextCell !== null) {
        // the piece is occupied. if it's the same color, it's invalid.
        // if it's the opposite color, capture.
        if ((nextCell[0] === 'r' ? RED : BLUE) === ctx.currentPlayer) {
          continue;
        }
      }
      moves.push({ move: 'movePiece', args: [id] });
    }
  }
  return moves;
};
