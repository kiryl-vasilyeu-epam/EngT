import React, { useCallback } from 'react';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

import { COLORS } from 'constants';
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
    <Wrapper>
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
          <InputContainer key={id}>
            <Input
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

      <CardContainer>
        <Card.Body>
          <ButtonText
            size="sm"
            title="Add question"
            onClick={addQuestion}
          />
        </Card.Body>
      </CardContainer>

      <SaveContainer>
        <ButtonText
          title="Save"
          onClick={handleSave}
          fullWidth
        />
      </SaveContainer>
    </Wrapper>
  );
};

const CardContainer = styled(Card)`
  border: none;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: auto;
  background: ${COLORS.BG_GRADIENT};

  /*Desktop Query*/
  @media only screen and (min-width: 780px) {
    padding: 20px;
  }

  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    padding: 5px;
  }

  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:780px) {
    padding: 20px;
  }
`;

const Title = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 500;
  margin: 10px 0px;
`;

const Margin = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding: 10px 20px;
  border-left: 3px solid ${COLORS.PRIMARY_COLOR};
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
  align-self: center;
  flex-direction: row;
  width: 30%;
  padding-top: 20px;
`;

export default TemplateContainer;
