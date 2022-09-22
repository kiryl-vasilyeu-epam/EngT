import { Input, ButtonText } from 'components';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import { filter } from 'lodash';
import Words from './Words';
import ActiveWords from './ActiveWords';

const Question = ({
  question, deleteQuestion,
  handleQuestionChange, handleWordsChange, handleOptionsChange,
  addOption, deleteOption, settings, handlePictureChange,
}) => {
  const {
    title, id, words, picture,
  } = question;
  const { withOptions } = settings;

  const onDelete = useCallback(() => {
    deleteQuestion(id);
  }, [question, deleteQuestion]);

  const onTitleChange = useCallback((value) => {
    handleQuestionChange(id, value);
  }, [handleQuestionChange, question]);

  const onPictureChange = useCallback((pictureLink) => {
    handlePictureChange(id, pictureLink);
  }, [handlePictureChange]);
  const activeWords = filter(words, { isActive: true });

  return (
    <CardElement>
      <Card.Body>

        <Margin>
          Picture
          <Row>
            <InputMargin>
              <Input
                value={picture}
                onChange={onPictureChange}
                placeholder="Enter picture link"
                oneLine
              />
            </InputMargin>
          </Row>
        </Margin>

        <Margin>
          Question
          <Row>
            <InputMargin>
              <Input
                value={title}
                onChange={onTitleChange}
                placeholder="Write a question"
              />
            </InputMargin>
            <ButtonText
              size="sm"
              title="Delete"
              onClick={onDelete}
              variant="danger"
              outline
            />
          </Row>
        </Margin>

        {
          !!title.length && (
            <Margin>
              Pick words
              <Words
                words={words}
                questionId={id}
                title={title}
                handleWordsChange={handleWordsChange}
              />
            </Margin>
          )
        }

        {
          (withOptions && !!activeWords.length) && (
            <Margin>
              Options
              <ActiveWords
                activeWords={activeWords}
                questionId={id}
                handleOptionsChange={handleOptionsChange}
                addOption={addOption}
                deleteOption={deleteOption}
              />
            </Margin>
          )
        }
      </Card.Body>
    </CardElement>
  );
};

const CardElement = styled(Card)`
  border: none;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
  margin-bottom: 30px;
`;

const Margin = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-size: 16px;
  margin: 10px 0;
`;

const InputMargin = styled.div`
  margin-right: 30px;
  flex: 1;
  width: 100%;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

export default Question;
