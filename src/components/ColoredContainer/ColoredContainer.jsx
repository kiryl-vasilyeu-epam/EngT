import React from 'react';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

const variants = {
  correct: 'success',
  partially: 'warning',
  incorrect: 'danger',
};

const ColoredContainer = ({ correction, children }) => (
  <Container border={variants[correction]} correction={correction}>
    <Card.Body>
      {children}
    </Card.Body>
  </Container>
);

const Container = styled(Card)`
  margin: 15px 0;
  border-width: 2px;
`;

export default ColoredContainer;
