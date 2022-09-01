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
      return '#14A44D';
    } if (correction === 'partially') {
      return '#E4A11B';
    } if (correction === 'incorrect') {
      return '#DC4C64';
    }
    return '#9FA6B2';
  }};
border-radius: 10px;
`;

export default ColoredBorder;
