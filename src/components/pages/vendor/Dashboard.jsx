import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { UserContext } from 'context/UserContext';
import { Link } from '@reach/router';
import {
  getCompletedSteps,
  getVerificationState,
} from 'components/pages/vendor/setup/AccountSetup';
import { CompanyInfoIcon } from 'components/utils/Icons';
import { BankInfoIcon } from 'components/utils/Icons';
import { FileIcon } from 'components/utils/Icons';
import { UserIcon } from 'components/utils/Icons';
import { MessageIcon } from 'components/utils/Icons';
import Humanize from 'humanize-plus';
import { Loading } from 'components/utils/LoadingItems';
import { MyPropertyIcon } from 'components/utils/Icons';
import { TransactionIcon } from 'components/utils/Icons';
import { getVerificationStatus } from './setup/AccountSetup';
import { CertifyIcon } from 'components/utils/Icons';

const Dashboard = () => (
  <BackendPage>
    <Welcome />
  </BackendPage>
);

const Welcome = () => {
  const { userState } = React.useContext(UserContext);
  const completedSteps = getCompletedSteps(userState);

  const noOfCompletedSteps = completedSteps.filter(Boolean).length;
  const currentProgress = noOfCompletedSteps * 25;

  const verificationState = getVerificationState(userState);

  if (!userState.firstName) {
    return <Loading Icon={<UserIcon />} text="Retrieving your Information" />;
  }

  return (
    <section className="container-fluid">
      <div className="card bg-primary dashboard mb-3">
        <div className="row">
          <div className="col-sm-12">
            <h4>
              Hello, {userState.vendor?.companyName || userState.firstName}{' '}
              {userState.vendor.certified && <CertifyIcon />}{' '}
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
              icon={<UserIcon />}
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

                      {verificationState.noOfComments ? (
                        <>
                          {verificationState.noOfComments} Pending{' '}
                          {Humanize.pluralize(
                            verificationState.noOfComments,
                            'Comment'
                          )}
                        </>
                      ) : (
                        verificationState.status
                      )}
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
                  className="pl-4 text-right text-smaller text-secondary px-2"
                  style={{ width: `${currentProgress}%` }}
                >
                  {noOfCompletedSteps > 0 && currentProgress !== 100 && (
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
              status={getVerificationStatus(userState, 0)}
            >
              See your profile data and manage your Account to choose what is
              saved in our system.
            </VerificationCard>

            <VerificationCard
              icon={<BankInfoIcon />}
              title="Bank Information"
              index={1}
              key={1}
              status={getVerificationStatus(userState, 1)}
            >
              See your profile data and manage your Account to choose what is
              saved in our system.
            </VerificationCard>

            <VerificationCard
              icon={<UserIcon />}
              title="Signatories"
              index={2}
              key={2}
              status={getVerificationStatus(userState, 2)}
            >
              See your profile data and manage your Account to choose what is
              saved in our system.
            </VerificationCard>

            <VerificationCard
              icon={<FileIcon />}
              title="Certificates"
              status={getVerificationStatus(userState, 3)}
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
