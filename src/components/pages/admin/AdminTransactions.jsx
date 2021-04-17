import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { AllTransactions, AllOfflinePayments } from '../shared/Transactions';

const AdminTransactions = () => (
  <BackendPage>
    <AllOfflinePayments />
    <AllTransactions />
  </BackendPage>
);

export default AdminTransactions;
