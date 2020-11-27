import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/editor/Dashboard';
import Menu from 'components/pages/user/Menu';
import AllContentProperty from 'components/pages/editor/AllContentProperty';
import SingleContentProperty from 'components/pages/editor/SingleContentProperty';
import AddContentProperty from 'components/pages/editor/AddContentProperty';
import AddArea from 'components/pages/editor/AddArea';

const EditorRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <AllContentProperty path="content-property" />
    <SingleContentProperty path="content-property/area/:id" />
    <AddContentProperty path="content-property/new" />
    <AddContentProperty path="content-property/edit/:id" />
    <AddArea path="area/new" />
    <AddArea path="area/edit/:id" />
    <Menu path="menu" />
  </Router>
);

export default EditorRouter;
