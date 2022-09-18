import React, { useCallback, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ButtonText } from 'components';
import { COLORS } from 'constants';
import { TextField } from 'features';
import { useFilePicker } from 'use-file-picker';
import { SocketContext } from 'features/WebsocketProvider/WebsocketProvider';
import { useDispatch } from 'react-redux';
import { initTasks } from 'store';
import { debounce } from 'lodash';

const CreatorsControls = ({
  tasks, id, openModal,
}) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    accept: '.json',
    multiple: false,
  });

  const debounceTasksUpdate = useCallback(debounce((tasksState) => {
    socket.emit('updateTasks', JSON.stringify(tasksState));
  }, 500), []);

  const onClick = useCallback(() => {
    debounceTasksUpdate({ tasksId: id, tasks });
  }, [debounceTasksUpdate, tasks]);

  const downloadState = useCallback(() => {
    const jsonString = `data:text/json;chatset=utf-8,${JSON.stringify({
      tasks,
      id,
    })}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'Lesson.json';

    link.click();
  }, [tasks, id]);
  const content = filesContent?.[0]?.content;

  useEffect(() => {
    if (loading || !content) return;
    try {
      const { tasks: loadedTasks, id: loadedId } = JSON.parse(content);
      if (loadedTasks && loadedId && id !== loadedId) {
        dispatch(initTasks({
          id: loadedId, list: loadedTasks,
        }));
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Wrong file format', e);
    }
  }, [content, loading]);

  return (
    <Controls>
      <TextField creator />
      <Buttons>
        <ButtonContainer>
          <ButtonText
            title="Download"
            onClick={downloadState}
            outline
            fullWidth
          />
        </ButtonContainer>

        <ButtonContainer>
          <ButtonText
            title="Upload"
            outline
            onClick={openFileSelector}
            fullWidth
            type="file"
          />
        </ButtonContainer>

        <ButtonContainer>
          <ButtonText
            title="Save"
            outline
            onClick={onClick}
            fullWidth
            type="file"
          />
        </ButtonContainer>

        <ButtonContainer>
          <ButtonText
            title="Add task"
            onClick={openModal}
            fullWidth
          />
        </ButtonContainer>
      </Buttons>
    </Controls>
  );
};

const Controls = styled.div`
  width: 80%;
  bottom: 0;
  padding-bottom: 20px;
  position: absolute;
  background-color: ${COLORS.BACKGROUND_COLOR};
  z-index: 2;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 1100px) {
    flex-direction: column;
  };
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 10px 10px 0 10px;
  @media (max-width: 1100px) {
    margin: 5px;
  };
  flex: 1;
`;

export default CreatorsControls;
