import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ChevronLeftBlack from '../../assets/icons/chevron-left-black.svg';
import ChevronLeftWhite from '../../assets/icons/chevron-left-white.svg';
import UserProfileOutline from '../../assets/icons/user-profile-outline.svg';

const Container = styled.div<{ windowWidth: number; isDetailPage: boolean }>`
  width: ${({ windowWidth }) => (windowWidth > 420 ? '420px' : `calc(100%)`)};
  left: ${({ windowWidth }) => (windowWidth > 420 ? `calc(50% - 210px)` : 0)};
  max-width: 420px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  background-color: ${({ isDetailPage, theme }) =>
    isDetailPage ? 'transparent' : theme.colors.white};
  position: fixed;
  top: 0;
  z-index: 10;
`;

const Title = styled.span`
  height: 20px;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray900};
  text-align: center;
`;

const DummyBox = styled.div`
  width: 32px;
  height: 32px;
`;

const Button = styled.button`
  padding: 0;
`;

const Header = ({ headerTitle = '' }: { headerTitle: string }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const router = useRouter();
  const isDetailPage = router.pathname === '/view/[id]';
  const isMypage = router.pathname === '/mypage';

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <Container windowWidth={windowWidth} isDetailPage={isDetailPage}>
      {isDetailPage ? (
        <Button onClick={() => router.back()}>
          <ChevronLeftWhite />
        </Button>
      ) : (
        <Button onClick={() => router.back()}>
          <ChevronLeftBlack />
        </Button>
      )}

      {isDetailPage ? null : <Title>{headerTitle}</Title>}

      {isDetailPage ? null : isMypage ? (
        <DummyBox />
      ) : (
        <Link href="/mypage">
          <UserProfileOutline />
        </Link>
      )}
    </Container>
  );
};

export default Header;
