import React from 'react';
import styled from 'styled-components';
import { TemplateContainer } from 'components';
import { useTemplate } from 'hooks';
import { DROPDOWN_TEMPLATE } from 'constants';

const DropdownTemplate = ({ onSave, taskId }) => {
  const {
    setTitle,
    // updateTemplate,
    template,
    handleSave,
  } = useTemplate({ onSave, taskId, type: DROPDOWN_TEMPLATE });

  const { title } = template;

  return (
    <TemplateContainer
      handleSave={handleSave}
      title={title}
      setTitle={setTitle}
    >
      <Container>
        Hi
      </Container>
    </TemplateContainer>
  );
};

const Container = styled.div`
  border: 5px solid red;
`;

export default DropdownTemplate;
