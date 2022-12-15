import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

import ChevronLeftBlack from '../../assets/icons/chevron-left-black.svg';
import UserProfileOutline from '../../assets/icons/user-profile-outline.svg';

const Container = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  align-items: center;
`;

const Title = styled.span`
  height: 20px;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray900};
  text-align: center;
`;

const Header = ({ headerTitle }: { headerTitle: string }) => {
  return (
    <Container>
      <ChevronLeftBlack />
      <Title>{headerTitle}</Title>
      <UserProfileOutline />
    </Container>
  );
};

export default Header;
