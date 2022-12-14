import React, { useState, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
import qs from 'qs';

import ChevronRightBlue from '../assets/icons/chevron-right-blue.svg';
import ChevronRightOrange from '../assets/icons/chevron-right-orange.svg';
import { login } from '../src/apis';
import Seo from '../src/components/Seo';

const Container = styled.div`
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  height: 100%;
  font-family: NanumSquare Neo variable;
  font-size: 30px;
  font-weight: 700;
  position: relative;
`;

const MainText = styled.div`
  font-family: NanumSquare Neo variable;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
  padding-top: 90px;
`;

const SemiText = styled.div`
  font-family: NanumSquare Neo variable;
  font-size: 16px;
  font-weight: 300;
  line-height: 28px;
  text-align: left;
  margin-top: 2px;
  margin-bottom: 53px;
`;

const Button = `
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  border-radius: 8px;
  padding: 8px 28px;
  text-align: left;
  margin-bottom: 16px;
  align-items: center;
`;

const RegisterButton = styled.button`
  ${Button}
  background-color: ${(props) => props.theme.colors.tam_blue200};
`;

const ViewButton = styled.button`
  ${Button}
  background-color: ${(props) => props.theme.colors.tam_Orange100};
`;

const ButtonText = `
  font-weight: 700;
  font-family: NanumSquare Neo variable;
  font-size: 16px;
`;

const ButtonTextBlue = styled.div`
  ${ButtonText}
  color: ${(props) => props.theme.colors.tam_blue500};
`;

const ButtonTextOrange = styled.div`
  ${ButtonText}
  color: ${(props) => props.theme.colors.tam_Orange500};
`;

const ButtonIcon = styled.div`
  width: 24px;
  height: 24px;
`;

const LottieContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 100px;
`;

const Welcome: NextPage = () => {
  const [userInfo, setUserInfo] = useState<any>({
    id: '',
    nickname: '',
  });
  // const [code, setCode] = useState('');
  // let currentUrl = getAbsoluteURL().origin
  const router = useRouter();
  const ref = useRef(null);

  React.useEffect(() => {
    import('@lottiefiles/lottie-player');
  });

  console.log(router);
  let currentUrl = '';
  try {
    if (!window) {
      currentUrl = 'http://localhost:3000';
    } else {
      currentUrl = window.location.origin;
      // currentUrl = "https://usemine-6a464.web.app"
    }
  } catch {
    currentUrl = 'http://localhost:3000';
  }

  useEffect(() => {
    console.log(router.query['code']);
    const code = router.query['code'];

    const getProfile = async () => {
      try {
        // Kakao SDK API??? ????????? ????????? ?????? ??????
        const data = await window.Kakao.API.request({
          url: '/v2/user/me',
        });
        // ????????? ?????? ????????? ??????
        console.log(data);
        if (data.id) {
          const sendData = {
            id: data.id,
            profileUrl: data.properties.profile_image,
          };
          // ?????? ??????
          const loginResult = await login(data.id, data.properties.profile_image).then((data) => {
            console.log(data);
            localStorage.setItem('userId', data.id);
            localStorage.setItem('nickname', data.nickname);
            setUserInfo(data);
          });
          // const returnData = {
          //   id: 'test3',
          //   nickname: '????????? ?????????',
          // };
          // setUserInfo(returnData);
        }
        // setUserId(data.id);
        // setNickName(data.properties.nickname);
        // setProfileImage(data.properties.profile_image);
      } catch (err) {
        console.log(err);
      }
    };

    const getToken = async () => {
      const payload = qs.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
        redirect_uri: `${currentUrl}/welcome`,
        // redirect_uri: 'https://usemine-6a464.web.app/welcome',
        code: code,
        client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
      });
      try {
        // access token ????????????
        const res = await axios.post('https://kauth.kakao.com/oauth/token', payload);

        // access token ??????
        window.Kakao.Auth.setAccessToken(res.data.access_token);
        // history.replace('/profile');
        getProfile();
      } catch (err) {
        console.log(err);
        const sendData = {
          id: localStorage.getItem('userId'),
          nickname: localStorage.getItem('nickname'),
        };
        setUserInfo(sendData);
      }
    };

    if (code !== undefined) {
      if (typeof window !== undefined) {
        getToken();
      }
    }
  }, [router.query]);

  const formOnClick = () => {
    router.push('/form');
  };

  const viewOnClick = () => {
    router.push('/view');
  };

  return (
    <>
      <Seo title="Welcome" />
      <Container>
        {userInfo?.id ? (
          <>
            <MainText>
              ????????????
              <br />
              {userInfo?.nickname}???
            </MainText>
            <SemiText>??????????????? ?????? ????????? ???????????????????</SemiText>
            <RegisterButton onClick={formOnClick}>
              <ButtonTextBlue>?????? ????????????</ButtonTextBlue>
              <ButtonIcon>
                <ChevronRightBlue />
              </ButtonIcon>
            </RegisterButton>
            <ViewButton onClick={viewOnClick}>
              <ButtonTextOrange>????????????</ButtonTextOrange>
              <ButtonIcon>
                <ChevronRightOrange />
              </ButtonIcon>
            </ViewButton>
          </>
        ) : (
          <LottieContainer>
            <lottie-player
              id="firstLottie"
              ref={ref}
              autoplay
              loop
              mode="normal"
              src="https://lottie.host/2714ac92-2f14-465f-842b-c63e9d0f858f/uoVSKxFYSM.json"
              style={{ width: '200px', height: '200px' }}
            ></lottie-player>
          </LottieContainer>
        )}
      </Container>
    </>
  );
};

export default Welcome;
