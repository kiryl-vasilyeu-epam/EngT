import React, { useMemo, useCallback } from 'react';

import {
  USER_ANSWERS,
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
      wide
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
  padding: 20px;
  overflow: auto;
`;

export default UserAnswerModal;
