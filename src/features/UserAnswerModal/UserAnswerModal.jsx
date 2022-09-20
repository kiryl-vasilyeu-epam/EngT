import React, { useMemo, useCallback } from 'react';

import {
  USER_ANSWERS,
  COLORS,
} from 'constants';
import { find } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from 'store';
import { TasksComponent } from 'tasks';
import styled from 'styled-components';
import { ModalWindow } from '../ModalWindow';

const UserAnswerModal = () => {
  const params = useSelector((state) => find(state.modal, { id: USER_ANSWERS })?.params);
  const dispatch = useDispatch();
  const handleClose = useCallback(() => dispatch(hideModal({ modalId: USER_ANSWERS })));
  const data = useSelector((state) => find(
    state.appConnection.activeUsers,
    ([userName]) => userName === params?.userName,
  ));
  const dataToRender = useMemo(() => JSON.parse(data?.[1] || '{}')?.tasks || [], [data]);

  return (
    <ModalWindow
      title={params?.userName}
      id={USER_ANSWERS}
      onClose={handleClose}
      size="large"
    >
      <ScrollableContainer>
        <TasksComponent data={dataToRender} viewOnly />
      </ScrollableContainer>
    </ModalWindow>
  );
};

const ScrollableContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  
  /*Desktop Query*/
  @media only screen and (min-width: 768px) {
    padding: 20px;
  }
  
  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    padding: 20px 5px;
  }
  
  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:768px) {
    padding: 20px 5px;
  }
  overflow: auto;
  background: ${COLORS.BG_GRADIENT};
`;

export default UserAnswerModal;
