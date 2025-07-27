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

// Given a string ID, render out the GamePiece component
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
        G.cells[piece.moves[piece.moves.length - 2]] === piece.id &&
        ctx.currentPlayer === piece.color
      }
    />
  );
};
