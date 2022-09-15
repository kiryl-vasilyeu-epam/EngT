import React, { useCallback } from 'react';
import styled from 'styled-components';
import NavContainer from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { COLORS, CONTROL_PANEL, USER_NAME } from 'constants';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { showModal } from 'store';
import { ButtonText } from 'components';

const Header = () => {
  const { tasksUserScore, tasksChecked, userName } = useSelector((store) => store.userAnswers);
  const dispatch = useDispatch();
  const openControlModal = useCallback(() => {
    dispatch(showModal({ modalId: CONTROL_PANEL }));
  }, []);
  const openUserModal = useCallback(() => {
    dispatch(showModal({ modalId: USER_NAME }));
  }, []);

  return (
    <Container>
      <NavBarElement bg="dark" variant="dark">
        <NavigationContainer>
          <Toggle onClick={openControlModal} />
          <Navbar.Brand href="/EngT/">
            EngT
          </Navbar.Brand>
          <Link to="/">Main</Link>
          <Link to="/templates">Templates</Link>

          <NavElementsContainer>
            <Score>
              {`Tasks checked: ${tasksChecked}`}
            </Score>
            <Score>
              {`Global Score: ${tasksChecked ? tasksUserScore : 0}`}
            </Score>
            <ButtonText
              title={userName}
              onClick={openUserModal}
              variant="light"
              outline
              size="sm"
            />
          </NavElementsContainer>
        </NavigationContainer>
      </NavBarElement>
    </Container>
  );
};

const Container = styled(NavContainer)`
  display: flex;
  padding: 0;
  max-width: 100%;
`;

const NavElementsContainer = styled(Nav)`
  display: flex;
  @media (max-width: 780px) {
    flex-direction: column !important;
  };
`;

const NavBarElement = styled(Navbar)`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const NavigationContainer = styled(NavContainer)`
  display: flex;
  margin: 0;
  width: 80%;
  max-width: 1300px;
  flex: 1;
  @media (max-width: 1100px) {
    max-width: 100%;
  };
`;

const Score = styled.div`
  border: 1px solid ${COLORS.BACKGROUND_COLOR};
  color: ${COLORS.BACKGROUND_COLOR};
  border-radius: 7px;
  margin: 0 5px;
  padding: 3px;
  padding: 8px 16px;
`;

const Toggle = styled(Navbar.Toggle)`
  display: flex !important;
`;

export default Header;
