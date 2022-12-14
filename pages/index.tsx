import { NextPage } from 'next';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  font-family: NanumSquare Neo variable;
  font-size: 30px;
  font-weight: 700;
  position: relative;
`;

const ContentBox = styled.div`
  padding-top: 130px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LogoBox = styled.img`
  width: 240px;
  height: 240px;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 8px;
  padding: 8px 28px;
  background-color: ${props => props.theme.colors.kakao_yellow};
  font-weight: 700;
  position: absolute;
  bottom: 40px;
`


const Home: NextPage = () => {
  const REDIRCT_URI = "http://localhost:3000/welcome"
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${REDIRCT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  }
  return (
    <Container>
      <ContentBox>
        <LogoBox
          src={
            'https://png.pngtree.com/png-clipart/20221001/original/pngtree-welcome-to-jeju-island-korean-bear-hand-drawn-free-printable-png-image_8648942.png'
          }
        />
      </ContentBox>
      <LoginButton onClick={handleLogin}>카카오로 시작하기</LoginButton>
    </Container>
  );
};

export default Home;
