import { Input } from 'components';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Word = ({
  word, questionId, onAnswerHandler,
  creator, checked,
}) => {
  const {
    title, isActive, userAnswer,
  } = word;

  const onChange = useCallback((answer) => {
    onAnswerHandler(questionId, word.id, answer);
  }, [word, questionId, onAnswerHandler]);

  const value = creator ? title : userAnswer;
  const isCorrect = creator || (checked && title === userAnswer);
  const isIncorrect = checked && !isCorrect;

  const TooltipComponent = useMemo(() => (
    <Tooltip style={{ position: 'absolute' }}>{title}</Tooltip>
  ), [title, isCorrect]);

  return (
    <Container>
      {isActive ? (
        <OverlayTrigger
          overlay={TooltipComponent}
          show={checked && isIncorrect ? undefined : false}
        >
          <div>
            <Input
              value={value}
              onChange={onChange}
              isValid={isCorrect}
              isInvalid={isIncorrect}
              disabled={checked || creator}
            />
          </div>
        </OverlayTrigger>
      ) : title}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  margin: 5px 5px 5px 0px;
`;

export default Word;
