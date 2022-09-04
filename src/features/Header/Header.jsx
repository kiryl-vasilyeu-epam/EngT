import React from 'react';
import styled from 'styled-components';
import NavContainer from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation, Link } from 'react-router-dom';
import { COLORS, NAVIGATION_ROUTES } from 'constants';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <Container>
      <Navbar bg="dark" variant="dark">
        <NavigationContainer>
          <Navbar.Brand href="/">EngT</Navbar.Brand>
          <Nav className="me-auto">
            {NAVIGATION_ROUTES.map((route) => (
              <LinkElement
                key={route.path}
                highlighted={pathname === route.path}
                to={route.path}
              >
                {route.name}
              </LinkElement>
            ))}
          </Nav>
        </NavigationContainer>
      </Navbar>
    </Container>
  );
};

const Container = styled(NavContainer)`
  padding: 0;
  max-width: 100%;
`;

const NavigationContainer = styled(NavContainer)`
  width: 80%;
  max-width: 1200px;
`;

const LinkElement = styled(Link)`
  border: 2px solid ${({ highlighted }) => (highlighted ? COLORS.BACKGROUND_COLOR : 'transparent')};
  color: ${({ highlighted }) => (highlighted ? COLORS.BACKGROUND_COLOR : COLORS.BORDER_COLOR)};
  border-radius: 7px;
  padding: 3px;
  margin: 5px;
  text-decoration: none;
  padding: 8px 16px;
  &:hover {
    color: ${COLORS.BACKGROUND_COLOR};
  }
`;

export default Header;
