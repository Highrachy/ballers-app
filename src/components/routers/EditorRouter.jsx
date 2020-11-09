import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/editor/Dashboard';
import Menu from 'components/pages/user/Menu';

const EditorRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <Menu path="menu" />
  </Router>
);

export default EditorRouter;
