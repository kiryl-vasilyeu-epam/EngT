import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import { COLORS, GROUP_NAME_SEPARATOR } from 'constants';
import { SocketContext } from 'features/WebsocketProvider/WebsocketProvider';
import { useDispatch } from 'react-redux';
import { updateLesson, deleteLesson } from 'store';
import { useNavigate } from 'react-router-dom';
import { some } from 'lodash';
import { ButtonText } from '../ButtonText';

const Lesson = ({
  title, sheetId, creator, lessons,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [initName, initGroup] = title.split(GROUP_NAME_SEPARATOR);
  const [name, setName] = useState(initName);
  const [group, setGroup] = useState(initGroup || '');
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const [iName, iGroup] = title.split(GROUP_NAME_SEPARATOR);
    setName(iName);
    setGroup(iGroup || '');
  }, [title]);

  const onClick = useCallback(() => {
    navigate(`${sheetId}`);
  }, [sheetId]);

  const onNameChange = useCallback((e) => {
    setName(e.target.value);
  }, [setName]);
  const onGroupChange = useCallback((e) => {
    setGroup(e.target.value);
  }, [setName]);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const toggleEdit = useCallback((e) => {
    e.stopPropagation();
    setIsEdit(!isEdit);
    const newTitle = `${name}${GROUP_NAME_SEPARATOR}${group}`;
    if (
      isEdit
      && title !== newTitle
      && !some(lessons, ({ title: lTitle }) => lTitle === newTitle)
    ) {
      socket.emit('changeSheetName', JSON.stringify({
        sheetId,
        title: newTitle,
      }));
      dispatch(updateLesson({ sheetId, title: newTitle }));
    }
  }, [setIsEdit, isEdit, name, group, title]);

  const deleteHandler = useCallback((e) => {
    e.stopPropagation();
    socket.emit('deleteSheet', sheetId);
    dispatch(deleteLesson(sheetId));
  }, []);

  return (
    <Container onClick={onClick}>
      <Header>
        <Title>
          {isEdit ? (
            <Input
              value={name}
              onChange={onNameChange}
              onClick={stopPropagation}
            />
          ) : (
            <NameContainer>
              {name}
            </NameContainer>

          )}
        </Title>
        <Group>
          {isEdit ? (
            <Input
              value={group}
              onChange={onGroupChange}
              onClick={stopPropagation}
            />
          ) : (
            <GroupContainer>
              {`Group: ${group || 'none'}`}
            </GroupContainer>
          )}
        </Group>
        {creator && (
          <ButtonsContainer>
            <ButtonText
              size="sm"
              title={isEdit ? 'Save name' : 'Edit name'}
              onClick={toggleEdit}
              outline
            />
            <ButtonText
              size="sm"
              title="Delete"
              onClick={deleteHandler}
              variant="danger"
              outline
            />
          </ButtonsContainer>
        )}
      </Header>
    </Container>
  );
};

export const Input = styled.input`
  padding: 2px 10px;
  width: 100%;
  border-radius: 2px;
  border: 1px solid ${COLORS.BORDER_COLOR};
`;

const NameContainer = styled.div`
  display: block;
  padding: 2px 10px;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: 1px solid transparent;
`;
export const Group = styled.div`
  width: 150px;
`;
const GroupContainer = styled.div`
  padding: 2px 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: 1px solid transparent;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 160px;
  margin-left: 20px;
`;

export const Header = styled(Card.Header)`
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  overflow: hidden;
  margin-right: 10px;
`;

export const Container = styled(Card)`
  margin: 10px 0;
  border-radius: 2px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
  cursor: pointer;
  &: hover {
    background: linear-gradient(133deg, rgba(231,241,254,1) 0%, rgba(201,201,254,1) 100%);
  }
`;

export default Lesson;
