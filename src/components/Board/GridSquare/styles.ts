import styled from 'styled-components';
import { BOARD_BORDER_WIDTH, RED } from '../../../config';
import { Color } from '../../../types';

export const GridSquareStyle = styled.div<{
  dot?: Color | undefined;
}>`
  border: ${BOARD_BORDER_WIDTH}px inset #aaa;
  margin: 6px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.dot &&
    `
        display: flex;
        align-items: center;
        justify-content: center;
        &::before {
          content: '';
          border-radius: 50%;
          width: 25px;
          height: 25px;
          background-color: ${props.dot === RED ? 'red' : 'blue'};
        }
    
    `}
`;
