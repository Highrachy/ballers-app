import { BASE_API_URL } from 'utils/constants';

const URL = {
  getOneProperty: (id) => `${BASE_API_URL}/property/${id}`,
};

export default URL;
