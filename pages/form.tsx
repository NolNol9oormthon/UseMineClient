import React, { useState, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';

import ChevronLeftBlack from '../assets/icons/chevron-left-black.svg';
import CameraIcon from '../assets/icons/camera.svg';
import FoodIcon from '../assets/icons/food.svg';
import ElectronicsIcon from '../assets/icons/electronics.svg';
import EtcIcon from '../assets/icons/etc.svg';
import SouvenirIcon from '../assets/icons/souvenir.svg';
import NecessitiesIcon from '../assets/icons/necessities.svg';
import ClothesIcon from '../assets/icons/clothes.svg';
import CheckIcon from '../assets/icons/check-white.svg';
import { createItem } from '../src/apis/index';
import { createHashRouter } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  font-family: NanumSquare Neo variable;
  font-size: 30px;
  font-weight: 700;
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductImageUploadButton = styled.button`
  aspect-ratio: 1 / 1;
  width: 100%;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.gray100};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10px;
`;

const PrevButton = styled.button`
  width: 32px;
  height: 32px;
  border: hidden;
  background-color: transparent;
`;

const HeaderTitle = styled.div`
  font-family: NanumSquare Neo variable;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  color: ${(props) => props.theme.colors.gray900};
`;

const ProductNameInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  padding: 11px 16px;
  font-family: NanumSquare Neo variable;
  font-size: 16px;
  font-weight: 300;
  line-height: 28px;
  color: ${(props) => props.theme.colors.gray900};
  border: hidden;
  margin-top: 16px;
  background-color: ${(props) =>
    props.value ? props.theme.colors.tam_blue50 : props.theme.colors.gray100};
  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.gray500};
  }
  &:focus {
    outline: 1px solid ${(props) => props.theme.colors.tam_blue500};
    background-color: ${(props) => props.theme.colors.white};
  }
`;

const DescriptionTextBox = styled.textarea`
  width: 100%;
  height: 156px;
  border-radius: 4px;
  padding: 16px;
  font-family: NanumSquare Neo variable;
  font-size: 16px;
  font-weight: 300;
  line-height: 28px;
  color: ${(props) => props.theme.colors.gray900};
  border: hidden;
  margin-top: 16px;
  resize: none;
  background-color: ${(props) =>
    props.value ? props.theme.colors.tam_blue50 : props.theme.colors.gray100};
  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.gray500};
  }
  &:focus {
    outline: 1px solid ${(props) => props.theme.colors.tam_blue500};
    background-color: ${(props) => props.theme.colors.white};
  }
`;

const CategoryHeader = styled.div`
  font-family: NanumSquare Neo variable;
  font-size: 16px;
  font-weight: 700;
  line-height: 28px;
  color: ${(props) => props.theme.colors.gray900};
  margin-top: 24px;
  margin-bottom: 16px;
`;

const CategoryContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 13px;
  margin-bottom: 48px;
`;

const CategoryCard = styled.div`
  aspect-ratio: 1/1;
  width: 100%;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.tam_blue50};
  align-items: center;
  padding-top: 11px;
`;

const CategoryLabel = styled.div`
  font-family: NanumSquare Neo;
  font-size: 14px;
  font-weight: 700;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: center;
  color: ${(props) => props.theme.colors.tam_blue500};
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 6px;
`;

const CategoryRadioButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.colors.tam_blue100};
  border: hidden;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`;

const NextButton = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 8px;
  border: hidden;
  background-color: ${(props) => props.theme.colors.tam_blue200};
  font-family: NanumSquare Neo variable;
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 40px;
`;

const SelectMark = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.tam_blue500 + '88'};
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AirportTimeBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const TimeSettingBox = styled.div`
  width: 45%;
  margin-top: 10px;
  margin-bottom: 24px;
`;

const TimeSettingTitle = styled.div`
  font-family: NanumSquare Neo variable;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  margin-bottom: 8px;
`;

const TimeInputBox = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.gray900};
  text-align: center;
  font-family: NanumSquare Neo variable;
  font-size: 18px;
  font-weight: 300;
  background-color: ${(props) =>
    props.value ? props.theme.colors.white : props.theme.colors.gray100};
  border: ${(props) => (props.value ? `1px solid ${props.theme.colors.tam_blue500}` : 'hidden')};
  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.gray500};
  }
  &:focus {
    outline: 1px solid ${(props) => props.theme.colors.tam_blue500};
    background-color: ${(props) => props.theme.colors.white};
  }
`;

const PeriodMark = styled.div`
  font-family: NanumSquare Neo;
  font-size: 16px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
  color: ${(props) => props.theme.colors.gray900};
  margin-top: 46px;
  padding-left: 20px;
  padding-right: 20px;
