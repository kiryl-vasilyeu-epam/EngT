import { WebsocketProvider } from 'features';
import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import { TasksRoute, TemplatesRoute, LessonPicker } from 'routes';

const Navigation = () => (
  <WebsocketProvider>
    <Routes>
      <Route
        path="/"
        exact
        element={<LessonPicker />}
      />
      <Route
        path="/:sheetId"
        element={<TasksRoute />}
      />
      <Route
        path="/admin_lessons"
        element={<LessonPicker creator />}
      />
      <Route
        path="/admin_lessons/:sheetId"
        element={<TemplatesRoute />}
      />
    </Routes>
  </WebsocketProvider>
);

export default Navigation;
