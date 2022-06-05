import styled from 'styled-components';
import { RED } from '../../config';
import { ESWrapper } from '../Board/EnteringSpace';
import { StyledTray } from '../Board/Tray';

export const GamePieceContainer = styled.div<{ canMove?: boolean }>`
  z-index: 5;
  background-color: #ddd;
  position: relative;
  padding: 2px;
  width: 90px;
  margin: 0 2px;
  border-radius: 12px;
  border-style: outset;
  cursor: pointer;
  box-shadow: rgba(6, 24, 44, 0.4) 0 0 0 2px,
    rgba(6, 24, 44, 0.65) 0 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0 1px 0 inset;

  &::after {
    display: ${({ canMove }) => (canMove ? 'none' : 'block')};
    content: '';
    position: absolute;
    inset: 0;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background-color: #999;
    opacity: 0.8;
    border-radius: 12px;
  }

  ${StyledTray} & {
    position: relative;
    cursor: default;
  }
  ${StyledTray} > &::after {
    content: '';
    position: absolute;
    inset: 0;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background-color: #333;
    opacity: 0.8;
  }

  ${ESWrapper} & {
    position: absolute;
  }

  ${ESWrapper} &:nth-child(2) {
    top: -2px;
  }
  ${ESWrapper} &:nth-child(3) {
    top: -8px;
  }
`;

export const Inner = styled.div`
  background-color: black;
  margin: 0 auto;
  padding: 2px;
  width: 90%;
  border-radius: 12px;
`;

export const Face = styled.div`
  width: 85%;
  background-color: ${({ color }) => (color === RED ? 'red' : 'blue')};
  border: 0;
  height: auto;
  padding: 0;
  margin: 0 auto;
`;

export const TileSVG = styled.svg`
  border: 0;
  width: 100%;
  height: 100%;
  margin-bottom: -5px;
  fill: ${({ fill }) => (fill === RED ? 'red' : 'blue')};
`;

export const SVGPolyline = styled.polyline`
  fill: transparent;
  stroke: #fff;
  stroke-width: 4;
`;

export const SVGPath = styled.path`
  fill: none;
  stroke: black;
  stroke-width: 4px;
`;

export const SVGRect = styled.rect`
  fill: url(#grid);
  height: 100%;
  width: 100%;
`;
