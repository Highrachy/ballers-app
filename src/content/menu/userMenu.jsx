import React from 'react';
import {
  MyPropertyIcon,
  HomeIcon,
  TransactionIcon,
  ProfileIcon,
  ReferIcon,
  PropertyIcon,
} from 'components/utils/Icons';

export default [
  {
    title: 'Home',
    to: '/user/dashboard',
    icon: <HomeIcon />,
    footer: true,
  },
  {
    title: 'My Portfolio',
    to: '/user/portfolio',
    icon: <MyPropertyIcon />,
    footer: true,
  },
  {
    title: 'Transaction',
    to: '/user/transactions',
    icon: <TransactionIcon />,
    footer: false,
  },
  {
    title: 'Just For You',
    to: '/user/just-for-you',
    icon: <PropertyIcon />,
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

export const userLoadingMenu = [
  {
    title: 'Home',
    to: '/user/dashboard',
    icon: <HomeIcon />,
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
