import React from 'react';
import userSideMenu from 'content/menu/userMenu';
import adminSideMenu from 'content/menu/adminMenu';
import editorSideMenu from 'content/menu/editorMenu';
import vendorSideMenu from 'content/menu/vendorMenu';
import { USER_TYPES } from 'utils/constants';
import { UserContext } from 'context/UserContext';
import { getUserRoleFromStore } from 'utils/localStorage';

const SIDE_MENU = {
  [USER_TYPES.admin]: adminSideMenu,
  [USER_TYPES.editor]: editorSideMenu,
  [USER_TYPES.user]: userSideMenu,
  [USER_TYPES.vendor]: vendorSideMenu,
};

export const useMenu = () => {
  const { userState } = React.useContext(UserContext);
  const currentUserRole = userState.type || getUserRoleFromStore();
  return SIDE_MENU[currentUserRole];
};
