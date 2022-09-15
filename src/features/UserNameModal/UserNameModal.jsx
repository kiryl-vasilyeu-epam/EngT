import { ButtonText, Input } from 'components';
import { ENDPOINT, LOCAL_STORAGE_KEYS, USER_NAME } from 'constants';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initUserAnswers, showModal, hideModal } from 'store';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';
import { ModalWindow } from '../ModalWindow';

const UserNameModal = ({ setUserName }) => {
  const { userName: defaultUserName } = useSelector((store) => store.userAnswers);
  const [inputValue, setInputValue] = useState(defaultUserName);
  const [loading, setLoading] = useState(null);
  const dispatch = useDispatch();

  const loadUserAnswer = useCallback(async (name) => {
    setLoading(true);
    try {
      const res = await fetch(`${ENDPOINT}/userAnswer/?username=${encodeURIComponent(name)}`);
      const resJson = await res.json();
      const { userName, tasks } = resJson;
      dispatch(initUserAnswers({
        userName,
        tasks: JSON.parse(tasks),
      }));

      setUserName(name);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USERNAME, name);
      dispatch(hideModal({ modalId: USER_NAME }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const userName = localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME);
    if (userName) {
      loadUserAnswer(userName);
    } else {
      dispatch(showModal({ modalId: USER_NAME }));
    }
  }, [setUserName]);

  const closeModal = useCallback(() => {
    dispatch(hideModal({ modalId: USER_NAME }));
  }, []);

  const onClick = useCallback(async () => {
    loadUserAnswer(inputValue);
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
              title={
              loading
                ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )
                : 'Save'
            }
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
