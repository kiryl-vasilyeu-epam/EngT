import { Media } from 'components';
import React from 'react';
import styled from 'styled-components';
import Title from './Title';

const TaskContainer = ({
  children, id, modalId, title, creator, type, media,
}) => (
  <Container>
    <Title
      id={id}
      modalId={modalId}
      title={title}
      creator={creator}
      type={type}
    />
    {media.map(({ id: mediaId, url }) => (
      <Media key={mediaId} src={url} />
    ))}
    {children}
  </Container>
);

const Container = styled.div`
  margin: 20px 0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: -2px 3px 12px 0px rgba(66, 68, 90, 1);
`;

export default TaskContainer;
