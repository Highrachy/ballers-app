import {
  stringValidation,
  positiveNumberValidation,
  email,
  phoneNumber,
  validPercentage,
  minDateValidation,
  required,
  optionalValidation,
} from './schema-helpers';

export const newPropertySchema = {
  name: stringValidation('Property Name'),
  price: positiveNumberValidation('Price'),
  units: positiveNumberValidation('Units'),
  houseType: stringValidation('House Type'),
  bedrooms: positiveNumberValidation('Bedrooms'),
  toilets: positiveNumberValidation('Toilets'),
  description: stringValidation('Description'),
  titleDocument: optionalValidation(required('Title Document')),
  // floorPlans: optionalValidation(required('Floor Plans')),
  // mapLocation: optionalValidation(required('Map Location')),
  // neighborhood: Joi.array().label('Property neighborhood').optional(),
  // gallery: Joi.array().label('Property gallery').optional(),
};

export const scheduleTourSchema = {
  visitorName: stringValidation('Visitor Name'),
  visitorEmail: email,
  visitorPhone: phoneNumber,
  visitDate: minDateValidation('Visitation Date', new Date()),
};

export const offerLetterSchema = {
  totalAmountPayable: positiveNumberValidation('Total Amount Payable'),
  allocationInPercentage: validPercentage('Allocation'),
  initialPayment: positiveNumberValidation('Initial Payment'),
  monthlyPayment: positiveNumberValidation('Monthly Payment'),
  paymentFrequency: required('Payment Frequency'),
  expires: required('Offer Expires'),
  title: stringValidation('Title Document'),
  deliveryState: stringValidation('Delivery State'),
};
