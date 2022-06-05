import { BLUE, RED } from '../../../config';
import { useBoardContext, usePreviewContext } from '../../../context';
import { renderPieceById } from '../../../game/utils';
import { Color } from '../../../types';
import { GridSquareStyle } from './styles';

interface GridSquareProps {
  className?: string;
  pos: number;
}
export const GridSquare = ({ className, pos }: GridSquareProps) => {
  // const { G, ctx, moves } = useBoardContext();
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

  return (
    <GridSquareStyle
      className={`${className} board__grid--${pos}`}
      dot={dot as Color | undefined}
      highlighted={selected === pos}
    >
      {renderedPiece}
    </GridSquareStyle>
  );
};
