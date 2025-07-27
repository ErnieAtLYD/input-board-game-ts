import { INVALID_MOVE } from 'boardgame.io/core';
import { Ctx } from 'boardgame.io';
import { CAPTURED, ENTERING_SPACE } from '../config';
import { _ctx, _G, _R0, _R2, _B3 } from '../config/testing';
import { InputBoardGameState, Piece } from '../types';
import { movePiece } from './moves';

// Helper to call move functions in tests
const callMove = (moveFn: any, G: InputBoardGameState, ctx: Ctx, ...args: any[]) => {
  return moveFn({ G, ctx }, ...args);
};

describe('general movement', () => {
  let G: InputBoardGameState;
  let R0: Piece, R2: Piece, B3: Piece;
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
  });

  beforeEach(() => {
    G = JSON.parse(JSON.stringify(_G)); // deep copy
    R0 = JSON.parse(JSON.stringify(_R0));
    R2 = JSON.parse(JSON.stringify(_R2));
    B3 = JSON.parse(JSON.stringify(_B3));
  });

  it('should return INVALID_MOVE if not players turn', () => {
    const ctx = JSON.parse(JSON.stringify(_ctx));
    ctx.currentPlayer = '1';
    expect(callMove(movePiece, G, ctx, R0.id)).toBe(INVALID_MOVE);
  });

  it('travels square to square in the playing area', () => {
    [R0].forEach((p) => G.pieces.push(p));
    ['r0', 'r0'].forEach((id) => callMove(movePiece, G, _ctx, id));
    expect(G.pieces[0].currentPos).toEqual(10);
    expect(G.pieces[0].nextMove).toEqual(6);
    expect(G.cells[10]).toEqual('r0');
  });

  it("won't allow a tile to land on an existing spot on the same team", () => {
    [R0, R2].forEach((p) => G.pieces.push(p));
    ['r0', 'r0', 'r0', 'r0', 'r2', 'r2', 'r2'].forEach((id) =>
      callMove(movePiece, G, _ctx, id)
    );
    expect(G.pieces[1].canMove).toEqual(false);
  });

  xit('allows a tile to land on an opponents tile', () => {
    [R0, B3].forEach((p) => G.pieces.push(p));
    ['r0', 'b3', 'r0', 'b3', 'r0', 'b3'].forEach((id) =>
      callMove(movePiece, G, _ctx, id)
    );
    expect(G.pieces[0].canMove).toEqual(true);
  });

  xit('moves a blue piece to the entering space', () => {
    [B3].forEach((p) => G.pieces.push(p));
    console.log('b3', G.pieces[0]);
    ['b3'].forEach((id) => {
      callMove(movePiece, G, _ctx, id);
      expect(G.pieces[0].currentPos).toEqual(ENTERING_SPACE);
    });
  });

  xit('should capture an opponent\'s tile when landing on it', () => {
    [R0, B3].forEach((p) => G.pieces.push(p));
    console.log('r0', G.pieces[0]);
    console.log('b3', G.pieces[1]);
    ['r0', 'b3', 'r0', 'b3', 'r0', 'b3', 'r0'].forEach((id) => {
      callMove(movePiece, G, _ctx, id);
      console.log('r0', G.pieces[0].currentPos);
      console.log('b3', G.pieces[1].currentPos);
    });
    expect(G.pieces[1].currentPos).toEqual(CAPTURED);
  });
});

export {};
