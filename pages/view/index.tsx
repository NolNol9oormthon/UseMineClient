import { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';

import Header from '../../src/components/Header';
import Item, { ItemState } from '../../src/components/Item';
import LinkWrapper from '../../src/components/LinkWrapper';
import Check from '../../assets/icons/check.svg';
import All from '../../assets/icons/all.svg';
import Food from '../../assets/icons/food.svg';
import Apparel from '../../assets/icons/apparel.svg';
import Life from '../../assets/icons/life.svg';
import Ticket from '../../assets/icons/ticket.svg';
import Souvenir from '../../assets/icons/souvenir.svg';
import Etc from '../../assets/icons/etc.svg';

const mockCategories = [
  {
    category_id: 0,
    category_name: '모든 물품',
    component: () => <All />,
  },
  {
    category_id: 1,
    category_name: '식품',
    component: () => <Food />,
  },
  {
    category_id: 2,
    category_name: '의류',
    component: () => <Apparel />,
  },
  {
    category_id: 3,
    category_name: '생활용품',
    component: () => <Life />,
  },
  {
    category_id: 4,
    category_name: '티켓',
    component: () => <Ticket />,
  },
  {
    category_id: 5,
    category_name: '기념품',
    component: () => <Souvenir />,
  },
  {
    category_id: 6,
    category_name: '기타',
    component: () => <Etc />,
  },
];

const mockItems = [
  {
    id: 1,
    writer_id: 111,
    writer_nickname: '파란 감귤',
    item_name: '귤모자',
    category_id: 1,
    item_image: 'http://gdimg.gmarket.co.kr/2315388446/still/600?ver=1640008924',
    state_id: 'AVAILABLE',
    avaliable_start_time: '12시 00분',
    avaliable_end_time: '13시 00분',
  },
  {
    id: 2,
    writer_id: 222,
    writer_nickname: '노란 돌하르방',
    category_id: 1,
    item_name: '귤모자',
    item_image: 'http://gdimg.gmarket.co.kr/2315388446/still/600?ver=1640008924',
    state_id: 'RESERVED',
    avaliable_start_time: '12시 00분',
    avaliable_end_time: '13시 00분',
  },
  {
    id: 3,
    writer_id: 333,
    writer_nickname: '파란 감귤',
    category_id: 3,
    item_name: '귤모자',
    item_image: 'http://gdimg.gmarket.co.kr/2315388446/still/600?ver=1640008924',
    state_id: 'COMPLETE',
    avaliable_start_time: '12시 00분',
    avaliable_end_time: '13시 00분',
  },
  {
    id: 4,
    writer_id: 333,
    writer_nickname: '파란 감귤',
    category_id: 3,
    item_name: '귤모자',
    item_image: 'http://gdimg.gmarket.co.kr/2315388446/still/600?ver=1640008924',
    state_id: 'COMPLETE',
    avaliable_start_time: '12시 00분',
    avaliable_end_time: '13시 00분',
  },
  {
    id: 5,
    writer_id: 333,
    writer_nickname: '파란 감귤',
    category_id: 3,
    item_name: '귤모자',
    item_image: 'http://gdimg.gmarket.co.kr/2315388446/still/600?ver=1640008924',
    state_id: 'COMPLETE',
    avaliable_start_time: '12시 00분',
    avaliable_end_time: '13시 00분',
  },
  {
    id: 6,
    writer_id: 333,
    writer_nickname: '파란 감귤',
    category_id: 3,
    item_name: '귤모자',
    item_image: 'http://gdimg.gmarket.co.kr/2315388446/still/600?ver=1640008924',
    state_id: 'COMPLETE',
    avaliable_start_time: '12시 00분',
    avaliable_end_time: '13시 00분',
  },
  {
    id: 7,
    writer_id: 333,
    writer_nickname: '파란 감귤',
    category_id: 3,
    item_name: '귤모자',
    item_image: 'http://gdimg.gmarket.co.kr/2315388446/still/600?ver=1640008924',
    state_id: 'COMPLETE',
    avaliable_start_time: '12시 00분',
    avaliable_end_time: '13시 00분',
  },
  {
    id: 8,
    writer_id: 333,
    writer_nickname: '파란 감귤',
    category_id: 3,
    item_name: '귤모자',
    item_image: 'http://gdimg.gmarket.co.kr/2315388446/still/600?ver=1640008924',
    state_id: 'COMPLETE',
    avaliable_start_time: '12시 00분',
    avaliable_end_time: '13시 00분',
  },
  {
    id: 9,
    writer_id: 333,
    writer_nickname: '파란 감귤',
    category_id: 3,
    item_name: '귤모자',
    item_image: 'http://gdimg.gmarket.co.kr/2315388446/still/600?ver=1640008924',
    state_id: 'COMPLETE',
    avaliable_start_time: '12시 00분',
    avaliable_end_time: '13시 00분',
  },
  {
    id: 10,
    writer_id: 333,
    writer_nickname: '파란 감귤',
    category_id: 3,
    item_name: '귤모자',
    item_image: 'http://gdimg.gmarket.co.kr/2315388446/still/600?ver=1640008924',
    state_id: 'COMPLETE',
    avaliable_start_time: '12시 00분',
    avaliable_end_time: '13시 00분',
  },
];

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
`;

const CategoryContainer = styled.div<{ isVisible: boolean }>`
  margin: 0 -20px;
  position: absolute;
  overflow-x: scroll;
  padding: 0 20px;
  width: calc(100% + 40px);
  ::-webkit-scrollbar {
    display: none;
  }
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
`;

const CategoryList = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 0;
  width: fit-content;
  margin-top: 56px;
`;

const ChipWrapper = styled.div`
  position: relative;
`;

const StyledCheck = styled(Check)`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
`;

const CategoryChip = styled.button`
  position: relative;
  width: 56px;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.tam_Orange50};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  color: ${({ theme }) => theme.colors.tam_Orange500};
  word-break: break-all;
  white-space: pre-wrap;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  z-index: 1;
`;

const ItemList = styled.div`
  display: flex;
  margin-top: 56px;
  flex-direction: column;
  gap: 16px;
  padding: 80px 0 0 0;
  height: 100%;
  max-height: calc(100vh - 72px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export interface ItemProps {
  id: string;
  writer_id: string;
  writer_nickname: string;
  item_name: string;
  category_id: string;
  item_image: string;
  state_id: string;
  avaliable_start_time: string;
  avaliable_end_time: string;
}

const View: NextPage = () => {
  const [clickedCategoryChip, setClickedCategoryChip] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);

  const handelCategoryChipClick = (catogoryId: number) => {
    setClickedCategoryChip(catogoryId);
  };

  return (
    <Container>
      <Header headerTitle="나눔목록" />
      <CategoryContainer isVisible={isVisible}>
        <CategoryList>
          {mockCategories.map((category) => (
            <ChipWrapper key={category.category_id}>
              {clickedCategoryChip === category.category_id ? <StyledCheck /> : null}
              <CategoryChip
                onClick={() => {
                  handelCategoryChipClick(category.category_id);
                }}
              >
                {category.component()}
              </CategoryChip>
            </ChipWrapper>
          ))}
        </CategoryList>
      </CategoryContainer>
      <ItemList
        onWheel={(e) => {
          if (Math.abs(e.deltaY) > 30) {
            setIsVisible(e.deltaY < 0);
          }
        }}
      >
        {mockItems.map((item) => (
          <LinkWrapper
            href={`/view/${item.id}`}
            isDisabled={item.state_id === ItemState.COMPLETE}
            key={item.id}
          >
            <Item {...item} />
          </LinkWrapper>
        ))}
      </ItemList>
    </Container>
  );
};

export default View;
