import React from 'react';
import {
  MyPropertyIcon,
  HomeIcon,
  TransactionIcon,
  ProfileIcon,
  ReferIcon,
  UserIcon,
} from 'components/utils/Icons';
import { VisitationIcon } from 'components/utils/Icons';
import { MessageIcon } from 'components/utils/Icons';
// import { ArticlesIcon } from 'components/utils/Icons';

export default [
  {
    title: 'Home',
    to: '/admin/dashboard',
    icon: <HomeIcon />,
    footer: true,
  },
  {
    title: 'Users',
    to: '/admin/users',
    icon: <UserIcon />,
    footer: false,
  },
  {
    title: 'Portfolios',
    to: '/admin/portfolios',
    icon: <MyPropertyIcon />,
    footer: true,
  },
  {
    title: 'Scheduled Visits',
    to: '/admin/scheduled-visits',
    icon: <VisitationIcon />,
    footer: false,
  },
  {
    title: 'Enquiries',
    to: '/admin/enquiries',
    icon: <MessageIcon />,
    footer: false,
  },
  {
    title: 'Transaction',
    to: '/admin/transactions',
    icon: <TransactionIcon />,
    footer: true,
  },
  // {
  //   title: 'Knowledgebase',
  //   to: '/admin/knowledgebase',
  //   icon: <ArticlesIcon />,
  //   footer: true,
  // },
  {
    title: 'Settings',
    to: '/user/settings',
    icon: <ProfileIcon />,
    footer: false,
  },
  {
    title: 'Refer to Earn',
    to: '/user/refer-and-earn',
    icon: <ReferIcon />,
    footer: true,
  },
];
