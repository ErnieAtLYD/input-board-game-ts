import styled from 'styled-components';
import {
  RACK,
  BOARD_BORDER_WIDTH,
  BOARD_GRID_BGCOLOR,
  RACK_INSET_COLOR,
} from '../../../config';
import { useBoardContext } from '../../../context';
import { Color } from '../../../types';
import { colorToString } from '../../../game/utils';
import GamePiece from '../../GamePiece';

const RackContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${BOARD_BORDER_WIDTH}px inset ${RACK_INSET_COLOR};
  margin: ${BOARD_BORDER_WIDTH}px;
  padding: 6px;
  background-color: ${BOARD_GRID_BGCOLOR};
`;

interface RackProps {
  color: Color;
}
const Rack = ({ color }: RackProps) => {
  const { G, ctx } = useBoardContext();
  return (
    <RackContainer
      className={`board__rack board__rack--${colorToString(color)}`}
    >
      {G.pieces
        .filter((piece) => piece.color === color && piece.currentPos === RACK)
        .map((piece) => (
          <GamePiece
            key={piece.id}
            {...piece}
            atLastPosition={
              G.cells[piece.moves[piece.moves.length - 2]] === piece.id &&
              ctx.currentPlayer === piece.color
            }
          />
        ))}
    </RackContainer>
  );
};

export default Rack;
