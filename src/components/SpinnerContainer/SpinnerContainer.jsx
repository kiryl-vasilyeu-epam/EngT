import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';

const SpinnerContainer = ({ children, showSpinner }) => (showSpinner ? (
  <Container>
    <Spinner animation="border" variant="primary" />
  </Container>
) : children);

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default SpinnerContainer;
