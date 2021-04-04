import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import ContributionGraph from 'components/common/ContributionGraph';
import { AllTransactions } from '../shared/Transactions';

const UserTransactions = () => (
  <BackendPage>
    <Overview />
    <AllTransactions />
  </BackendPage>
);

const Overview = () => (
  <div className="container-fluid ">
    <ContributionGraph />
  </div>
);

export default UserTransactions;
