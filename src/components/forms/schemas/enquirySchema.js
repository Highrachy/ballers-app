import {
  stringValidation,
  email,
  phoneNumber,
  // minDateValidation,
  required,
} from './schema-helpers';

export const addEnquirySchema = {
  title: stringValidation('Title'),
  firstName: stringValidation('First Name'),
  lastName: stringValidation('Last Name'),
  otherName: stringValidation('Other Name'),
  email,
  phone: phoneNumber,
  occupation: stringValidation('Occupation'),
  nameOnTitleDocument: stringValidation('Name on Title Document'),
  // investmentStartDate: minDateValidation('Investment Start Date', new Date()),
  investmentStartDate: required('Investment Start Date', new Date()),
  initialInvestmentAmount: stringValidation('Initial Investment Amount'),
  investmentFrequency: required('Investment Frequency'),
  periodicInvestmentAmount: stringValidation('Periodic Investment Amount'),
};
