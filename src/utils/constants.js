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
  'Flat (1 bedroom)',
  'Flat (2 bedrooms)',
  'Flat (3 bedrooms)',
  'Flat (4 bedrooms)',
  'Penthouse (1 bedroom)',
  'Penthouse (2 bedrooms)',
  'Penthouse (3 bedrooms)',
  'Maisonette (2 bedrooms)',
  'Maisonette (3 bedrooms)',
  'Maisonette (4 bedrooms)',
  'Semi-detached Duplex (2 bedrooms)',
  'Semi-detached Duplex (3 bedrooms)',
  'Semi-detached Duplex (4 bedrooms)',
  'Semi-detached Duplex (5 bedrooms)',
  'Detached Duplex (3 bedrooms)',
  'Detached Duplex (4 bedrooms)',
  'Detached Duplex (5 bedrooms)',
  'Detached Duplex (6 bedrooms)',
  'Terraced Duplex (2 bedrooms)',
  'Terraced Duplex (3 bedrooms)',
  'Terraced Duplex (4 bedrooms)',
  'Bungalow (2 bedrooms)',
  'Bungalow (3 bedrooms)',
  'Bungalow (4 bedrooms)',
  'Semi-detached Bungalow (1 bedroom)',
  'Semi-detached Bungalow (2 bedrooms)',
  'Semi-detached Bungalow (3 bedrooms)',
  'Semi-detached Bungalow (4 bedrooms)',
  'Terraced Bungalow (1 bedroom)',
  'Terraced Bungalow (2 bedrooms)',
  'Terraced Bungalow (3 bedrooms)',
  'Terraced Bungalow (4 bedrooms)',
].sort();

export const REFERRAL_STATUS = {
  Sent: {
    text: 'Invite Sent',
    className: 'text-danger',
  },
  Registered: {
    text: 'Registered',
    className: 'text-warning',
  },
  Rewarded: {
    text: 'Rewarded',
    className: 'text-success',
  },
};

export const OFFER_STATUS = {
  GENERATED: 'Generated',
  INTERESTED: 'Interested',
  ASSIGNED: 'Assigned',
  ALLOCATED: 'Allocated',
  REJECTED: 'Rejected',
  NEGLECTED: 'Neglected',
  CANCELLED: 'Cancelled',
};

export const ACTIVE_OFFER_STATUS = [
  OFFER_STATUS.INTERESTED,
  OFFER_STATUS.ASSIGNED,
  OFFER_STATUS.ALLOCATED,
];
