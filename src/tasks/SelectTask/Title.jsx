import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { removeTask, showModal } from 'store';
import {
  IconButton,
} from 'components';

const Title = ({
  id, modalId, title, creator, type,
}) => {
  const dispatch = useDispatch();
  const onDeleteTaskHandler = useCallback(() => {
    dispatch(removeTask(id));
  }, [id]);

  const onEditHandler = useCallback(() => {
    dispatch(showModal({ modalId, params: { taskId: id, type } }));
  }, [dispatch, modalId, id]);

  return (
    <TitleContainer>
      {title}
      {creator && (
      <CreatorButtons>
        <IconButton
          iconName="faPen"
          onClick={onEditHandler}
        />
        <IconButton
          iconName="faTrash"
          onClick={onDeleteTaskHandler}
        />
      </CreatorButtons>

      )}
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const CreatorButtons = styled.div`
  display: flex;
`;

export default Title;
