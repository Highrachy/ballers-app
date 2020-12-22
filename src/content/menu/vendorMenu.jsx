import React from 'react';
import {
  HomeIcon,
  ProfileIcon,
  ReferIcon,
  MyPropertyIcon,
  TransactionIcon,
} from 'components/utils/Icons';
import { MessageIcon } from 'components/utils/Icons';
import { FileIcon } from 'components/utils/Icons';

export default [
  {
    title: 'Home',
    to: '/vendor/dashboard',
    icon: <HomeIcon />,
    footer: true,
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
