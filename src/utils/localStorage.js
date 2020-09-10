import store from 'store2';

const PREFIX = 'ballers';
const TOKEN = `${PREFIX}-token`;
const USER_TYPE = `${PREFIX}-user-type`;
const FIRST_NAME = `${PREFIX}-first-name`;
const PROPERTY_IMAGE = `${PREFIX}-property-image`;

export const storeToken = (token) => store(TOKEN, token);
export const getTokenFromStore = () => store(TOKEN);
export const storeUserRole = (type) => store(USER_TYPE, type);
export const getUserRoleFromStore = () =>
  store(USER_TYPE) || store(USER_TYPE) === 0 ? store(USER_TYPE) : '1';

export const storeUserFirstName = (firstName) => store(FIRST_NAME, firstName);
export const getUserFirstName = () => store(FIRST_NAME);
export const storePropertyImage = (image) => store(PROPERTY_IMAGE, image);
export const getPropertyImage = () => store(PROPERTY_IMAGE);
export const removePropertyImage = () => store.remove(PROPERTY_IMAGE);
export const clearStorage = () => store(false);
