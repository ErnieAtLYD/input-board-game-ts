import { ENTERING_SPACE, RED } from '../config';
import { _G, _ctx, _R0, _R1, _R2, _R3 } from '../config/testing';
import { GameState, Piece } from '../types';
import { movePiece } from './moves';
import { LongFormMove } from 'boardgame.io';

type MovePiece = LongFormMove;
const moveFunction = movePiece as unknown as MovePiece;

describe('the queue', () => {
  let G: GameState;
  
  beforeEach(() => {
    G = {
      G: JSON.parse(JSON.stringify(_G)),
      ctx: _ctx,
      events: {},
      log: {},
      random: {},
      playerID: '0'
    };
  });

  describe('pushing a piece into the queue', () => {
    let R0: Piece, R1: Piece, R2: Piece, R3: Piece;
    beforeEach(() => {
      R0 = JSON.parse(JSON.stringify(_R0));
      R1 = JSON.parse(JSON.stringify(_R1));
      R2 = JSON.parse(JSON.stringify(_R2));
      R3 = JSON.parse(JSON.stringify(_R3));
    });

    it('adds piece to the queue', () => {
      G.G.pieces.push(R0);
      moveFunction.move(G, _ctx, 'r0');
      expect(G.G.enteringSpace[RED]).toContain('r0');
    });

    it('remains can_move: true if at the top of the queue', () => {
      G.G.pieces.push(R0);
      moveFunction.move(G, _ctx, 'r0');
      expect(G.G.pieces[0].can_move).toBe(true);
    });

    it('changes can_move to false if something is on top of the queue', () => {
      [R0, R1].forEach((p) => G.G.pieces.push(p));
      ['r0', 'r1'].forEach((id) => moveFunction.move(G, _ctx, id));
      expect(G.G.pieces[0].can_move).toBe(false);
      expect(G.G.pieces[1].can_move).toBe(true);
    });

    it('makes the rest of the rack pieces can_move: false w/ queue size > 3', () => {
      [R0, R1, R2, R3].forEach((p) => G.G.pieces.push(p));
      ['r0', 'r1', 'r2'].forEach((id) => moveFunction.move(G, _ctx, id));
      expect(G.G.pieces[0].can_move).toBe(false);
      expect(G.G.pieces[1].can_move).toBe(false);
      expect(G.G.pieces[2].can_move).toBe(true);
      expect(G.G.pieces[3].can_move).toBe(false);
    });

    it('changes current_position to ENTERING_SPACE', () => {
      G.G.pieces.push(R0);
      moveFunction.move(G, _ctx, 'r0');
      expect(G.G.pieces[0].current_pos).toEqual(ENTERING_SPACE);
      expect(G.G.pieces[0].nextMove).toEqual(10);
    });

    it("won't allow a tile on entering space to land on an existing spot in the playing field", () => {
      [R0, R1, R2].forEach((p) => G.G.pieces.push(p));
      ['r0', 'r2', 'r2'].forEach((id) => moveFunction.move(G, _ctx, id));
      expect(G.G.pieces[0].can_move).toEqual(false);
    });

    it('allow previously unmovable tile to move again', () => {
      [R0, R1, R2].forEach((p) => G.G.pieces.push(p));
      ['r0', 'r2', 'r2', 'r2'].forEach((id) => moveFunction.move(G, _ctx, id));
      expect(G.G.pieces[0].can_move).toEqual(true);
    });
  });

  describe('popping a piece from the queue', () => {
    let R0: Piece, R1: Piece, R2: Piece, R3: Piece;

    beforeEach(() => {
      R0 = JSON.parse(JSON.stringify(_R0));
      R1 = JSON.parse(JSON.stringify(_R1));
      R2 = JSON.parse(JSON.stringify(_R2));
      R3 = JSON.parse(JSON.stringify(_R3));
    });

    it('removes piece from the queue', () => {
      [R0].forEach((p) => G.G.pieces.push(p));
      ['r0', 'r0'].forEach((id) => moveFunction.move(G, _ctx, id));
      expect(G.G.pieces[0].current_pos).toEqual(10);
      expect(G.G.enteringSpace[RED].length).toEqual(0);
    });

    it('makes bottom of a 2 stack movable when popped off', () => {
      [R0, R1].forEach((p) => G.G.pieces.push(p));
      ['r0', 'r1', 'r1'].forEach((id) => moveFunction.move(G, _ctx, id));
      expect(G.G.pieces[0].can_move).toBe(true);
      expect(G.G.pieces[1].can_move).toBe(true);
    });

    it('removes can_move: false from rack when less than 3 pieces in queue', () => {
      [R0, R1, R2, R3].forEach((p) => G.G.pieces.push(p));
      ['r0', 'r1', 'r2'].forEach((id) => moveFunction.move(G, _ctx, id));
      expect(G.G.pieces[3].can_move).toBe(false);
      moveFunction.move(G, _ctx, 'r2');
      //   console.log(G);
      expect(G.G.pieces[3].can_move).toBe(true);
    });
  });
});
