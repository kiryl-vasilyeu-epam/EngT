import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  SELECT_TEMPLATE,
  DROPDOWN_TEMPLATE,
  DRAG_N_DROP_TEMPLATE,
  FILL_TEMPLATE,
} from 'constants';
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
  const { tasks: userAnswers } = useSelector((state) => state.userAnswers);
  const { list: tasks } = useSelector((state) => state.tasks);
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
