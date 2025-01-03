import { INVALID_MOVE } from 'boardgame.io/core';
import { CAPTURED, ENTERING_SPACE, RACK } from '../config';
import { _ctx, _G, _R0, _R1, _R2, _R3, _B3 } from '../config/testing';
import { InputBoardGameState, Piece, GameState } from '../types';
import { movePiece } from './moves';
import { Ctx, LongFormMove } from 'boardgame.io';

type MovePiece = LongFormMove;
const moveFunction = movePiece as unknown as MovePiece;

describe('general movement', () => {
  let G: GameState;
  let R0: Piece, R1: Piece, R2: Piece, R3: Piece, B3: Piece;
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
  });

  beforeEach(() => {
    G = {
      G: JSON.parse(JSON.stringify(_G)), // deep copy
      ctx: _ctx,
      events: {},
      log: {},
      random: {},
      playerID: '0'
    };
    R0 = JSON.parse(JSON.stringify(_R0));
    R1 = JSON.parse(JSON.stringify(_R1));
    R2 = JSON.parse(JSON.stringify(_R2));
    R3 = JSON.parse(JSON.stringify(_R3));
    B3 = JSON.parse(JSON.stringify(_B3));
  });

  it('should return INVALID_MOVE if not players turn', () => {
    const ctx = JSON.parse(JSON.stringify(_ctx));
    ctx.currentPlayer = '1';
    expect(moveFunction.move(G, ctx, R0.id)).toBe(INVALID_MOVE);
  });

  it('travels square to square in the playing area', () => {
    [R0].forEach((p) => G.G.pieces.push(p));
    ['r0', 'r0'].forEach((id) => moveFunction.move(G, _ctx, id));
    expect(G.G.pieces[0].current_pos).toEqual(10);
    expect(G.G.pieces[0].nextMove).toEqual(6);
    expect(G.G.cells[10]).toEqual('r0');
  });

  it("won't allow a tile to land on an existing spot on the same team", () => {
    [R0, R2].forEach((p) => G.G.pieces.push(p));
    ['r0', 'r0', 'r0', 'r0', 'r2', 'r2', 'r2'].forEach((id) =>
      moveFunction.move(G, _ctx, id)
    );
    expect(G.G.pieces[1].can_move).toEqual(false);
  });

  it('allows a tile to land on an opponents tile', () => {
    [R0, B3].forEach((p) => G.G.pieces.push(p));
    ['r0', 'b3', 'r0', 'b3', 'r0', 'b3'].forEach((id) =>
      moveFunction.move(G, _ctx, id)
    );
    expect(G.G.pieces[0].can_move).toEqual(true);
  });

 it('moves a blue piece to the entering space', () => {
    [B3].forEach((p) => G.G.pieces.push(p));
    console.log('b3', G.G.pieces[0]);
    ['b3'].forEach((id) => {
      moveFunction.move(G, _ctx, id);
      expect(G.G.pieces[0].current_pos).toEqual(ENTERING_SPACE);
    });
  });

  xit('should capture an opponent\'s tile when landing on it', () => {
    [R0, B3].forEach((p) => G.G.pieces.push(p));
    console.log('r0', G.G.pieces[0]);
    console.log('b3', G.G.pieces[1]);
    ['r0', 'b3', 'r0', 'b3', 'r0', 'b3', 'r0'].forEach((id) => {
      moveFunction.move(G, _ctx, id);
      console.log('r0', G.G.pieces[0].current_pos);
      console.log('b3', G.G.pieces[1].current_pos);
    });
    expect(G.G.pieces[1].current_pos).toEqual(CAPTURED);
  });
});

export {};
