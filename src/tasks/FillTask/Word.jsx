import { Input } from 'components';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { NEW_LINE } from 'constants';
import { normalizeString } from '../helpers';

const Word = ({
  word, questionId, onAnswerHandler,
  creator, checked, viewOnly,
}) => {
  const {
    title, isActive, userAnswer,
  } = word;

  const onChange = useCallback((answer) => {
    onAnswerHandler(questionId, word.id, answer);
  }, [word, questionId, onAnswerHandler]);

  const value = creator ? title : userAnswer;
  const isCorrect = creator
  || (checked && normalizeString(title) === normalizeString(userAnswer));
  const isIncorrect = checked && !isCorrect;

  const TooltipComponent = useMemo(() => (
    <Tooltip style={{ position: 'absolute' }}>{title}</Tooltip>
  ), [title, isCorrect]);

  if (title === NEW_LINE) {
    return <LineBreak />;
  }

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
              disabled={checked || creator || viewOnly}
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
const LineBreak = styled.div`
  width: 100%;
`;

export default Word;
