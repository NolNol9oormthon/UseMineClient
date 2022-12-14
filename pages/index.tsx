import React, { useState, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import JejuLogo from '../assets/icons/jeju-logo.svg';
import Seo from '../src/components/Seo';

const Container = styled.div`
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  height: 100%;
  font-family: NanumSquare Neo variable;
  font-size: 30px;
  font-weight: 700;
  position: relative;
`;

const ContentBox = styled.div`
  padding-top: 130px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LogoBox = styled.img`
  width: 240px;
  height: 240px;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 8px;
  padding: 8px 28px;
  background-color: ${(props) => props.theme.colors.kakao_yellow};
  font-weight: 700;
  position: absolute;
  bottom: 40px;
  font-family: NanumSquare Neo variable;
  font-size: 18px;
  font-weight: 700;
  color: #181600;
`;

const Home: NextPage = () => {
  let currentUrl = '';
  const ref = useRef(null);

  try {
    if (!window) {
      currentUrl = 'http://localhost:3000';
    } else {
      currentUrl = window.location.origin;
      // currentUrl = "https://usemine-6a464.web.app"
    }
  } catch {
    currentUrl = 'http://localhost:3000';
  }

  const REDIRCT_URI = `${currentUrl}/welcome`;
  // const REDIRCT_URI = "https://usemine-6a464.web.app/welcome"
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${REDIRCT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      <Seo title="Home" />
      <Container>
        <ContentBox>
          <JejuLogo />
        </ContentBox>
        <LoginButton onClick={handleLogin}>카카오로 시작하기</LoginButton>
      </Container>
    </>
  );
};

export default Home;
