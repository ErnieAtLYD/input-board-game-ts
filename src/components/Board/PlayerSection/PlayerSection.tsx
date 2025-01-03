import { useState, useEffect } from 'react';
import { useBoardContext } from '../../../context';
import { Pane, Panel, Avatar } from './styles';
import { Color } from '../../../types';
import { RED, BLUE, STATS, CAPTURED } from '../../../config';
import { motion } from 'framer-motion';

interface PlayerSectionProps {
  player: Color;
}
const PlayerSection = ({ player }: PlayerSectionProps) => {
  const [seed] = useState();
  const { G, ctx } = useBoardContext();

  useEffect(() => {}, []);
  const opposingPlayer = player === RED ? BLUE : RED;
  const bgColor = player === RED ? 'cc0000' : '0000cc';
  const avatarType = player === RED ? 'avataaars' : 'bottts';

  const rgbaPlayer = player === RED ? '240, 52, 52' : '52, 52, 240';
  const variants = {
    isPlayerTurn: { background: `rgba(${rgbaPlayer}, 1)` },
    isNotPlayerTurn: { background: `rgba(${rgbaPlayer}, 0.46)` },
  };

  return (
    <Pane>
      <Panel
        as={motion.div}
        transition={{ duration: 0.25, delay: 0.25 }}
        player={player}
        variants={variants}
        initial={
          ctx.currentPlayer === player ? 'isPlayerTurn' : 'isNotPlayerTurn'
        }
        animate={
          ctx.currentPlayer === player ? 'isPlayerTurn' : 'isNotPlayerTurn'
        }
      >
        <Avatar
          src={`https://avatars.dicebear.com/api/${avatarType}/${seed}.svg?colors=blue&background=%23${bgColor}&radius=50`}
          alt="Robot"
        />
        {ctx.currentPlayer === player ? (
          <p>{STATS[player].name.toUpperCase()} PLAYER</p>
        ) : (
          <p>{STATS[player].name} Player</p>
        )}
        <p>
          Captured:
          {
            G.pieces.filter(
              (p) => p.color === opposingPlayer && p.current_pos === CAPTURED
            ).length
          }{' '}
          of 6
        </p>
        {ctx.gameover?.winner === player && (
          <p>{STATS[player].name.toUpperCase()} WINS</p>
        )}
      </Panel>
    </Pane>
  );
};

export default PlayerSection;
