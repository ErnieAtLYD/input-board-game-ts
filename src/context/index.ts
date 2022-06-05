import { BoardProps } from 'boardgame.io/react';
import { useContext, createContext } from 'react';
import { InputBoardGameState, PossiblePositions } from '../types';

interface PreviewInterface {
  selected?: PossiblePositions | null;
  setSelected?: React.Dispatch<React.SetStateAction<PossiblePositions | null>>; // FIXME
}

export const BoardContext = createContext(
  {} as BoardProps<InputBoardGameState>
);

export const PreviewContext = createContext<PreviewInterface>({});

export const useBoardContext = () => useContext(BoardContext);

export const usePreviewContext = () => useContext(PreviewContext);
