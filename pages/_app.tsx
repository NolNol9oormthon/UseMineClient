import Script from 'next/script';
import styled, { ThemeProvider } from 'styled-components';
import '../src/font/font.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import GlobalStyle from '../src/styles/globalStyle';
import { theme } from '../src/styles/theme';

const BodyInner = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: center;
  // align-items: center;
  min-height: calc(var(--vh, 1vh) * 100);
  background-color: ${(props) => props.theme.colors.gray100};
  background-image: url('https://firebasestorage.googleapis.com/v0/b/usemine-6a464.appspot.com/o/Asset%201%404x%201.png?alt=media&token=68325147-1a92-4b62-8cdd-32a1df96db63');
  // background-image: url("https://firebasestorage.googleapis.com/v0/b/usemine-6a464.appspot.com/o/bright-wall.png?alt=media&token=e303e287-dfde-4d60-a422-809bf322c5dc");
  background-position: center;
  background-size: fit;
  background-repeat: no-repeat;
`;

const WebAppContainer = styled.div`
  width: 100%;
  max-width: 420px;
  height: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
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
  useEffect(() => {
    function setScreenSize() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    window.addEventListener('resize', () => setScreenSize());
  }, []);

  function kakaoInit() {
    // 페이지가 로드되면 실행
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_API_KEY);
    console.log(window.Kakao.isInitialized());
  }

  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BodyInner>
          <WebAppContainer>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
            <Script src="https://developers.kakao.com/sdk/js/kakao.js" onLoad={kakaoInit}></Script>
          </WebAppContainer>
        </BodyInner>
      </ThemeProvider>
    </>
  );
};

export default App;
