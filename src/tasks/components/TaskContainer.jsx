import { Media, ButtonText } from 'components';
import React from 'react';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import Title from './Title';

const TaskContainer = ({
  children,
  id,
  modalId,
  title,
  creator,
  type,
  media,
  checked,
  setChecked,
  userScore,
}) => (
  <Container>
    <Card.Header>
      <Title
        id={id}
        modalId={modalId}
        title={title}
        creator={creator}
        type={type}
      />
    </Card.Header>
    <Card.Body>
      {media.map(({ id: mediaId, url }) => (
        <Media key={mediaId} src={url} />
      ))}
      {children}
    </Card.Body>
    {
      !creator && (
        <ButtonText
          title={checked ? `Score: ${userScore}` : 'Check'}
          variant={checked ? 'light' : 'primary'}
          onClick={setChecked}
          fullWidth
        />
      )
    }

  </Container>
);

const Container = styled(Card)`
  margin-bottom: 30px;
  border-bottom-left-radius: 11px;
  border-bottom-right-radius: 11px;
`;

export default TaskContainer;
