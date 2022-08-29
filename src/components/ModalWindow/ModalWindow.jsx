import React, { useState, useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { BACKGROUND_COLOR } from '../../constants';
import IconButton from '../IconButton/IconButton';

const ModalWindow = ({
  setOpen, onClose, title = 'Title', children,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setOpen(() => () => setVisible(true));
  }, []);

  const closeModal = useCallback(() => {
    onClose();
    setVisible(false);
  }, []);

  const handleContentClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!visible) return null;

  return (
    <Wrapper onClick={closeModal}>
      <Content onClick={handleContentClick}>

        <Header>
          <Title>
            {title}
          </Title>

          <CloseButtonContainer>
            <IconButton onClick={closeModal} iconName="faXmark" />
          </CloseButtonContainer>
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

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

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

  box-shadow: 4px 3px 11px 0px rgba(66, 68, 90, 1);
`;

const Header = styled.div`
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 0;

  padding: 10px 80px;
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  right: 20px;
`;

const Title = styled.div`

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  font-size: 30px;
`;

export default ModalWindow;
