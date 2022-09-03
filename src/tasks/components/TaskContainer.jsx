import { COLORS } from 'constants';
import React from 'react';
import styled from 'styled-components';

const TaskContainer = ({ children }) => (
  <Container>
    {children}
  </Container>
);

const Container = styled.div`
  margin: 20px 0;
  border: 2px solid ${COLORS.BORDER_COLOR};
  border-radius: 8px;
  padding: 20px;
`;

export default TaskContainer;
