import React from 'react';
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

const TasksComponent = ({
  data, creator, modalId, viewOnly,
}) => (
  data.map((task) => {
    const Component = COMPONENTS_VARIANT[task.type];
    return (
      <Component
        key={`${task.id}_${creator}`}
        task={task}
        creator={creator}
        modalId={modalId}
        viewOnly={viewOnly}
      />
    );
  })
);

export default TasksComponent;
