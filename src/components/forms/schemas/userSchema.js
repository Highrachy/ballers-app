import * as yup from 'yup';
import {
  stringValidation,
  OptionalPhoneNumber,
  email,
  password,
  strongPassword,
  confirmPassword,
  phoneNumber,
  optionalValidation,
  positiveNumberValidation,
  // OptionalPhoneNumber,
} from './schema-helpers';

const agreement = yup
  .array()
  .of(yup.boolean())
  .required('You must agree with our terms and policy to proceed');

export const loginSchema = {
  email,
  password,
};

export const resetPasswordSchema = {
  password: strongPassword,
  confirmPassword: confirmPassword,
};

export const registerSchema = {
  firstName: stringValidation('First Name'),
  lastName: stringValidation('Last Name'),
  phone: phoneNumber,
  email,
  password: strongPassword,
  confirmPassword: confirmPassword,
  agreement,
};

export const changePasswordSchema = {
  oldPassword: strongPassword,
  password: strongPassword,
  confirmPassword: confirmPassword,
};

export const personalInfoSchema = {
  firstName: stringValidation('First Name'),
  lastName: stringValidation('Last Name'),
  phone: phoneNumber,
  phone2: OptionalPhoneNumber,
};

export const preferenceSchema = {
  location: optionalValidation(stringValidation('State')),
  houseType: optionalValidation(stringValidation('Last Name')),
  minPrice: optionalValidation(
    positiveNumberValidation('Minimum Budget', 'budget')
  ),
  maxPrice: optionalValidation(
    positiveNumberValidation('Maximum Budget', 'budget').moreThan(
      yup.ref('minPrice'),
      'Maximum Budget should be greater than the minimum Budget'
    )
  ),
};

export const forgotPasswordSchema = { email };
