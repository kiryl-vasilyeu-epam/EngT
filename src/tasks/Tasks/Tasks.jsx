/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  SELECT_TEMPLATE,
  DROPDOWN_TEMPLATE,
  DRAG_N_DROP_TEMPLATE,
  FILL_THE_WORD_TEMPLATE,
  AUDIO_VIDEO_TEMPLATE,
} from 'constants';
import { SelectTask } from '../SelectTask';

const COMPONENTS_VARIANT = {
  [SELECT_TEMPLATE]: SelectTask,
  [DROPDOWN_TEMPLATE]: SelectTask,
  [DRAG_N_DROP_TEMPLATE]: SelectTask,
  [FILL_THE_WORD_TEMPLATE]: SelectTask,
  [AUDIO_VIDEO_TEMPLATE]: SelectTask,
};

const Tasks = ({
  creator, checked, userAnswers,
}) => {
  const tasks = useSelector((state) => state.tasks);

  return (
    <Container>
      {tasks.map((task, index) => {
        const Component = COMPONENTS_VARIANT[task.type];
        return (
          <Component
            key={task.id}
            index={index}
            task={task}
            creator={creator}
            checked={checked}
            initialUserAnswer={userAnswers?.[index]}
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
