import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { find, uniqueId } from 'lodash';
import { COLORS } from 'constants';
import { IconButton } from 'components';
import { initModal, hideModal, deleteModal } from 'store';
import Card from 'react-bootstrap/Card';

const MODAL_SIZE = {
  small: {
    width: 'auto',
    height: 'auto',
  },
  medium: {
    width: '60%',
    height: '80%',
  },
  large: {
    width: '90%',
    height: '90%',
  },
};

const ModalWindow = ({
  title = 'Title',
  children,
  showBackButton,
  onBackPress,
  onClose,
  setModalId,
  withoutUserClose,
  id,
  size = 'medium',
}) => {
  const [modalId] = useState(id || uniqueId('modal_'));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initModal(modalId));
    setModalId?.(modalId);
    return () => {
      dispatch(deleteModal(modalId));
    };
  }, []);

  const visible = useSelector((state) => find(state.modal, { id: modalId })?.visible);
  const closeModal = useCallback(() => {
    if (withoutUserClose) return;
    onClose();
    dispatch(hideModal({ modalId }));
  }, [modalId, withoutUserClose]);

  const handleContentClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!visible) return null;

  return (
    <Wrapper onClick={closeModal}>
      <Content onClick={handleContentClick} $size={size}>
        <Header>
          <IconContainer>
            {showBackButton && (
              <IconButton
                iconName="faArrowLeft"
                onClick={onBackPress}
              />
            )}
          </IconContainer>
          <Title>
            {title}
          </Title>
          <IconContainer>
            {
              !withoutUserClose && (
                <IconButton onClick={closeModal} iconName="faXmark" />
              )
            }
          </IconContainer>
        </Header>
        {children}
      </Content>
    </Wrapper>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  overflow: hidden;
  
  background: rgba(0, 0, 0, 0.4);

  animation: ${fadeIn} .2s;

  z-index: 3;
`;

const Content = styled(Card)`
  display: flex;
  flex-direction: column;
  position: relative;

  /*Desktop Query*/
  @media only screen and (min-width: 780px) {
    width: ${({ $size }) => MODAL_SIZE[$size].width};
    height: ${({ $size }) => MODAL_SIZE[$size].height};
    max-width: 1600px;
  }
  
  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    width: 100%;
    height: 100%;
  }
  
  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:780px) {
    width: 100%;
    height: 100%;
  }

  background: ${COLORS.BACKGROUND_COLOR};
  overflow: hidden;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  border: none;
  border-radius: 2px;
`;

const IconContainer = styled.div`
  width: 40px;
`;

const Header = styled(Card.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${COLORS.PRIMARY_COLOR};
  color: white;
  border: none;
  border-radius: 0 !important;
`;

const Title = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  font-size: 25px;

  padding: 0 20px;
`;

export default ModalWindow;
