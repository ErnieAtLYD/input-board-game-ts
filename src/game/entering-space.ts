
import { RACK, MAX_TILES_IN_QUEUE } from '../config';
import { Piece, InputBoardGameState } from '../types';
import { getPieceFromId } from './utils';

/**
 * Returns a callback function that checks if a piece is in the player's rack.
 * @param color - The color of the player.
 * @returns A callback function that checks if a piece is in the player's rack.
 */
const inPlayerRackCB = (color: string) => {
  return function (piece: Piece) {
    return piece.currentPos === RACK && piece.color === color;
  };
};

/**
 * Pushes a piece to the entering space.
 * // NOTE: does NOT progress piece.currentPos
 * @param piece - The piece to push.
 * @param G - The game state.
 */
export const pushPieceToStack = (piece: Piece, G: InputBoardGameState) => {
  const space = G.enteringSpace[piece.color];
  if (space.length) {
    // There is already a piece on the stack; set canMove to false.
    const prevId = space[space.length - 1];
    const prevPiece = getPieceFromId(G.pieces, prevId);
    prevPiece && (prevPiece.canMove = false);
  }
  if (space.length === MAX_TILES_IN_QUEUE - 1) {
    // Mark all tiles in players RACK to canMove: false
    G.pieces
      .filter(inPlayerRackCB(piece.color))
      .filter((p) => p.id !== piece.id)
      .forEach((p) => (p.canMove = false));
  }
  space.push(piece.id);
};

/**
 * Pops a piece from the entering space.
 * @param piece - The piece to pop.
 * @param G - The game state.
 */
export const popPieceFromStack = (piece: Piece, G: InputBoardGameState) => {
  const space = G.enteringSpace[piece.color];
  space.pop();
  // The stack not at max anymore so make sure rack tiles canMove again
  if (space.length < MAX_TILES_IN_QUEUE) {
    G.pieces
      .filter(inPlayerRackCB(piece.color))
      .forEach((p) => (p.canMove = true));
  }
  // Make sure the top of the current queue canMove
  if (space.length > 0) {
    const topId = space[space.length - 1];
    const topPiece = G.pieces.find((p) => p.id === topId);
    topPiece && (topPiece.canMove = true);
  }
};
