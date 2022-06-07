import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

body {
  background: #000;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
}

body::before {
  background-color: #000;
  position: fixed;
  content: '';
  background-size: cover;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url('https://images.unsplash.com/photo-1562408590-e32931084e23?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280');
  background-attachment: fixed;
  z-index: -1; /* I may like z-index: 0; more? */
  opacity: 0.3;
}
`;

export default GlobalStyle;
