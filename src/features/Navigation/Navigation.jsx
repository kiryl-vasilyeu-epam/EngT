import { NAVIGATION_ROUTES } from 'constants';
import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import { MainRoute } from 'routes';

const Navigation = () => (
  <Routes>
    {NAVIGATION_ROUTES.map((route) => (
      <Route
        path={route.path}
        element={<MainRoute creator={route.creator} />}
        key={route.path}
      />
    ))}
  </Routes>
);

export default Navigation;
