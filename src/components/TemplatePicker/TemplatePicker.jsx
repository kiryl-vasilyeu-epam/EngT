import React from 'react';
import styled from 'styled-components';
import { TEMPLATES_LIST } from '../../constants';
import ButtonText from '../ButtonText/ButtonText';
import LastScrollElement from '../LastScrollElement/LastScrollElement';

const TemplatePicker = ({ onPick }) => (
  <Container>
    {
      TEMPLATES_LIST.map((template) => (
        <ButtonText
          key={template.type}
          title={template.name}
          onClick={() => onPick(template)}
        />
      ))
    }
    <LastScrollElement />
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

export default TemplatePicker;
