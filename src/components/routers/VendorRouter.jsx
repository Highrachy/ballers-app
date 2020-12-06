import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/vendor/Dashboard';
import Menu from 'components/pages/user/Menu';

const VendorRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <Menu path="menu" />
  </Router>
);

export default VendorRouter;
