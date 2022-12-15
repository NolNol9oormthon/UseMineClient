import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import ChevronLeftBlack from '../../assets/icons/chevron-left-black.svg';
import ChevronLeftWhite from '../../assets/icons/chevron-left-white.svg';
import UserProfileOutline from '../../assets/icons/user-profile-outline.svg';

const Container = styled.div<{ isDetailPage: boolean }>`
  width: calc(100% + 40px);
  margin: 0 -20px;
  max-width: 420px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  background-color: ${({ isDetailPage }) => (isDetailPage ? 'transparent' : null)};
  position: absolute;
  top: 0;
  left: 0;
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

const Header = ({ headerTitle = '' }: { headerTitle: string }) => {
  const router = useRouter();
  const isDetailPage = router.pathname === '/view/[id]';

  return (
    <Container isDetailPage={isDetailPage}>
      {isDetailPage ? (
        <button onClick={() => router.back()}>
          <ChevronLeftWhite />
        </button>
      ) : (
        <button onClick={() => router.back()}>
          <ChevronLeftBlack />
        </button>
      )}

      {isDetailPage ? null : <Title>{headerTitle}</Title>}

      {isDetailPage ? null : (
        <Link href="/mypage">
          <UserProfileOutline />
        </Link>
      )}
    </Container>
  );
};

export default Header;
