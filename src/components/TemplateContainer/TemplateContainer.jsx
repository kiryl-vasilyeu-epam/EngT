import React, { useCallback } from 'react';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

import { ButtonText } from '../ButtonText';

import { Input } from '../Input';

const TemplateContainer = ({
  children, handleSave,
  title, setTitle,
  media, addMedia, setMedia, deleteMedia,
  addQuestion,
}) => {
  const handleMediaChange = useCallback((id) => (value) => {
    setMedia(id, value);
  }, [setMedia]);
  const handleDelete = useCallback((id) => () => {
    deleteMedia(id);
  }, [deleteMedia]);
  return (
    <>
      <ScrollableContainer>
        <Margin>
          <Title>Exercise Title</Title>
          <Input
            value={title}
            onChange={setTitle}
            placeholder="Enter lesson title"
          />
        </Margin>
        <Margin>
          <Title>Exercise media</Title>
          {media.map(({ url, id }) => (
            <InputContainer>
              <Input
                key={id}
                value={url}
                onChange={handleMediaChange(id)}
                placeholder="Paste the link"
              />
              <DeleteContainer>
                <ButtonText
                  size="sm"
                  title="Delete"
                  onClick={handleDelete(id)}
                  variant="danger"
                  outline
                />
              </DeleteContainer>
            </InputContainer>
          ))}
          <ButtonContainer>
            <ButtonText
              size="sm"
              title="Add media"
              onClick={addMedia}
              outline
            />
          </ButtonContainer>
        </Margin>

        {children}

        <Card>
          <Card.Body>
            <ButtonText
              size="sm"
              title="Add question"
              onClick={addQuestion}
              primary
            />
          </Card.Body>
        </Card>
      </ScrollableContainer>

      <SaveContainer>

        <ButtonText
          title="Save"
          onClick={handleSave}
          fullWidth
        />
      </SaveContainer>

    </>
  );
};

const ScrollableContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  overflow: auto;
`;

const Title = styled.div`
  display: flex;
  font-size: 25px;
  font-weight: 500;
  margin-right: 10px;
`;

const Margin = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding: 0 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px 0;
`;

const DeleteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 5px 0;
`;

const SaveContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  padding: 10px 20px;
`;

export default TemplateContainer;
