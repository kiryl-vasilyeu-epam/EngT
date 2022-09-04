import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { removeTask, showModal } from 'store';
import {
  ButtonText,
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
        <ButtonText
          size="sm"
          title="Edit"
          onClick={onEditHandler}
          outline
        />
        <Margin>
          <ButtonText
            size="sm"
            title="Delete"
            onClick={onDeleteTaskHandler}
            variant="danger"
            outline
          />
        </Margin>

      </CreatorButtons>

      )}
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  font-weight: 500;
`;

const CreatorButtons = styled.div`
  display: flex;
`;
const Margin = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 30px;
`;

export default Title;
