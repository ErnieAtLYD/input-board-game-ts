import { Color } from '../../../types';
import { CAPTURED, RED } from '../../../config';
import styled from 'styled-components';
import { useBoardContext } from '../../../context';
import { renderPieceById } from '../../../game/utils';

export const StyledTray = styled.div`
  border: 8px inset #aaa;
  background-color: #333;
  position: relative;
  height: 378px;
  overflow: hidden;
  margin: 6px;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

interface TrayProps {
  color: Color;
}
export const Tray = ({ color }: TrayProps) => {
  const { G, ctx } = useBoardContext();
  const strColor = color === RED ? `red` : `blue`;
  const getCapturedPieces = (color: Color) => {
    const pieces = G.pieces.filter(
      (piece) => piece.color === color && piece.currentPos === CAPTURED
    );
    return !pieces
      ? null
      : pieces.map((piece) => renderPieceById(G, ctx, piece.id));
  };

  return (
    <StyledTray className={`board__captured board__captured--${strColor}`}>
      {getCapturedPieces(color)}
    </StyledTray>
  );
};
