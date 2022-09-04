import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Tasks } from 'tasks';
import { CreateTemplateModal } from 'features';
import { RoundIconButton, ButtonText } from 'components';
import { showModal, setChecked } from 'store';
import { COLORS } from 'constants';

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
      <Tasks creator={creator} modalId={modalId} />
      {
        creator ? (
          <>
            <ButtonContainer>
              <RoundIconButton onClick={openModal} />
            </ButtonContainer>
            <CreateTemplateModal handleModalId={handleModalId} />
          </>
        ) : (
          <ButtonText
            title={checked ? 'Checked' : 'Check'}
            primary={!checked}
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
  max-width: 1200px;

  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid ${COLORS.BORDER_COLOR};
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
`;

export default MainRoute;
