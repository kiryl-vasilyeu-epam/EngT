import React, { useCallback, useEffect, useState } from 'react';

import { TemplatePicker, SelectTemplate, DropdownTemplate } from 'templates';

import {
  SELECT_TEMPLATE,
  DROPDOWN_TEMPLATE,
  DRAG_N_DROP_TEMPLATE,
  FILL_THE_WORD_TEMPLATE,
  TEMPLATES_LIST,
} from 'constants';
import { find } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from 'store';
import { ModalWindow } from '../ModalWindow';
import { DEFAULT_TITLE, TEMPLATE_PICK } from './constants';

const COMPONENTS_VARIANT = {
  [TEMPLATE_PICK]: ({ onTemplatePress }) => <TemplatePicker onPick={onTemplatePress} />,
  [SELECT_TEMPLATE]: ({ onSave, taskId }) => <SelectTemplate onSave={onSave} taskId={taskId} />,
  [DROPDOWN_TEMPLATE]: ({ onSave, taskId }) => <DropdownTemplate onSave={onSave} taskId={taskId} />,
  [DRAG_N_DROP_TEMPLATE]: ({ onTemplatePress }) => <TemplatePicker onPick={onTemplatePress} />,
  [FILL_THE_WORD_TEMPLATE]: ({ onTemplatePress }) => <TemplatePicker onPick={onTemplatePress} />,
};

const defaultTemplate = {
  title: DEFAULT_TITLE, type: TEMPLATE_PICK,
};

const CreateTemplateModal = ({ handleModalId }) => {
  const [modalId, setModalId] = useState(null);
  const params = useSelector((state) => find(state.modal, { id: modalId })?.params);
  const dispatch = useDispatch();
  const [currentTemplate, setCurrentTemplate] = useState(defaultTemplate);

  useEffect(() => {
    handleModalId(modalId);
  }, [modalId]);

  useEffect(() => {
    if (params?.type) {
      setCurrentTemplate(find(TEMPLATES_LIST, { type: params.type }));
    } else {
      setCurrentTemplate(defaultTemplate);
    }
  }, [params]);

  const onTemplatePress = useCallback((template) => {
    setCurrentTemplate(template);
  }, []);

  const resetData = useCallback(() => {
    setCurrentTemplate(defaultTemplate);
  }, []);

  const onSave = () => {
    resetData();
    dispatch(hideModal({ modalId }));
  };

  const currentComponent = COMPONENTS_VARIANT[currentTemplate.type]({
    onTemplatePress,
    onSave,
    taskId: params?.taskId,
  });

  const isOnTemplatePicker = currentTemplate.type !== TEMPLATE_PICK && !params;

  return (
    <ModalWindow
      title={currentTemplate.title}
      showBackButton={isOnTemplatePicker}
      onBackPress={resetData}
      setModalId={setModalId}
      onClose={resetData}
    >
      {currentComponent}
    </ModalWindow>
  );
};

export default CreateTemplateModal;
