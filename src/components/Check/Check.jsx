import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';

const Check = ({
  checked, onChange, disabled, isValid, radio,
}) => {
  const handleClick = useCallback(() => {
    onChange(!checked);
  }, [checked, onChange]);

  return (
    <Form.Check
      checked={checked}
      onChange={handleClick}
      disabled={disabled}
      isValid={checked && isValid}
      type={radio ? 'radio' : 'checkbox'}
    />
  );
};

export default Check;
