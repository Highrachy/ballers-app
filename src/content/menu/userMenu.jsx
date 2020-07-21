import React from 'react';
import {
  MyPropertyIcon,
  HomeIcon,
  TransactionIcon,
  MessageIcon,
  ProfileIcon,
  ReferIcon,
} from 'components/utils/Icons';

export default [
  {
    title: 'Home',
    to: '/user/dashboard',
    icon: <HomeIcon />,
  },
  {
    title: 'My Portfolio',
    to: '/user/portfolio',
    icon: <MyPropertyIcon />,
  },
  {
    title: 'Transaction',
    to: '/user/transations',
    icon: <TransactionIcon />,
  },
  {
    title: 'Message',
    to: '/user/message',
    icon: <MessageIcon />,
  },
  {
    title: 'Profile',
    to: '/user/payments-history',
    icon: <ProfileIcon />,
  },
  {
    title: 'Refer to Earn',
    to: '/user/refer-to-earn',
    icon: <ReferIcon />,
  },
];
