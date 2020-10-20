import {
  required,
  requiredDate,
  positiveNumberValidation,
} from './schema-helpers';

export const addTransactionSchema = {
  amount: positiveNumberValidation('Amount', 'amount'),
  additionalInfo: required('Additional Info'),
  paidOn: requiredDate('Paid On'),
};
