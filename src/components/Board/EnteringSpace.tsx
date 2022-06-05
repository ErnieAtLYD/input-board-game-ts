import styled from 'styled-components';
import { ENTERING_SPACE, RED, HIGHLIGHT_COLOR } from '../../config';
import { Color } from '../../types';
import { GridSquareStyle } from './GridSquare/styles';
import { useBoardContext, usePreviewContext } from '../../context';
import { renderPieceById } from '../../game/utils';

export const ESWrapper = styled(GridSquareStyle)<{ highlighted: boolean }>`
  background-color: ${(props) =>
    props.highlighted ? HIGHLIGHT_COLOR : '#999'};
`;

interface EnteringSpaceProps {
  className?: string;
  color: Color;
}

const EnteringSpace = ({ className, color }: EnteringSpaceProps) => {
  // const { G, ctx, moves } = useBoardContext();
  const { G, ctx } = useBoardContext();
  const { selected } = usePreviewContext();

  const strColor = color === RED ? `red` : `blue`;
  return (
    <ESWrapper
      className={`${className} board__es--${strColor}`}
      highlighted={selected === ENTERING_SPACE && color === ctx.currentPlayer}
    >
      {G.enteringSpace[color].map((id) => renderPieceById(G, ctx, id))}
    </ESWrapper>
  );
};

export default EnteringSpace;
