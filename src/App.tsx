import { Client } from 'boardgame.io/react';
import { InputBoardGame } from './game';
import { Board } from './components/Board/Board';
import { Local } from 'boardgame.io/multiplayer';
import AIBot from './components/AIBot';

// const InputSingleAIClient = Client({
//   game: InputBoardGame,
//   board: Board,
//   multiplayer: Local(),
// });

// const App = () => {
//   return (
//     <>
//       <InputSingleAIClient playerID="0" matchID="advanced-ai" />
//       <AIBot playerID="1" matchID="advanced-ai" />
//     </>
//   );
// };

const App = Client({
  game: InputBoardGame,
  board: Board,
});

export default App;
