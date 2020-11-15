import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/editor/Dashboard';
import Menu from 'components/pages/user/Menu';
import AddContentProperty from 'components/pages/editor/AddContentProperty';
import AddArea from 'components/pages/editor/AddArea';

const EditorRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <AddContentProperty path="content-property/new" />
    <AddArea path="area/new" />
    <Menu path="menu" />
  </Router>
);

export default EditorRouter;
