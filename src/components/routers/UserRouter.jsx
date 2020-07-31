import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/user/Dashboard';
import Portfolio from 'components/pages/user/Portfolio';
import SinglePortfolio from 'components/pages/user/SinglePortfolio';

const UserRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <Portfolio path="portfolio" />
    <SinglePortfolio path="portfolio/:id" />
  </Router>
);

export default UserRouter;
