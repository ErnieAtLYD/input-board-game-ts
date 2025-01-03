import { Ctx, LongFormMove } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { InputBoardGameState, Piece, PossiblePositions, GameState } from "../types";
import { CAPTURED, ENTERING_SPACE, MAX_TILES_IN_QUEUE, RACK } from "../config";
import { popPieceFromStack, pushPieceToStack } from "./entering-space";
import {
  getNextMove,
  getPieceFromId,
  isInPlayingArea,
  isPlayersTurn,
} from "./utils";


export const movePiece: LongFormMove = {
  move: (G: GameState, ctx: Ctx, pieceId: string) => {
    const state = G.G as InputBoardGameState;
    const piece = getPieceFromId(state.pieces, pieceId);
    if (
      !piece ||
      !piece.can_move ||
      piece.color !== ctx.currentPlayer ||
      piece.current_pos === piece.moves[piece.moves.length - 2] // End of cycle, should call toRack/toEnteringSpace
    ) {
      return INVALID_MOVE;
    }

    if (piece.current_pos === RACK) {
      // If moving from RACK to ENTERING SPACE, handle logic
      pushPieceToStack(piece, state);
    } else if (piece.current_pos === ENTERING_SPACE) {
      popPieceFromStack(piece, state);
    } else if (isInPlayingArea(piece.current_pos)) {
      state.cells[piece.current_pos] = null;
    }

    // Did we capture an opponent's piece?
    if (state.cells[piece.nextMove]) {
      const opponentPiece = state.pieces.find(
        (p) => p.id === state.cells[piece.nextMove]
      );
      opponentPiece && (opponentPiece.current_pos = CAPTURED);
    }

    blockAndUnblockPieces(piece, state);

    piece.current_pos = piece.nextMove;
    piece.nextMove = getNextMove(piece) as PossiblePositions;
    if (isInPlayingArea(piece.current_pos)) {
      state.cells[piece.current_pos] = pieceId;
    }

    // If its OWN next move is blocked by a piece on
    // the same color, then it cannot move
    const nextMoveId = state.cells[piece.nextMove];
    if (
      nextMoveId !== null &&
      piece.color === getPieceFromId(state.pieces, nextMoveId)?.color
    ) {
      piece.can_move = false;
    }
  },
  client: false
};

export const toRack: LongFormMove = {
  move: (G: GameState, ctx: Ctx, pieceId: string) => {
    const state = G.G as InputBoardGameState;
    const piece = getPieceFromId(state.pieces, pieceId);
    if (
      !piece ||
      !isPlayersTurn(ctx.currentPlayer, ctx) ||
      piece.nextMove !== RACK
    ) {
      return INVALID_MOVE;
    }
    if (isInPlayingArea(piece.current_pos)) state.cells[piece.current_pos] = null;
    piece.current_pos = RACK;
    piece.nextMove = ENTERING_SPACE;
  },
  client: false,
};

export const toEnteringSpace: LongFormMove = {
  move: (G: GameState, ctx: Ctx, pieceId: string) => {
    const state = G.G as InputBoardGameState;
    const piece = getPieceFromId(state.pieces, pieceId);
    if (
      !piece ||
      !isPlayersTurn(ctx.currentPlayer, ctx) ||
      piece.nextMove !== RACK
    ) {
      return INVALID_MOVE;
    }
    const space = state.enteringSpace[piece.color];
    if (space.length === MAX_TILES_IN_QUEUE) return INVALID_MOVE;

    if (isInPlayingArea(piece.current_pos)) state.cells[piece.current_pos] = null;

    state.pieces
      .filter((p) => p.id !== piece.id)
      .filter((p) => p.current_pos !== RACK)
      .filter((p) => p.nextMove === piece.current_pos)
      .forEach((p) => (p.can_move = true));

    pushPieceToStack(piece, state);
    piece.current_pos = ENTERING_SPACE;
    piece.nextMove = piece.moves[1] as PossiblePositions;
  },
  client: false,
};

function blockAndUnblockPieces(piece: Piece, G: InputBoardGameState) {
  const otherPieces = G.pieces
    .filter((p) => p.id !== piece.id)
    .filter((p) => p.current_pos !== RACK);

  // Our piece will be moving from point A to point B.
  // Find pieces whose next move will be point A, our pieces current piece.
  // if they are on the same team, then they can move

  otherPieces
    .filter((p) => p.nextMove === piece.current_pos)
    .forEach((p) => (p.can_move = true));

  // Find pieces whose next move will be point B, our pieces next move.
  // If they are on the same team, they can NOT move
  // If they are on the opposing team, they CAN move; it'll be a capture
  otherPieces
    .filter((p) => p.nextMove === piece.nextMove)
    .forEach((p) => {
      p.can_move = !(p.color === piece.color);
    });
}
