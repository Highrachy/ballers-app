import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { UserContext } from 'context/UserContext';
import { Card } from 'react-bootstrap';

const Dashboard = () => (
  <BackendPage>
    <Welcome />
  </BackendPage>
);

const Welcome = () => {
  const { userState } = React.useContext(UserContext);
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Step 1</td>
                <td>Company Information</td>
                <td>No information available</td>
                <td>None</td>
                <td> </td>
              </tr>
              <tr>
                <td>Step 2</td>
                <td>Bank Information</td>
                <td>No information available</td>
                <td></td>
              </tr>
              <tr>
                <td>Step 3</td>
                <td>Directs and Signatories</td>
                <td>No information available</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
};

export default Dashboard;
