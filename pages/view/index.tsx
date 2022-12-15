import { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';

import Header from '../../src/components/Header';
import Item, { ItemState } from '../../src/components/Item';
import LinkWrapper from '../../src/components/LinkWrapper';

const mockCategories = [
  { category_id: 0, category_name: '모든\n물품' },
  { category_id: 1, category_name: '우도' },
  { category_id: 2, category_name: '좌도' },
  { category_id: 3, category_name: '절권도' },
  { category_id: 4, category_name: '태권도' },
  { category_id: 5, category_name: '너도나도' },
  { category_id: 6, category_name: '도도새' },
  { category_id: 7, category_name: '김치' },
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
`;

const CategoryChip = styled.button<{ isClicked: boolean }>`
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
  border: ${({ isClicked, theme }) =>
    isClicked ? `1.5px solid ${theme.colors.tam_Orange500}` : null};
`;

const ItemList = styled.div`
  display: flex;
  margin-top: 56px;
  flex-direction: column;
  gap: 16px;
  padding: 80px 0;
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
  const [clickedCategoryChip, setClickedCategoryChip] = useState<number>();

  const handelCategoryChipClick = (catogoryId: number) => {
    setClickedCategoryChip(catogoryId);
  };

  const [isVisible, setIsVisible] = useState(true);

  return (
    <Container>
      <Header headerTitle="나눔목록" />
      <CategoryContainer isVisible={isVisible}>
        <CategoryList>
          {mockCategories.map((category, index) => (
            <CategoryChip
              key={index}
              onClick={() => {
                handelCategoryChipClick(category.category_id);
              }}
              isClicked={clickedCategoryChip === category.category_id}
            >
              {category.category_name}
            </CategoryChip>
          ))}
        </CategoryList>
      </CategoryContainer>
      <ItemList
        onWheel={(e) => {
          setIsVisible(e.deltaY < 0);
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
