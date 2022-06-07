import { Ctx } from 'boardgame.io';
import {
  CAPTURED,
  RACK,
  MAX_TILES_IN_QUEUE,
  ENTERING_SPACE,
  RED,
  BLUE,
} from '../config';
import { AIMoves, InputBoardGameState, PossiblePieceIDs } from '../types';
import { isInPlayingArea } from './utils';

export const enumerate = (G: InputBoardGameState, ctx: Ctx) => {
  const moves = [] as AIMoves[];
  let nextCell;
  const enteringSpace = G.enteringSpace[ctx.currentPlayer];
  const filteredPieces = G.pieces.filter(
    (piece) =>
      piece.color === ctx.currentPlayer &&
      piece.currentPos !== CAPTURED &&
      piece.canMove
  );

  for (let piece of filteredPieces) {
    const { id, currentPos, nextMove } = piece;
    const _id = id as PossiblePieceIDs;

    nextCell = G.cells[nextMove];

    if (nextMove === RACK) {
      moves.push({ move: 'toRack', args: [_id] });
      if (enteringSpace.length >= MAX_TILES_IN_QUEUE) continue;
      moves.push({ move: 'toEnteringSpace', args: [_id] });
    } else if (currentPos === RACK) {
      if (enteringSpace.length >= MAX_TILES_IN_QUEUE) continue;
      moves.push({ move: 'movePiece', args: [_id] });
    } else if (currentPos === ENTERING_SPACE) {
      if (enteringSpace[enteringSpace.length - 1] !== id) continue;
      if (
        nextCell !== null &&
        (nextCell[0] === 'r' ? RED : BLUE) === ctx.currentPlayer
      ) {
        continue;
      }
      moves.push({ move: 'movePiece', args: [_id] });
    } else {
      if (isInPlayingArea(nextMove) && nextCell !== null) {
        // the piece is occupied. if it's the same color, it's invalid.
        // if it's the opposite color, capture.
        if ((nextCell[0] === 'r' ? RED : BLUE) === ctx.currentPlayer) {
          continue;
        }
      }
      moves.push({ move: 'movePiece', args: [_id] });
    }
  }
  return moves;
};
