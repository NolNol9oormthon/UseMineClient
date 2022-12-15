import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InnerContainer = styled.div`
  width: 100%;
  margin-top: 24px;
`;

const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;
  font-family: NanumSquare Neo variable;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  color: ${(props) => props.theme.colors.Black};
`;

const SubTextContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;
  font-family: NanumSquare Neo variable;
  font-size: 11px;
  font-weight: 300;
  text-align: center;
  color: ${(props) => props.theme.colors.gray500};
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const LeftButton = styled.button`
  width: 126px;
  height: 44px;
  border: hidden;
  border-radius: 7px;
  background-color: ${(props) => props.theme.colors.tam_Orange100};
  color: ${(props) => props.theme.colors.tam_Orange500};
`;

const RightButton = styled.button`
  width: 126px;
  height: 44px;
  border: hidden;
  border-radius: 7px;
  background-color: ${(props) => props.theme.colors.tam_Orange500};
  color: ${(props) => props.theme.colors.white};
`;

const Modal: React.FC<IModal> = ({
  className,
  onClose,
  maskClosable,
  visible,
  text,
  subText,
  buttonText,
  buttonOnClick
}) => {
  const onMaskClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const cancelOnClick = () => {
    onClose();
  };

  return (
    <React.Fragment>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex={-1}
        visible={visible}
      >
        <ModalInner tabIndex={0} className="modal-inner">
          <InnerContainer>
            <TextContainer>{text}</TextContainer>
            <SubTextContainer>{subText}</SubTextContainer>
            <ButtonContainer>
              <LeftButton onClick={cancelOnClick}>취소</LeftButton>
              <RightButton onClick={buttonOnClick}>{buttonText}</RightButton>
            </ButtonContainer>
          </InnerContainer>
        </ModalInner>
      </ModalWrapper>
    </React.Fragment>
  );
};

Modal.propTypes = {
  visible: PropTypes.bool,
};

const ModalWrapper = styled.div<IModalWrapper>`
  box-sizing: border-box;
  display: ${(props) => (props?.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div<IModalOverlay>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 1);
  width: 312px;
  max-height: 300px;
  padding: 16px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  border: none;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 1);
`;

export default Modal;
