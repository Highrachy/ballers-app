import {
  required,
  requiredDate,
  positiveNumberValidation,
  optionalValidation,
} from './schema-helpers';

export const addTransactionSchema = {
  amount: positiveNumberValidation('Amount', 'amount'),
  additionalInfo: required('Additional Info'),
  paidOn: requiredDate('Paid On'),
};

export const onlinePaymentSchema = {
  amount: positiveNumberValidation('Amount', 'amount'),
};

export const offlinePaymentSchema = {
  amount: positiveNumberValidation('Amount', 'amount'),
  bank: required('Bank'),
  dateOfPayment: requiredDate('Payment Date'),
  offerId: required('Offer id'),
  receipt: optionalValidation(required('Receipt')),
  type: required('Payment Type'),
};
