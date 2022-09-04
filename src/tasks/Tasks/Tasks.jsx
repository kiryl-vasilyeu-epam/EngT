import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  SELECT_TEMPLATE,
  DROPDOWN_TEMPLATE,
  DRAG_N_DROP_TEMPLATE,
  FILL_TEMPLATE,
} from 'constants';
import { initUserAnswers } from 'store';
import { SelectTask } from '../SelectTask';
import { FillTask } from '../FillTask';
import { DropdownTask } from '../DropdownTask';
import { DragNDropTask } from '../DragNDropTask';

const COMPONENTS_VARIANT = {
  [SELECT_TEMPLATE]: SelectTask,
  [DROPDOWN_TEMPLATE]: DropdownTask,
  [DRAG_N_DROP_TEMPLATE]: DragNDropTask,
  [FILL_TEMPLATE]: FillTask,
};

const Tasks = ({
  creator, checked, modalId,
}) => {
  const userAnswers = useSelector((state) => state.userAnswers.tasks);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!creator) {
      dispatch(initUserAnswers(tasks));
    }
  }, [tasks, creator]);
  const data = creator ? tasks : userAnswers;

  return (
    <Container>
      {data.map((task) => {
        const Component = COMPONENTS_VARIANT[task.type];
        return (
          <Component
            key={`${task.id}_${creator}`}
            task={task}
            creator={creator}
            checked={checked}
            modalId={modalId}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  flex: 1;
`;

export default Tasks;
