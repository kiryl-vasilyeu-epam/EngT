import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

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
  [SELECT_TEMPLATE]: ({ onTemplatePress }) => <SelectTemplate onPick={onTemplatePress} />,
  [DROPDOWN_TEMPLATE]: ({ onTemplatePress }) => <TemplatePicker onPick={onTemplatePress} />,
  [DRAG_N_DROP_TEMPLATE]: ({ onTemplatePress }) => <TemplatePicker onPick={onTemplatePress} />,
  [FILL_THE_WORD_TEMPLATE]: ({ onTemplatePress }) => <TemplatePicker onPick={onTemplatePress} />,
  [AUDIO_VIDEO_TEMPLATE]: ({ onTemplatePress }) => <TemplatePicker onPick={onTemplatePress} />,
};

const CreateTemplateModal = ({ setOpen }) => {
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [currentTemplate, setCurrentTemplate] = useState(TEMPLATE_PICK);

  const onTemplatePress = useCallback((template) => {
    setTitle(template.name);
    setCurrentTemplate(template.type);
  }, []);

  const resetData = useCallback(() => {
    setTitle(DEFAULT_TITLE);
    setCurrentTemplate(TEMPLATE_PICK);
  }, []);

  const currentComponent = COMPONENTS_VARIANT[currentTemplate]({
    onTemplatePress,
  });

  return (
    <ModalWindow setOpen={setOpen} onClose={resetData} title={title}>
      <Container>
        {currentComponent}
      </Container>
    </ModalWindow>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;

  padding: 20px;
  overflow-y: auto;
`;

export default CreateTemplateModal;
