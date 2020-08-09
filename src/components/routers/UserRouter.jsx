import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/user/Dashboard';
import Portfolio from 'components/pages/user/Portfolio';
import SinglePortfolio from 'components/pages/user/SinglePortfolio';
import Transactions from 'components/pages/user/Transactions';
import Profile from 'components/pages/user/Profile';
import Gallery from 'components/pages/user/Gallery';
import ReferAndEarn from 'components/pages/user/ReferAndEarn';
import JustForYou from 'components/pages/user/JustForYou';
import Menu from 'components/pages/user/Menu';
import PropertyEnquiry from 'components/pages/user/PropertyEnquiry';

const UserRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <Portfolio path="portfolio" />
    <SinglePortfolio path="portfolio/:id" />
    <PropertyEnquiry path="property/enquiry/:id" />
    <Transactions path="transactions" />
    <Profile path="profile" />
    <ReferAndEarn path="refer-and-earn" />
    <JustForYou path="just-for-you" />
    <Gallery path="gallery" />
    <Menu path="menu" />
  </Router>
);

export default UserRouter;
