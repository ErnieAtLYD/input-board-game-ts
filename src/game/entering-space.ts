import { RACK, MAX_TILES_IN_QUEUE } from '../config';
import { Piece, InputBoardGameState } from '../types';
import { getPieceFromId } from './utils';

const inPlayerRackCB = (color: string) => {
  return function (piece: Piece) {
    return piece.current_pos === RACK && piece.color === color;
  };
};

// NOTE: does NOT progress piece.currentPos
export const pushPieceToStack = (piece: Piece, G: InputBoardGameState) => {
  const space = G.enteringSpace[piece.color];
  if (space.length) {
    // There is already a piece on the stack; set can_move to false.
    const prevId = space[space.length - 1];
    const prevPiece = getPieceFromId(G.pieces, prevId);
    prevPiece && (prevPiece.can_move = false);
  }
  if (space.length === MAX_TILES_IN_QUEUE - 1) {
    // Mark all tiles in players RACK to can_move: false
    G.pieces
      .filter(inPlayerRackCB(piece.color))
      .filter((p) => p.id !== piece.id)
      .forEach((p) => (p.can_move = false));
  }
  space.push(piece.id);
};

// NOTE: does NOT progress piece.currentPos
export const popPieceFromStack = (piece: Piece, G: InputBoardGameState) => {
  const space = G.enteringSpace[piece.color];
  space.pop();
  // The stack not at max anymore so make sure rack tiles can_move again
  if (space.length < MAX_TILES_IN_QUEUE) {
    G.pieces
      .filter(inPlayerRackCB(piece.color))
      .forEach((p) => (p.can_move = true));
  }
  // Make sure the top of the current queue can_move
  if (space.length > 0) {
    const topId = space[space.length - 1];
    const topPiece = G.pieces.find((p) => p.id === topId);
    topPiece && (topPiece.can_move = true);
  }
};
