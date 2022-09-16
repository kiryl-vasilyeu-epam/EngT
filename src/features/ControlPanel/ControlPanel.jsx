import React, {
  useCallback, useEffect, useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {
  initModal, hideModal, deleteModal,
  setOnlineUsers,
  setActiveUsers,
} from 'store';
import { CONTROL_PANEL } from 'constants';
import { find } from 'lodash';
import { SocketContext } from 'features/WebsocketProvider/WebsocketProvider';
import Accordion from 'react-bootstrap/Accordion';
import Order from './Order';
import Users from './Users';

const ControlPanel = () => {
  const visible = useSelector((state) => find(state.modal, { id: CONTROL_PANEL })?.visible);

  const dispatch = useDispatch();
  const handleClose = useCallback(() => dispatch(hideModal({ modalId: CONTROL_PANEL })));

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('loadOnlineUsers', (users) => {
      const onlineUsers = JSON.parse(users);
      dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on('loadActiveUsers', (users) => {
      const activeUsers = JSON.parse(users);
      dispatch(setActiveUsers(activeUsers));
    });
    dispatch(initModal(CONTROL_PANEL));
    return () => {
      dispatch(deleteModal(CONTROL_PANEL));
    };
  }, []);

  return (
    <Offcanvas show={visible} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Tasks</Accordion.Header>
            <Accordion.Body>
              <Order />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Users</Accordion.Header>
            <Accordion.Body>
              <Users handleClose={handleClose} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Offcanvas.Body>
    </Offcanvas>

  );
};

export default ControlPanel;
