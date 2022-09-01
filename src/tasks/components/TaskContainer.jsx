import React from 'react';
import styled from 'styled-components';

const TaskContainer = ({ children }) => (
  <Container>
    {children}
  </Container>
);

const Container = styled.div`
  margin: 20px 0;
  border: 2px solid #9FA6B2;
  border-radius: 8px;
  padding: 20px;
`;

export default TaskContainer;
