export const OFFICE_LOCATION = { lat: 6.4297284, lng: 3.4297021 };
export const BASE_API_URL = 'https://staging-ballers-api.herokuapp.com/api/v1';

export const USER_TYPES = {
  admin: 0,
  user: 1,
  vendor: 2,
  editor: 3,
};

export const DASHBOARD_PAGE = {
  [USER_TYPES.user]: 'user',
  [USER_TYPES.admin]: 'admin',
  [USER_TYPES.vendor]: 'vendor',
  [USER_TYPES.editor]: 'editor',
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
  'Bungalow (2 bedrooms)',
  'Bungalow (3 bedrooms)',
  'Bungalow (4 bedrooms)',
  'Detached Duplex (3 bedrooms)',
  'Detached Duplex (4 bedrooms)',
  'Detached Duplex (5 bedrooms)',
  'Detached Duplex (6 bedrooms)',
  'Flat (1 bedroom)',
  'Flat (2 bedrooms)',
  'Flat (3 bedrooms)',
  'Flat (4 bedrooms)',
  'Maisonette (2 bedrooms)',
  'Maisonette (3 bedrooms)',
  'Maisonette (4 bedrooms)',
  'Penthouse (1 bedroom)',
  'Penthouse (2 bedrooms)',
  'Penthouse (3 bedrooms)',
  'Semi-detached Bungalow (1 bedroom)',
  'Semi-detached Bungalow (2 bedrooms)',
  'Semi-detached Bungalow (3 bedrooms)',
  'Semi-detached Bungalow (4 bedrooms)',
  'Semi-detached Duplex (2 bedrooms)',
  'Semi-detached Duplex (3 bedrooms)',
  'Semi-detached Duplex (4 bedrooms)',
  'Semi-detached Duplex (5 bedrooms)',
  'Studio Apartment',
  'Terraced Bungalow (1 bedroom)',
  'Terraced Bungalow (2 bedrooms)',
  'Terraced Bungalow (3 bedrooms)',
  'Terraced Bungalow (4 bedrooms)',
  'Terraced Duplex (2 bedrooms)',
  'Terraced Duplex (3 bedrooms)',
  'Terraced Duplex (4 bedrooms)',
];

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

export const STATES = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT - Abuja',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
];

export const VENDOR_IDENTIFICATION_TYPE = {
  'Limited Liability Company': 'Incorporation Document',
  'Registered Company Name': 'Company Registration Document',
  Individual: 'Valid Identification',
};

export const INDIVIDUAL_IDENTIFICATION_TYPE = [
  'Drivers License',
  'International Passport',
  'National Identification Card',
];

export const VENDOR_STEPS = {
  companyInfo: 'Company Information',
  bankDetails: 'Bank Details',
  directorInfo: 'Directors Information',
  documentUpload: 'Document Upload',
};

export const STATUS = {
  Pending: 'Pending',
  Resolved: 'Resolved',
};

export const VENDOR_VERIFICATION_STATUS = {
  NOT_STARTED: 'No Submitted Information',
  PENDING_COMMENTS: 'Pending Comments',
  IN_REVIEW: 'Currently In Review',
  AWAITING_INFO: 'Awaiting Information',
};
