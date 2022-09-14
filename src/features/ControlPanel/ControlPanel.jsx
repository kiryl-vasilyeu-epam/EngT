import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {
  initModal, hideModal, deleteModal, rearrangeTasks,
} from 'store';
import { CONTROL_PANEL } from 'constants';
import { find } from 'lodash';

const ControlPanel = () => {
  const [currentDrag, setCurrentDrag] = useState(null);
  const [withHighlight, setWithHighlight] = useState(null);
  const { list: tasks } = useSelector((state) => state.tasks);
  const visible = useSelector((state) => find(state.modal, { id: CONTROL_PANEL })?.visible);

  const dispatch = useDispatch();
  const handleClose = useCallback(() => dispatch(hideModal({ modalId: CONTROL_PANEL })));

  useEffect(() => {
    dispatch(initModal(CONTROL_PANEL));
    return () => {
      dispatch(deleteModal(CONTROL_PANEL));
    };
  }, []);

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
    dispatch(rearrangeTasks({
      from: currentDrag,
      to: id,
    }));
    setWithHighlight(null);
  }, [currentDrag]);

  return (
    <Offcanvas show={visible} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Container>
          {tasks.map(({ title, id }) => (
            <TitleContainer
              key={id}
              draggable
              withHighlight={withHighlight === id}
              onDragStart={onDragStart(id)}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter(id)}
              onDragOver={onDragOver}
              onDrop={onDrop(id)}
            >
              {title}
            </TitleContainer>
          ))}
        </Container>
      </Offcanvas.Body>
    </Offcanvas>

  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  display: block;
  padding: 5px 10px 5px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-top: 2px solid transparent;
  ${({ withHighlight }) => withHighlight && 'border-top: 2px solid blue;'}
`;

export default ControlPanel;
