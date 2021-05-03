import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/vendor/Dashboard';
import AccountSetup from 'components/pages/vendor/setup/AccountSetup';
import Menu from 'components/pages/user/Menu';
import Properties from 'components/pages/shared/Properties';
import SingleProperty from 'components/pages/shared/SingleProperty';
import ScheduledVisits from 'components/pages/vendor/ScheduledVisits';
import Transactions from 'components/pages/shared/Transactions';
import PropertyForm from 'components/pages/vendor/PropertyForm';
import Enquiries from 'components/pages/shared/Enquiries';
import SingleEnquiry from 'components/pages/shared/SingleEnquiry';
import Offers from 'components/pages/shared/Offers';
import AssignedProperties from 'components/pages/vendor/AssignedProperties';
import Gallery from 'components/pages/shared/Gallery';
import SingleOffer from 'components/pages/shared/SingleOffer';
import Portfolios from 'components/pages/shared/Portfolios';
import SinglePortfolio from 'components/pages/shared/SinglePortfolio';
import Notifications from 'components/pages/shared/Notifications';

const VendorRouter = () => (
  <Router>
    <Dashboard path="dashboard" />
    <AccountSetup path="setup" />
    <AccountSetup path="setup/:id" />
    <Properties path="properties" />
    <SingleProperty path="property/:id" />
    <Portfolios path="portfolios" />
    <SinglePortfolio path="portfolio/:id" />
    <PropertyForm path="property/new" />
    <PropertyForm path="property/edit/:id" />
    <ScheduledVisits path="scheduled-visits" />
    <Enquiries path="enquiries" />
    <SingleEnquiry path="enquiry/:id" />
    <Offers path="offers" />
    <SingleOffer path="offer/:id" />
    <AssignedProperties path="assigned-properties" />
    <Transactions path="transactions" />
    <Gallery path="gallery/:propertyId" />
    <Notifications path="notifications" />
    <Menu path="menu" />
  </Router>
);

export default VendorRouter;
