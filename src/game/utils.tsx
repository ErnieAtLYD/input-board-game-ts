import React from 'react';
import { Ctx } from 'boardgame.io';
import { InputBoardGameState } from '../types';
import GamePiece from '../components/GamePiece';
import { getPieceFromId } from './utils';

// Re-export utilities for backward compatibility
export {
  colorToString,
  getPieceFromId,
  isInPlayingArea,
  isPlayersTurn,
  getNextMove
} from './utils';

/**
 * Renders a piece's component by its ID.
 * @param G - The game state.
 * @param ctx - The context of the game.
 * @param pieceID - The ID of the piece to render.
 * @returns The rendered piece.
 */
export const renderPieceById = (
  G: InputBoardGameState,
  ctx: Ctx,
  pieceID: string
) => {
  const piece = getPieceFromId(G.pieces, pieceID);
  if (!piece) return;
  return (
    <GamePiece
      key={piece.id}
      {...piece}
      atLastPosition={
        piece.moves.length >= 2 &&
        G.cells[piece.moves[piece.moves.length - 2]] === piece.id &&
        ctx.currentPlayer === piece.color
      }
    />
  );
};
