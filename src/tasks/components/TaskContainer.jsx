import { Media } from 'components';
import React from 'react';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import Title from './Title';

const TaskContainer = ({
  children, id, modalId, title, creator, type, media,
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
  </Container>
);

const Container = styled(Card)`
  margin-bottom: 30px;
`;

export default TaskContainer;
