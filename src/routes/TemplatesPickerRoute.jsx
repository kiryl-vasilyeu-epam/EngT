import {
  Lesson, CreateLesson, SpinnerContainer,
} from 'components';
import { COLORS, GROUP_NAME_SEPARATOR } from 'constants';
import { CheckPasswordModal } from 'features';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import RouteContainer from './RouteContainer';

const NONE_GROUP = 'none';

const TemplatesPickerRoute = () => {
  const [passwordChecked, setPasswordChecked] = useState(null);
  const { lessons } = useSelector((state) => state.appConnection);
  const lessonGroups = useMemo(() => {
    const groups = {};
    lessons.forEach((lesson) => {
      const group = lesson.title.split(GROUP_NAME_SEPARATOR)[1] || NONE_GROUP;
      if (groups[group]) {
        groups[group].push(lesson);
      } else {
        groups[group] = [lesson];
      }
    });
    return groups;
  }, [lessons]);
  const groupsList = useMemo(() => Object.keys(lessonGroups).map((gr) => ({
    id: gr,
    title: gr,
  })), [lessonGroups]);

  return (
    <RouteContainer creator picker>
      <CheckPasswordModal setPasswordChecked={setPasswordChecked} />
      {passwordChecked && (
        <SpinnerContainer showSpinner={!lessons.length}>
          <Container>
            {
              groupsList.map(({ title: groupTitle }) => (
                <GroupContainer key={groupTitle}>
                  <GroupName>
                    {groupTitle}
                  </GroupName>
                  {
                    lessonGroups?.[groupTitle]?.map((
                      { sheetId, title },
                    ) => (
                      <Lesson
                        key={sheetId}
                        title={title}
                        sheetId={sheetId}
                        creator
                        lessons={lessons}
                      />
                    ))
                  }
                </GroupContainer>
              ))
            }
            <CreateLesson lessons={lessons} />
          </Container>
        </SpinnerContainer>
      )}
    </RouteContainer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  /*Desktop Query*/
  @media only screen and (min-width: 780px) {
    width: 70%;
    max-width: 2000px;
  }

  /*Mobile Query*/
  @media only screen and (max-width: 480px) {
    width: 100%;
    padding: 5px;
  }

  /*Tablet Query*/
  @media only screen and (min-width: 481px) and (max-width:780px) {
    width: 90%;
    padding: 5px;
  }
`;

const GroupContainer = styled.div`
  position: relative;
  border: 1px solid ${COLORS.BORDER_COLOR};
  border-radius: 5px;
  padding: 5px 10px;
  padding-top: 12px;
  margin: 10px 0;
`;

const GroupName = styled.div`
  position: absolute;
  top: -12px;
  background: ${COLORS.BG_GRADIENT};
  border: 1px solid ${COLORS.BORDER_COLOR};
  border-radius: 2px;
  padding: 0 10px;
`;

export default TemplatesPickerRoute;
