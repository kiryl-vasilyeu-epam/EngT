import React from 'react';
import styled from 'styled-components';
import { COLORS } from 'constants';

import { Navigation } from 'features';

const App = () => (
  <Container>
    <Navigation />
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
