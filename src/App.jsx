import React from 'react';
import styled from 'styled-components';
import { COLORS } from 'constants';

import { Header, Navigation } from 'features';

const App = () => (
  <Container>
    <Header />
    <Content>
      <Navigation />
    </Content>
  </Container>
);

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${COLORS.BACKGROUND_COLOR};
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

export default App;
