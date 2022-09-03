import { COLORS } from 'constants';
import React from 'react';
import styled from 'styled-components';

const ColoredBorder = ({ correction, children }) => (
  <Container correction={correction}>
    {children}
  </Container>
);

const Container = styled.div`
  padding: 10px;
  margin: 15px 0;
  border: 2px solid ${({ correction }) => {
    if (correction === 'correct') {
      return COLORS.SUCCESS_COLOR;
    } if (correction === 'partially') {
      return COLORS.WARNING_COLOR;
    } if (correction === 'incorrect') {
      return COLORS.ERROR_COLOR;
    }
    return COLORS.BORDER_COLOR;
  }};
  border-radius: 10px;
`;

export default ColoredBorder;
