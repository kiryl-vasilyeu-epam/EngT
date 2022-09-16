import { ButtonText, Input } from 'components';
import { LOCAL_STORAGE_KEYS, USER_NAME } from 'constants';
import React, {
  useState, useEffect, useCallback, useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal, hideModal } from 'store';
import styled from 'styled-components';
import { SocketContext } from '../WebsocketProvider/WebsocketProvider';
import { ModalWindow } from '../ModalWindow';

const UserNameModal = () => {
  const { userName: defaultUserName } = useSelector((store) => store.userAnswers);
  const { ws } = useSelector((store) => store.appConnection);
  const socket = useContext(SocketContext);
  const [inputValue, setInputValue] = useState(defaultUserName);
  const dispatch = useDispatch();

  const registerName = useCallback(async (name) => {
    socket.emit('registerName', name);
    localStorage.setItem(LOCAL_STORAGE_KEYS.USERNAME, name);
    dispatch(hideModal({ modalId: USER_NAME }));
  }, [ws]);

  useEffect(() => {
    const userName = localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME);
    if (userName) {
      registerName(userName);
    } else {
      dispatch(showModal({ modalId: USER_NAME }));
    }
  }, []);

  const closeModal = useCallback(() => {
    dispatch(hideModal({ modalId: USER_NAME }));
  }, []);

  const onClick = useCallback(async () => {
    registerName(inputValue);
  }, [inputValue]);

  const onKeyPress = useCallback((e) => {
    if (e.which === 13) {
      onClick();
    }
  }, [onClick]);

  return (
    <ModalWindow
      title="Enter user name"
      id={USER_NAME}
      onClose={closeModal}
    >
      <Container>
        <Form>
          <Input
            value={inputValue}
            onChange={setInputValue}
            onKeyPress={onKeyPress}
          />
          <Margin>
            <ButtonText
              title="Save"
              size="sm"
              onClick={onClick}
            />
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

export default UserNameModal;
