import React, {
  useState, useCallback, useContext, useEffect,
} from 'react';
import styled from 'styled-components';
import Accordion from 'react-bootstrap/Accordion';
import { COLORS } from 'constants';
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
      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Text field</Accordion.Header>
          <Accordion.Body>
            <Input
              as="textarea"
              value={value}
              onChange={handleChange}
              disabled={!creator}
              rows={20}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

const Container = styled.div`
  border: 2px solid ${COLORS.BORDER_COLOR};
  margin: 10px;
  border-radius: 9px;
`;

const Input = styled(Form.Control)`
  width: 100%;
`;

export default TextField;
