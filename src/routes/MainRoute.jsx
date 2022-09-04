import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Tasks } from 'tasks';
import { CreateTemplateModal } from 'features';
import { ButtonText } from 'components';
import { showModal, setChecked } from 'store';

const MainRoute = ({ creator }) => {
  const [modalId, handleModalId] = useState(null);
  const dispatch = useDispatch();
  const openModal = useCallback(() => {
    dispatch(showModal({ modalId }));
  }, [modalId]);
  const checked = useSelector((state) => state.userAnswers.checked);

  const onCheckHandler = () => {
    dispatch(setChecked(!checked));
  };

  return (
    <Content>
      <Tasks checked={checked} creator={creator} modalId={modalId} />
      {
        creator ? (
          <>
            <ButtonText
              title="Add task"
              outline
              onClick={openModal}
              fullWidth
            />
            <CreateTemplateModal handleModalId={handleModalId} />
          </>
        ) : (
          <ButtonText
            title={checked ? 'Checked' : 'Check'}
            variant={checked ? 'light' : 'primary'}
            onClick={onCheckHandler}
            fullWidth
          />
        )
      }

    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 1000px;

  padding: 20px;
`;

export default MainRoute;
