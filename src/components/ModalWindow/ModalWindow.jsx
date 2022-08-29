import React, { useState, useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { BACKGROUND_COLOR } from '../../constants';
import IconButton from '../IconButton/IconButton';

const ModalWindow = ({
  setOpen,
  setClose,
  onClose,
  title = 'Title',
  children,
  showBackButton,
  onBackPress,
}) => {
  const [visible, setVisible] = useState(false);

  const closeModal = useCallback(() => {
    onClose();
    setVisible(false);
    document.body.classList.remove('modal-opened');
  }, []);

  const openModal = useCallback(() => {
    setVisible(true);
    document.body.classList.add('modal-opened');
  }, []);

  useEffect(() => {
    setOpen(() => openModal);
    setClose(() => closeModal);
  }, []);

  const handleContentClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!visible) return null;

  return (
    <Wrapper onClick={closeModal}>
      <Content onClick={handleContentClick}>

        <Header>
          <div style={{ width: 40 }}>
            {showBackButton && (
              <IconButton
                iconName="faArrowLeft"
                onClick={onBackPress}
              />
            )}
          </div>

          <Title>
            {title}
          </Title>

          <IconButton onClick={closeModal} iconName="faXmark" />
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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background: white;

  width: 60%;
  height: 80%;

  border-radius: 20px;
  background: ${BACKGROUND_COLOR};

  overflow: hidden;

  box-shadow: 4px 3px 11px 0px rgba(66, 68, 90, 1);
`;

const Header = styled.div`
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: space-between;
  align-items: center;

  min-width: 0;

  padding: 10px 20px;
`;

const Title = styled.div`

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  font-size: 30px;
`;

export default ModalWindow;
