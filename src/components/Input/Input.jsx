import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

const Input = ({ value, onChange, placeholder }) => {
  const onChangeHandler = (e) => {
    onChange(e.target.value);
  };

  return (
    <InputElement
      value={value}
      onChange={onChangeHandler}
      placeholder={placeholder}
    />
  );
};

const InputElement = styled(TextareaAutosize)`
  border: 2px solid rgba(0, 0, 0, 0.3);
  background: rgba(0, 0, 0, 0.03);
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
  flex: 1;
`;

export default Input;
