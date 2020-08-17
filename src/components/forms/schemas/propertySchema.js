import {
  stringValidation,
  // optionalValidation,
  // required,
  positiveNumberValidation,
  email,
  phoneNumber,
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
