import { Ctx } from 'boardgame.io';
import { RED, BLUE, RACK, ENTERING_SPACE, CAPTURED } from '../config';
import { _ctx, _G, _R0, _R1, _B3 } from '../config/testing';
import { InputBoardGameState, Piece } from '../types';
import { colorToString, getPieceFromId, isInPlayingArea, isPlayersTurn, getNextMove } from './utils';

describe('utils functions', () => {
  let G: InputBoardGameState;
  let R0: Piece, R1: Piece, B3: Piece;
  let ctx: Ctx;

  beforeEach(() => {
    G = JSON.parse(JSON.stringify(_G));
    R0 = JSON.parse(JSON.stringify(_R0));
    R1 = JSON.parse(JSON.stringify(_R1));
    B3 = JSON.parse(JSON.stringify(_B3));
    ctx = JSON.parse(JSON.stringify(_ctx));
  });

  describe('colorToString', () => {
    it('should return "red" for RED color', () => {
      expect(colorToString(RED)).toBe('red');
    });

    it('should return "blue" for BLUE color', () => {
      expect(colorToString(BLUE)).toBe('blue');
    });
  });

  describe('getPieceFromId', () => {
    beforeEach(() => {
      G.pieces = [R0, R1, B3];
    });

    it('should return the correct piece when piece exists', () => {
      const piece = getPieceFromId(G.pieces, 'r0');
      expect(piece).toBe(R0);
      expect(piece?.id).toBe('r0');
    });

    it('should return undefined when piece does not exist', () => {
      const piece = getPieceFromId(G.pieces, 'r5');
      expect(piece).toBeUndefined();
    });

    it('should return the correct piece for blue pieces', () => {
      const piece = getPieceFromId(G.pieces, 'b3');
      expect(piece).toBe(B3);
      expect(piece?.id).toBe('b3');
    });

    it('should work with empty pieces array', () => {
      const piece = getPieceFromId([], 'r0');
      expect(piece).toBeUndefined();
    });
  });

  describe('isInPlayingArea', () => {
    it('should return true for positions 0-11', () => {
      for (let i = 0; i <= 11; i++) {
        expect(isInPlayingArea(i)).toBe(true);
      }
    });

    it('should return false for negative positions', () => {
      expect(isInPlayingArea(-1)).toBe(false);
      expect(isInPlayingArea(CAPTURED)).toBe(false);
    });

    it('should return false for positions above 11', () => {
      expect(isInPlayingArea(12)).toBe(false);
      expect(isInPlayingArea(100)).toBe(false);
      expect(isInPlayingArea(ENTERING_SPACE)).toBe(false);
      expect(isInPlayingArea(RACK)).toBe(false);
    });
  });

  describe('isPlayersTurn', () => {
    it('should return true when it is the players turn', () => {
      ctx.currentPlayer = '0';
      expect(isPlayersTurn('0', ctx)).toBe(true);
    });

    it('should return false when it is not the players turn', () => {
      ctx.currentPlayer = '1';
      expect(isPlayersTurn('0', ctx)).toBe(false);
    });

    it('should work with different player IDs', () => {
      ctx.currentPlayer = '1';
      expect(isPlayersTurn('1', ctx)).toBe(true);
      expect(isPlayersTurn('0', ctx)).toBe(false);
    });
  });

  describe('getNextMove', () => {
    it('should return the next move in the sequence', () => {
      const piece = { ...R0, currentPos: ENTERING_SPACE, moves: [ENTERING_SPACE, 10, 6, 4, 2, 7, RACK] };
      expect(getNextMove(piece)).toBe(10);
    });

    it('should return the next move when in middle of sequence', () => {
      const piece = { ...R0, currentPos: 10, moves: [ENTERING_SPACE, 10, 6, 4, 2, 7, RACK] };
      expect(getNextMove(piece)).toBe(6);
    });

    it('should wrap around to first move when at the end', () => {
      const piece = { ...R0, currentPos: RACK, moves: [ENTERING_SPACE, 10, 6, 4, 2, 7, RACK] };
      expect(getNextMove(piece)).toBe(ENTERING_SPACE);
    });

    it('should handle single move array', () => {
      const piece = { ...R0, currentPos: 5, moves: [5] };
      expect(getNextMove(piece)).toBe(5);
    });

    it('should handle when current position is not in moves array', () => {
      const piece = { ...R0, currentPos: 99, moves: [ENTERING_SPACE, 10, 6, 4, 2, 7, RACK] };
      expect(getNextMove(piece)).toBe(ENTERING_SPACE);
    });
  });
});

export {};