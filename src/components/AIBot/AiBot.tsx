import { Client as PlainJSClient } from 'boardgame.io/client';
import { useEffect, useState } from 'react';
import { InputBoardGame } from '../../game';
import { Local } from 'boardgame.io/multiplayer';
import { MCTSBot, Step } from 'boardgame.io/ai';
import {
  AI_BOT_DELAY,
  AI_BOT_ITERATIONS,
  AI_BOT_PLAYOUT_DEPTH,
} from '../../config';

interface AIBotProps {
  playerID: string;
  matchID: string;
}

const AIBot = ({ playerID, matchID }: AIBotProps) => {
  const [client, setClient] = useState<any>(); // FIXME: type

  // create a vanilla game client. Do I understand what's going on? Not really.
  // see: shorturl.at/ktAQ5
  useEffect(() => {
    const newClient = PlainJSClient({
      game: InputBoardGame,
      debug: false,
      multiplayer: Local(),
      matchID,
      playerID,
    });
    newClient.start();
    setClient(newClient);
    // Clean up client on unmount
    return () => newClient.stop();
  }, [matchID, playerID]);

  useEffect(() => {
    if (!client) return;
    // Subscribe to the client with a function that will run AI on a bot player's turn
    return client.subscribe((state: { ctx: { currentPlayer: string } }) => {
      if (state.ctx.currentPlayer !== playerID) return;
      const bot = new MCTSBot({
        game: InputBoardGame,
        enumerate: InputBoardGame.ai?.enumerate,
        iterations: AI_BOT_ITERATIONS,
        playoutDepth: AI_BOT_PLAYOUT_DEPTH,
      });
      // Delay AI stepping by a tick to allow React to render before the
      // main thread gets blocked by AI iterations.
      setTimeout(() => Step(client, bot), AI_BOT_DELAY);
    });
  }, [client, playerID]);

  return null;
};

export default AIBot;
