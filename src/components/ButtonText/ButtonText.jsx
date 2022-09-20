import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const ButtonText = ({
  title,
  onClick,
  variant = 'primary',
  outline,
  size = 'lg',
  fullWidth = false,
  withMargin,
  ...props
}) => {
  const ref = useRef(null);
  const onClickHandler = useCallback(() => {
    ref?.current?.blur?.();
    onClick();
  }, [onClick]);
  return (
    <StyledButton
      ref={ref}
      variant={outline ? `outline-${variant}` : variant}
      onClick={onClickHandler}
      size={size}
      $fullWidth={fullWidth}
      $withMargin={withMargin}
      {...props}
    >
      {title}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  ${({ $fullWidth }) => ($fullWidth ? 'width: 100%;' : '')}
  ${({ $withMargin }) => ($withMargin ? 'margin: 10px 0;' : '')}
  box-shadow:none !important;
  &:focus {
    background: ''  ;
  }
`;

export default ButtonText;
