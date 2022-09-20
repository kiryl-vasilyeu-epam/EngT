import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, USER_ANSWERS } from 'constants';
import { some } from 'lodash';
import { showModal } from 'store';

const Users = ({ handleClose }) => {
  const { onlineUsers, activeUsers } = useSelector((state) => state.appConnection);
  const dispatch = useDispatch();
  const openUserModal = useCallback((userName) => () => {
    dispatch(showModal({ modalId: USER_ANSWERS, params: { userName } }));
    handleClose();
  }, [handleClose]);

  return (
    <Container>
      {
        activeUsers.map(([userName]) => (
          <UserName
            key={userName}
            onClick={openUserModal(userName)}
          >
            <Online isOnline={some(onlineUsers, ({ name }) => name === userName)} />
            {userName}
          </UserName>
        ))
      }
    </Container>
  );
};

const Container = styled.div`
`;
const UserName = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  margin: 10px 0;
  cursor: pointer;
`;
const Online = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 12px;
  margin-right: 5px;
  margin-top: 4px;
  ${({ isOnline }) => isOnline && `background-color: ${COLORS.SUCCESS_COLOR};`}
`;

export default Users;
