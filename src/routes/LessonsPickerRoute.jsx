import {
  Lesson, SpinnerContainer, Dropdown,
} from 'components';
import { NONE_GROUP, LOCAL_STORAGE_KEYS, GROUP_NAME_SEPARATOR } from 'constants';
import { UserNameModal } from 'features';
import React, { useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import RouteContainer from './RouteContainer';

const LessonsPickerRoute = () => {
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
  const [currentGroup, setCurrentGroup] = useState(
    () => localStorage.getItem(LOCAL_STORAGE_KEYS.GROUP) || NONE_GROUP,
  );
  const handleGroupPick = useCallback((group) => {
    setCurrentGroup(group);
    localStorage.setItem(LOCAL_STORAGE_KEYS.GROUP, group);
  }, []);

  return (
    <RouteContainer picker>
      <UserNameModal />
      <SpinnerContainer showSpinner={!lessons.length}>
        <Container>
          <GroupPicker>
            <GroupTitle>
              Group filter:
            </GroupTitle>
            <Dropdown
              values={groupsList}
              value={currentGroup}
              onChange={handleGroupPick}
            />
          </GroupPicker>
          {
            lessonGroups?.[currentGroup]?.map((
              { sheetId, title },
            ) => (
              <Lesson
                key={sheetId}
                title={title}
                sheetId={sheetId}
                lessons={lessons}
              />
            ))
          }
        </Container>
      </SpinnerContainer>
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

const GroupPicker = styled.div`
  display: flex;
  margin: 15px 0;
`;
const GroupTitle = styled.div`
  margin-right: 10px;
`;

export default LessonsPickerRoute;
