import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';

const IconButton = ({ onClick, iconName }) => (
  <Container onClick={onClick}>
    <FontAwesomeIcon icon={icons[iconName]} />
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  font-size: 25px;

  cursor: pointer;
`;

export default IconButton;
