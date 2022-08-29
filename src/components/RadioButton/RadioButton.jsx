import React, { useCallback } from 'react';
import styled from 'styled-components';

const RadioButton = ({ checked, onChange, correct }) => {
  const handleClick = useCallback(() => {
    onChange(!checked);
  }, [checked]);

  return (
    <Container
      checked={checked}
      correct={correct}
      onClick={handleClick}
    >
      {checked && <Content correct={correct} />}
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

  border: 4px solid ${({ checked, correct }) => {
    if (checked && correct) return 'limegreen';
    if (checked) return 'blue';
    return 'black';
  }};

  cursor: pointer;
`;

const Content = styled.div`
  width: 11px;
  height: 11px;

  border-radius: 10px;

  background: ${({ correct }) => (correct ? 'limegreen' : 'blue')};
`;

export default RadioButton;
