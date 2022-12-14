import GlobalStyle from '../src/styles/globalStyle';
import type { AppProps } from 'next/app';
import styled from 'styled-components';

const BodyInner = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: center;
  // align-items: center;
  min-height: 100vh;
  background-color: #000000;
`;

const WebAppContainer = styled.div`
  width: 100%;
  max-width: 375px;
  height: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  // position: absolute;
`;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <BodyInner>
        <WebAppContainer>
          <Component {...pageProps} />
        </WebAppContainer>
      </BodyInner>
    </>
  );
};

export default App;
