# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript React implementation of "Input", a two-player board game from Milton Bradley (1984). The human player is RED, the AI bot is BLUE. The game uses boardgame.io for game state management and includes an AI opponent.

## Development Commands

- `npm start` - Start development server (requires Node.js v18+)
- `npm run build` - Build for production
- `npm test` - Run tests (uses Jest via react-scripts)

Note: The project uses npm (package-lock.json present), not yarn despite README mentioning yarn.

## Architecture

### Core Game Logic
- `src/game/index.ts` - Main game definition using boardgame.io Game interface
- `src/game/moves.ts` - Game move functions (movePiece, toEnteringSpace, toRack)
- `src/game/ai.ts` - AI implementation using Monte Carlo Tree Search
- `src/config/index.ts` - Game constants, piece definitions, and AI configuration

### State Management
- Game state managed through boardgame.io framework
- `src/types/index.ts` - Core type definitions for game state, pieces, and positions
- Pieces have predefined movement tracks and can be in positions: board cells (0-11), RACK (200), ENTERING_SPACE (100), or CAPTURED (-1)

### React Components
- `src/App.tsx` - Main app with boardgame.io Client setup
- `src/components/Board/` - Main game board and grid components
- `src/components/GamePiece/` - Individual game piece rendering
- `src/components/AIBot/` - AI bot component that executes moves

### Key Game Mechanics
- Each player has 6 pieces (r0-r5 for red, b0-b5 for blue)
- Pieces follow predefined movement tracks defined in PIECES config
- Game ends when all pieces of one color are captured
- AI uses configurable iteration depth (currently set to 1 for development)

### Testing
- Unit tests exist for game logic: `src/game/entering-space.test.ts` and `src/game/moves.test.ts`
- Uses Jest testing framework via react-scripts

### Styling
- Uses styled-components for component styling
- Framer Motion for animations
- Global styles defined in `src/globalStyles.ts`