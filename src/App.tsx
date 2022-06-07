import { Client } from 'boardgame.io/react';
import { InputBoardGame } from './game';
import { Board } from './components/Board/Board';
import { Local } from 'boardgame.io/multiplayer';
import AIBot from './components/AIBot';
import GlobalStyle from './globalStyles';
import { DEBUG } from './config';

const InputSingleAIClient = Client({
  game: InputBoardGame,
  board: Board,
  multiplayer: Local(),
  debug: DEBUG,
});

const App = () => (
  <>
    <GlobalStyle />
    <InputSingleAIClient playerID="0" matchID="advanced-ai" />
    <AIBot playerID="1" matchID="advanced-ai" />
  </>
);

export default App;
