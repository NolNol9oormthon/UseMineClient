import { NextPage } from 'next';
import styled from 'styled-components';

import UserProfileFill from '../../assets/icons/user-profile-fill.svg';
import Header from '../../src/components/Header';
import { ItemState } from '../../src/components/Item';

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

const ButtonWhiteBackground = styled.div`
  position: fixed;
  bottom: 0px;
  padding-bottom: 40px;
  width: calc(100% - 40px);
  left: 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Button = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.tam_Orange500};
  color: ${({ theme }) => theme.colors.white};
  height: 56px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
`;

const Detail: NextPage = () => {
  const url = 'https://menu.mt.co.kr/moneyweek/thumb/2022/02/04/06/2022020410348097173_1.jpg';
  const state_id = 'AVAILABLE';

  return (
    <Container>
      <Header headerTitle="" />
      <ImageWrapper>
        <Image src={url} />
      </ImageWrapper>
      <WriterSection>
        <UserProfileFill />
        <Nickname>ㅁㄴㅇ</Nickname>
      </WriterSection>
      <TextSection>
        {state_id === ItemState.AVAILABLE ? (
          <StateChip state={ItemState.AVAILABLE}>나눔 가능</StateChip>
        ) : null}
        {/* {state_id === ItemState.RESERVED ? (
          <StateChip state={ItemState.RESERVED}>전달 중</StateChip>
        ) : null}
        {state_id === ItemState.COMPLETE ? (
          <StateChip state={ItemState.COMPLETE}>종료</StateChip>
        ) : null} */}
        <Title>새콤한 귤모자</Title>
        <Description>
          제주도 여행 끝나고 이제 안쓸 것 같은 귤모자 나눔합니다. 공항 근처에서 구매 했는데, 한번만
          사용했습니다. 가져가실 분 찾아요 제주도 여행 끝나고 이제 안쓸 것 같은 귤모자 나눔합니다.
          공항 근처에서 구매 했는데, 한번만 사용했습니다. 가져가실 분 찾아요 제주도 여행 끝나고 이제
          안쓸 것 같은 귤모자 나눔합니다. 공항 근처에서 구매 했는데, 한번만 사용했습니다. 가져가실
          분 찾아요 제주도 여행 끝나고 이제 안쓸 것 같은 귤모자 나눔합니다. 공항 근처에서 구매
          했는데, 한번만 사용했습니다. 가져가실 분 찾아 제주도 여행 끝나고 이제 안쓸 것 같은 귤모자
          나눔합니다. 공항 근처에서 구매 했는데, 한번만 사용했습니다. 가져가실 분 찾아요
        </Description>
      </TextSection>
      <AbaliableTimeSection>
        나눔가능 시간
        <AbaliableTimeText>12:00 ~ 13:00</AbaliableTimeText>
      </AbaliableTimeSection>
      <ButtonWhiteBackground>
        <Button>나눔 요청하기</Button>
      </ButtonWhiteBackground>
    </Container>
  );
};

export default Detail;
