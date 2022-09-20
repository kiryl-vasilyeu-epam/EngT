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
  <Container border={variants[correction]}>
    <Body>
      {children}
    </Body>
  </Container>
);

const Container = styled(Card)`
  margin: 20px 0;
  border-width: 0px;
  border-radius: 2px;
  border-left-width: 3px;
`;

const Body = styled(Card.Body)`
  display: flex;
  flex-direction: column;
`;

export default ColoredContainer;
