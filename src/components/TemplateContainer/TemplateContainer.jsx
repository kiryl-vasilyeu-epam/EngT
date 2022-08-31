import React from 'react';
import styled from 'styled-components';

import { ButtonText } from '../ButtonText';
import { Input } from '../Input';

const TemplateContainer = ({
  children, handleSave, title, setTitle,
}) => (
  <>
    <ScrollableContainer>
      <Row>
        <Title>Exercise Title:</Title>
        <Input
          value={title}
          onChange={setTitle}
          placeholder="Enter lesson title"
        />
      </Row>

      {children}
    </ScrollableContainer>

    <ButtonText
      title="Save"
      onClick={handleSave}
      primary
      fullWidth
    />
  </>
);

const ScrollableContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  overflow: auto;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-right: 10px;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

export default TemplateContainer;
