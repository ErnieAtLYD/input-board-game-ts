import { RED, BLUE, RACK, ENTERING_SPACE, CAPTURED } from '../config';
import { Ctx } from 'boardgame.io';

export type Color = typeof RED | typeof BLUE;

export interface InputBoardGameState {
  cells: (null | string)[];
  enteringSpace: { [color: string]: string[] };
  pieces: Piece[];
}

export type Piece = {
  id: string;
  current_pos: PossiblePositions;
  moves: number[];
  color: Color;
  can_move: boolean;
  nextMove: PossiblePositions;
};

export type PossiblePieceIDs =
  | 'b0'
  | 'b1'
  | 'b2'
  | 'b3'
  | 'b4'
  | 'b5'
  | 'r0'
  | 'r1'
  | 'r2'
  | 'r3'
  | 'r4'
  | 'r5';

export type PossiblePositions =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | typeof RACK
  | typeof ENTERING_SPACE
  | typeof CAPTURED;

export interface AIMoves {
  move: 'toRack' | 'toEnteringSpace' | 'movePiece';
  args: PossiblePieceIDs[];
}

export type GameState = {
  G: InputBoardGameState;
  ctx: Ctx;
  events: any;
  log: any;
  random: any;
  playerID: string;
};

export type GameMoves = {
  movePiece: (pieceId: string) => void;
  toRack: (pieceId: string) => void;
  toEnteringSpace: (pieceId: string) => void;
};
