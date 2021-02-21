import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/vendor/Dashboard';
import AccountSetup from 'components/pages/vendor/setup/AccountSetup';
import Menu from 'components/pages/user/Menu';
import Portfolios from 'components/pages/shared/Portfolios';
import SinglePortfolio from 'components/pages/shared/SinglePortfolio';
import ScheduledVisits from 'components/pages/vendor/ScheduledVisits';
import Transactions from 'components/pages/vendor/Transactions';
import NewProperty from 'components/pages/vendor/NewProperty';
import Enquiries from 'components/pages/vendor/Enquiries';
import ViewEnquiry from 'components/pages/vendor/ViewEnquiry';
import AssignedProperties from 'components/pages/vendor/AssignedProperties';

const VendorRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <AccountSetup path="setup" />
    <AccountSetup path="setup/:id" />
    <Portfolios path="portfolios" />
    <SinglePortfolio path="portfolio/:id" />
    <NewProperty path="portfolios/new" />
    <NewProperty path="portfolios/edit/:id" />
    <ScheduledVisits path="scheduled-visits" />
    <ViewEnquiry path="enquiry/:id" />
    <AssignedProperties path="assigned-properties" />
    <Enquiries path="enquiries" />
    <Transactions path="transactions" />
    <Menu path="menu" />
  </Router>
);

export default VendorRouter;
