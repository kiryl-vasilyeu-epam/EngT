import { useEffect, useCallback } from 'react';
import { find } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask, initTemplate, deleteTemplate, modifyTemplate, modifyTask,
} from 'store';

export const useTemplate = ({ taskId, type, onSave }) => {
  const task = useSelector((state) => find(state.tasks, { id: taskId }));
  const dispatch = useDispatch();
  const template = useSelector((state) => state.template);

  useEffect(() => {
    dispatch(initTemplate({ type, task }));
    return () => {
      dispatch(deleteTemplate());
    };
  }, []);

  const updateTemplate = useCallback((...args) => {
    dispatch(modifyTemplate(...args));
  }, [dispatch]);

  const setTitle = useCallback((templateTitle) => {
    updateTemplate({ title: templateTitle });
  }, []);

  const handleSave = useCallback(() => {
    if (taskId) {
      dispatch(modifyTask(template));
    } else {
      dispatch(addTask(template));
    }
    dispatch(deleteTemplate());
    onSave();
  }, [template]);

  return {
    setTitle,
    updateTemplate,
    template,
    handleSave,
  };
};
