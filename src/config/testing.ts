import { Ctx } from 'boardgame.io';
import { InputBoardGameState, Piece } from '../types';
import { RED, BLUE, RACK, ENTERING_SPACE } from '.';

/**
 * Constants for testing *.test.ts
 */

export const _G: InputBoardGameState = {
  cells: Array(12).fill(null),
  enteringSpace: { [RED]: [], [BLUE]: [] },
  pieces: [],
};

export const _ctx: Ctx = {
  currentPlayer: '0',
  numPlayers: 0,
  playOrder: [],
  playOrderPos: 0,
  activePlayers: null,
  turn: 0,
  phase: '',
};

export const _R0: Piece = {
  id: 'r0',
  color: '0',
  current_pos: RACK,
  can_move: true,
  nextMove: ENTERING_SPACE,
  moves: [ENTERING_SPACE, 10, 6, 4, 2, 7, RACK],
};

export const _R1: Piece = {
  id: 'r1',
  color: '0',
  current_pos: RACK,
  can_move: true,
  nextMove: ENTERING_SPACE,
  moves: [ENTERING_SPACE, 9, 3, 1, 5, 8, RACK],
};

export const _R2 = {
  id: 'r2',
  color: '0',
  current_pos: RACK,
  can_move: true,
  nextMove: ENTERING_SPACE,
  moves: [ENTERING_SPACE, 10, 3, 4, 2, 8, RACK],
};

export const _R3 = {
  id: 'r3',
  color: '0',
  current_pos: RACK,
  can_move: true,
  nextMove: ENTERING_SPACE,
  moves: [ENTERING_SPACE, 11, 7, 3, 1, 8, RACK],
};

export const _B3 = {
  id: 'b3',
  color: '1',
  current_pos: RACK,
  can_move: true,
  nextMove: ENTERING_SPACE,
  moves: [ENTERING_SPACE, 0, 4, 8, 10, 3, RACK],
};
