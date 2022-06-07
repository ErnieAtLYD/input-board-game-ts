import { movePiece } from './moves';
import { ENTERING_SPACE, RED } from '../config';
import { InputBoardGameState, Piece } from '../types';
import { _G, _ctx, _R0, _R1, _R2, _R3 } from '../config/testing';

xdescribe('the queue', () => {
  describe('pushing a piece into the queue', () => {
    let G: InputBoardGameState;
    let R0: Piece, R1: Piece, R2: Piece, R3: Piece;
    beforeEach(() => {
      G = JSON.parse(JSON.stringify(_G)); // deep copy
      R0 = JSON.parse(JSON.stringify(_R0));
      R1 = JSON.parse(JSON.stringify(_R1));
      R2 = JSON.parse(JSON.stringify(_R2));
      R3 = JSON.parse(JSON.stringify(_R3));
    });

    it('adds piece to the queue', () => {
      G.pieces.push(R0);
      movePiece(G, _ctx, 'r0');
      expect(G.enteringSpace[RED]).toContain('r0');
    });

    it('remains canMove: true if at the top of the queue', () => {
      G.pieces.push(R0);
      movePiece(G, _ctx, 'r0');
      expect(G.pieces[0].canMove).toBe(true);
    });

    it('changes canMove to false if something is on top of the queue', () => {
      [R0, R1].forEach((p) => G.pieces.push(p));
      ['r0', 'r1'].forEach((id) => movePiece(G, _ctx, id));
      expect(G.pieces[0].canMove).toBe(false);
      expect(G.pieces[1].canMove).toBe(true);
    });

    it('makes the rest of the rack pieces canMove: false w/ queue size > 3', () => {
      [R0, R1, R2, R3].forEach((p) => G.pieces.push(p));
      ['r0', 'r1', 'r2'].forEach((id) => movePiece(G, _ctx, id));
      expect(G.pieces[0].canMove).toBe(false);
      expect(G.pieces[1].canMove).toBe(false);
      expect(G.pieces[2].canMove).toBe(true);
      expect(G.pieces[3].canMove).toBe(false);
    });

    it('changes currentPosition to ENTERING_SPACE', () => {
      G.pieces.push(R0);
      movePiece(G, _ctx, 'r0');
      expect(G.pieces[0].currentPos).toEqual(ENTERING_SPACE);
      expect(G.pieces[0].nextMove).toEqual(10);
    });

    it("won't allow a tile on entering space to land on an existing spot in the playing field", () => {
      [R0, R1, R2].forEach((p) => G.pieces.push(p));
      ['r0', 'r2', 'r2'].forEach((id) => movePiece(G, _ctx, id));
      expect(G.pieces[0].canMove).toEqual(false);
    });

    it('allow previously unmovable tile to move again', () => {
      [R0, R1, R2].forEach((p) => G.pieces.push(p));
      ['r0', 'r2', 'r2', 'r2'].forEach((id) => movePiece(G, _ctx, id));
      expect(G.pieces[0].canMove).toEqual(true);
    });
  });

  describe('popping a piece from the queue', () => {
    let G: InputBoardGameState;
    let R0: Piece, R1: Piece, R2: Piece, R3: Piece;
    beforeEach(() => {
      G = JSON.parse(JSON.stringify(_G)); // deep copy
      R0 = JSON.parse(JSON.stringify(_R0));
      R1 = JSON.parse(JSON.stringify(_R1));
      R2 = JSON.parse(JSON.stringify(_R2));
      R3 = JSON.parse(JSON.stringify(_R3));
    });

    it('removes piece from the queue', () => {
      [R0].forEach((p) => G.pieces.push(p));
      ['r0', 'r0'].forEach((id) => movePiece(G, _ctx, id));
      expect(G.pieces[0].currentPos).toEqual(10);
      expect(G.enteringSpace[RED].length).toEqual(0);
    });

    it('makes bottom of a 2 stack movable when popped off', () => {
      [R0, R1].forEach((p) => G.pieces.push(p));
      ['r0', 'r1', 'r1'].forEach((id) => movePiece(G, _ctx, id));
      expect(G.pieces[0].canMove).toBe(true);
      expect(G.pieces[1].canMove).toBe(true);
    });

    it('removes canMove: false from rack when less than 3 pieces in queue', () => {
      [R0, R1, R2, R3].forEach((p) => G.pieces.push(p));
      ['r0', 'r1', 'r2'].forEach((id) => movePiece(G, _ctx, id));
      expect(G.pieces[3].canMove).toBe(false);
      movePiece(G, _ctx, 'r2');
      //   console.log(G);
      expect(G.pieces[3].canMove).toBe(true);
    });
  });
});
