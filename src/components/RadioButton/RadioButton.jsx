import React, { useCallback } from 'react';
import styled from 'styled-components';

const RadioButton = ({ checked, onChange }) => {
  const handleClick = useCallback(() => {
    onChange(!checked);
  }, [checked]);

  return (
    <Container checked={checked} onClick={handleClick}>
      {checked && <Content />}
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid red;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 16px;
  height: 16px;

  border-radius: 30px;

  border: 4px solid ${({ checked }) => (checked ? 'blue' : 'black')};

  cursor: pointer;
`;

const Content = styled.div`
  width: 11px;
  height: 11px;

  border-radius: 10px;

  background: blue;
`;

export default RadioButton;
