import styled from 'styled-components';
import { Color } from '../../../types';

export const Pane = styled.div`
  /* align-items: center; */
  /* display: flex; */
  color: #fff;
  /* flex: 1; */
`;

export const Panel = styled.div<{ player: Color }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  line-height: 24px;
  margin: 24px;
  margin-top: 100px;
  padding: 80px 24px 8px;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(168, 163, 209, 0.3);
`;

export const Avatar = styled.img`
  width: 100px;
  margin-top: -160px;
  filter: drop-shadow(0px 4px 4px rgb(0 0 0 / 0.4));
`;
