# Claude Integration

This document provides guidance for using Claude Code effectively with the Input Board Game TypeScript project. Claude Code is Anthropic's CLI tool that provides AI-powered assistance for software development tasks.

## Project Context

This TypeScript React project implements the "Input" board game from Milton Bradley (1984) using:
- **boardgame.io** for game state management
- **React** with styled-components for UI
- **Monte Carlo Tree Search AI** for the computer opponent
- **Jest** for testing

The project follows specific architectural patterns and conventions documented in `CLAUDE.md`. Claude Code reads this file to understand project structure, development commands, and coding standards.

## How to use the Claude integration effectively

### Getting Started
1. Ensure you have Claude Code installed and authenticated
2. Navigate to the project root directory
3. Claude Code automatically reads `CLAUDE.md` for project context
4. Use natural language to describe development tasks

### Best Practices
- **Be specific about your goals**: Instead of "fix the game", say "fix the bug where pieces can move to invalid positions"
- **Reference existing files**: Mention specific components, functions, or files when possible
- **Ask for explanations**: Use Claude to understand complex game logic or boardgame.io patterns
- **Request testing**: Always ask Claude to run tests after making changes
- **Follow project conventions**: Claude will maintain existing code style and architecture

### Example Workflows
```bash
# Understanding the codebase
"Explain how the AI opponent works in src/game/ai.ts"
"Show me the game state structure and piece movement logic"

# Feature development
"Add a feature to highlight valid moves when a piece is selected"
"Implement a game timer that limits turn duration"

# Bug fixes
"Fix the issue where captured pieces still appear on the board"
"Debug why the AI is making invalid moves"

# Testing and validation
"Run the test suite and fix any failing tests"
"Add unit tests for the new piece selection feature"
```

## Available commands and limitations

### Development Commands
Claude Code can execute these project-specific commands:
- `npm start` - Start development server (requires Node.js v18+)
- `npm run build` - Build for production  
- `npm test` - Run Jest test suite
- Git operations (status, diff, commit, etc.)

### What Claude Code Can Do
- **Code Analysis**: Read and understand existing TypeScript/React code
- **Feature Implementation**: Add new game features following project patterns
- **Bug Fixes**: Identify and resolve issues in game logic or UI
- **Testing**: Run tests and create new test cases
- **Refactoring**: Improve code structure while maintaining functionality
- **Documentation**: Update comments and documentation files

### Limitations
- **Testing Environment**: May need guidance on specific test scenarios
- **Game Rules**: Requires clear explanation of Input board game rules for complex features
- **Boardgame.io Specific**: May need context on advanced boardgame.io patterns

### Project-Specific Guidelines
- Use existing PIECES configuration from `src/config/index.ts` for piece movement
- Follow the established component structure in `src/components/`
- Maintain TypeScript strict typing throughout
- Use styled-components for styling, not CSS modules
- Leverage boardgame.io's state management patterns

## Troubleshooting common issues

### Common Problems and Solutions

#### "Cannot find module" errors
- Ensure all imports use correct relative paths
- Check that referenced files exist in the expected locations
- Verify TypeScript types are properly exported

#### Game state inconsistencies
- Always use boardgame.io move functions to modify state
- Check that piece positions follow the established enum values (board cells 0-11, RACK=200, ENTERING_SPACE=100, CAPTURED=-1)
- Verify moves respect piece movement tracks defined in PIECES config

#### AI not working correctly
- Check AI iteration depth in `src/config/index.ts` (set to 1 for development)
- Ensure valid moves are properly calculated
- Verify game end conditions are correctly implemented

#### Test failures
- Run `npm test` to see specific failure details
- Check that test setup matches current game state structure
- Ensure mocked dependencies align with actual implementations

#### Development server issues
- Verify Node.js version is 18+ 
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

#### TypeScript compilation errors
- Check that all type definitions in `src/types/index.ts` are up to date
- Ensure proper typing for boardgame.io Game interface
- Verify component props match their TypeScript interfaces

### Getting Help
- Refer to `CLAUDE.md` for project-specific guidance
- Check existing test files for examples of proper testing patterns
- Review boardgame.io documentation for framework-specific issues
- Use Claude Code to analyze error messages and suggest solutions

### Performance Considerations
- AI computation can be intensive; adjust iteration depth for testing
- Consider memoization for expensive calculations in React components
- Use React DevTools to identify unnecessary re-renders
