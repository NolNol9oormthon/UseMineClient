import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import Header from '../src/components/Header';
import ShareCard from '../src/components/ShareCard';
import Checkbox from '../assets/icons/checkbox.svg';
import { getMyData } from '../src/apis';
import { ItemProps } from './view';
import { ItemState } from '../src/components/Item';
import { myDataState } from '../src/atom';

enum TAB {
  COMPLETED = 'COMPLETED',
  NOTCOMPLETED = 'NOTCOMPLETED',
}

const TabSection = styled.div<{ windowWidth: number }>`
  margin-top: 56px;
  display: flex;
  position: fixed;
  width: ${({ windowWidth }) => (windowWidth > 420 ? '380px' : `calc(100% - 20px)`)};
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 30;
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

// const ContentsWrapper = styled.div`
//   display: flex;
//   margin-top: 56px;
//   flex-direction: column;
//   gap: 16px;
//   padding: 108px 0 0 0;
//   height: 100%;
//   max-height: calc(100vh - 56px);
//   overflow-y: scroll;
// `;

const Contents = styled.div`
  display: flex;
  margin-top: 56px;
  flex-direction: column;
  gap: 16px;
  padding: 72px 0 8px 0;
  height: 100%;
  max-height: calc(100vh - 56px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

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

const StyledCheckBox = styled(Checkbox)<{ $isChecked: boolean }>`
  opacity: ${({ $isChecked }) => ($isChecked ? 1 : 0.5)};
`;

export interface MyDataProps {
  completedItems: Pick<ItemProps, 'imageUrl' | 'itemId' | 'itemName' | 'state'>[];
  notCompletedItems: Pick<ItemProps, 'imageUrl' | 'itemId' | 'itemName' | 'state'>[];
}

const Mypage: NextPage = () => {
  const [tab, setTab] = useState<TAB>(TAB.NOTCOMPLETED);
  const [isChecked, setIsChecked] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [myData, setMyData] = useRecoilState<MyDataProps>(myDataState);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const handleTabChange = () => {
    if (tab === TAB.COMPLETED) setTab(TAB.NOTCOMPLETED);
    if (tab === TAB.NOTCOMPLETED) setTab(TAB.COMPLETED);
  };

  const { data } = useQuery(['myData'], () => getMyData(Number(localStorage.getItem('userId'))));

  // useEffect(() => {
  //   const get = () => {
  //     getMyData(Number(localStorage.getItem('userId'))).then((res) => setData(res));
  //   };
  //   get();
  // }, []);

  return (
    <>
      <Header headerTitle="내 정보" />
      <TabSection windowWidth={windowWidth}>
        <TabMenu>
          <Tab
            onClick={() => {
              handleTabChange();
            }}
            isHighlight={tab === TAB.NOTCOMPLETED}
          >
            진행
          </Tab>
          <Tab
            onClick={() => {
              handleTabChange();
            }}
            isHighlight={tab === TAB.COMPLETED}
          >
            완료
          </Tab>
        </TabMenu>
      </TabSection>
      <Contents>
        {tab === TAB.NOTCOMPLETED ? (
          <CheckboxWrapper>
            <CheckboxTitle>미완료 보기</CheckboxTitle>
            <HiddenCheckbox
              type="checkbox"
              id="incompleteCheckbox"
              checked={isChecked}
              onChange={() => {
                setIsChecked((prev) => !prev);
              }}
            />
            <label htmlFor="incompleteCheckbox">
              <StyledCheckBox $isChecked={isChecked} htmlFor="incompleteCheckbox" />
            </label>
          </CheckboxWrapper>
        ) : null}

        {tab === TAB.COMPLETED
          ? data &&
            data.completedItems.map(
              (item: Pick<ItemProps, 'imageUrl' | 'itemName' | 'state' | 'itemId'>) => (
                <ShareCard key={item.itemId} {...item} />
              ),
            )
          : isChecked
          ? data &&
            data.notCompletedItems
              .filter(
                (item: Pick<ItemProps, 'imageUrl' | 'itemName' | 'state' | 'itemId'>) =>
                  item.state === ItemState.AVAILABLE,
              )
              .map((item: Pick<ItemProps, 'imageUrl' | 'itemName' | 'state' | 'itemId'>) => (
                <ShareCard key={item.itemId} {...item} />
              ))
          : data &&
            data.notCompletedItems.map(
              (item: Pick<ItemProps, 'imageUrl' | 'itemName' | 'state' | 'itemId'>) => (
                <ShareCard key={item.itemId} {...item} />
              ),
            )}
      </Contents>
    </>
  );
};

export default Mypage;
