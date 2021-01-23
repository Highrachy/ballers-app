import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { UserContext } from 'context/UserContext';
// import { Card } from 'react-bootstrap';
import { Link } from '@reach/router';
import {
  getCompletedSteps,
  getVerifiedSteps,
} from 'components/pages/vendor/setup/AccountSetup';
import { CompanyInfoIcon } from 'components/utils/Icons';
import { SuccessIcon } from 'components/utils/Icons';
import { InfoIcon } from 'components/utils/Icons';
import { QuestionMarkIcon } from 'components/utils/Icons';
import { BankInfoIcon } from 'components/utils/Icons';
import { FileIcon } from 'components/utils/Icons';
import { UsersIcon } from 'components/utils/Icons';
import { ErrorIcon } from 'components/utils/Icons';
import { VENDOR_STEPS } from 'utils/constants';
import { MessageIcon } from 'components/utils/Icons';
import Humanize from 'humanize-plus';

const Dashboard = () => (
  <BackendPage>
    <Welcome />
  </BackendPage>
);

const Welcome = () => {
  const { userState } = React.useContext(UserContext);
  const completedSteps = getCompletedSteps(userState);
  const verifiedSteps = getVerifiedSteps(userState);

  const getVerificationStatus = (index) => {
    const status = completedSteps[index] ? verifiedSteps[index] : 'Pending';
    const currentStep = Object.keys(VENDOR_STEPS)[index];
    const comments = userState.vendor?.verification[currentStep].comments || [];
    const pendingComments = comments.filter(
      (comment) => comment.status === 'Pending'
    );

    switch (status) {
      case 'Verified':
        return {
          className: 'text-success',
          icon: <SuccessIcon />,
          status: 'Information has been verified',
        };
      case 'Pending':
        return pendingComments.length > 0
          ? {
              className: 'text-danger',
              icon: <MessageIcon />,
              status: `${pendingComments.length} pending  ${Humanize.pluralize(
                comments.length,
                'comment'
              )}`,
            }
          : {
              className: 'text-danger',
              icon: <QuestionMarkIcon />,
              status: 'Awaiting your input',
            };
      case 'In Review':
        return {
          className: 'text-secondary',
          icon: <InfoIcon />,
          status: 'Currently in Review',
        };
      default:
        return {
          class: 'text-muted',
          icon: <ErrorIcon />,
          status: 'Loading',
        };
    }
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

      {userState.vendor?.verified ? (
        <h3>You have been verified</h3>
      ) : (
        <>
          <section>
            <div className="card card-bordered my-4">
              <div className="card-inner p-4">
                <div className="row">
                  <div className="col-md-8">
                    <h6>You need to setup your Account to get started</h6>
                    <p className="text-muted">
                      Unlimited access with priority support, 99.95% uptime,
                      powerfull features and more...
                    </p>
                  </div>
                  <div className="col-md-4 text-right">
                    <Link
                      to="/vendor/setup/1"
                      className="btn btn-sm btn-wide btn-secondary mt-3"
                    >
                      Continue Setup
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-progress-bar">
                <div
                  className="progress-bar"
                  data-progress={25}
                  style={{ width: '25%' }}
                />
              </div>
            </div>
          </section>
          <div className="row">
            <VerificationCard
              icon={<CompanyInfoIcon />}
              title="Company Information"
              index={0}
              key={0}
              status={getVerificationStatus(0)}
            >
              See your profile data and manage your Account to choose what is
              saved in our system.
            </VerificationCard>

            <VerificationCard
              icon={<BankInfoIcon />}
              title="Bank Information"
              index={1}
              key={1}
              status={getVerificationStatus(1)}
            >
              See your profile data and manage your Account to choose what is
              saved in our system.
            </VerificationCard>

            <VerificationCard
              icon={<UsersIcon />}
              title="Signatories"
              index={2}
              key={2}
              status={getVerificationStatus(2)}
            >
              See your profile data and manage your Account to choose what is
              saved in our system.
            </VerificationCard>

            <VerificationCard
              icon={<FileIcon />}
              title="Certificates"
              status={getVerificationStatus(3)}
              index={3}
              key={3}
            >
              See your profile data and manage your Account to choose what is
              saved in our system.
            </VerificationCard>
          </div>
        </>
      )}
    </section>
  );
};

const VerificationCard = ({ title, children, icon, index, status }) => (
  <Link to={`/vendor/setup/${index + 1}`} className="col-md-6 mb-4">
    <div className="card verification-card">
      <div className="verification-card__block">
        <div className="verification-card__img">{icon}</div>
        <div>
          <h5 className="verification-card__title">
            {title}{' '}
            <span className={`${status.className} verification__icon`}>
              {status.icon}
            </span>
          </h5>
          <p className="verification-card__text">{children}</p>
        </div>
      </div>
      <div className="verification-card__action">
        {status.icon}
        {status.status}
      </div>
    </div>
  </Link>
);
export default Dashboard;
