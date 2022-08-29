import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Checkbox = ({ checked, onChange }) => {
  const handleClick = useCallback(() => {
    onChange(!checked);
  }, [checked]);
  return (
    <Container checked={checked} onClick={handleClick}>
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

  border: 3px solid ${({ checked }) => (checked ? 'blue' : 'black')};
  background: ${({ checked }) => (checked ? 'blue' : 'transparent')};
  color: ${({ checked }) => (checked ? 'white' : 'black')};

  font-size: 23px;

  cursor: pointer;
`;

export default Checkbox;
