import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { noop } from 'lodash';

const RoundIconButton = ({ onClick = noop }) => (
  <Button onClick={onClick}>
    <FontAwesomeIcon icon={faPlus} />
  </Button>
);

const Button = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  width: 45px;
  height: 45px;

  font-size: 25px;

  cursor: pointer;

  border-radius: 14px;
  background: white;

  box-shadow: 4px 3px 10px 0px rgba(66, 68, 90, 0.7);
`;

export default RoundIconButton;
