import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import ContributionGraph from 'components/common/ContributionGraph';
import { Card } from 'react-bootstrap';

const Transactions = () => (
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

const AllTransactions = () => (
  <div className="container-fluid">
    <Card className="mt-4">
      <table class="table table-borderless table-hover">
        <thead>
          <tr>
            <td>S/N</td>
            <td>DATE</td>
            <td>DESCRIPTION</td>
            <td>AMOUNT</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>12 Sep 2020</td>
            <td>
              <strong>Property A_Monthly payment</strong>
            </td>
            <td>
              <strong>N 500,00</strong>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>12 Sep 2020</td>
            <td>
              <strong>Property A_Monthly payment</strong>
            </td>
            <td>
              <strong>N 500,00</strong>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>12 Sep 2020</td>
            <td>
              <strong>Property A_Monthly payment</strong>
            </td>
            <td>
              <strong>N 500,00</strong>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>12 Sep 2020</td>
            <td>
              <strong>Property A_Monthly payment</strong>
            </td>
            <td>
              <strong>N 500,00</strong>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>12 Sep 2020</td>
            <td>
              <strong>Property A_Monthly payment</strong>
            </td>
            <td>
              <strong>N 500,00</strong>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>12 Sep 2020</td>
            <td>
              <strong>Property A_Monthly payment</strong>
            </td>
            <td>
              <strong>N 500,00</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  </div>
);

export default Transactions;
