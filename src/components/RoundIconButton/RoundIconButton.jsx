import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { noop } from 'lodash';
import Button from 'react-bootstrap/Button';

const RoundIconButton = ({
  onClick = noop, small, minus, secondary, ...props
}) => {
  const mainType = secondary ? 'light' : 'primary';
  return (
    <Container
      onClick={onClick}
      size="sm"
      $small={small}
      variant={small ? `outline-${mainType}` : `${mainType}`}
      {...props}
    >
      <FontAwesomeIcon icon={minus ? faMinus : faPlus} />
    </Container>
  );
};

const Container = styled(Button)`
  border-radius: 15px;
  box-shadow:none !important;
  ${({ $small }) => ($small ? `
    display: flex;
    width: 25px;
    height: 25px;
    font-size: 13px;
    align-items: center;
    justify-content: center;
  ` : '')}
`;

export default RoundIconButton;
