import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { UserContext } from 'context/UserContext';
import { Link } from '@reach/router';
import {
  UsersIcon,
  AssignedPropertyIcon,
  MyPropertyIcon,
  MessageIcon,
} from 'components/utils/Icons';
import { VisitationIcon } from 'components/utils/Icons';
import { TransactionIcon } from 'components/utils/Icons';

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
            <p className="lead">Welcome to Admin Section!</p>
          </div>
        </div>
      </div>

      <div className="row">
        <DashboardCardList
          icon={<MyPropertyIcon />}
          name="Added Properties"
          number={7}
        />
        <DashboardCardList
          icon={<MessageIcon />}
          name="Property Enquiries"
          number={15}
          to="/admin/enquiries"
        />
        <DashboardCardList
          icon={<AssignedPropertyIcon />}
          name="Assign Properties"
          number={18}
        />
        <DashboardCardList
          icon={<VisitationIcon />}
          name="Scheduled Visits"
          number={10}
        />
        <DashboardCardList
          icon={<TransactionIcon />}
          name="Completed Transactions"
          number={5}
        />
        <DashboardCardList
          icon={<UsersIcon />}
          name="Interested Users"
          number={3}
        />
      </div>
    </section>
  );
};

const DashboardCardList = ({ icon, name, number, to }) => (
  <Link className="col-sm-6 col-md-4 dashboard__card" to={to || '/'}>
    <div className="card my-3">
      <div className="card-body p-0">
        <div className="media p-4 border-bottom">
          <div className="media-body py-3">
            <h4 className="mt-0 mb-1 font-weight-normal">{number}</h4>
            <span className="text-muted">{name}</span>
          </div>
          {icon}
        </div>
      </div>
    </div>
  </Link>
);

export default Dashboard;
