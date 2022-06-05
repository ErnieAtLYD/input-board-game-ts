import { Ctx } from 'boardgame.io';
import { RACK } from '../config';
import { Piece, InputBoardGameState } from '../types';
import GamePiece from '../components/GamePiece';

const isPlayersPieceCB = (color: string) => (piece: Piece) =>
  piece.color === color;

export const getOtherTeamPieces = (piece: Piece, pieces: Piece[]) =>
  pieces
    .filter((p) => p.id !== piece.id)
    .filter(isPlayersPieceCB(piece.color))
    .filter((p) => p.currentPos !== RACK);

export const getPieceFromId = (pieces: Piece[], pieceID: string) =>
  pieces.find((piece) => piece.id === pieceID);

export const isInPlayingArea = (position: number) =>
  position >= 0 && position <= 11;

export const isPlayersTurn = (playerID: string, ctx: Ctx) => {
  return ctx.currentPlayer === playerID;
};

export const getNextMove = (piece: Piece): number => {
  const { currentPos, moves } = piece;
  return moves[(moves.indexOf(currentPos) + 1) % moves.length];
};

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
