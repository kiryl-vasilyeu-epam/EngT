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
  creator, modalId,
}) => {
  const { tasks: userAnswers, id: userAnswersId } = useSelector((state) => state.userAnswers);
  const { list: tasks, id: tasksId } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!creator && userAnswersId !== tasksId) {
      dispatch(initUserAnswers({ tasks, id: tasksId }));
    }
  }, [tasks, creator, tasksId, userAnswersId]);
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
