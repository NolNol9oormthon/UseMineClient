import Script from 'next/script';
import styled, { ThemeProvider } from 'styled-components';
import '../src/font/font.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';

import GlobalStyle from '../src/styles/globalStyle';
import { theme } from '../src/styles/theme';


const BodyInner = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: center;
  // align-items: center;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.gray100};
`;

const WebAppContainer = styled.div`
  width: 100%;
  max-width: 420px;
  height: 100%;
  min-height: 100vh;
  padding: 0px 20px;
  background-color: ${(props) => props.theme.colors.white};
  // position: absolute;
`;

declare global {
  interface Window {
    Kakao: any;
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  function kakaoInit() {
    // 페이지가 로드되면 실행
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_API_KEY);
    console.log(window.Kakao.isInitialized());
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BodyInner>
          <WebAppContainer>
            <Component {...pageProps} />
            <Script src="https://developers.kakao.com/sdk/js/kakao.js" onLoad={kakaoInit}></Script>
          </WebAppContainer>
        </BodyInner>
      </ThemeProvider>
    </>
  );
};

export default App;
