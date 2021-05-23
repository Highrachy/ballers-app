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
export const TITLES = [...MALE_TITLES, ...FEMALE_TITLES].sort();

export const MOBILE_WIDTH = 576;

export const HOUSE_TYPES = [
  'Bungalow',
  'Detached Duplex',
  'Flat',
  'Maisonette',
  'Penthouse',
  'Semi-detached Bungalow',
  'Semi-detached Duplex',
  'Studio Apartment',
  'Terraced Bungalow',
  'Terraced Duplex',
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

export const DEFAULT_PROPERTY_FEATURES = [
  'Car Parking',
  'Guest Toilet',
  'Guest Room',
  "Governor's Consent",
  'Electricity',
  'Paved Roads',
  'Perimeter Fence',
  'Portable Water',
  'Fully Tiled',
  'Ensuite Rooms',
  'Easy Access to Roads',
];

export const ALL_PROPERTY_FEATURES = [
  ...DEFAULT_PROPERTY_FEATURES,
  'Cable TV Distibution',
  'Core Fiber Internet',
  'Inverter System',
  'Security Fence',
  'Parking Lot',
  'Dedicated Car Port',
  'Maid Room',
  'Surveillance System',
  'Smart Solar System',
  'Panic Alarm',
  'Intercom System',
  'Spacious Kitchen',
  'Video door phone',
  'Fire detection',
  'Swimming Pool',
  'Rooftop Gym',
  'Garage',
  'Free WiFi',
  'Peaceful Environment',
  'Fitted Kitchen',
];

export const NEIGHBORHOOD_STEPS = [
  'entertainments',
  'hospitals',
  'pointsOfInterest',
  'restaurantsAndBars',
  'schools',
  'shoppingMalls',
];

export const VISITATION_STATUS = {
  CANCELLED: 'Cancelled',
  PENDING: 'Pending',
  RESOLVED: 'Resolved',
};

export const BALLERS_BANK_ACCOUNTS = [
  {
    accountName: 'Highrachy Investment and Technology Ltd',
    accountNo: '2032997125',
    bankName: 'First Bank Of Nigeria Plc',
  },
];

export const PAYMENT_FREQUENCY = {
  0: 'Outright Payment',
  7: '7 days',
  30: '30 days',
  90: '90 days',
  180: '180 days',
};

export const NOTIFICATION_TYPE = {
  0: 'danger',
  1: 'text',
  2: 'info',
  3: 'success',
};

export const DEFAULT_VENDOR_PERCENTAGE = 5;

export const NOTIFICATION_ACTION = {
  ENQUIRY: 'ENQUIRY',
  OFFLINE_PAYMENT: 'OFFLINE_PAYMENT',
  OFFER: 'OFFER',
  PROPERTY: 'PROPERTY',
  TRANSACTION: 'PAYMENT',
  USER: 'USER',
  VISITATION: 'VISITATION',
};
