import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const ButtonText = ({
  title,
  onClick,
  primary,
  secondary,
  size = 'lg',
  fullWidth = false,
  withMargin,
}) => {
  const lightVariant = secondary ? 'outline-secondary' : 'light';

  return (
    <StyledButton
      variant={primary ? 'primary' : lightVariant}
      onClick={onClick}
      size={size}
      $fullWidth={fullWidth}
      $withMargin={withMargin}
    >
      {title}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  ${({ $fullWidth }) => ($fullWidth ? 'width: 100%;' : '')}
  ${({ $withMargin }) => ($withMargin ? 'margin: 10px 0;' : '')}
`;

export default ButtonText;
