import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/admin/Dashboard';
import Users from 'components/pages/admin/Users';
import Portfolios from 'components/pages/admin/Portfolios';
import NewProperty from 'components/pages/admin/NewProperty';
import Menu from 'components/pages/user/Menu';

const UserRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <Users path="users" />
    <Portfolios path="portfolios" />
    <NewProperty path="portfolios/new" />
    <Menu path="menu" />
  </Router>
);

export default UserRouter;
