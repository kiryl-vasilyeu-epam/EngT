import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';
import { ButtonText } from 'components';
import { ENDPOINT } from 'constants';

const CreatorsControls = ({
  tasks, id, loading, openModal,
}) => {
  const [uploading, setUploading] = useState(false);

  const downloadState = useCallback(() => {
    const jsonString = `data:text/json;chatset=utf-8,${JSON.stringify({
      tasks,
      id,
    })}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'Lesson.json';

    link.click();
  }, [tasks, id]);

  const uploadState = useCallback(async () => {
    setUploading(true);
    try {
      await fetch(`${ENDPOINT}/updateTasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tasks,
          id,
        }),
      });
    } finally {
      setUploading(false);
    }
  }, [tasks, id, setUploading]);

  return (
    <Buttons>
      <ButtonContainer>
        <ButtonText
          title="Download"
          onClick={downloadState}
          outline
          fullWidth
          disabled={loading}
        />
      </ButtonContainer>

      <ButtonContainer>
        <ButtonText
          title={
            uploading
              ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )
              : 'Save'
          }
          outline
          onClick={uploadState}
          disabled={loading || uploading}
          fullWidth
        />
      </ButtonContainer>

      <ButtonContainer>
        <ButtonText
          title="Add task"
          onClick={openModal}
          disabled={loading}
          fullWidth
        />
      </ButtonContainer>
    </Buttons>
  );
};

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 1100px) {
    flex-direction: column;
  };
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 10px 10px 0 10px;
  @media (max-width: 1100px) {
    margin: 5px;
  };
  flex: 1;
`;

export default CreatorsControls;
