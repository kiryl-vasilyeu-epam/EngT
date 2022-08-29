import React from 'react';
import styled from 'styled-components';

const ButtonText = ({ title, onClick }) => (
  <Container onClick={onClick}>
    {title}
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 10px 0;
  padding: 10px 16px;

  border-radius: 10px;

  cursor: pointer;

  background: white;
  
  box-shadow: 4px 3px 11px 0px rgba(66, 68, 90, 0.5);
`;

export default ButtonText;
