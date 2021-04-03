import { BASE_API_URL } from 'utils/constants';

export const BASE_API = {
  getOneProperty: (id) => `${BASE_API_URL}/property/${id}`,
  getAllProperties: () => `${BASE_API_URL}/property/all`,

  getOneUser: (id) => `${BASE_API_URL}/user/${id}`,
  getAllUsers: () => `${BASE_API_URL}/user/all`,

  getOneEnquiry: (id) => `${BASE_API_URL}/enquiry/${id}`,
  getAllEnquiries: () => `${BASE_API_URL}/enquiry/all`,
};
