import React, {
  useCallback, useState,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  rearrangeTasks,
} from 'store';
import { COLORS } from 'constants';

const Order = () => {
  const [currentDrag, setCurrentDrag] = useState(null);
  const [withHighlight, setWithHighlight] = useState(null);
  const { list: tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const onDragStart = useCallback((id) => () => {
    setCurrentDrag(id);
  }, []);
  const onDragEnd = useCallback(() => {
    setCurrentDrag(null);
    setWithHighlight(null);
  }, []);

  const onDragEnter = useCallback((id) => () => {
    setWithHighlight(id);
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback((id) => () => {
    if (id !== currentDrag) {
      dispatch(rearrangeTasks({
        from: currentDrag,
        to: id,
      }));
    }

    setWithHighlight(null);
  }, [currentDrag]);

  return (
    <Container>
      {tasks.map(({ title, id }) => (
        <TaskContainer
          key={id}
          onDragOver={onDragOver}
          withHighlight={withHighlight === id}
          onDragEnter={onDragEnter(id)}
          onDrop={onDrop(id)}
        >

          <TitleContainer
            draggable
            onDragStart={onDragStart(id)}
            onDragEnd={onDragEnd}
          >
            {title}
          </TitleContainer>
        </TaskContainer>

      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 5px;
`;
const TitleContainer = styled.div`
  display: block;
  padding: 5px 10px 5px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 2px solid ${COLORS.BORDER_COLOR};
  border-radius: 7px;
`;
const TaskContainer = styled.div`
  display: block;
  padding: 8px 0;

  border-top: 2px solid transparent;
  ${({ withHighlight }) => withHighlight && `border-top: 2px solid ${COLORS.PRIMARY_COLOR};`}
`;

export default Order;
