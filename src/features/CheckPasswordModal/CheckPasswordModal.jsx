import { ButtonText, Input } from 'components';
import { P_VAL } from 'constants';
import { SocketContext } from 'features/WebsocketProvider/WebsocketProvider';
import React, {
  useState, useEffect, useCallback, useContext,
} from 'react';
import { useDispatch } from 'react-redux';
import { hideModal, showModal } from 'store';
import styled from 'styled-components';
import { ModalWindow } from '../ModalWindow';

const CheckPasswordModal = ({ setPasswordChecked }) => {
  const [inputValue, setInputValue] = useState('');
  const [modalId, setModalId] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const onChange = useCallback((e) => {
    setIsInvalid(false);
    setInputValue(e);
  }, [setIsInvalid, setInputValue]);

  const registerAdmin = useCallback(async () => {
    socket.emit('registerAdmin');
    setPasswordChecked(true);
  }, [setPasswordChecked]);

  useEffect(() => {
    if (modalId) {
      const pass = sessionStorage.getItem('template');
      if (pass === P_VAL) {
        registerAdmin();
      } else {
        dispatch(showModal({ modalId }));
      }
    }
  }, [modalId, setPasswordChecked]);

  const onClick = useCallback(() => {
    if (inputValue === P_VAL) {
      sessionStorage.setItem('template', inputValue);
      registerAdmin();
      dispatch(hideModal({ modalId }));
    } else {
      setIsInvalid(true);
    }
  }, [setPasswordChecked, setIsInvalid, modalId, inputValue]);

  const onKeyPress = useCallback((e) => {
    if (e.which === 13) {
      onClick();
    }
  }, [onClick]);

  return (
    <ModalWindow
      title="Password required"
      setModalId={setModalId}
      withoutUserClose
    >
      <Container>
        <Form>
          <Input
            value={inputValue}
            onChange={onChange}
            onKeyPress={onKeyPress}
            isInvalid={isInvalid}
            secure
          />
          <Margin>
            <ButtonText title="Accept" size="sm" onClick={onClick} />
          </Margin>
        </Form>
      </Container>
    </ModalWindow>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Form = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Margin = styled.div`
  margin: 20px;
`;

export default CheckPasswordModal;
