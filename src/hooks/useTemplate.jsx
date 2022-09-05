import { useEffect, useCallback } from 'react';
import { find, uniqueId } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask, initTemplate, deleteTemplate, modifyTemplate, modifyTask,
} from 'store';

export const useTemplate = ({ taskId, type, onSave }) => {
  const task = useSelector((state) => find(state.tasks.list, { id: taskId }));
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

  const addMedia = useCallback(() => {
    updateTemplate({ media: [...template.media, { url: '', id: uniqueId('url_') }] });
  }, [template]);

  const setMedia = useCallback((id, url) => {
    updateTemplate({
      media: template.media.map(
        (media) => (media.id === id
          ? { ...media, url }
          : media),
      ),
    });
  }, [template]);

  const deleteMedia = useCallback((mediaId) => {
    updateTemplate({
      media: template.media.filter(({ id }) => id !== mediaId),
    });
  }, [template]);

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
    addMedia,
    setMedia,
    deleteMedia,
  };
};
