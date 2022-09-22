import React, { useCallback } from 'react';
import styled from 'styled-components';
import NavContainer from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { COLORS, CONTROL_PANEL, USER_NAME } from 'constants';
import { useSelector, useDispatch } from 'react-redux';
import { showModal } from 'store';
import { ButtonText } from 'components';

const Header = ({ creator }) => {
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
      <NavBarElement bg="primary" variant="dark">
        <NavigationContainer>
          <Navbar.Brand href="/EngT/">
            EngT
          </Navbar.Brand>
          <NavElementsContainer>
            {creator
              ? (<Toggle onClick={openControlModal} />)
              : (
                <>
                  <Score>
                    {`Tasks checked: ${tasksChecked}`}
                  </Score>
                  <Score>
                    {`Global Score: ${tasksChecked ? tasksUserScore : 0}`}
                  </Score>
                  {!!userName && (
                    <ButtonText
                      title={userName}
                      onClick={openUserModal}
                      variant="light"
                      outline
                      size="sm"
                    />
                  )}

                </>
              )}
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
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
`;

const NavElementsContainer = styled(Nav)`
  display: flex;
`;

const NavBarElement = styled(Navbar)`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const NavigationContainer = styled(NavContainer)`
  display: flex;
  margin: 0;
  padding: 0;
  max-width: 2000px;

  /*Desktop Query*/
  @media only screen and (min-width: 780px) {
    width: 90%;
  }
  
  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    width: 100%;
    padding: 0 16px;
  }
  
  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:780px) {
    width: 100%;
    padding: 0 16px;
  }
`;

const Score = styled.div`
  border: 1px solid ${COLORS.BACKGROUND_COLOR};
  color: ${COLORS.BACKGROUND_COLOR};
  border-radius: 7px;
  margin: 0 5px;
  padding: 3px;
  padding: 8px 16px;

  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const Toggle = styled(Navbar.Toggle)`
  display: flex !important;
`;

export default Header;
