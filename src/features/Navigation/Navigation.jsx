import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import { TasksRoute, TemplatesRoute } from 'routes';

const Navigation = () => (
  <Routes>
    <Route
      path="/"
      element={<TasksRoute />}
    />
    <Route
      path="/templates"
      element={<TemplatesRoute />}
    />
  </Routes>
);

export default Navigation;
