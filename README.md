# Input Board Game

[Input is a two player game by Milton Bradley from 1984](https://www.youtube.com/watch?v=KcHC5n1qO-k). Each player gets the same set of pieces, and must deploy them to eliminate the opposing side. Each piece has a movement track printed on it, and can only move from one space to the next in the program. Used pieces can either exit the playfield, or repeat the path.

In this current version, the human player is RED, and the bot is BLUE. [A PDF with instructions on how to play](https://boardgamegeek.com/image/5818361/input) is available.

![Screenshot](https://user-images.githubusercontent.com/33945/170804524-0834a247-09cd-4e38-88f2-5ebe2b44b0e9.png)

## Technologies Used and Tinkered With

- React (create-react-app), TypeScript, boardgame.io
- styled-components including integrating props, global styles, and inheriting other component styles
- Framer Motion including animation layouts
- Dynamic SVG rendering

## To run locally

`yarn && yarn start` - node, you must use Node v14. Not sure why it doesn't run on v18.

## To Do / Someday

- [ ] Add a modal on page load explaining what the game is and instructions
- [ ] Give the AI faux "speech" depending on the players actions
- [ ] Allow the person to change avatar on click
- [ ] Make the avatars faces dynamic depending on players and AI actions
- [ ] Build P2P (including a lobby, working rooms, a server, etc.)
- [ ] Add sounds

## Asset Credits

- Background image photo credit: [Umberto via Unsplash](https://unsplash.com/photos/jXd2FSvcRr8)
- Avatar credits: [Bottts](https://avatars.dicebear.com/styles/bottts) and [Avataaars](https://avatars.dicebear.com/styles/avataaars) by Pablo Stanley, via DiceBear
