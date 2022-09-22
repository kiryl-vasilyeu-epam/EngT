import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import {
  TasksRoute, TemplatesRoute, LessonsPickerRoute, TemplatesPickerRoute,
} from 'routes';

const Navigation = () => (
  <Routes>
    <Route
      path="/"
      exact
      element={<LessonsPickerRoute />}
    />
    <Route
      path="/:sheetId"
      element={<TasksRoute />}
    />
    <Route
      path="/admin_lessons"
      element={<TemplatesPickerRoute />}
    />
    <Route
      path="/admin_lessons/:sheetId"
      element={<TemplatesRoute />}
    />
  </Routes>
);

export default Navigation;
