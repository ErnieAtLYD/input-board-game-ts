import styled from 'styled-components';
import { HIGHLIGHT_COLOR, RED } from '../../../config';
import { Color } from '../../../types';

export const GridSquareStyle = styled.div<{
  highlighted: boolean;
  dot?: Color | undefined;
}>`
  background-color: ${(props) =>
    props.highlighted ? HIGHLIGHT_COLOR : '#999'};
  border: 8px inset #aaa;
  margin: 6px;
  padding: 3px 0 0 3px;
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
