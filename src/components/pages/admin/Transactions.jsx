import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';

const Transactions = () => (
  <BackendPage>
    <AllTransactions />
  </BackendPage>
);

const AllTransactions = () => (
  <div className="container-fluid">
    <Card className="mt-4">
      <div className="table-responsive">
        <table className="table table-borderless table-hover">
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
              <td>2</td>
              <td>12 Sep 2020</td>
              <td>
                <strong>Property A_Monthly payment</strong>
              </td>
              <td>
                <strong>N 500,00</strong>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>12 Sep 2020</td>
              <td>
                <strong>Property A_Monthly payment</strong>
              </td>
              <td>
                <strong>N 500,00</strong>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>12 Sep 2020</td>
              <td>
                <strong>Property A_Monthly payment</strong>
              </td>
              <td>
                <strong>N 500,00</strong>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>12 Sep 2020</td>
              <td>
                <strong>Property A_Monthly payment</strong>
              </td>
              <td>
                <strong>N 500,00</strong>
              </td>
            </tr>
            <tr>
              <td>6</td>
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
      </div>
    </Card>
  </div>
);

export default Transactions;
