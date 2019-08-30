import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    /*different background colors are mostly for debugging css*/
    background-color: black;
    color: white;
    position: fixed;
    overflow: hidden;

    /*create react app stuff*/
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button:hover {
    outline:none;
  }

  button:focus {
    outline:none;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-size: 16px;
  }

  #primary-container {
    display: grid;
    grid-column-gap: 0;
    width: 100vw;
    height: 100vh;

    @media (min-width: ${props => props.theme.bp[2]}) {
      grid-template-areas:
        "left mainHead right"
        "left mainBody right"
        "left mainFoot right";
      grid-template-columns: 1fr auto 1fr;
      grid-template-rows: auto 1fr;
    }

    @media (max-width: ${props => props.theme.bp[2]}) {
      grid-template-areas:
        "mainHead"
        "mainBody"
        "mainFoot";
      grid-template-columns: auto;
      grid-template-rows: auto 1fr;
    }
  }
`;

export default GlobalStyle;
