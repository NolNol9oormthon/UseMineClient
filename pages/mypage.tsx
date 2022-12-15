import { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';

import Header from '../src/components/Header';
import ShareCard from '../src/components/ShareCard';
import Checkbox from '../assets/icons/checkbox.svg';

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
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  width: 50%;
  border-bottom: ${({ isHighlight, theme }) =>
    isHighlight ? `2px solid ${theme.colors.tam_Orange500}` : `2px solid transparent`};
`;

const Contents = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Mypage: NextPage = () => {
  const [tab, setTab] = useState<TAB>(TAB.NOTIFICATION);
  const [isChecked, setIsChecked] = useState(false);

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
            진행
          </Tab>
          <Tab
            onClick={() => {
              handleTabChange();
            }}
            isHighlight={tab === TAB.MYARTICLE}
          >
            완료
          </Tab>
        </TabMenu>
      </TabSection>
      <Contents>
        {/* <IncompleteToggle ty></IncompleteToggle> */}
        {/* <label htmlFor="incompleteToggle">미완료 보기</label>
        <input id="incompleteToggle" type="checkbox" /> */}
        <CheckboxWrapper>
          <CheckboxTitle>미완료 보기</CheckboxTitle>
          <HiddenCheckbox
            type="checkbox"
            id="incompleteCheckbox"
            checked={isChecked}
            onChange={() => {
              setIsChecked((prev) => !prev);
              console.log(isChecked);
            }}
          />
          <label htmlFor="incompleteCheckbox">
            <StyledCheckBox isChecked={isChecked} htmlFor="incompleteCheckbox" />
          </label>
        </CheckboxWrapper>
        <ShareCard />
      </Contents>
    </>
  );
};

export default Mypage;

const CheckboxWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
`;

const CheckboxTitle = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.gray900};
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

const StyledCheckBox = styled(Checkbox)<{ isChecked: boolean }>`
  opacity: ${({ isChecked }) => (isChecked ? 1 : 0.5)};
`;
