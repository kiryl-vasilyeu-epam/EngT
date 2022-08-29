import React from 'react';
import styled from 'styled-components';
import { BACKGROUND_COLOR } from './constants';
import CreatorsRoute from './routes/CreatorsRoute';

const App = () => (
  <Container>
    <Content>
      <CreatorsRoute />
    </Content>
  </Container>
);

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  background: ${BACKGROUND_COLOR};
`;

const Content = styled.div`
  display: flex;
  width: 60%;
  min-width: 700px;
`;

export default App;
