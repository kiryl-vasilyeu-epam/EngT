import React from 'react';
import styled from 'styled-components';
import { COLORS } from 'constants';

import { Navigation, WebsocketProvider } from 'features';

const App = () => (
  <Container>
    <WebsocketProvider>
      <Navigation />
    </WebsocketProvider>
  </Container>
);

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${COLORS.BG_GRADIENT};
`;

export default App;
