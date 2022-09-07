import React, {
  useRef, useCallback, useEffect, useState,
} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Input = ({
  value, onChange, placeholder, secure, ...inputProps
}) => {
  const ref = useRef(null);
  const [height, setHeight] = useState('inherit');
  const onChangeHandler = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);

  useEffect(() => {
    if (secure) return;
    const actualHeight = ref.current.scrollHeight;
    if (actualHeight === height) return;

    if (height === 'inherit') {
      setHeight(actualHeight);
    } else {
      setHeight('inherit');
    }
  }, [value, height, ref]);

  return (
    <InputGroup>
      <Form.Control
        ref={ref}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        as={secure ? 'input' : 'textarea'}
        rows={1}
        style={{ height, borderWidth: 2 }}
        type="password"
        {...inputProps}
      />
    </InputGroup>

  );
};

export default Input;
