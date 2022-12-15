import React from 'react';
import styled from 'styled-components';

import UserProfileFill from '../../assets/icons/user-profile-fill.svg';
import { ItemProps } from '../../pages/view';

export enum ItemState {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  COMPLETE = 'COMPLETE',
}

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const ItemImage = styled.img`
  display: flex;
  min-width: 116px;
  width: 116px;
  height: 116px;
  border-radius: 4px;
`;

const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 6px 12px;
  justify-content: space-between;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StateChip = styled.span<{ state: string }>`
  display: flex;
  height: 14px;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  color: ${({ state, theme }) =>
    state === ItemState.AVAILABLE
      ? theme.colors.tam_Orange500
      : state === ItemState.RESERVED
      ? theme.colors.tam_blue500
      : theme.colors.gray500};
`;

const Name = styled.div<{ state: string }>`
  display: flex;
  height: 14px;
  font-weight: 500;
  font-size: 16px;
  line-height: 14px;

  color: ${({ state, theme }) =>
    state === ItemState.COMPLETE ? theme.colors.gray500 : theme.colors.gray900};
`;

const AvaliableTime = styled.div<{ state: string }>`
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  padding: 8px;
  gap: 8px;
  height: 30px;
  width: fit-content;

  background-color: ${({ state, theme }) =>
    state === ItemState.AVAILABLE
      ? theme.colors.tam_Orange50
      : state === ItemState.RESERVED
      ? theme.colors.tam_blue50
      : theme.colors.gray100};

  color: ${({ state, theme }) =>
    state === ItemState.AVAILABLE
      ? theme.colors.tam_Orange500
      : state === ItemState.RESERVED
      ? theme.colors.tam_blue500
      : theme.colors.gray500};
`;

const Nickname = styled.div`
  height: 14px;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.gray700};
`;

const WriterSection = styled.div`
  display: flex;
  align-items: center;
`;

const Item = ({
  state_id,
  item_name,
  item_image,
}: Pick<ItemProps, 'state_id' | 'item_name' | 'item_image'>) => {
  return (
    <Container>
      <ItemImage src={item_image} />
      <DescriptionSection>
        <TextSection>
          {state_id === ItemState.AVAILABLE ? (
            <StateChip state={ItemState.AVAILABLE}>나눔 가능</StateChip>
          ) : null}
          {state_id === ItemState.RESERVED ? (
            <StateChip state={ItemState.RESERVED}>전달 중</StateChip>
          ) : null}
          {state_id === ItemState.COMPLETE ? (
            <StateChip state={ItemState.COMPLETE}>종료</StateChip>
          ) : null}
          <Name state={state_id}>{item_name}</Name>
          <WriterSection>
            <UserProfileFill />
            <Nickname>ㅁㄴㅇ</Nickname>
          </WriterSection>
        </TextSection>
        <AvaliableTime state={state_id}>12:00 ~ 13:00</AvaliableTime>
      </DescriptionSection>
    </Container>
  );
};

export default Item;
