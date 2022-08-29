import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonText from './components/ButtonText/ButtonText';
import { BACKGROUND_COLOR } from './constants';
import CreatorsRoute from './routes/CreatorsRoute';
import UserRoute from './routes/UserRoute';

const App = () => {
  const [route, setRoute] = useState('creator');

  return (
    <Container>
      <Header>
        <ButtonText
          primary={route === 'creator'}
          title="Creators"
          width="160px"
          onClick={() => setRoute('creator')}
        />
        <ButtonText
          primary={route === 'user'}
          title="Users"
          width="160px"
          onClick={() => setRoute('user')}
        />
      </Header>
      <Content>
        {route === 'creator' && <CreatorsRoute />}
        {route === 'user' && <UserRoute />}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${BACKGROUND_COLOR};
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

const Header = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  box-sizing: border-box;
  justify-content: space-evenly;
  padding: 25px;
`;

export default App;
