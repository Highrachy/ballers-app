import * as yup from 'yup';
import {
  stringValidation,
  // optionalValidation,
  // required,
  positiveNumberValidation,
  email,
  phoneNumber,
  numberValidation,
} from './schema-helpers';

export const newPropertySchema = {
  name: stringValidation('Property Name'),
  location: stringValidation('Location'),
  price: positiveNumberValidation('Price'),
  units: positiveNumberValidation('Units'),
  houseType: stringValidation('House Type'),
  bedrooms: positiveNumberValidation('Bedrooms'),
  toilets: positiveNumberValidation('Toilets'),
  description: stringValidation('Description'),
  mainImage: stringValidation('Main Image'),
  // floorPlans: optionalValidation(required('Floor Plans')),
  // titleDocument: optionalValidation(required('Title Document')),
  // mapLocation: optionalValidation(required('Map Location')),
  // neighborhood: Joi.array().label('Property neighborhood').optional(),
  // gallery: Joi.array().label('Property gallery').optional(),
};

export const scheduleTourSchema = {
  visitorName: stringValidation('Visitor Name'),
  visitorEmail: email,
  visitorPhone: phoneNumber,
};

export const offerLetterSchema = {
  propertyPrice: positiveNumberValidation('Property Price'),
  totalAmountPayable: positiveNumberValidation('Total Amount Payable').moreThan(
    yup.ref('propertyPrice'),
    'Total Amount Payable should be greater or equal to than property price'
  ),
  handOverDate: numberValidation('HandOver Date'),
  allocationMonth: positiveNumberValidation('Allocation Month'),
  initialPayment: positiveNumberValidation('Initial Payment'),
  monthlyPayment: positiveNumberValidation('Monthly Payment'),
  paymentFrequency: positiveNumberValidation('Payment Frequency'),
  offerExpires: positiveNumberValidation('Offer Expires'),
  titleDocument: stringValidation('Title Document'),
  deliveryState: stringValidation('Delivery State'),
};
