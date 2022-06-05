import { Ctx, Move } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';
import { InputBoardGameState, Piece, PossiblePositions } from '../types';
import { CAPTURED, ENTERING_SPACE, MAX_TILES_IN_QUEUE, RACK } from '../config';
import { popPieceFromStack, pushPieceToStack } from './entering-space';
import {
  getNextMove,
  getOtherTeamPieces,
  getPieceFromId,
  isInPlayingArea,
  isPlayersTurn,
} from './utils';

// to make the tests work Move<InputBoardGameState> should be any
export const movePiece: any = (
  G: InputBoardGameState,
  ctx: Ctx,
  pieceId: string
): void | typeof INVALID_MOVE => {
  const piece = getPieceFromId(G.pieces, pieceId);
  if (
    !piece ||
    !piece.canMove ||
    piece.color !== ctx.currentPlayer ||
    piece.currentPos === piece.moves[piece.moves.length - 2] // End of cycle, should call toRack/toEnteringSpace
  ) {
    return INVALID_MOVE;
  }

  if (piece.currentPos === RACK) {
    // If moving from RACK to ENTERING SPACE, handle logic
    pushPieceToStack(piece, G);
  } else if (piece.currentPos === ENTERING_SPACE) {
    // If moving from ENTERING SPACE to PLAYING AREA, handle logic
    if (G.cells[getNextMove(piece)] !== null) {
      return INVALID_MOVE;
    }
    popPieceFromStack(piece, G);
  } else if (isInPlayingArea(piece.currentPos)) {
    G.cells[piece.currentPos] = null;
  }

  blockAndUnblockPieces(piece, G);

  // Did we capture an opponent's piece?
  if (G.cells[getNextMove(piece)]) {
    const opponentPiece = G.pieces.find(
      (p) => p.id === G.cells[getNextMove(piece)]
    );
    opponentPiece && (opponentPiece.currentPos = CAPTURED);
  }

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

export const toRack: Move<InputBoardGameState> = (
  G: InputBoardGameState,
  ctx: Ctx,
  pieceId: string
): void | typeof INVALID_MOVE => {
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
};

export const toEnteringSpace: Move<InputBoardGameState> = (
  G: InputBoardGameState,
  ctx: Ctx,
  pieceId: string
): void | typeof INVALID_MOVE => {
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
  piece.currentPos = ENTERING_SPACE;
};

function blockAndUnblockPieces(piece: Piece, G: InputBoardGameState) {
  const teamPieces = getOtherTeamPieces(piece, G.pieces);
  // UNBLOCK any pieces whose next move at currentPos AND the same color
  teamPieces
    .filter((p) => getNextMove(p) === piece.currentPos)
    .forEach((p) => (p.canMove = true));

  // BLOCK any pieces -- including the entering area -- whose NEXT move
  // will be at currentPosition AND the same color
  teamPieces
    .filter((p) => getNextMove(p) === getNextMove(piece))
    .forEach((p) => (p.canMove = false));
}
