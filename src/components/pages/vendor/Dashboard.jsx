import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { UserContext } from 'context/UserContext';
import { Card } from 'react-bootstrap';
import { Link } from '@reach/router';
import {
  getCompletedSteps,
  getVerifiedSteps,
} from 'components/pages/vendor/setup/AccountSetup';

const Dashboard = () => (
  <BackendPage>
    <Welcome />
  </BackendPage>
);

const Welcome = () => {
  const { userState } = React.useContext(UserContext);
  const completedSteps = getCompletedSteps(userState);
  const verifiedSteps = getVerifiedSteps(userState);

  const getComment = (step, comment) => {
    const length = userState.vendor?.verification[step].comments.length || 0;
    return length > 0
      ? userState.vendor?.verification[step].comments[length - 1].comment
      : comment;
  };

  return (
    <section className="container-fluid">
      <div className="card bg-primary dashboard mb-3">
        <div className="row">
          <div className="col-sm-12">
            <h4>Hello, {userState.firstName} </h4>
            <p className="lead">Welcome to the Vendor Page!</p>
          </div>
        </div>
      </div>
      <Card className="mt-4">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Comment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Step 1</td>
                <td>
                  <Link to="/vendor/setup/1">Company Information</Link>
                </td>
                <td>
                  {getComment(
                    'companyInfo',
                    <>Upload Company Logo &amp; Update Company Infomation</>
                  )}
                </td>
                <td>
                  {completedSteps[0] ? verifiedSteps[0] : 'Not Completed'}
                </td>
              </tr>
              <tr>
                <td>Step 2</td>

                <td>
                  <Link to="/vendor/setup/2">Bank Information</Link>
                </td>
                <td>{getComment('bankDetails', 'Add Bank Details')}</td>
                <td>
                  {completedSteps[1] ? verifiedSteps[1] : 'Not Completed'}
                </td>
              </tr>
              <tr>
                <td>Step 3</td>
                <td>
                  <Link to="/vendor/setup/3">Directors and Signatories</Link>
                </td>

                <td>
                  {getComment('directorInfo', 'Add Directors and Signatories')}
                </td>
                <td>
                  {completedSteps[2] ? verifiedSteps[2] : 'Not Completed'}
                </td>
              </tr>
              <tr>
                <td>Step 4</td>
                <td>
                  <Link to="/vendor/setup/4">Certificates</Link>
                </td>
                <td>
                  {getComment(
                    'documentUpload',
                    <>Upload Identification &amp; Tax Certificates</>
                  )}
                </td>
                <td>
                  {completedSteps[3] ? verifiedSteps[3] : 'Not Completed'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
};

export default Dashboard;
