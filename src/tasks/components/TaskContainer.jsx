import { Media, ButtonText } from 'components';
import { COLORS } from 'constants';
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

      {!creator && (
        <ButtonText
          title={checked ? `Score: ${userScore}` : 'Check'}
          variant={checked ? 'dark' : 'primary'}
          onClick={setChecked}
          disabled={checked || viewOnly}
          outline={checked}
        />
      )}
    </Card.Body>
  </Container>
);

const Container = styled(Card)`
  margin-bottom: 30px;
  border-radius: 2px;
  border: none;
  border-top: 4px solid ${COLORS.PRIMARY_COLOR};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
`;

const CardHeader = styled(Card.Header)`
  background: ${COLORS.BACKGROUND_COLOR};
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1)
`;

export default TaskContainer;
