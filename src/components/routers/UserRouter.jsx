import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/user/Dashboard';
import Portfolio from 'components/pages/user/Portfolio';
import SinglePortfolio from 'components/pages/user/SinglePortfolio';
import Transactions from 'components/pages/user/Transactions';
import Profile from 'components/pages/user/Profile';
import ReferAndEarn from 'components/pages/user/ReferAndEarn';

const UserRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <Portfolio path="portfolio" />
    <SinglePortfolio path="portfolio/:id" />
    <Transactions path="transactions" />
    <Profile path="profile" />
    <ReferAndEarn path="refer-and-earn" />
  </Router>
);

export default UserRouter;
