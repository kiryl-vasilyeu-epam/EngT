import React, { useCallback, useEffect, useState } from 'react';

import ModalWindow from '../ModalWindow/ModalWindow';
import TemplatePicker from '../TemplatePicker/TemplatePicker';

import { DEFAULT_TITLE, TEMPLATE_PICK } from './constants';
import {
  SELECT_TEMPLATE,
  DROPDOWN_TEMPLATE,
  DRAG_N_DROP_TEMPLATE,
  FILL_THE_WORD_TEMPLATE,
  AUDIO_VIDEO_TEMPLATE,
} from '../../constants';
import SelectTemplate from '../../templates/SelectTemplate/SelectTemplate';

const COMPONENTS_VARIANT = {
  [TEMPLATE_PICK]: ({ onTemplatePress }) => <TemplatePicker onPick={onTemplatePress} />,
  [SELECT_TEMPLATE]: ({ onSave }) => <SelectTemplate onSave={onSave} />,
  [DROPDOWN_TEMPLATE]: ({ onTemplatePress }) => <TemplatePicker onPick={onTemplatePress} />,
  [DRAG_N_DROP_TEMPLATE]: ({ onTemplatePress }) => <TemplatePicker onPick={onTemplatePress} />,
  [FILL_THE_WORD_TEMPLATE]: ({ onTemplatePress }) => <TemplatePicker onPick={onTemplatePress} />,
  [AUDIO_VIDEO_TEMPLATE]: ({ onTemplatePress }) => <TemplatePicker onPick={onTemplatePress} />,
};

const defaultTemplate = {
  title: DEFAULT_TITLE, type: TEMPLATE_PICK,
};

const CreateTemplateModal = ({ handleModalId }) => {
  const [currentTemplate, setCurrentTemplate] = useState(defaultTemplate);
  const [modalId, setModalId] = useState(null);
  useEffect(() => {
    handleModalId(modalId);
  }, [modalId]);

  const onTemplatePress = useCallback((template) => {
    setCurrentTemplate(template);
  }, []);

  const resetData = useCallback(() => {
    setCurrentTemplate(defaultTemplate);
  }, []);

  const onSave = () => {
    resetData();
  };

  const currentComponent = COMPONENTS_VARIANT[currentTemplate.type]({
    onTemplatePress,
    onSave,
  });

  const isOnTemplatePicker = currentTemplate.type !== TEMPLATE_PICK;

  return (
    <ModalWindow
      title={currentTemplate.title}
      showBackButton={isOnTemplatePicker}
      onBackPress={resetData}
      setModalId={setModalId}
    >
      {currentComponent}
    </ModalWindow>
  );
};

export default CreateTemplateModal;
