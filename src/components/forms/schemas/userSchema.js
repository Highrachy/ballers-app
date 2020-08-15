import * as yup from 'yup';
import {
  stringValidation,
  OptionalPhoneNumber,
  email,
  password,
  strongPassword,
  confirmPassword,
  phoneNumber,
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

export const forgotPasswordSchema = { email };