`;

const LinkBox = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const LinkInputBox = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.gray900};
  font-family: NanumSquare Neo;
  font-size: 14px;
  font-weight: 700;
  line-height: 28px;
  text-align: left;
  padding: 11px 16px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.value ? props.theme.colors.white : props.theme.colors.gray100};
  border: hidden;
  border: ${(props) =>
    typeof props.value == 'string'
      ? props.value.startsWith('https://open.kakao.com/o/') || props.value.length == 0
        ? `1px solid ${props.theme.colors.tam_blue500}`
        : `1px solid ${props.theme.colors.red_300}`
      : {}};
  background-color: ${(props) =>
    typeof props.value == 'string'
      ? props.value.startsWith('https://open.kakao.com/o/') || props.value.length == 0
        ? props.theme.colors.white
        : props.theme.colors.red_100
      : {}};
  //   border: ${(props) =>
    props.value ? `1px solid ${props.theme.colors.tam_blue500}` : 'hidden'};
  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.gray500};
  }
  &:focus {
    outline: ${(props) =>
      typeof props.value == 'string'
        ? props.value.startsWith('https://open.kakao.com/o/') || props.value.length == 0
          ? `1px solid ${props.theme.colors.tam_blue500}`
          : `1px solid ${props.theme.colors.red_300}`
        : {}};
    background-color: ${(props) =>
      typeof props.value == 'string'
        ? props.value.startsWith('https://open.kakao.com/o/') || props.value.length == 0
          ? props.theme.colors.white
          : props.theme.colors.red_100
        : {}};
  }
`;

const ErrorComment = styled.div`
  font-family: NanumSquare Neo variable;
  font-size: 12px;
  font-weight: 300;
  text-align: left;
  color: #df0000;
`;

const dateConverter = (time: string) => {
  const now = new Date();
  const tmpList = String(now).split(':');
  const reDate =
    tmpList[0].slice(0, tmpList[0].length - 2) +
    time +
    ':00' +
    tmpList[2].slice(2, tmpList[2].length);
  const returnDate = new Date(Date.parse(reDate) + 32400000);
  console.log(returnDate.toISOString());
  const convertTime = returnDate.toISOString();

  return convertTime.slice(0, convertTime.length - 5);
};

