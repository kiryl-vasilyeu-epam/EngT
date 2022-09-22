import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import { SocketContext } from 'features/WebsocketProvider/WebsocketProvider';
import { SpinnerContainer } from 'components';
import { some } from 'lodash';
import { GROUP_NAME_SEPARATOR } from 'constants';
import { ButtonText } from '../ButtonText';
import {
  Container,
  Header,
  Title,
  Input,
  Group,
} from './Lesson';

const CreateLesson = ({ lessons }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');

  const socket = useContext(SocketContext);

  const onNameChange = useCallback((e) => {
    setName(e.target.value);
  }, [setName]);
  const onGroupChange = useCallback((e) => {
    setGroup(e.target.value);
  }, [setGroup]);

  useEffect(() => {
    setIsLoading(false);
  }, [lessons.length]);

  const toggleEdit = useCallback(() => {
    if (isLoading) return;
    setIsEdit((ed) => !ed);
    setName('');
    setGroup('');
  }, [isLoading]);

  const createLesson = useCallback((e) => {
    e.stopPropagation();
    setIsEdit(false);
    setName('');
    const newTitle = `${name}${GROUP_NAME_SEPARATOR}${group}`;

    if (!some(
      lessons,
      ({ title }) => title.toLowerCase() === newTitle.toLowerCase(),
    )) {
      setIsLoading(true);
      socket.emit('addSheet', newTitle);
    }
  }, [name, group]);

  const onTitleClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (lessons.length === 190) return null;

  return (
    <Container onClick={toggleEdit}>
      <Header>
        <SpinnerContainer showSpinner={isLoading}>
          {isEdit ? (
            <>
              <Title onClick={onTitleClick}>
                <Input
                  value={name}
                  onChange={onNameChange}
                />
              </Title>
              <Group onClick={onTitleClick}>
                <Input
                  value={group}
                  onChange={onGroupChange}
                />
              </Group>
              <ButtonsContainer>
                <ButtonText
                  size="sm"
                  title="Create"
                  onClick={createLesson}
                  outline
                />
              </ButtonsContainer>
            </>
          ) : (
            <NameContainer>
              Add new lesson
            </NameContainer>
          )}
        </SpinnerContainer>
      </Header>
    </Container>
  );
};

const NameContainer = styled.div`
  flex: 1;
  text-align: center;
  padding: 2px 10px;
  border: 1px solid transparent;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80px;
  margin-left: 20px;
`;

export default CreateLesson;
