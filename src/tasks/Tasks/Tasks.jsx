import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  SELECT_TEMPLATE,
  DROPDOWN_TEMPLATE,
  DRAG_N_DROP_TEMPLATE,
  FILL_THE_WORD_TEMPLATE,
} from 'constants';
import { initUserAnswers } from 'store';
import { SelectTask } from '../SelectTask';
import { DropdownTask } from '../DropdownTask';

const COMPONENTS_VARIANT = {
  [SELECT_TEMPLATE]: SelectTask,
  [DROPDOWN_TEMPLATE]: DropdownTask,
  [DRAG_N_DROP_TEMPLATE]: SelectTask,
  [FILL_THE_WORD_TEMPLATE]: SelectTask,
};

const Tasks = ({
  creator, checked, modalId,
}) => {
  const userAnswers = useSelector((state) => state.userAnswers.tasks);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userAnswers.length || userAnswers.length !== tasks.length) {
      dispatch(initUserAnswers(tasks));
    }
  }, [tasks, userAnswers]);
  const data = creator ? tasks : userAnswers;

  return (
    <Container>
      {data.map((task) => {
        const Component = COMPONENTS_VARIANT[task.type];
        return (
          <Component
            key={task.id}
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
