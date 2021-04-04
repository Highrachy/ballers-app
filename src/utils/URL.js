import { BASE_API_URL } from 'utils/constants';

export const API_ENDPOINT = {
  getOneProperty: (id) => `${BASE_API_URL}/property/${id}`,
  getAllProperties: () => `${BASE_API_URL}/property/all`,

  getOnePortfolio: (id) => `${BASE_API_URL}/property/portfolio/${id}`,
  getAllPortfolios: () => `${BASE_API_URL}/property/portfolio/all`,

  getOneUser: (id) => `${BASE_API_URL}/user/${id}`,
  getAllUsers: () => `${BASE_API_URL}/user/all`,

  getOneEnquiry: (id) => `${BASE_API_URL}/enquiry/${id}`,
  getAllEnquiries: () => `${BASE_API_URL}/enquiry/all`,

  getOneOffer: (id) => `${BASE_API_URL}/offer/${id}`,
  getAllOffers: () => `${BASE_API_URL}/offer/all`,
};
