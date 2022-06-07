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
import PlayerSection from './PlayerSection';

const getWinner = (ctx: Ctx): string | null => {
  if (!ctx.gameover) return null;
  if (ctx.gameover.draw) return 'Draw';
  return `Player ${ctx.gameover.winner} wins!`;
};

export const GameContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const BoardContainer = styled.div`
  background: #ccc;
  border: 10px outset #ccc;
  width: 680px;
`;

const Header = styled.h1`
  color: #fff;
  font-family: 'Press Start 2P', cursive;
  font-size: 32px;
  line-height: 24px;
`;

interface InputBoardGameProps extends BoardProps<InputBoardGameState> {}

export const Board = (boardProps: InputBoardGameProps) => {
  const [selected, setSelected] = useState<PossiblePositions | null>(null);
  // const { ctx, playerID, log, matchID } = boardProps;
  const { ctx } = boardProps;
  let winner = getWinner(ctx);

  return (
    <BoardContext.Provider value={boardProps}>
      <GameContainer>
        <PlayerSection player={RED} />
        <main>
          <Header>Input Demo</Header>
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
          {/* {winner && <p>{winner}</p>} */}
        </main>
        <PlayerSection player={BLUE} />
      </GameContainer>
    </BoardContext.Provider>
  );
};
