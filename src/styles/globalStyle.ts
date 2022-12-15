import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  html,
  body {
    width: 100%;
    height: 100%;
    font-family: NanumSquare Neo variable;
  }
  
  #root {
    margin: 0 auto;
  }
  
  html {
    font-size: 62.5%;
  }
  
  * {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
  
  body, button {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
    Helvetica Neue, sans-serif, NanumSquare Neo variable;
  }
  
  button {
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
    -webkit-tap-highlight-color : transparent;
    font-family: NanumSquare Neo variable;
  }
  
  a, a:visited {
    text-decoration: none;
    color: black;
    font-family: NanumSquare Neo variable;
  }

  div {
    font-family: NanumSquare Neo variable;
  }
`;

export default GlobalStyle;
