import React from 'react';

import { Navigation, WebsocketProvider } from 'features';

const App = () => (
  <WebsocketProvider>
    <Navigation />
  </WebsocketProvider>
);

export default App;
