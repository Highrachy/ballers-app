import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/admin/Dashboard';
import Menu from 'components/pages/user/Menu';

const UserRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <Menu path="menu" />
  </Router>
);

export default UserRouter;
