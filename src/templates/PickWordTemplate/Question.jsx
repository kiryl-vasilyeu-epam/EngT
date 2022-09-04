import { Input, ButtonText } from 'components';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import Words from './Words';
import ActiveWords from './ActiveWords';

const Question = ({
  question, deleteQuestion,
  handleQuestionChange, handleWordsChange, handleOptionsChange,
  addOption, deleteOption, settings,
}) => {
  const { title, id, words } = question;
  const { withOptions } = settings;

  const onDelete = useCallback(() => {
    deleteQuestion(id);
  }, [question, deleteQuestion]);

  const onTitleChange = useCallback((value) => {
    handleQuestionChange(id, value);
  }, [handleQuestionChange, question]);

  return (
    <CardElement>
      <Card.Body>

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

        <Margin>
          Pick words
          <Words
            words={words}
            questionId={id}
            title={title}
            handleWordsChange={handleWordsChange}
          />
        </Margin>

        {
          withOptions && (
            <Margin>
              Options
              <ActiveWords
                words={words}
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
  margin-bottom: 30px;
`;

const Margin = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-size: 20px;
`;

const InputMargin = styled.div`
  margin-right: 30px;
  flex: 1;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

export default Question;
