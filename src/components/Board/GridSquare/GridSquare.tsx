import { motion } from 'framer-motion/dist/framer-motion';
import {
  BLUE,
  BOARD_GRID_BGCOLOR,
  HIGHLIGHT_COLOR,
  RED,
} from '../../../config';
import { useBoardContext, usePreviewContext } from '../../../context';
import { renderPieceById } from '../../../game/utils';
import { Color } from '../../../types';
import { GridSquareStyle } from './styles';

interface GridSquareProps {
  className?: string;
  pos: number;
}
export const GridSquare = ({ className, pos }: GridSquareProps) => {
  let dot;
  const { G, ctx } = useBoardContext();
  const { selected } = usePreviewContext();

  const isId = G.cells[pos];
  const renderedPiece = isId ? renderPieceById(G, ctx, isId) : null;

  if (pos >= 0 && pos <= 2) {
    dot = !renderedPiece && BLUE;
  } else if (pos >= 9 && pos <= 11) {
    dot = !renderedPiece && RED;
  }

  const gridSquareVariants = {
    initial: { backgroundColor: BOARD_GRID_BGCOLOR },
    highlighted: { backgroundColor: HIGHLIGHT_COLOR },
  };

  return (
    <GridSquareStyle
      as={motion.div}
      initial={'initial'}
      transition={{ duration: 0.25 }}
      variants={gridSquareVariants}
      animate={selected === pos ? 'highlighted' : 'initial'}
      className={`board__grid--${pos}`}
      dot={dot as Color | undefined}
    >
      {renderedPiece}
    </GridSquareStyle>
  );
};