const Home: NextPage = () => {
  const [productImage, setProductImage] = useState<any | null>(null);
  const [productImageChange, setProductImageChange] = useState(false);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryIdx, setCategoryIdx] = useState(-1);
  const [nextOn, setNextOn] = useState(false);
  const [arriveTime, setArriveTime] = useState('');
  const [departTime, setDepartTime] = useState('');
  const [chatLink, setChatLink] = useState('');
  const [errorComment, setErrorComment] = useState('');
  const [done, setDone] = useState(false);
  const CategoryList = [
    {
      name: '식품',
      value: 'FOOD',
      icon: FoodIcon,
    },
    {
      name: '의류',
      value: 'CLOTHES',
      icon: ClothesIcon,
    },
    {
      name: '생활용품',
      value: 'NECESSITIES',
      icon: NecessitiesIcon,
    },
    {
      name: '기념품',
      value: 'SOUVENIR',
      icon: SouvenirIcon,
    },
    {
      name: '할인권',
      value: 'COUPON',
      icon: ElectronicsIcon,
    },
    {
      name: '기타',
      value: 'ETC',
      icon: EtcIcon,
    },
  ];

  const router = useRouter();
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleBgClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (hiddenFileInput.current != null) {
      hiddenFileInput.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('hello');
    let reader = new FileReader();
    const target = event.target as HTMLInputElement;
    const fileUploaded: File = (target.files as FileList)[0];
    console.log(fileUploaded);
    setProductImage({ file: fileUploaded, imagePreviewUrl: fileUploaded });
    reader.onloadend = () => {
      setProductImage({ file: fileUploaded, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(fileUploaded);
    setProductImageChange(true);
  };

  const productNameOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setProductName(e.currentTarget.value);
  };

  const descriptionOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };

  const departTimeOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (departTime.length <= 5 && e.currentTarget.value.length <= 5) {
      if (e.currentTarget.value.length == 2 && departTime.length != 3) {
        setDepartTime(e.currentTarget.value + ':');
      } else {
        setDepartTime(e.currentTarget.value);
      }
    }
  };

  const arriveTimeOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (arriveTime.length <= 5 && e.currentTarget.value.length <= 5) {
      if (e.currentTarget.value.length == 2 && arriveTime.length != 3) {
        setArriveTime(e.currentTarget.value + ':');
      } else {
        setArriveTime(e.currentTarget.value);
      }
    }
  };

  const linkOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setChatLink(e.currentTarget.value);
    const linkForm = 'https://open.kakao.com/o/';
    if (
      !e.currentTarget.value.startsWith('https://open.kakao.com/o/') &&
      e.currentTarget.value.length > 0
    ) {
      setErrorComment('*유효하지 않은 링크입니다.');
    } else {
      setErrorComment('');
    }
  };

  const doneOnClick = async () => {
    // dateConverter(arriveTime);
    const formData = new FormData();

    if (productImage) {
      formData.append('imageFile', productImage.file);
    }
    formData.append('availableEndTime', dateConverter(departTime));
    formData.append('availableStartTime', dateConverter(arriveTime));
    formData.append('category', CategoryList[categoryIdx].value);
    formData.append('chatUrl', chatLink);
    formData.append('content', description);
    formData.append('itemName', productName);
    formData.append('ownerId', String(localStorage.getItem('userId')));

    const createItemResult = await createItem(formData).then((data) => {
      console.log(data);
      router.push('/view');
    });
  };

  const prevOnClick = () => {
    router.push('/');
  };

  return (
    <Container>
      {nextOn ? (
        <>
          <Header>
            <PrevButton onClick={() => setNextOn(false)}>
              <ChevronLeftBlack />
            </PrevButton>
            <HeaderTitle>거래 정보 등록</HeaderTitle>
            <PrevButton />
          </Header>
          <AirportTimeBox>
            <TimeSettingBox>
              <TimeSettingTitle>공항 도착 시간</TimeSettingTitle>
              <TimeInputBox
                value={arriveTime}
                onChange={(e) => arriveTimeOnChange(e)}
                placeholder="10:00"
              />
            </TimeSettingBox>
            <PeriodMark>~</PeriodMark>
            <TimeSettingBox>
              <TimeSettingTitle>공항 출발 시간</TimeSettingTitle>
              <TimeInputBox
                value={departTime}
                onChange={(e) => {
                  departTimeOnChange(e);
                }}
                placeholder="14:00"
              />
            </TimeSettingBox>
          </AirportTimeBox>
          <LinkBox>
            <TimeSettingTitle>오픈 채팅방 링크</TimeSettingTitle>
            <LinkInputBox
              value={chatLink}
              onChange={(e) => linkOnChange(e)}
              placeholder="https://open.kakao.com/o/sh07SwTe"
            />
            {errorComment ? <ErrorComment>{errorComment}</ErrorComment> : <></>}
          </LinkBox>
          {!errorComment && arriveTime && departTime && chatLink ? (
            <NextButton onClick={() => doneOnClick()} style={{ backgroundColor: '#5566FF' }}>
              등록완료
            </NextButton>
          ) : (
            <NextButton>등록완료</NextButton>
          )}
        </>
      ) : (
        <>
          <Header>
            <PrevButton onClick={prevOnClick}>
              <ChevronLeftBlack />
            </PrevButton>
            <HeaderTitle>물품정보 등록</HeaderTitle>
            <PrevButton />
          </Header>
          <ProductImageUploadButton
            onClick={(e) => handleBgClick(e)}
            style={{
              backgroundImage: `url(${
                productImage?.imagePreviewUrl ? productImage?.imagePreviewUrl : ''
              })`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            {productImage?.imagePreviewUrl ? <></> : <CameraIcon width={32} height={32} />}
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={(e) => {
                handleChange(e);
              }}
              style={{ display: 'none' }}
            />
          </ProductImageUploadButton>
          <ProductNameInput
            value={productName}
            onChange={(e) => productNameOnChange(e)}
            placeholder="상품이름을 입력해주세요"
          />
          <DescriptionTextBox
            value={description}
            onChange={(e) => descriptionOnChange(e)}
            placeholder="내용을 입력해주세요"
          />
          <CategoryHeader>카테고리</CategoryHeader>
          {/* <CategoryContainer></CategoryContainer> */}
          <CategoryContainer>
            {CategoryList.map((category, idx) => (
              <CategoryCard key={category.value}>
                <ButtonContainer>
                  {idx == categoryIdx ? (
                    <CategoryRadioButton onClick={() => setCategoryIdx(-1)}>
                      <category.icon />
                      <SelectMark>
                        <CheckIcon />
                      </SelectMark>
                    </CategoryRadioButton>
                  ) : (
                    <CategoryRadioButton onClick={() => setCategoryIdx(idx)}>
                      <category.icon />
                    </CategoryRadioButton>
                  )}
                </ButtonContainer>
                <CategoryLabel>{category.name}</CategoryLabel>
              </CategoryCard>
            ))}
          </CategoryContainer>
          {categoryIdx > -1 && productName && description && productImage?.imagePreviewUrl ? (
            <NextButton onClick={() => setNextOn(true)} style={{ backgroundColor: '#5566FF' }}>
              다음
            </NextButton>
          ) : (
            <NextButton>다음</NextButton>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
