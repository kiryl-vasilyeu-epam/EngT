import React from 'react';
import styled from 'styled-components';
import { TEMPLATES_LIST, COLORS } from 'constants';
import { ButtonText } from 'components';

const TemplatePicker = ({ onPick }) => (
  <Container>
    <Content>
      {TEMPLATES_LIST.map((template) => (
        <ButtonText
          key={template.type}
          title={template.name}
          onClick={() => onPick(template)}
          variant="primary"
          withMargin
        />
      ))}
    </Content>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  background: ${COLORS.BG_GRADIENT};
`;
const Content = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  /*Desktop Query*/
  @media only screen and (min-width: 780px) {
    width: 80%;
    max-width: 800px;
  }
`;

export default TemplatePicker;
