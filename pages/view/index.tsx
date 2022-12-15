import { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import Header from '../../src/components/Header';
import Item from '../../src/components/Item';

const mockCategories = [
  { category_id: 0, category_name: '모든\n물품' },
  { category_id: 1, category_name: '우도' },
  { category_id: 2, category_name: '좌도' },
  { category_id: 3, category_name: '절권도' },
  { category_id: 4, category_name: '태권도' },
  { category_id: 5, category_name: '너도나도' },
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
];

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CategoryList = styled.div`
  display: flex;
  gap: 8px;
  margin: 8px 0;
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
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;
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

  return (
    <>
      <Header headerTitle="나눔목록" />
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
      <ItemList>
        {mockItems.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ItemList>
    </>
  );
};

export default View;
