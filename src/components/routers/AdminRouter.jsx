import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/admin/Dashboard';
import Users from 'components/pages/admin/Users';
import SingleUser from 'components/pages/admin/SingleUser';
import Properties from 'components/pages/shared/Properties';
import SingleProperty from 'components/pages/shared/SingleProperty';
import ScheduledVisits from 'components/pages/admin/ScheduledVisits';
import Transactions from 'components/pages/admin/AdminTransactions';
import KnowledgeBase from 'components/pages/admin/KnowledgeBase';
import Menu from 'components/pages/user/Menu';
import Enquiries from 'components/pages/shared/Enquiries';
import SingleEnquiry from 'components/pages/shared/SingleEnquiry';
import AssignedProperties from 'components/pages/admin/AssignedProperties';
import AddTransaction from 'components/pages/admin/AddTransaction';
import NewTransaction from 'components/pages/admin/NewTransaction';
import Offers from 'components/pages/shared/Offers';
import SingleOffer from 'components/pages/shared/SingleOffer';
import Portfolios from 'components/pages/shared/Portfolios';
import SinglePortfolio from 'components/pages/shared/SinglePortfolio';
import Notifications from 'components/pages/shared/Notifications';
import ReportedProperties from 'components/pages/admin/ReportedProperties';
import Referrals from 'components/pages/admin/Referrals';

const AdminRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <Users path="users" />
    <SingleUser path="user/:id" />
    <Properties path="properties" />
    <ReportedProperties path="reported-properties" />
    <SingleProperty path="property/:id" />
    <Portfolios path="portfolios" />
    <SinglePortfolio path="portfolio/:id" />
    <ScheduledVisits path="scheduled-visits" />
    <SingleEnquiry path="enquiry/:id" />
    <AssignedProperties path="assigned-properties" />
    <Enquiries path="enquiries" />
    <Transactions path="transactions" />
    <Offers path="offers" />
    <SingleOffer path="offer/:id" />
    <AddTransaction path="add-transaction" />
    <NewTransaction path="transactions/new/:offerId" />
    <KnowledgeBase path="knowledgebase" />
    <Notifications path="notifications" />
    <Referrals path="referrals" />
    <Menu path="menu" />
  </Router>
);

export default AdminRouter;
