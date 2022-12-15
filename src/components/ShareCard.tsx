import styled from 'styled-components';

import { ItemState } from './Item';

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  border: 1px solid red;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.tam_Orange50};
  padding: 16px;
`;

const ItemSection = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
`;

const Image = styled.img`
  top: 0;
  left: 0;
  transform: translate(50, 50);
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 12px;
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

const ButtonSection = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  margin-top: 16px;
  gap: 10px;
`;

const Button = styled.button`
  border: 1px solid red;
  border-radius: 8px;
  width: 50%;
`;

const ShareCard = () => {
  const state_id = 'AVAILABLE';
  const item_name = '감귤모자';
  return (
    <Container>
      <ItemSection>
        <ImageContainer>
          <Image src="https://menu.mt.co.kr/moneyweek/thumb/2022/02/04/06/2022020410348097173_1.jpg" />
        </ImageContainer>
        <TextContainer>
          {state_id === ItemState.AVAILABLE ? (
            <StateChip state={ItemState.AVAILABLE}>나눔 가능</StateChip>
          ) : null}
          {/* {state_id === ItemState.RESERVED ? (
            <StateChip state={ItemState.RESERVED}>전달 중</StateChip>
          ) : null}
          {state_id === ItemState.COMPLETE ? (
            <StateChip state={ItemState.COMPLETE}>종료</StateChip>
          ) : null} */}
          <Name state={state_id}>{item_name}</Name>
        </TextContainer>
      </ItemSection>
      <ButtonSection>
        <Button>d</Button>
        <Button>d</Button>
      </ButtonSection>
    </Container>
  );
};

export default ShareCard;
