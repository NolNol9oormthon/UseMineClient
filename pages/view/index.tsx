import { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';

import Header from '../../src/components/Header';
import Item, { ItemState } from '../../src/components/Item';
import LinkWrapper from '../../src/components/LinkWrapper';
import Check from '../../assets/icons/check_orange.svg';
import All from '../../assets/icons/all_orange.svg';
import Food from '../../assets/icons/food_orange.svg';
import Clothes from '../../assets/icons/clothes_orange.svg';
import Necessities from '../../assets/icons/necessities_orange.svg';
import Ticket from '../../assets/icons/ticket_orange.svg';
import Souvenir from '../../assets/icons/souvenir_orange.svg';
import Etc from '../../assets/icons/etc_orange.svg';
import { getAllData } from '../../src/apis';
import useObserver from '../../src/hooks/useObserver';
import Seo from '../../src/components/Seo';

const mockCategories = [
  {
    category_id: 'all',
    category_name: '모든 물품',
    component: () => <All />,
  },
  {
    category_id: 'food',
    category_name: '식품',
    component: () => <Food />,
  },
  {
    category_id: 'clothes',
    category_name: '의류',
    component: () => <Clothes />,
  },
  {
    category_id: 'necessities',
    category_name: '생활용품',
    component: () => <Necessities />,
  },
  {
    category_id: 'coupon',
    category_name: '할인권',
    component: () => <Ticket />,
  },
  {
    category_id: 'souvenir',
    category_name: '기념품',
    component: () => <Souvenir />,
  },
  {
    category_id: 'etc',
    category_name: '기타',
    component: () => <Etc />,
  },
];

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CategoryContainer = styled.div`
  margin: 0 -20px;
  position: absolute;
  overflow-x: scroll;
  padding: 0 20px;
  width: calc(100% + 40px);
  ::-webkit-scrollbar {
    display: none;
  }
  background-color: ${({ theme }) => theme.colors.white};
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
  display: flex;
  flex-direction: column;
  align-items: center;
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

const CategoryName = styled.span`
  margin-top: 8px;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.gray500};
`;

const ItemList = styled.div`
  display: flex;
  margin-top: 56px;
  flex-direction: column;
  gap: 16px;
  padding: 108px 0 0 0;
  height: 100%;
  max-height: calc(calc(var(--vh, 1vh) * 100) ; - 56px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export interface ItemProps {
  itemId: number;
  ownerId: string;
  ownerNickname: string;
  itemName: string;
  category: string;
  imageUrl: string;
  state: string;
  availableStartTime: string;
  availableEndTime: string;
}

const View: NextPage = () => {
  const [clickedCategoryChip, setClickedCategoryChip] = useState<string>('all');

  const { data, fetchNextPage, status } = useInfiniteQuery(
    ['infiniteDatas', clickedCategoryChip],
    ({ pageParam = 0 }) => getAllData(clickedCategoryChip, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage[lastPage.length - 1]?.itemId;
      },
    },
  );

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  const handelCategoryChipClick = (catogoryId: string) => {
    setClickedCategoryChip(catogoryId);
  };

  return (
    <>
      <Seo title="List" />
      <Container>
        <Header headerTitle="나눔목록" />
        <CategoryContainer>
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
                <CategoryName>{category.category_name}</CategoryName>
              </ChipWrapper>
            ))}
          </CategoryList>
        </CategoryContainer>
        <ItemList>
          <>
            {status === 'success' &&
              data?.pages.map((page) => {
                return page.map((item: ItemProps) => (
                  <LinkWrapper
                    href={`/view/detail?itemId=${item.itemId}`}
                    isDisabled={item.state === ItemState.COMPLETE}
                    key={item.itemId}
                  >
                    <Item {...item} />
                  </LinkWrapper>
                ));
              })}
          </>
          <div ref={setTarget}></div>
        </ItemList>
      </Container>
    </>
  );
};

export default View;
