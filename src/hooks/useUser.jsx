import React from 'react';
import { DASHBOARD_PAGE } from 'utils/constants';
import { UserContext } from 'context/UserContext';
import { getUserRoleFromStore } from 'utils/localStorage';

export const useCurrentRole = () => {
  const { userState } = React.useContext(UserContext);

  const role = userState.role || getUserRoleFromStore();
  return { role, name: DASHBOARD_PAGE[userState?.role] };
};
