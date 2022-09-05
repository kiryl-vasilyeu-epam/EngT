import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Base64 } from 'js-base64';
import { octokit } from 'api';
import Spinner from 'react-bootstrap/Spinner';
import { ButtonText } from 'components';

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
    const content = Base64.encode(
      JSON.stringify({
        tasks,
        id,
      }),
    );
    const shaData = await octokit.repos.getContent({
      owner: 'kiryl-vasilyeu-epam',
      ref: 'lesson',
      repo: 'EngT',
      path: 'public/Lesson.json',
    });

    const sha = shaData?.data?.sha;

    const result = await octokit.repos.createOrUpdateFileContents({
      owner: 'kiryl-vasilyeu-epam',
      repo: 'EngT',
      branch: 'lesson',
      path: 'public/Lesson.json',
      message: 'Add new lesson',
      content,
      sha,
    });
    if (result.status !== 200) {
      // eslint-disable-next-line no-alert
      alert('Error while uploading tasks');
    }

    setUploading(false);
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
              : 'Upload'
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
