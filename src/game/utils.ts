import { Ctx } from 'boardgame.io';
import { Piece, Color } from '../types';
import { RED } from '../config';

/**
 * Converts a color to a string.
 * @param color - The color to convert.
 * @returns The string representation of the color.
 */
export const colorToString = (color: Color) => {
  return color === RED ? 'red' : 'blue';
};

/**
 * Gets a piece from the pieces array by its ID.
 * @param pieces - The pieces array to search.
 * @param pieceID - The ID of the piece to get.
 * @returns The piece with the given ID, or undefined if not found.
 */
export const getPieceFromId = (pieces: Piece[], pieceID: string) =>
  pieces.find((piece) => piece.id === pieceID);

/**
 * Checks if a position is in the playing area.
 * @param position - The position to check.
 * @returns True if the position is in the playing area, false otherwise.
 */
export const isInPlayingArea = (position: number) =>
  position >= 0 && position <= 11;

/**
 * Checks if the current player is the player with the given ID.
 * @param playerID - The ID of the player to check.
 * @param ctx - The context of the game.
 * @returns True if the current player is the player with the given ID, false otherwise.
 */
export const isPlayersTurn = (playerID: string, ctx: Ctx) => {
  return ctx.currentPlayer === playerID;
};

/**
 * Gets the next move for a piece.
 * @param piece - The piece to get the next move for.
 * @returns The next move for the piece.
 */
export const getNextMove = (piece: Piece): number => {
  if (!piece?.moves?.length) return piece.currentPos;
  const { currentPos, moves } = piece;
  return moves[(moves.indexOf(currentPos) + 1) % moves.length];
};