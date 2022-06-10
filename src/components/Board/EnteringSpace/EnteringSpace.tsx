import styled from 'styled-components';
import { motion } from 'framer-motion/dist/framer-motion';
import {
  ENTERING_SPACE,
  HIGHLIGHT_COLOR,
  BOARD_GRID_BGCOLOR,
} from '../../../config';
import { Color } from '../../../types';
import { GridSquareStyle } from '../GridSquare/styles';
import { useBoardContext, usePreviewContext } from '../../../context';
import { colorToString, renderPieceById } from '../../../game/utils';

export const ESWrapper = styled(GridSquareStyle)<{}>``;

interface EnteringSpaceProps {
  className?: string;
  color: Color;
}

const gridSquareVariants = {
  initial: { backgroundColor: BOARD_GRID_BGCOLOR },
  highlighted: { backgroundColor: HIGHLIGHT_COLOR },
};

const EnteringSpace = ({ color }: EnteringSpaceProps) => {
  const { G, ctx } = useBoardContext();
  const { selected } = usePreviewContext();

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
      className={`board__es--${colorToString(color)}`}
    >
      {G.enteringSpace[color].map((id) => renderPieceById(G, ctx, id))}
    </ESWrapper>
  );
};

export default EnteringSpace;
