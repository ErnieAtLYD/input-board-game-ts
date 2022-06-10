import styled from 'styled-components';
import { Color } from '../../../types';
import {
  BOARD_BORDER_WIDTH,
  CAPTURED,
  TRAY_BGCOLOR,
  TRAY_INSET_COLOR,
} from '../../../config';
import { useBoardContext } from '../../../context';
import { colorToString, renderPieceById } from '../../../game/utils';

export const StyledTray = styled.div`
  border: ${BOARD_BORDER_WIDTH}px inset ${TRAY_INSET_COLOR};
  background-color: ${TRAY_BGCOLOR};
  position: relative;
  overflow: hidden;
  height: 320px; // must have specific height to allow overflow: hidden
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
  const getCapturedPieces = (color: Color) => {
    const pieces = G.pieces.filter(
      (piece) => piece.color === color && piece.currentPos === CAPTURED
    );
    return !pieces
      ? null
      : pieces.map((piece) => renderPieceById(G, ctx, piece.id));
  };

  return (
    <StyledTray
      className={`board__captured board__captured--${colorToString(color)}`}
    >
      {getCapturedPieces(color)}
    </StyledTray>
  );
};
