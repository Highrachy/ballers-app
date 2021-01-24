import React from 'react';
import {
  HomeIcon,
  ProfileIcon,
  ReferIcon,
  MyPropertyIcon,
  TransactionIcon,
  UsersIcon,
} from 'components/utils/Icons';
import { MessageIcon } from 'components/utils/Icons';
import { FileIcon } from 'components/utils/Icons';
import {} from 'components/utils/Icons';
import { VisitationIcon } from 'components/utils/Icons';

export default [
  {
    title: 'Home',
    to: '/vendor/dashboard',
    icon: <HomeIcon />,
    footer: true,
  },
  {
    title: 'Users',
    to: '/vendor/users',
    icon: <UsersIcon />,
    footer: false,
  },
  {
    title: 'Portfolios',
    to: '/vendor/portfolios',
    icon: <MyPropertyIcon />,
    footer: true,
  },
  {
    title: 'Scheduled Visits',
    to: '/vendor/scheduled-visits',
    icon: <VisitationIcon />,
    footer: false,
  },
  {
    title: 'Enquiries',
    to: '/vendor/enquiries',
    icon: <MessageIcon />,
    footer: false,
  },
  {
    title: 'Transaction',
    to: '/vendor/transactions',
    icon: <TransactionIcon />,
    footer: true,
  },
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

export const unVerifiedVendorSideMenu = [
  {
    title: 'Home',
    to: '/vendor/dashboard',
    icon: <HomeIcon />,
    footer: false,
  },
  {
    title: 'Company Info',
    to: '/vendor/setup/1',
    icon: <MyPropertyIcon />,
    footer: true,
  },
  {
    title: 'Bank Information',
    to: '/vendor/setup/2',
    icon: <TransactionIcon />,
    footer: true,
  },
  {
    title: 'Signatories',
    to: '/vendor/setup/3',
    icon: <MessageIcon />,
    footer: true,
  },
  {
    title: 'Certificates',
    to: '/vendor/setup/4',
    icon: <FileIcon />,
    footer: true,
  },
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
    footer: false,
  },
];
