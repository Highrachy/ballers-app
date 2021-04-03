import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/user/Dashboard';
import MyPortfolio from 'components/pages/user/MyPortfolio';
import SingleUserProperty from 'components/pages/user/SingleUserProperty';
import SinglePortfolio from 'components/pages/shared/SinglePortfolio';
import Transactions from 'components/pages/user/Transactions';
import Settings from 'components/pages/user/Settings';
import ReferAndEarn from 'components/pages/user/ReferAndEarn';
import JustForYou from 'components/pages/user/JustForYou';
import OfferLetter from 'components/pages/shared/OfferLetter';
import Menu from 'components/pages/user/Menu';
import PropertyEnquiry from 'components/pages/user/PropertyEnquiry';

const UserRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <MyPortfolio path="portfolio" />
    <SingleUserProperty path="property/:id" />
    <SinglePortfolio path="portfolio/assigned/:id" />
    <PropertyEnquiry path="property/enquiry/:id" />
    <Transactions path="transactions" />
    <Settings path="settings" />
    <ReferAndEarn path="refer-and-earn" />
    <JustForYou path="just-for-you" />
    <OfferLetter path="offer/:id" />
    <Menu path="menu" />
  </Router>
);

export default UserRouter;
