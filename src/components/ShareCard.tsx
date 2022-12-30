import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

import { ItemProps } from '../../pages/view';
import { deleteItem, patchItem } from '../apis';
import { ItemState } from './Item';
import Modal from './Modal';

const Container = styled.div<{ isAvailable: boolean; isReserved: boolean; isComplete: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: ${({ theme, isAvailable, isReserved }) =>
    isAvailable
      ? theme.colors.tam_Orange50
      : isReserved
      ? theme.colors.tam_blue50
      : theme.colors.gray50};
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
  background-color: ${({ theme }) => theme.colors.tam_blue100};
  color: ${({ theme }) => theme.colors.tam_blue400};
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
`;

const CompleteButton = styled.button`
  border-radius: 8px;
  width: 50%;
  background-color: ${({ theme }) => theme.colors.tam_blue500};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
`;

const LongCancelButton = styled.button`
  border-radius: 8px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.tam_Orange100};
  color: ${({ theme }) => theme.colors.tam_Orange500};

  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
`;

const ShareCard = ({
  imageUrl,
  itemName,
  state,
  itemId,
}: Pick<ItemProps, 'imageUrl' | 'itemName' | 'state' | 'itemId'>) => {
  const queryClient = useQueryClient();
  const isAvailable = state === ItemState.AVAILABLE;
  const isReserved = state === ItemState.RESERVED;
  const isComplete = state === ItemState.COMPLETE;
  const [reqOn, setReqOn] = useState(false);
  const [buttonType, setButtonType] = useState<string>();

  const ButtonTypes = {
    CancelButton: 'CancelButton',
    CompleteButton: 'CompleteButton',
    LongCancelButton: 'LongCancelButton',
  };

  const { mutate } = useMutation(
    ({ itemId, userId, state }: { itemId: number; userId: number; state?: string }) => {
      if (state) return patchItem(itemId, userId, state);
      return deleteItem(itemId, userId);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(['myData']);
      },
    },
  );

  const handleDelete = () => {
    mutate({ itemId, userId: Number(localStorage.getItem('userId')) });
  };
  const handleComplete = () => {
    mutate({ itemId, userId: Number(localStorage.getItem('userId')), state: 'COMPLETE' });
  };

  const handleReopen = () => {
    mutate({ itemId, userId: Number(localStorage.getItem('userId')), state: 'AVAILABLE' });
  };

  const closeModal = () => {
    setReqOn(false);
  };

  return (
    <Container isAvailable={isAvailable} isReserved={isReserved} isComplete={isComplete}>
      {reqOn ? (
        <Modal
          className="req_modal"
          visible={reqOn}
          maskClosable={true}
          onClose={closeModal}
          isOrange={isAvailable}
          text={buttonType === ButtonTypes.CompleteButton ? '나눔 완료' : '나눔 취소'}
          subText={
            buttonType === ButtonTypes.CompleteButton
              ? '나눔을 완료하시겠습니까?'
              : buttonType === ButtonTypes.CancelButton
              ? '예정된 나눔을 취소하고 새로운 나눔을 기다리시겠습니까?'
              : '나눔을 취소하시겠습니까?'
          }
          buttonText={buttonType === ButtonTypes.CompleteButton ? '완료하기' : '취소하기'}
          buttonOnClick={() => {
            if (buttonType === ButtonTypes.CompleteButton) handleComplete();
            if (buttonType === ButtonTypes.CancelButton) handleReopen();
            if (buttonType === ButtonTypes.LongCancelButton) handleDelete();
          }}
        />
      ) : (
        <></>
      )}
      <ItemSection>
        <ImageContainer>
          <Image src={imageUrl} alt={itemName} />
        </ImageContainer>
        <TextContainer>
          {isAvailable ? <StateChip state={ItemState.AVAILABLE}>나눔 가능</StateChip> : null}
          {isReserved ? <StateChip state={ItemState.RESERVED}>나눔 예약</StateChip> : null}
          {isComplete ? <StateChip state={ItemState.COMPLETE}>나눔 완료</StateChip> : null}
          <Name state={state}>{itemName}</Name>
        </TextContainer>
      </ItemSection>
      {isComplete ? null : (
        <ButtonSection>
          {isReserved ? (
            <>
              <CancelButton
                onClick={() => {
                  setButtonType(ButtonTypes.CancelButton);
                  setReqOn(true);
                }}
              >
                나눔 취소
              </CancelButton>
              <CompleteButton
                onClick={() => {
                  setButtonType(ButtonTypes.CompleteButton);
                  setReqOn(true);
                }}
              >
                나눔 완료
              </CompleteButton>
            </>
          ) : null}
          {isAvailable ? (
            <LongCancelButton
              onClick={() => {
                setButtonType(ButtonTypes.LongCancelButton);
                setReqOn(true);
              }}
            >
              나눔 취소
            </LongCancelButton>
          ) : null}
        </ButtonSection>
      )}
    </Container>
  );
};

export default ShareCard;
