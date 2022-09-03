import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonText } from 'components';
import { COLORS } from 'constants';
import { CreatorsRoute, UserRoute } from 'routes';

const App = () => {
  const [route, setRoute] = useState('creator');

  return (
    <Container>
      <Header>
        <ButtonText
          primary={route === 'creator'}
          title="Creators"
          onClick={() => setRoute('creator')}
        />
        <ButtonText
          primary={route === 'user'}
          title="Users"
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
  background: ${COLORS.BACKGROUND_COLOR};
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
