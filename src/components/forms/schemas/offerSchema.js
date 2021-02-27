import {
  stringValidation,
  positiveNumberValidation,
  validPercentage,
  required,
  minDateValidation,
} from './schema-helpers';

export const offerLetterSchema = {
  totalAmountPayable: positiveNumberValidation('Total Amount Payable'),
  allocationInPercentage: validPercentage('Allocation'),
  initialPayment: positiveNumberValidation('Initial Payment'),
  initialPaymentDate: minDateValidation('Initial Payment Date', new Date()),
  periodicPayment: positiveNumberValidation('Periodic Payment'),
  paymentFrequency: required('Payment Frequency'),
  expires: required('Offer Expires'),
  title: stringValidation('Title Document'),
  deliveryState: stringValidation('Delivery State'),
};

export const raiseAConcernSchema = {
  question: required('Question'),
};
