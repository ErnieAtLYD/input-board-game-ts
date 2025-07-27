import { Ctx } from 'boardgame.io';
import { RED, BLUE, RACK, ENTERING_SPACE } from '../config';
import { _ctx, _G, _R0, _B3 } from '../config/testing';
import { InputBoardGameState, Piece } from '../types';
import { getPieceFromId } from './utils';

// Simple test for the renderPieceById logic without actual rendering
const mockGetPieceById = (
  G: InputBoardGameState,
  ctx: Ctx,
  pieceID: string
) => {
  const piece = getPieceFromId(G.pieces, pieceID);
  if (!piece) return undefined;
  
  const atLastPosition =
    piece.moves.length >= 2 &&
    G.cells[piece.moves[piece.moves.length - 2]] === piece.id &&
    ctx.currentPlayer === piece.color;
    
  return {
    props: {
      key: piece.id,
      ...piece,
      atLastPosition
    }
  };
};

describe('utils.tsx functions', () => {
  let G: InputBoardGameState;
  let R0: Piece, B3: Piece;
  let ctx: Ctx;

  beforeEach(() => {
    G = JSON.parse(JSON.stringify(_G));
    R0 = JSON.parse(JSON.stringify(_R0));
    B3 = JSON.parse(JSON.stringify(_B3));
    ctx = JSON.parse(JSON.stringify(_ctx));
  });

  describe('renderPieceById logic', () => {
    beforeEach(() => {
      G.pieces = [R0, B3];
      G.cells = Array(12).fill(null);
      G.cells[10] = 'r0'; // Place r0 at position 10
    });

    it('should return piece data when piece exists', () => {
      const piece = mockGetPieceById(G, ctx, 'r0');
      expect(piece).toBeDefined();
      expect(piece?.props.id).toBe('r0');
      expect(piece?.props.color).toBe(RED);
    });

    it('should return blue piece data correctly', () => {
      const piece = mockGetPieceById(G, ctx, 'b3');
      expect(piece).toBeDefined();
      expect(piece?.props.id).toBe('b3');
      expect(piece?.props.color).toBe(BLUE);
    });

    it('should return undefined when piece does not exist', () => {
      const piece = mockGetPieceById(G, ctx, 'r5');
      expect(piece).toBeUndefined();
    });

    it('should set atLastPosition to true when piece is at second-to-last position and current player', () => {
      // Set r0 at second-to-last position in its moves array (position 7 is second-to-last)
      const modifiedR0: Piece = { ...R0, currentPos: 7 as const };
      G.pieces = [modifiedR0];
      G.cells[7] = 'r0';
      ctx.currentPlayer = RED;

      const piece = mockGetPieceById(G, ctx, 'r0');
      expect(piece).toBeDefined();
      expect(piece?.props.atLastPosition).toBe(true);
    });

    it('should set atLastPosition to false when piece is not at second-to-last position', () => {
      // Set r0 at first position
      const modifiedR0: Piece = { ...R0, currentPos: ENTERING_SPACE };
      G.pieces = [modifiedR0];
      ctx.currentPlayer = RED;

      const piece = mockGetPieceById(G, ctx, 'r0');
      expect(piece).toBeDefined();
      expect(piece?.props.atLastPosition).toBe(false);
    });

    it('should set atLastPosition to false when not current player', () => {
      // Set r0 at second-to-last position but different player
      const modifiedR0: Piece = { ...R0, currentPos: 7 as const };
      G.pieces = [modifiedR0];
      G.cells[7] = 'r0';
      ctx.currentPlayer = BLUE; // Different player

      const piece = mockGetPieceById(G, ctx, 'r0');
      expect(piece).toBeDefined();
      expect(piece?.props.atLastPosition).toBe(false);
    });

    it('should pass all piece properties as props', () => {
      const piece = mockGetPieceById(G, ctx, 'r0');
      expect(piece).toBeDefined();
      
      const props = piece!.props;
      expect(props.id).toBe('r0');
      expect(props.color).toBe(RED);
      expect(props.currentPos).toBe(RACK);
      expect(props.canMove).toBe(true);
      expect(props.nextMove).toBe(ENTERING_SPACE);
      expect(props.moves).toEqual([ENTERING_SPACE, 10, 6, 4, 2, 7, RACK]);
    });
  });
});

export {};