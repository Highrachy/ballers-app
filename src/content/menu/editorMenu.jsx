import React from 'react';
import {
  MyPropertyIcon,
  HomeIcon,
  ProfileIcon,
  ReferIcon,
} from 'components/utils/Icons';
import { ArticlesIcon } from 'components/utils/Icons';
// import { ArticlesIcon } from 'components/utils/Icons';

export default [
  {
    title: 'Home',
    to: '/editor/dashboard',
    icon: <HomeIcon />,
    footer: true,
  },

  {
    title: 'Portfolios',
    to: '/editor/portfolios',
    icon: <MyPropertyIcon />,
    footer: true,
  },
  {
    title: 'Knowledgebase',
    to: '/editor/knowledgebase',
    icon: <ArticlesIcon />,
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
