import React from 'react';
import styled from 'styled-components';
import { TEMPLATES_LIST } from 'constants';
import { ButtonText } from 'components';

const TemplatePicker = ({ onPick }) => (
  <Container>
    <Content>
      {TEMPLATES_LIST.map((template) => (
        <ButtonText
          key={template.type}
          title={template.name}
          onClick={() => onPick(template)}
          variant="secondary"
          outline
          withMargin
        />
      ))}
    </Content>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;
const Content = styled.div`
  padding-top: 20px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  @media (max-width: 1100px) {
    width: 80%;
  };
`;

export default TemplatePicker;
