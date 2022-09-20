import React, {
  useState, useCallback, useContext, useEffect,
} from 'react';
import styled from 'styled-components';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { SocketContext } from 'features/WebsocketProvider/WebsocketProvider';

const TextField = ({ creator }) => {
  const [value, setValue] = useState('');
  const socket = useContext(SocketContext);

  const handleChange = useCallback(({ target: { value: textValue } }) => {
    setValue(textValue);
    socket.emit('textFieldChanged', textValue);
  }, []);

  useEffect(() => {
    socket.on('loadTextValue', (textValue) => {
      setValue(textValue);
    });
  }, [setValue]);

  return (
    <Container>
      <Acc>
        <Item eventKey="1">
          <Header>Text field</Header>
          <Accordion.Body>
            <Input
              as="textarea"
              value={value}
              onChange={handleChange}
              disabled={!creator}
              rows={10}
            />
          </Accordion.Body>
        </Item>
      </Acc>
    </Container>
  );
};

const Acc = styled(Accordion)`
  overflow: hidden;
`;

const Header = styled(Accordion.Header)`
`;

const Item = styled(Accordion.Item)`
  outline: none !important;
  border: none;
  box-shadow: none;
`;

const Container = styled.div`
  margin: 10px;
  border-radius: 9px;
`;

const Input = styled(Form.Control)`
  width: 100%;
  border: none;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;

  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    max-height: 20vh;

  }
  
  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:768px) {
    max-height: 20vh;
  }
`;

export default TextField;
