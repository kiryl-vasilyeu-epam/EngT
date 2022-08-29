import React, { useCallback, useState } from 'react';

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

const CreateTemplateModal = ({ setOpen }) => {
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [currentTemplate, setCurrentTemplate] = useState(TEMPLATE_PICK);
  const [closeModal, setCloseModal] = useState(null);

  const onTemplatePress = useCallback((template) => {
    setTitle(template.name);
    setCurrentTemplate(template.type);
  }, []);
  const resetData = useCallback(() => {
    setTitle(DEFAULT_TITLE);
    setCurrentTemplate(TEMPLATE_PICK);
  }, []);

  const onSave = () => {
    resetData();
    closeModal();
  };

  const currentComponent = COMPONENTS_VARIANT[currentTemplate]({
    onTemplatePress,
    onSave,
  });

  const isOnTemplatePicker = currentTemplate !== TEMPLATE_PICK;

  return (
    <ModalWindow
      setOpen={setOpen}
      setClose={setCloseModal}
      onClose={resetData}
      title={title}
      showBackButton={isOnTemplatePicker}
      onBackPress={resetData}
    >
      {currentComponent}
    </ModalWindow>
  );
};

export default CreateTemplateModal;
