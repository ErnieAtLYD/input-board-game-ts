import { useState } from "react";
import { BoardProps } from "boardgame.io/react";
import styled from "styled-components";

import { BoardContext, PreviewContext } from "../../context";
import { InputBoardGameState, PossiblePositions } from "../../types";
import Rack from "./Rack";
import { BLUE, BOARD_BORDER_WIDTH, RED } from "../../config";
import { GridSquare } from "./GridSquare";
import EnteringSpace from "./EnteringSpace";
import { Tray } from "./Tray";
import "./Board.css";
import PlayerSection from "./PlayerSection";

export const GameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BoardContainer = styled.div`
  background: #ccc;
  border: ${BOARD_BORDER_WIDTH}px outset #ccc;
  width: 600px;
`;

interface InputBoardGameProps extends BoardProps<InputBoardGameState> {}

export const Board = (boardProps: InputBoardGameProps) => {
  const [selected, setSelected] = useState<PossiblePositions | null>(null);

  return (
    <BoardContext.Provider value={boardProps}>
      <GameContainer>
        <PlayerSection player={RED} />
        <main
          style={{ display: "flex", alignItems: "center", height: "100vh" }}
        >
          {/* <Header>Input Demo</Header> */}
          {/* Need className for hard coded CSS grid layout */}
          <BoardContainer className="board">
            <PreviewContext.Provider value={{ selected, setSelected }}>
              <Rack color={BLUE} />
              <Rack color={RED} />
              <EnteringSpace color={BLUE} />
              <EnteringSpace color={RED} />
              <GridSquare pos={0} />
              <GridSquare pos={1} />
              <GridSquare pos={2} />
              <GridSquare pos={3} />
              <GridSquare pos={4} />
              <GridSquare pos={5} />
              <GridSquare pos={6} />
              <GridSquare pos={7} />
              <GridSquare pos={8} />
              <GridSquare pos={9} />
              <GridSquare pos={10} />
              <GridSquare pos={11} />
              <Tray color={BLUE} />
              <Tray color={RED} />
            </PreviewContext.Provider>
          </BoardContainer>
        </main>
        <PlayerSection player={BLUE} />
      </GameContainer>
    </BoardContext.Provider>
  );
};
