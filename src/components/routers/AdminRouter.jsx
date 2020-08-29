import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/admin/Dashboard';
import Users from 'components/pages/admin/Users';
import Portfolios from 'components/pages/admin/Portfolios';
import SinglePortfolio from 'components/pages/admin/SinglePortfolio';
import ScheduledVisits from 'components/pages/admin/ScheduledVisits';
import Transactions from 'components/pages/admin/Transactions';
import NewProperty from 'components/pages/admin/NewProperty';
import KnowledgeBase from 'components/pages/admin/KnowledgeBase';
import Menu from 'components/pages/user/Menu';
import CreateOfferLetter from 'components/pages/admin/CreateOfferLetter';
import Enquiries from 'components/pages/admin/Enquiries';

const UserRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <Users path="users" />
    <Portfolios path="portfolios" />
    <SinglePortfolio path="portfolio/:id" />
    <CreateOfferLetter path="offer-letter/:enquiry-id" />
    <NewProperty path="portfolios/new" />
    <ScheduledVisits path="scheduled-visits" />
    <Enquiries path="enquiries" />
    <Transactions path="transactions" />
    <KnowledgeBase path="knowledgebase" />
    <Menu path="menu" />
  </Router>
);

export default UserRouter;
