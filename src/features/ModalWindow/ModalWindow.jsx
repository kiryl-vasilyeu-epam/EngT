import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { find, uniqueId } from 'lodash';
import { COLORS } from 'constants';
import { IconButton } from 'components';
import { initModal, hideModal, deleteModal } from 'store';
import Card from 'react-bootstrap/Card';

const ModalWindow = ({
  title = 'Title',
  children,
  showBackButton,
  onBackPress,
  onClose,
  setModalId,
}) => {
  const [modalId] = useState(uniqueId('modal_'));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initModal(modalId));
    setModalId(modalId);
    return () => {
      dispatch(deleteModal(modalId));
    };
  }, []);

  const visible = useSelector((state) => find(state.modal, { id: modalId })?.visible);
  const closeModal = useCallback(() => {
    onClose();
    dispatch(hideModal({ modalId }));
  }, [modalId]);

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

const Content = styled(Card)`
  display: flex;
  flex-direction: column;
  position: relative;
  background: white;

  width: 60%;
  height: 80%;

  background: ${COLORS.BACKGROUND_COLOR};

  overflow: hidden;

  box-shadow: 4px 3px 11px 0px rgba(66, 68, 90, 1);
`;

const Header = styled(Card.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  font-size: 30px;
`;

export default ModalWindow;
