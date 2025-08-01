import { Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { InputBoardGameState, Piece, PossiblePositions } from "../types";
import { CAPTURED, ENTERING_SPACE, MAX_TILES_IN_QUEUE, RACK } from "../config";
import { popPieceFromStack, pushPieceToStack } from "./entering-space";
import {
  getNextMove,
  getPieceFromId,
  isInPlayingArea,
  isPlayersTurn,
} from "./utils";

/**
 * Moves a piece from its current position to its next move.
 * @param context - The context of the game.
 * @param pieceId - The id of the piece to move.
 * @returns INVALID_MOVE if the move is invalid, otherwise undefined.
 */
export const movePiece: Move<InputBoardGameState> = (
  context,
  pieceId: string
): void | typeof INVALID_MOVE => {
  const { G, ctx } = context;
  const piece = getPieceFromId(G.pieces, pieceId);
  if (
    !piece ||
    !piece.canMove ||
    piece.color !== ctx.currentPlayer ||
    (piece.moves.length >= 2 &&
      piece.currentPos === piece.moves[piece.moves.length - 2]) // End of cycle, should call toRack/toEnteringSpace
  ) {
    return INVALID_MOVE;
  }

  if (piece.currentPos === RACK) {
    // If moving from RACK to ENTERING SPACE, handle logic
    pushPieceToStack(piece, G);
  } else if (piece.currentPos === ENTERING_SPACE) {
    popPieceFromStack(piece, G);
  } else if (isInPlayingArea(piece.currentPos)) {
    G.cells[piece.currentPos] = null;
  }

  // Did we capture an opponent's piece?
  if (G.cells[piece.nextMove]) {
    const opponentPiece = G.pieces.find(
      (p) => p.id === G.cells[piece.nextMove]
    );
    opponentPiece && (opponentPiece.currentPos = CAPTURED);
  }

  blockAndUnblockPieces(piece, G);

  piece.currentPos = piece.nextMove;
  piece.nextMove = getNextMove(piece) as PossiblePositions;
  if (isInPlayingArea(piece.currentPos)) {
    G.cells[piece.currentPos] = pieceId;
  }

  // If its OWN next move is blocked by a piece on
  // the same color, then it cannot move
  const nextMoveId = G.cells[piece.nextMove];
  if (
    nextMoveId !== null &&
    piece.color === getPieceFromId(G.pieces, nextMoveId)?.color
  ) {
    piece.canMove = false;
  }
};

/**
 * Moves a piece from the playing area to the rack.
 * @param context - The context of the game.
 * @param pieceId - The id of the piece to move.
 * @returns INVALID_MOVE if the move is invalid, otherwise undefined.
 */
export const toRack: Move<InputBoardGameState> = (
  context,
  pieceId: string
): void | typeof INVALID_MOVE => {
  const { G, ctx } = context;
  const piece = getPieceFromId(G.pieces, pieceId);
  if (
    !piece ||
    !isPlayersTurn(ctx.currentPlayer, ctx) ||
    piece.nextMove !== RACK
  ) {
    return INVALID_MOVE;
  }
  // Move off of the PLAYING AREA
  if (isInPlayingArea(piece.currentPos)) G.cells[piece.currentPos] = null;
  piece.currentPos = RACK;
  piece.nextMove = ENTERING_SPACE;
};

/**
 * Moves a piece from the rack to the entering space.
 * @param context - The context of the game.
 * @param pieceId - The id of the piece to move.
 * @returns INVALID_MOVE if the move is invalid, otherwise undefined.
 */
export const toEnteringSpace: Move<InputBoardGameState> = (
  context,
  pieceId: string
): void | typeof INVALID_MOVE => {
  const { G, ctx } = context;
  const piece = getPieceFromId(G.pieces, pieceId);
  if (
    !piece ||
    !isPlayersTurn(ctx.currentPlayer, ctx) ||
    piece.nextMove !== RACK
  ) {
    return INVALID_MOVE;
  }
  // Return invalid if ENTERING SPACE stack is full
  const space = G.enteringSpace[piece.color];
  if (space.length === MAX_TILES_IN_QUEUE) return INVALID_MOVE;

  // Move off of the PLAYING AREA
  if (isInPlayingArea(piece.currentPos)) G.cells[piece.currentPos] = null;

  // FIXME: refactor this to be more DRY
  G.pieces
    .filter((p) => p.id !== piece.id)
    .filter((p) => p.currentPos !== RACK)
    .filter((p) => p.nextMove === piece.currentPos)
    .forEach((p) => (p.canMove = true));

  pushPieceToStack(piece, G);
  piece.currentPos = ENTERING_SPACE;
  piece.nextMove = piece.moves[1] as PossiblePositions;
};

/**
 * Blocks and unblocks pieces based on the current piece's position.
 * @param piece - The piece to block and unblock.
 * @param G - The game state.
 */
function blockAndUnblockPieces(piece: Piece, G: InputBoardGameState) {
  const otherPieces = G.pieces
    .filter((p) => p.id !== piece.id)
    .filter((p) => p.currentPos !== RACK);

  // Our piece will be moving from point A to point B.
  // Find pieces whose next move will be point A, our pieces current piece.
  // if they are on the same team, then they can move

  otherPieces
    .filter((p) => p.nextMove === piece.currentPos)
    .forEach((p) => (p.canMove = true));

  // Find pieces whose next move will be point B, our pieces next move.
  // If they are on the same team, they can NOT move
  // If they are on the opposing team, they CAN move; it'll be a capture
  otherPieces
    .filter((p) => p.nextMove === piece.nextMove)
    .forEach((p) => {
      p.canMove = !(p.color === piece.color);
    });
}
