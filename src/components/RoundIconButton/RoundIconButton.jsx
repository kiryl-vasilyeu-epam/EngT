import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { noop } from 'lodash';
import Button from 'react-bootstrap/Button';

const RoundIconButton = ({ onClick = noop }) => (
  <Container onClick={onClick} size="sm">
    <FontAwesomeIcon icon={faPlus} />
  </Container>
);

const Container = styled(Button)`
  border-radius: 15px;
`;

export default RoundIconButton;
