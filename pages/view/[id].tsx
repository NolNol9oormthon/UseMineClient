import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import UserProfileFill from '../../assets/icons/user-profile-fill.svg';
import Header from '../../src/components/Header';
import { dateConverter, ItemState } from '../../src/components/Item';
import { deleteItem, getDetailData, patchItem } from '../../src/apis';
import Modal from '../../src/components/Modal';

import { ItemProps } from '.';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const ImageWrapper = styled.div`
  width: calc(100% + 40px);
  margin: 0 -20px;
  height: 100%;
  max-height: 420px;
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
  justify-content: flex-end;
  padding: 16px 0;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
`;

const StateChip = styled.span<{ state: string }>`
  display: flex;
  height: 14px;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 8px;

  color: ${({ state, theme }) =>
    state === ItemState.AVAILABLE
      ? theme.colors.tam_Orange500
      : state === ItemState.RESERVED
      ? theme.colors.tam_blue500
      : theme.colors.gray500};
`;

const Title = styled.span`
  height: 14px;
  font-weight: 700;
  font-size: 20px;
  line-height: 14px;
  margin-bottom: 14px;
`;
const Description = styled.p`
  font-weight: 300;
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.gray600};
`;
const AbaliableTimeSection = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray900};
  padding-bottom: 152px;
`;

const AbaliableTimeText = styled.span`
  font-weight: 700;
  margin-left: 8px;
  font-size: 18px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.tam_Orange500};
`;

const ButtonWhiteBackground = styled.div<{ windowWidth: number }>`
  position: fixed;
  bottom: 0px;
  width: ${({ windowWidth }) => (windowWidth > 420 ? '420px' : `calc(100%)`)};
  left: ${({ windowWidth }) => (windowWidth > 420 ? `calc(50% - 210px)` : 0)};
  padding: 0 20px;
  padding-bottom: 40px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Button = styled.button<{ windowWidth: number }>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.tam_Orange500};
  color: ${({ theme }) => theme.colors.white};
  height: 56px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  :disabled {
    background-color: ${({ theme }) => theme.colors.gray500};
  }
`;

interface ItemDetailProps {
  chatUrl: string;
  content: string;
  owner: boolean;
}

type ExtendedProps = ItemDetailProps & ItemProps;

const Detail = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [data, setData] = useState<ExtendedProps>({} as ExtendedProps);
  const [reqOn, setReqOn] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const get = async () => {
      getDetailData(Number(id)).then((res) => setData(res));
    };
    get();
  }, [id]);

  const closeModal = () => {
    setReqOn(false);
  };

  useEffect(() => {
    return () => {
      setReqOn(false);
    };
  }, []);

  const linkOnClick = (link: string) => {
    router.push(link);
  };

  const queryClient = useQueryClient();

  const { isLoading, mutate, mutateAsync } = useMutation(
    ({ itemId, userId, state }: { itemId: number; userId: number; state?: string }) => {
      if (state) return patchItem(itemId, userId, state);
      return deleteItem(itemId, userId);
    },
    {
      onSuccess: (variables, context) => {
        return queryClient.invalidateQueries(['myData']);
      },
    },
  );

  console.log(data);
  return (
    <Container>
      {reqOn ? (
        <Modal
          className="req_modal"
          visible={reqOn}
          maskClosable={true}
          onClose={closeModal}
          text="오픈 채팅방 이동"
          subText="소통을 위한 카카오톡 오픈채팅방으로 바로 이동합니다"
          buttonText="이동하기"
          buttonOnClick={() => {
            mutate({
              itemId: data.itemId,
              userId: Number(localStorage.getItem('userId')),
              state: 'RESERVED',
            });
            linkOnClick(String(data?.chatUrl));
          }}
        />
      ) : (
        <></>
      )}
      <Header headerTitle="" />
      <ImageWrapper>
        <Image src={data?.imageUrl} alt={data?.itemName} />
      </ImageWrapper>
      <WriterSection>
        <UserProfileFill />
        <Nickname>{data?.ownerNickname}</Nickname>
      </WriterSection>
      <TextSection>
        {data?.state === ItemState.AVAILABLE ? (
          <StateChip state={ItemState.AVAILABLE}>나눔 가능</StateChip>
        ) : null}
        {data?.state === ItemState.RESERVED ? (
          <StateChip state={ItemState.RESERVED}>전달 중</StateChip>
        ) : null}
        {data?.state === ItemState.COMPLETE ? (
          <StateChip state={ItemState.COMPLETE}>종료</StateChip>
        ) : null}
        <Title>{data?.itemName}</Title>
        <Description>{data?.content}</Description>
      </TextSection>
      <AbaliableTimeSection>
        나눔가능 시간
        <AbaliableTimeText>
          {data && data.availableStartTime && dateConverter(data.availableStartTime)} ~{' '}
          {data && data.availableEndTime && dateConverter(data.availableEndTime)}
        </AbaliableTimeText>
      </AbaliableTimeSection>
      <ButtonWhiteBackground windowWidth={windowWidth}>
        <Button onClick={() => setReqOn(true)} disabled={data?.owner} windowWidth={windowWidth}>
          {data?.owner ? '자신의 물품은 나눔받을 수 없어요' : '나눔 요청하기'}
        </Button>
      </ButtonWhiteBackground>
    </Container>
  );
};

export default Detail;
