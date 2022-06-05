import { RED, BLUE, RACK, ENTERING_SPACE, CAPTURED } from '../config';

export type Color = typeof RED | typeof BLUE;

export interface InputBoardGameState {
  cells: (null | string)[];
  enteringSpace: { [color: string]: string[] };
  pieces: Piece[];
}

export type Piece = {
  id: string;
  currentPos: PossiblePositions;
  moves: number[];
  color: Color;
  canMove: boolean;
  nextMove: PossiblePositions;
};

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
