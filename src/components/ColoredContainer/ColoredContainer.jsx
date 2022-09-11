import React from 'react';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

const variants = {
  correct: 'success',
  partially: 'warning',
  incorrect: 'danger',
  active: 'primary',
};

const ColoredContainer = ({ correction, children }) => (
  <Container border={variants[correction]} correction={correction}>
    <Body>
      {children}
    </Body>
  </Container>
);

const Container = styled(Card)`
  margin: 15px 0;
  border-width: 2px;
`;

const Body = styled(Card.Body)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default ColoredContainer;
