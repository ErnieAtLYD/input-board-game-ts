import { useState } from 'react';
import { Ctx } from 'boardgame.io';
import { BoardProps } from 'boardgame.io/react';
import styled from 'styled-components';

import { BoardContext, PreviewContext } from '../../context';
import { InputBoardGameState, PossiblePositions } from '../../types';
import Rack from './Rack';
import { BLUE, RED } from '../../config';
import { GridSquare } from './GridSquare';
import EnteringSpace from './EnteringSpace';
import { Tray } from './Tray';
import './Board.css';

const getWinner = (ctx: Ctx): string | null => {
  if (!ctx.gameover) return null;
  if (ctx.gameover.draw) return 'Draw';
  return `Player ${ctx.gameover.winner} wins!`;
};

const BoardContainer = styled.div`
  background: #ccc;
  border: 10px outset #ccc;
`;

interface InputBoardGameProps extends BoardProps<InputBoardGameState> {}

export const Board = (boardProps: InputBoardGameProps) => {
  const [selected, setSelected] = useState<PossiblePositions | null>(null);
  // const { ctx, playerID, log, matchID } = boardProps;
  const { ctx } = boardProps;
  let winner = getWinner(ctx);

  return (
    <BoardContext.Provider value={boardProps}>
      <main>
        <h1>Input Demo</h1>
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
        {winner && <p>{winner}</p>}
      </main>
    </BoardContext.Provider>
  );
};
