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
    <Container>
      <TitleContainer>
        {title}
      </TitleContainer>
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
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 23px;

  @media only screen and (max-width: 480px) {
    font-size: 20px;
  }
  
  font-weight: 500;
  padding: 15px 0;
`;

const TitleContainer = styled.div`

`;

const CreatorButtons = styled.div`
  margin-top: 3px;
  display: flex;
`;

const Margin = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 10px;
`;

export default Title;
