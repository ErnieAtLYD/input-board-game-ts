import { INVALID_MOVE } from 'boardgame.io/core';
import { CAPTURED, ENTERING_SPACE, RACK } from '../config';
import { _ctx, _G, _R0, _R1, _R2, _R3, _B3 } from '../config/testing';
import { InputBoardGameState, Piece } from '../types';
import { movePiece } from './moves';

describe('general movement', () => {
  let G: InputBoardGameState;
  let R0: Piece, R1: Piece, R2: Piece, R3: Piece, B3: Piece;
  afterEach(() => {
    jest.clearAllTimers();
  });

  beforeEach(() => {
    G = JSON.parse(JSON.stringify(_G)); // deep copy
    R0 = JSON.parse(JSON.stringify(_R0));
    // R1 = JSON.parse(JSON.stringify(_R1));
    R2 = JSON.parse(JSON.stringify(_R2));
    // R3 = JSON.parse(JSON.stringify(_R3));
    B3 = JSON.parse(JSON.stringify(_B3));
  });

  xit('should return INVALID_MOVE if not players turn', () => {
    const ctx = JSON.parse(JSON.stringify(_ctx));
    ctx.currentPlayer = '1';
    expect(movePiece(G, ctx, R0.id)).toBe(INVALID_MOVE);
  });

  xit('travels square to square in the playing area', () => {
    [R0].forEach((p) => G.pieces.push(p));
    ['r0', 'r0'].forEach((id) => movePiece(G, _ctx, id));
    expect(G.pieces[0].currentPos).toEqual(10);
    expect(G.pieces[0].nextMove).toEqual(6);
    expect(G.cells[10]).toEqual('r0');
  });

  xit("won't allow a tile to land on an existing spot on the same team", () => {
    [R0, R2].forEach((p) => G.pieces.push(p));
    ['r0', 'r0', 'r0', 'r0', 'r2', 'r2', 'r2'].forEach((id) =>
      movePiece(G, _ctx, id)
    );
    expect(G.pieces[1].canMove).toEqual(false);
  });

  xit('allows a tile to land on an opponents tile', () => {
    [R0, B3].forEach((p) => G.pieces.push(p));
    ['r0', 'b3', 'r0', 'b3', 'r0', 'b3'].forEach((id) =>
      movePiece(G, _ctx, id)
    );
    expect(G.pieces[0].canMove).toEqual(true);
  });

  xit('moves a blue piece to the entering space', () => {
    [B3].forEach((p) => G.pieces.push(p));
    console.log('b3', G.pieces[0]);
    ['b3'].forEach((id) => {
      movePiece(G, _ctx, id);
      expect(G.pieces[0].currentPos).toEqual(ENTERING_SPACE);
    });
  });

  it('capturing a tile does something', () => {
    [R0, B3].forEach((p) => G.pieces.push(p));
    console.log('r0', G.pieces[0]);
    console.log('b3', G.pieces[1]);
    ['r0', 'b3', 'r0', 'b3', 'r0', 'b3', 'r0'].forEach((id) => {
      movePiece(G, _ctx, id);
      console.log('r0', G.pieces[0].currentPos);
      console.log('b3', G.pieces[1].currentPos);
    });
    expect(G.pieces[1].currentPos).toEqual(CAPTURED);
  });
});

export {};
