import { COLORS } from 'constants';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { ButtonText } from '../ButtonText';
import { RoundIconButton } from '../RoundIconButton';
import { IconButton } from '../IconButton';

import { Input } from '../Input';

const TemplateContainer = ({
  children, handleSave, title, setTitle, media, addMedia, setMedia, deleteMedia,
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
        <Row>
          <Title>Exercise Title:</Title>
          <Input
            value={title}
            onChange={setTitle}
            placeholder="Enter lesson title"
          />
        </Row>
        <Row>
          <Title>Exercise media:</Title>
          <MediaContainer>
            {media.map(({ url, id }) => (
              <InputContainer>
                <Input
                  key={id}
                  value={url}
                  onChange={handleMediaChange(id)}
                  placeholder="Paste the link"
                />
                <IconContainer>
                  <IconButton
                    iconName="faTrashCan"
                    onClick={handleDelete(id)}
                  />
                </IconContainer>
              </InputContainer>

            ))}
            <ButtonContainer>
              <RoundIconButton onClick={addMedia} />
            </ButtonContainer>
          </MediaContainer>
        </Row>

        {children}
      </ScrollableContainer>

      <ButtonText
        title="Save"
        onClick={handleSave}
        primary
        fullWidth
      />
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
  font-size: 25px;
  font-weight: bold;
  margin-right: 10px;
  white-space: nowrap;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  margin: 10px 0;
`;

const MediaContainer = styled.div`
  flex: 1;
  border: 2px solid ${COLORS.BORDER_COLOR};
  padding: 10px;
  border-radius: 7px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px 0;
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  border-radius: 10px;
`;

export default TemplateContainer;
