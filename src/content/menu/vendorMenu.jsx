import React from 'react';
import { HomeIcon, ProfileIcon, ReferIcon } from 'components/utils/Icons';

export default [
  {
    title: 'Home',
    to: '/vendor/dashboard',
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
