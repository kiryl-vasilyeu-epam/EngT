import React from 'react';
import styled from 'styled-components';
import NavContainer from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';
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
              <Link
                key={route.path}
                highlighted={pathname === route.path}
                href={route.path}
              >
                {route.name}
              </Link>
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

const Link = styled(Nav.Link)`
  border: 2px solid ${({ highlighted }) => (highlighted ? COLORS.BACKGROUND_COLOR : 'transparent')};
  ${({ highlighted }) => (highlighted ? `color: ${COLORS.BACKGROUND_COLOR};` : '')}
  border-radius: 7px;
  padding: 3px;
  margin: 5px;
`;

export default Header;
