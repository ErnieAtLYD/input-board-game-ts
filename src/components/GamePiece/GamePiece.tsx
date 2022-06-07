import { motion } from 'framer-motion/dist/framer-motion';
import { Color, PossiblePositions } from '../../types';
import { useBoardContext, usePreviewContext } from '../../context';
import {
  GamePieceContainer,
  Inner,
  Face,
  TileSVG,
  SVGPolyline,
  SVGPath,
  SVGRect,
} from './styles';
import { drawCircle, fillLines } from './helpers';

interface GamePieceProps {
  id: string;
  color: Color;
  canMove: boolean;
  moves: number[];
  nextMove: PossiblePositions;
  atLastPosition: boolean;
  currentPos: PossiblePositions;
}

const GamePiece = (props: GamePieceProps) => {
  const { ctx, moves } = useBoardContext();
  const { setSelected } = usePreviewContext();

  const canHighlight =
    props.color === ctx.currentPlayer && props.canMove && setSelected;

  const variants = {
    hover: { scale: canHighlight ? 1.05 : 1 },
    tap: {
      scale: canHighlight && !props.atLastPosition ? [1, 2, 1] : 1,
      transition: { ease: [0.075, 0.82, 0.165, 1], duration: 0.45 },
    },
  };

  return (
    <GamePieceContainer
      as={motion.div}
      layoutId={`piece_${props.id}`}
      variants={variants}
      canMove={props.canMove}
      currentPos={props.currentPos}
      onClick={() => {
        moves.movePiece(props.id);
        setSelected && setSelected(null);
      }}
      onMouseEnter={() => canHighlight && setSelected(props.nextMove)}
      onMouseLeave={() => canHighlight && setSelected(null)}
      whileHover={'hover'}
      whileTap={'tap'}
    >
      <Inner>
        <Face color={props.color}>
          <TileSVG fill={props.color} viewBox="0 0 242 322">
            <>
              <defs>
                <pattern
                  id="grid"
                  width="80"
                  height="80"
                  patternUnits="userSpaceOnUse"
                >
                  <SVGPath d="M 80 0 L 0 0 0 80" />
                </pattern>
              </defs>
              <SVGRect />
              <SVGPolyline points={fillLines(props.moves)} />
              {props.moves.map((pos: number) => drawCircle(pos, props.color))}
            </>
          </TileSVG>
          <button
            onClick={() => {
              moves.toRack(props.id);
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              visibility: props.atLastPosition ? 'visible' : 'hidden',
            }}
          >
            To Rack
          </button>
          <button
            onClick={() => {
              moves.toEnteringSpace(props.id);
            }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              visibility: props.atLastPosition ? 'visible' : 'hidden',
            }}
          >
            ESpace
          </button>
        </Face>
      </Inner>
    </GamePieceContainer>
  );
};

export default GamePiece;
