export const OFFICE_LOCATION = { lat: 6.4297284, lng: 3.4297021 };
export const BASE_API_URL = 'https://staging-ballers-api.herokuapp.com/api/v1';

export const USER_TYPES = {
  admin: 0,
  user: 1,
};

export const DASHBOARD_PAGE = {
  [USER_TYPES.user]: 'user',
  [USER_TYPES.admin]: 'admin',
};

export const COLOR_STYLE = [
  'primary',
  'secondary',
  'success',
  'danger',
  'error',
  'warning',
  'info',
  'light',
  'dark',
];

export const MALE_TITLES = ['Mr.', 'Master', 'Chief (Mr)', 'Alhaji'];
export const FEMALE_TITLES = ['Mrs.', 'Ms.', 'Miss', 'Chief (Mrs)', 'Alhaja'];

export const MOBILE_WIDTH = 576;

export const HOUSE_TYPES = [
  'Studio Apartment',
  '1 bedroom flat ',
  '2 bedroom flat',
  '3 bedroom flat',
  '4 bedroom flat',
  'Penthouse (1,2 or 3)',
  '2 bedroom Maisonette',
  '3 bedroom Maisonette',
  '4 bedroom Maisonette',
  '2 bedroom semi-detached duplex',
  '3 bedroom semi-detached duplex ',
  '4 bedroom semi-detached duplex',
  '5 bedroom semi-detached duplex',
  '3 bedroom detached duplex',
  '4 bedroom detached duplex',
  '5 bedroom detached duplex',
  '6 bedroom detached duplex',
  '2 bedroom terraced duplex',
  '3 bedroom terraced duplex',
  '4 bedroom terraced duplex',
  '2 bedroom bungalow',
  '3 bedroom bungalow',
  '4 bedroom bungalow',
  '1 bedroom semi-detached bungalow',
  '2 bedroom semi-detached bungalow',
  '3 bedroom semi-detached bungalow',
  '4 bedroom semi-detached bungalow',
  '1 bedroom terraced bungalow',
  '2 bedroom terraced bungalow ',
  '3 bedroom terraced bungalow',
  '4 bedroom terraced bungalow ',
].sort();
