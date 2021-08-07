import { BASE_API_URL } from 'utils/constants';

export const API_ENDPOINT = {
  getOneProperty: (id) => `${BASE_API_URL}/property/${id}`,
  getAllProperties: () => `${BASE_API_URL}/property/all`,
  searchProperties: () => `${BASE_API_URL}/property/search`,

  getOnePortfolio: (id) => `${BASE_API_URL}/property/portfolio/${id}`,
  getAllPortfolios: () => `${BASE_API_URL}/property/portfolio/all`,

  getOneUser: (id) => `${BASE_API_URL}/user/${id}`,
  getAllUsers: () => `${BASE_API_URL}/user/all`,

  getOneEnquiry: (id) => `${BASE_API_URL}/enquiry/${id}`,
  getAllEnquiries: () => `${BASE_API_URL}/enquiry/all`,

  getOneOffer: (id) => `${BASE_API_URL}/offer/${id}`,
  getAllOffers: () => `${BASE_API_URL}/offer/all`,

  getOneTransaction: (id) => `${BASE_API_URL}/transaction/${id}`,
  getAllTransactions: () => `${BASE_API_URL}/transaction/all`,

  getOneVisitation: (id) => `${BASE_API_URL}/visitation/${id}`,
  getAllVisitations: () => `${BASE_API_URL}/visitation/all`,

  getAllOfflinePayments: () => `${BASE_API_URL}/offline-payment/all`,

  getAccountOverview: () => `${BASE_API_URL}/user/account-overview`,

  getAllNotifications: () => `${BASE_API_URL}/notification/all`,

  getAllStates: () => `${BASE_API_URL}/area/states`,
  getAllContentProperty: () => `${BASE_API_URL}/area/all`,

  getDashboardCount: () => `${BASE_API_URL}/total-count`,

  getAllReportedProperties: () => `${BASE_API_URL}/report-property/all`,
  getAllReferrals: () => `${BASE_API_URL}/referral/all`,

  getAllBadges: () => `${BASE_API_URL}/badge/all`,
  getOneBadge: (id) => `${BASE_API_URL}/badge/${id}`,
  getAllBadgesByRole: (role) => `${BASE_API_URL}/badge/all/role/${role}`,

  getAllAssignedBadges: () => `${BASE_API_URL}/assign-badge/all`,

  getAllBankAccounts: () => `${BASE_API_URL}/bank-account/all`,
};
