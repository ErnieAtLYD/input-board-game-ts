import { Color } from '../../types';
import { RED, BLUE } from '../../config';

export const drawCircle = (pos: number, color: Color) => {
  const x = (pos % 3) * 80 + 40;
  const y = Math.floor(pos / 3) * 80 + 40;
  const isFilled =
    (color === RED && pos < 9) || (color === BLUE && pos > 2)
      ? 'white'
      : undefined;
  return (
    <circle
      key={pos}
      cx={x}
      cy={y}
      r={25}
      strokeWidth={8}
      fill={isFilled}
      stroke="white"
    />
  );
};

export const fillLines = (moves: number[]) => {
  return moves
    .filter((n) => n >= 0 && n < 12)
    .map((pos) => (pos % 3) * 80 + 40 + ',' + (Math.floor(pos / 3) * 80 + 40))
    .join(' ');
};
