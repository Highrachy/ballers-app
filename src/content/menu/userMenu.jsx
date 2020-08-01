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
    to: '/user/transactions',
    icon: <TransactionIcon />,
  },
  {
    title: 'Message',
    to: '/user/message',
    icon: <MessageIcon />,
  },
  {
    title: 'Profile',
    to: '/user/profile',
    icon: <ProfileIcon />,
  },
  {
    title: 'Refer to Earn',
    to: '/user/refer-and-earn',
    icon: <ReferIcon />,
  },
];
