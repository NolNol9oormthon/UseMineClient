import { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';

import Header from '../src/components/Header';

enum TAB {
  NOTIFICATION = 'NOTIFICATION',
  MYARTICLE = 'MYARTICLE',
}

const TabSection = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 56px;
  display: flex;
`;

const TabMenu = styled.div`
  width: calc(100% + 40px);
  margin: 0 -20px;
  max-width: 420px;
  height: 54px;
  display: flex;
`;

const Tab = styled.button<{ isHighlight: boolean }>`
  width: 50%;
  border-bottom: ${({ isHighlight, theme }) =>
    isHighlight ? `2px solid ${theme.colors.tam_Orange500}` : `2px solid transparent`};
`;

const Contents = styled.div``;

const Mypage: NextPage = () => {
  const [tab, setTab] = useState<TAB>(TAB.NOTIFICATION);

  const handleTabChange = () => {
    if (tab === TAB.NOTIFICATION) setTab(TAB.MYARTICLE);
    if (tab === TAB.MYARTICLE) setTab(TAB.NOTIFICATION);
  };

  return (
    <>
      <Header headerTitle="내 정보" />
      <TabSection>
        <TabMenu>
          <Tab
            onClick={() => {
              handleTabChange();
            }}
            isHighlight={tab === TAB.NOTIFICATION}
          >
            알림
          </Tab>
          <Tab
            onClick={() => {
              handleTabChange();
            }}
            isHighlight={tab === TAB.MYARTICLE}
          >
            내 게시글
          </Tab>
        </TabMenu>
        <Contents></Contents>
      </TabSection>
    </>
  );
};

export default Mypage;
