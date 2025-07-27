import { Ctx } from 'boardgame.io';
import { Piece, Color } from '../types';
import { RED } from '../config';

export const colorToString = (color: Color) => {
  return color === RED ? 'red' : 'blue';
};

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