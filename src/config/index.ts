export const RED = '0';
export const BLUE = '1';
export const STATS = {
  [RED]: {
    name: 'Red',
    hexColor: 'ff0000',
  },
  [BLUE]: {
    name: 'Blue',
    hexColor: '0000ff',
  },
};
export const DEBUG = false;

// note: this MUST be hex for framer motion to animate
export const HIGHLIGHT_COLOR = '#FF69B4';

export const ENTERING_SPACE = 100;
export const RACK = 200;
export const CAPTURED = -1;

export const MAX_TILES_IN_QUEUE = 3;

export const PIECES = [
  { id: 'r0', moves: [10, 6, 4, 2, 7] },
  { id: 'r1', moves: [9, 3, 1, 5, 8] },
  { id: 'r2', moves: [10, 3, 4, 2, 8] },
  { id: 'r3', moves: [11, 7, 3, 1, 8] },
  { id: 'r4', moves: [9, 6, 0, 5, 7] },
  { id: 'r5', moves: [11, 6, 0, 4, 5] },
  { id: 'b0', moves: [1, 5, 7, 9, 4] },
  { id: 'b1', moves: [2, 8, 10, 6, 3] },
  { id: 'b2', moves: [1, 8, 7, 9, 3] },
  { id: 'b3', moves: [0, 4, 8, 10, 3] },
  { id: 'b4', moves: [2, 5, 11, 6, 4] },
  { id: 'b5', moves: [0, 5, 11, 7, 6] },
];

// export const AI_BOT_ITERATIONS = 750;
// export const AI_BOT_PLAYOUT_DEPTH = 50;
export const AI_BOT_ITERATIONS = 425;
export const AI_BOT_PLAYOUT_DEPTH = 25;
// export const AI_BOT_ITERATIONS = 1;
// export const AI_BOT_PLAYOUT_DEPTH = 1;

// Delay AI stepping  to allow React to render animation
// before the main thread gets blocked by AI iterations
export const AI_BOT_DELAY = 400;
