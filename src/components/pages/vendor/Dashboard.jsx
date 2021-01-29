import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { UserContext } from 'context/UserContext';
// import { Card } from 'react-bootstrap';
import { Link } from '@reach/router';
import {
  getCompletedSteps,
  getVerifiedSteps,
  getVerificationState,
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
import { Loading } from 'components/utils/LoadingItems';
import { MyPropertyIcon } from 'components/utils/Icons';
import { TransactionIcon } from 'components/utils/Icons';

const Dashboard = () => (
  <BackendPage>
    <Welcome />
  </BackendPage>
);

const Welcome = () => {
  const { userState } = React.useContext(UserContext);
  const completedSteps = getCompletedSteps(userState);
  const verifiedSteps = getVerifiedSteps(userState);

  const noOfCompletedSteps = completedSteps.filter(Boolean).length;
  const currentProgress = noOfCompletedSteps * 25;

  const verificationState = getVerificationState(userState);

  const getVerificationStatus = (index) => {
    const status = completedSteps[index] ? verifiedSteps[index] : 'Pending';
    const currentStep = Object.keys(VENDOR_STEPS)[index];
    const comments =
      userState.vendor?.verification?.[currentStep].comments || [];
    const pendingComments = comments.filter(
      (comment) => comment.status === 'Pending'
    );

    if (pendingComments.length > 0) {
      return {
        className: 'text-danger',
        icon: <MessageIcon />,
        status: `${pendingComments.length} pending  ${Humanize.pluralize(
          comments.length,
          'comment'
        )}`,
      };
    }

    switch (status) {
      case 'Verified':
        return {
          className: 'text-success',
          icon: <SuccessIcon />,
          status: 'Information has been verified',
        };
      case 'Pending':
        return {
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
          status: '',
        };
    }
  };

  if (!userState.firstName) {
    return <Loading Icon={<UsersIcon />} text="Retrieving your Information" />;
  }

  return (
    <section className="container-fluid">
      <div className="card bg-primary dashboard mb-3">
        <div className="row">
          <div className="col-sm-12">
            <h4>
              Hello, {userState.vendor?.companyName || userState.firstName}{' '}
              {userState.vendor.certified && <SuccessIcon />}{' '}
            </h4>
            <p className="lead">Welcome to Ballers</p>
          </div>
        </div>
      </div>

      {userState.vendor?.verified ? (
        <>
          <section>
            <div className="card card-bordered my-4">
              <div className="card-inner px-4 py-3">
                <div className="row">
                  <div className="col-md-8">
                    <h6 className="pt-2">
                      {' '}
                      <MessageIcon /> You have no unresolved enquiries
                    </h6>
                  </div>
                  <div className="col-md-4 text-right">
                    <Link
                      to={`/vendor/setup/${verificationState.page}`}
                      className="btn btn-sm btn-wide btn-secondary"
                    >
                      View Enquiries
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="row">
            <DashboardCard
              icon={<MyPropertyIcon />}
              title="Properties"
              to="vendor/portfolios"
              key={2}
              footer="See list of your properties"
            >
              See your profile data and manage your Account to choose what is
              saved in our system.
            </DashboardCard>

            <DashboardCard
              icon={<FileIcon />}
              title="Offer Letters"
              to="vendor/users"
              key={2}
              footer="See list of past offer letters"
            >
              See your profile data and manage your Account to choose what is
              saved in our system.
            </DashboardCard>
            <DashboardCard
              icon={<UsersIcon />}
              title="My Users"
              to="vendor/users"
              key={2}
              footer="See list of your users"
            >
              See your profile data and manage your Account to choose what is
              saved in our system.
            </DashboardCard>
            <DashboardCard
              icon={<TransactionIcon />}
              title="Transactions"
              to="vendor/users"
              key={2}
              footer="See list of your transactions"
            >
              See your profile data and manage your Account to choose what is
              saved in our system.
            </DashboardCard>
          </div>
        </>
      ) : (
        <>
          <section>
            <div className="card card-bordered my-4">
              <div className="card-inner p-4">
                <div className="row">
                  <div className="col-md-8">
                    <h6>You need setup a verified Account to get started</h6>
                    <p className="text-muted">
                      <strong>Status: </strong>
                      {verificationState.status}
                    </p>
                  </div>
                  <div className="col-md-4 text-right">
                    <Link
                      to={`/vendor/setup/${verificationState.page}`}
                      className="btn btn-sm btn-wide btn-secondary mt-3"
                    >
                      {noOfCompletedSteps > 0
                        ? 'Continue Setup'
                        : 'Start Setup'}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-progress-bar">
                <div
                  className="pl-4 text-right text-smaller text-lighter px-2"
                  style={{ width: `${currentProgress}%` }}
                >
                  {noOfCompletedSteps > 0 && (
                    <>{currentProgress}% information has been submitted</>
                  )}
                </div>
                <div
                  className="progress-bar"
                  data-progress={currentProgress}
                  style={{ width: `${currentProgress}%` }}
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

const DashboardCard = ({ title, children, icon, footer, to }) => (
  <Link to={to} className="col-md-6 mb-4">
    <div className="card verification-card">
      <div className="verification-card__block">
        <div className="verification-card__img">{icon}</div>
        <div>
          <h5 className="verification-card__title">{title}</h5>
          <p className="verification-card__text">{children}</p>
        </div>
      </div>
      <div className="verification-card__action">{footer}</div>
    </div>
  </Link>
);

export default Dashboard;
