import { INVALID_MOVE } from "boardgame.io/core";
import { Ctx } from "boardgame.io";
import { CAPTURED, ENTERING_SPACE } from "../config";
import { _ctx, _G, _R0, _R2, _B3 } from "../config/testing";
import { InputBoardGameState, Piece } from "../types";
import { movePiece } from "./moves";

// Helper to call move functions in tests
const callMove = (
  moveFn: any,
  G: InputBoardGameState,
  ctx: Ctx,
  ...args: any[]
) => {
  return moveFn({ G, ctx }, ...args);
};

describe("general movement", () => {
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

  it("should return INVALID_MOVE if not players turn", () => {
    const ctx = JSON.parse(JSON.stringify(_ctx));
    ctx.currentPlayer = "1";
    expect(callMove(movePiece, G, ctx, R0.id)).toBe(INVALID_MOVE);
  });

  it("travels square to square in the playing area", () => {
    [R0].forEach((p) => G.pieces.push(p));
    ["r0", "r0"].forEach((id) => callMove(movePiece, G, _ctx, id));
    expect(G.pieces[0].currentPos).toEqual(10);
    expect(G.pieces[0].nextMove).toEqual(6);
    expect(G.cells[10]).toEqual("r0");
  });

  it("won't allow a tile to land on an existing spot on the same team", () => {
    [R0, R2].forEach((p) => G.pieces.push(p));
    ["r0", "r0", "r0", "r0", "r2", "r2", "r2"].forEach((id) =>
      callMove(movePiece, G, _ctx, id)
    );
    expect(G.pieces[1].canMove).toEqual(false);
  });

  it("allows a tile to land on an opponents tile", () => {
    [R0, B3].forEach((p) => G.pieces.push(p));
    ["r0", "b3", "r0", "b3", "r0", "b3"].forEach((id) =>
      callMove(movePiece, G, _ctx, id)
    );
    expect(G.pieces[0].canMove).toEqual(true);
  });

  it("moves a blue piece to the entering space", () => {
    const ctx = JSON.parse(JSON.stringify(_ctx));
    ctx.currentPlayer = "1"; // Set to blue player
    [B3].forEach((p) => G.pieces.push(p));
    ["b3"].forEach((id) => {
      callMove(movePiece, G, ctx, id);
    });
    expect(G.pieces[0].currentPos).toEqual(ENTERING_SPACE);
  });

  it("should capture an opponent's tile when landing on it", () => {
    // Set up R0 at position 10 and B3 at position 0 to create a capture scenario
    const r0 = JSON.parse(JSON.stringify(R0));
    const b3 = JSON.parse(JSON.stringify(B3));
    
    // Position R0 at board position 10 with next move to position 6
    r0.currentPos = 10;
    r0.nextMove = 6;
    
    // Position B3 at board position 6 (where R0 will move to capture it)
    b3.currentPos = 6;
    b3.nextMove = 4;
    
    [r0, b3].forEach((p) => G.pieces.push(p));
    
    // Set up the board state
    G.cells[10] = "r0";
    G.cells[6] = "b3";
    
    // Move R0 to capture B3
    callMove(movePiece, G, _ctx, "r0");
    
    expect(G.pieces[1].currentPos).toEqual(CAPTURED);
    expect(G.pieces[0].currentPos).toEqual(6);
    expect(G.cells[6]).toEqual("r0");
  });
});

export {};
