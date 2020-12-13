import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/vendor/Dashboard';
import AccountSetup from 'components/pages/vendor/setup/AccountSetup';
import Menu from 'components/pages/user/Menu';

const VendorRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <AccountSetup path="setup" />
    <AccountSetup path="setup/:id" />
    <Menu path="menu" />
  </Router>
);

export default VendorRouter;
