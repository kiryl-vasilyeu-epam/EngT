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
        {
          creator && (
            <Controls>
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
              <Margin>
                <ButtonText
                  size="sm"
                  title={isEdit ? 'Save' : 'Edit name'}
                  onClick={toggleEdit}
                  outline
                />
              </Margin>
              <ButtonText
                size="sm"
                title="Delete"
                onClick={deleteHandler}
                variant="danger"
                outline
              />
            </Controls>
          )
        }
      </Header>
    </Container>
  );
};

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

export const Header = styled(Card.Header)`
  display: flex;
  /*Desktop Query*/
  @media only screen and (min-width: 780px) {
    align-items: center;
  }

  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }

  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:780px) {
    flex-direction: column;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  overflow: hidden;

  /*Desktop Query*/
  @media only screen and (min-width: 780px) {
    margin-right: 10px;
  }
`;

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

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    padding-top: 10px;
  }

  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:780px) {
    padding-top: 10px;
  }
`;

export const Group = styled.div`
  flex: 1;

  /*Desktop Query*/
  @media only screen and (min-width: 780px) {
    width: 150px;
  }

  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    margin-right: 10px;
  }

  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:780px) {
    margin-right: 10px;
  }
`;

const GroupContainer = styled.div`
  padding: 2px 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: 1px solid transparent;
`;

const Margin = styled.div`
  margin: 0 10px;
`;

export default Lesson;
