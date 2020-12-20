import {
  stringValidation,
  required,
  phoneNumber,
  optionalValidation,
  lengthValidation,
} from './schema-helpers';

export const companyInfoSchema = {
  companyName: stringValidation('Company Name'),
  registerAs: required('Register As'),
  redanNumber: optionalValidation(required('Redan Number')),
};

export const bankSchema = {
  accountName: stringValidation('Account Name'),
  accountNumber: lengthValidation('Account Number', 10),
  bankName: stringValidation('Bank Name'),
};

export const signatorySchema = {
  name: stringValidation('Director Name'),
  phoneNumber,
  isSignatory: optionalValidation(required('Signatory')),
};
