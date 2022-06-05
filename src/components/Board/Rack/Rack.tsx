import { RED, RACK } from '../../../config';
import { useBoardContext } from '../../../context';
import { Color } from '../../../types';
import GamePiece from '../../GamePiece';
import styled from 'styled-components';

const RackContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 8px inset #ccc;
  margin: 5px;
  padding: 4px 0;
  background-color: #999;
`;

interface RackProps {
  color: Color;
}
const Rack = ({ color }: RackProps) => {
  // const { G, ctx, moves } = useBoardContext();
  const { G, ctx } = useBoardContext();
  const strColor = color === RED ? `red` : `blue`;
  return (
    <RackContainer className={`board__rack board__rack--${strColor}`}>
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
