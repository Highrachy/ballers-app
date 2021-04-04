import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/user/Dashboard';
import MyPortfolio from 'components/pages/user/MyPortfolio';
import SingleUserProperty from 'components/pages/user/SingleUserProperty';
import SinglePortfolio from 'components/pages/shared/SinglePortfolio';
import UserTransactions from 'components/pages/user/UserTransactions';
import Settings from 'components/pages/user/Settings';
import ReferAndEarn from 'components/pages/user/ReferAndEarn';
import JustForYou from 'components/pages/user/JustForYou';
import SingleOffer from 'components/pages/shared/SingleOffer';
import Menu from 'components/pages/user/Menu';
import PropertyEnquiry from 'components/pages/user/PropertyEnquiry';

const UserRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <MyPortfolio path="portfolio" />
    <SingleUserProperty path="property/:id" />
    <SinglePortfolio path="portfolio/:id" />
    <PropertyEnquiry path="property/enquiry/:id" />
    <UserTransactions path="transactions" />
    <Settings path="settings" />
    <ReferAndEarn path="refer-and-earn" />
    <JustForYou path="just-for-you" />
    <SingleOffer path="offer/:id" />
    <Menu path="menu" />
  </Router>
);

export default UserRouter;
