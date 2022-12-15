import styled from 'styled-components';

import { ItemProps } from '../../pages/view';
import { ItemState } from './Item';

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

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

const CancelButton = styled.button`
  border-radius: 8px;
  width: 50%;
`;

const CompleteButton = styled.button`
  border-radius: 8px;
  width: 50%;
`;

const LongCancelButton = styled.button`
  border-radius: 8px;
  width: 100%;
`;

const ShareCard = ({
  imageUrl,
  itemName,
  state,
}: Pick<ItemProps, 'imageUrl' | 'itemName' | 'state'>) => {
  return (
    <Container>
      <ItemSection>
        <ImageContainer>
          <Image src={imageUrl} />
        </ImageContainer>
        <TextContainer>
          {state === ItemState.AVAILABLE ? (
            <StateChip state={ItemState.AVAILABLE}>나눔 가능</StateChip>
          ) : null}
          {state === ItemState.RESERVED ? (
            <StateChip state={ItemState.RESERVED}>전달 중</StateChip>
          ) : null}
          {state === ItemState.COMPLETE ? (
            <StateChip state={ItemState.COMPLETE}>종료</StateChip>
          ) : null}
          <Name state={state}>{itemName}</Name>
        </TextContainer>
      </ItemSection>
      {state === ItemState.COMPLETE ? null : (
        <ButtonSection>
          {state === ItemState.AVAILABLE ? (
            <>
              <CancelButton>나눔 취소</CancelButton>
              <CompleteButton>나눔 완료</CompleteButton>
            </>
          ) : null}
          {state === ItemState.RESERVED ? <LongCancelButton>나눔 취소</LongCancelButton> : null}
        </ButtonSection>
      )}
    </Container>
  );
};

export default ShareCard;
