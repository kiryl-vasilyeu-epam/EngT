import React from 'react';
import styled from 'styled-components';
import NavContainer from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation, Link } from 'react-router-dom';
import { COLORS, NAVIGATION_ROUTES } from 'constants';
import { useSelector } from 'react-redux';

const Header = () => {
  const { pathname } = useLocation();
  const { tasksUserScore, tasksChecked } = useSelector((store) => store.userAnswers);

  return (
    <Container>
      <NavBarElement bg="dark" variant="dark">
        <NavigationContainer>
          <Navbar.Brand href="/EngT/">EngT</Navbar.Brand>
          <Nav className="me-auto">
            {NAVIGATION_ROUTES.map((route) => (
              <LinkElement
                key={route.path}
                $highlighted={pathname === route.path}
                to={route.path}
              >
                {route.name}
              </LinkElement>
            ))}
            <Score>
              {`Tasks checked: ${tasksChecked}`}
            </Score>
            <Score>
              {`Global Score: ${tasksChecked ? tasksUserScore : 0}`}
            </Score>
          </Nav>
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

const LinkElement = styled(Link)`
  border: 2px solid ${({ $highlighted }) => ($highlighted ? COLORS.BACKGROUND_COLOR : 'transparent')};
  color: ${({ $highlighted }) => ($highlighted ? COLORS.BACKGROUND_COLOR : COLORS.BORDER_COLOR)};
  border-radius: 7px;
  padding: 3px;
  margin: 5px;
  text-decoration: none;
  padding: 8px 16px;
  &:hover {
    color: ${COLORS.BACKGROUND_COLOR};
  }
`;
const Score = styled.div`
  border: 2px solid ${COLORS.BACKGROUND_COLOR};
  color: ${COLORS.BACKGROUND_COLOR};
  border-radius: 7px;
  padding: 3px;
  margin: 5px;
  padding: 8px 16px;
`;

export default Header;
