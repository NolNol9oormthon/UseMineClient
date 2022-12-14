import GlobalStyle from '../src/styles/globalStyle';
import type { AppProps } from 'next/app';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';
import "../src/font/font.css";

const BodyInner = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: center;
  // align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.gray100};
`;

const WebAppContainer = styled.div`
  width: 100%;
  max-width: 420px;
  height: 100%;
  min-height: 100vh;
  padding: 0px 20px;
  background-color: ${props => props.theme.colors.white};
  // position: absolute;
`;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BodyInner>
          <WebAppContainer>
            <Component {...pageProps} />
          </WebAppContainer>
        </BodyInner>
      </ThemeProvider>
    </>
  );
};

export default App;
