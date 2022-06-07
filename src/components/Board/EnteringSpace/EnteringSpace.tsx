import styled from 'styled-components';
import { motion } from 'framer-motion/dist/framer-motion';
import { ENTERING_SPACE, RED, HIGHLIGHT_COLOR } from '../../../config';
import { Color } from '../../../types';
import { GridSquareStyle } from '../GridSquare/styles';
import { useBoardContext, usePreviewContext } from '../../../context';
import { renderPieceById } from '../../../game/utils';

export const ESWrapper = styled(GridSquareStyle)<{}>``;

interface EnteringSpaceProps {
  className?: string;
  color: Color;
}

const gridSquareVariants = {
  initial: { backgroundColor: '#999' },
  highlighted: { backgroundColor: HIGHLIGHT_COLOR },
};

const EnteringSpace = ({ color }: EnteringSpaceProps) => {
  const { G, ctx } = useBoardContext();
  const { selected } = usePreviewContext();

  const strColor = color === RED ? `red` : `blue`;
  return (
    <ESWrapper
      as={motion.div}
      initial={'initial'}
      transition={{ duration: 0.25 }}
      variants={gridSquareVariants}
      animate={
        selected === ENTERING_SPACE && color === ctx.currentPlayer
          ? 'highlighted'
          : 'initial'
      }
      className={`board__es--${strColor}`}
    >
      {G.enteringSpace[color].map((id) => renderPieceById(G, ctx, id))}
    </ESWrapper>
  );
};

export default EnteringSpace;
