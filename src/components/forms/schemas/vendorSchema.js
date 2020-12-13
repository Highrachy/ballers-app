import {
  stringValidation,
  required,
  email,
  phoneNumber,
  optionalValidation,
} from './schema-helpers';

export const companyInfoSchema = {
  companyName: stringValidation('Company Name'),
  companyAddress: stringValidation('Company Address'),
  email,
  phoneNumber,
  registerAs: required('Register As'),
  identification: required('Identification'),
  identificationType: optionalValidation(required('Identification Type')),
  redanNumber: optionalValidation(required('Redan Number')),
};
