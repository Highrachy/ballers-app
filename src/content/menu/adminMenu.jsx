import React from 'react';
import {
  MyPropertyIcon,
  HomeIcon,
  TransactionIcon,
  ProfileIcon,
  ReferIcon,
  UsersIcon,
} from 'components/utils/Icons';

export default [
  {
    title: 'Home',
    to: '/admin/dashboard',
    icon: <HomeIcon />,
  },
  {
    title: 'Users',
    to: '/admin/users',
    icon: <UsersIcon />,
  },
  {
    title: 'Portfolios',
    to: '/admin/portfolios',
    icon: <MyPropertyIcon />,
  },
  {
    title: 'Transaction',
    to: '/admin/transactions',
    icon: <TransactionIcon />,
  },
  {
    title: 'Settings',
    to: '/user/settings',
    icon: <ProfileIcon />,
  },
  {
    title: 'Refer to Earn',
    to: '/user/refer-and-earn',
    icon: <ReferIcon />,
  },
];
