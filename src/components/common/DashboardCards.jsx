import React from 'react';
import { FileIcon } from 'components/utils/Icons';
import { PropertyIcon } from 'components/utils/Icons';
import { TransactionIcon } from 'components/utils/Icons';
import { VisitationIcon } from 'components/utils/Icons';
import { EnquiryIcon } from 'components/utils/Icons';
import { PortfolioIcon } from 'components/utils/Icons';
import { useGetQuery } from 'hooks/useQuery';
import { API_ENDPOINT } from 'utils/URL';
import { ArrowRightIcon } from 'components/utils/Icons';
import { Link } from '@reach/router';
import { useCurrentRole } from 'hooks/useUser';
import Humanize from 'humanize-plus';
import { ReportedPropertyIcon } from 'components/utils/Icons';

const DashboardCards = () => {
  const propertyCard = {
    name: 'properties',
    Icon: <PropertyIcon />,
    title: 'Properties',
    to: 'properties',
    content:
      'See your profile data and manage your Account to choose what is saved in our system.',
    footer: null,
  };

  const offersCard = {
    name: 'offers',
    Icon: <FileIcon />,
    title: 'Offers',
    to: 'offers',
    content:
      'See your profile data and manage your Account to choose what is saved in our system.',
    footer: null,
  };

  const portfolioCard = {
    name: 'portfolios',
    Icon: <PortfolioIcon />,
    title: 'Portfolios',
    to: 'portfolios',
    content:
      'See your profile data and manage your Account to choose what is saved in our system.',
    footer: null,
  };

  const transactionCard = {
    name: 'transactions',
    Icon: <TransactionIcon />,
    title: 'Transactions',
    to: 'transactions',
    content:
      'See your profile data and manage your Account to choose what is saved in our system.',
    footer: null,
  };

  const enquiryCard = {
    name: 'enquiries',
    Icon: <EnquiryIcon />,
    title: 'Enquiries',
    to: 'enquiries',
    content:
      'See your profile data and manage your Account to choose what is saved in our system.',
    footer: null,
  };

  const scheduledVisitationCard = {
    name: 'scheduledVisitations',
    Icon: <VisitationIcon />,
    title: 'Scheduled Visits',
    to: 'scheduled-visits',
    content:
      'See your profile data and manage your Account to choose what is saved in our system.',
    footer: null,
  };

  const reportedPropertiesCard = {
    name: 'reportedProperties',
    Icon: <ReportedPropertyIcon />,
    title: 'Reported Properties',
    to: 'reported-properties',
    content:
      'See your profile data and manage your Account to choose what is saved in our system.',
    footer: null,
  };

  const [dashboardCountQuery] = useGetQuery({
    key: 'dashboardCount',
    name: 'dashboardCount',
    endpoint: API_ENDPOINT.getDashboardCount(),
    refresh: true,
  });

  const VENDOR_DASHBOARD_CARDS = [
    propertyCard,
    offersCard,
    portfolioCard,
    transactionCard,
    enquiryCard,
    scheduledVisitationCard,
  ];
  const ADMIN_DASHBOARD_CARDS = [
    propertyCard,
    offersCard,
    portfolioCard,
    transactionCard,
    enquiryCard,
    scheduledVisitationCard,
    reportedPropertiesCard,
  ];

  const dashboardCards = useCurrentRole().isAdmin
    ? ADMIN_DASHBOARD_CARDS
    : VENDOR_DASHBOARD_CARDS;

  return (
    <div className="row mt-4">
      {dashboardCards.map(
        ({ Icon, title, to, content, footer, name }, index) => (
          <DashboardCard
            Icon={Icon}
            title={title}
            to={to}
            key={index}
            footer={footer}
            total={dashboardCountQuery?.data?.models?.[name] || 0}
          >
            {content}
          </DashboardCard>
        )
      )}
    </div>
  );
};

const DashboardCard = ({ title, children, Icon, footer, to, total }) => (
  <Link to={`/${useCurrentRole().name}/${to}`} className="col-md-6 mb-4">
    <div className="card verification-card">
      <div className="verification-card__block">
        <div className="verification-card__img">{Icon}</div>
        <div>
          <h5 className="verification-card__title">{title}</h5>
          <p className="verification-card__text">{children}</p>
        </div>
      </div>
      <div className="verification-card__action strong">
        {footer ||
          `You have ${total} ${Humanize.pluralize(total, title, title)}`}
        <small className="float-right">
          <ArrowRightIcon />
        </small>
      </div>
    </div>
  </Link>
);

export default DashboardCards;
