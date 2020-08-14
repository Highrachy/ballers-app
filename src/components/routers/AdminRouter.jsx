import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/admin/Dashboard';
import Users from 'components/pages/admin/Users';
import Menu from 'components/pages/user/Menu';

const UserRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <Users path="users" />
    <Menu path="menu" />
  </Router>
);

export default UserRouter;
