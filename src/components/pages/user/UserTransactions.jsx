import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import ContributionGraph from 'components/common/ContributionGraph';
import { AllTransactions, AllOfflinePayments } from '../shared/Transactions';

const UserTransactions = () => (
  <BackendPage>
    <Overview />
    <AllOfflinePayments />
    <AllTransactions />
  </BackendPage>
);

const Overview = () => (
  <div className="container-fluid ">
    <ContributionGraph />
  </div>
);

export default UserTransactions;
