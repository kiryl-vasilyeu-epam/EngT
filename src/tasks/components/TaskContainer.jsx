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
  viewOnly,
}) => (
  <Container>
    <CardHeader>
      <Title
        id={id}
        modalId={modalId}
        title={title}
        creator={creator}
        type={type}
      />
    </CardHeader>
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
          disabled={checked || viewOnly}
          fullWidth
        />
      )
    }

  </Container>
);

const Container = styled(Card)`
  margin-bottom: 30px;
  // border-radius: 0px;
  // border: none;
`;

const CardHeader = styled(Card.Header)`
  // background: white;
`;

export default TaskContainer;
