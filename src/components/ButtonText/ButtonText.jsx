import React from 'react';
import styled from 'styled-components';

const ButtonText = ({
  title,
  onClick,
  withMargin,
  primary,
  withoutRadius,
  width,
}) => (
  <Container
    withMargin={withMargin}
    primary={primary}
    withoutRadius={withoutRadius}
    onClick={onClick}
    width={width}
  >
    {title}
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ width }) => width || '100%'};

  margin: ${({ withMargin }) => (withMargin ? 10 : 0)}px;
  padding: 16px 16px;
  box-sizing: border-box;

  border-radius: ${({ withoutRadius }) => (withoutRadius ? 0 : 10)}px;

  cursor: pointer;

  background: ${({ primary }) => (primary ? 'blue' : 'white')};
  ${({ primary }) => (primary ? 'color: white;' : '')}
  
  box-shadow: 4px 3px 11px 0px rgba(66, 68, 90, 0.5);
`;

export default ButtonText;
