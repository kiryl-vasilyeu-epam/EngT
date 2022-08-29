import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Checkbox = ({ checked, onChange, correct }) => {
  const handleClick = useCallback(() => {
    onChange(!checked);
  }, [checked]);
  return (
    <Container checked={checked} onClick={handleClick} correct={correct}>
      {checked && <FontAwesomeIcon icon={faCheck} />}
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid red;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 20px;
  height: 20px;

  border-radius: 8px;

  border: 3px solid ${({ checked, correct }) => {
    if (checked && correct) return 'limegreen';
    if (checked) return 'blue';
    return 'black';
  }};
  background: ${({ checked, correct }) => {
    if (checked && correct) return 'limegreen';
    if (checked) return 'blue';
    return 'transparent';
  }};
  color: ${({ checked, correct }) => ((checked || correct) ? 'white' : 'black')};

  font-size: 23px;

  cursor: pointer;
`;

export default Checkbox;
