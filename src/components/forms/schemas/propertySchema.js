import {
  stringValidation,
  optionalValidation,
  required,
  positiveNumberValidation,
} from './schema-helpers';

export const newPropertySchema = {
  name: stringValidation('Property Name'),
  titleDocument: optionalValidation(required('Title Document')),
  location: stringValidation('Location'),
  price: positiveNumberValidation('Price'),
  units: positiveNumberValidation('Units'),
  houseType: stringValidation('House Type'),
  bedrooms: positiveNumberValidation('Bedrooms'),
  toilets: positiveNumberValidation('Toilets'),
  description: stringValidation('Description'),
  floorPlans: optionalValidation(required('Floor Plans')),
  mainImage: stringValidation('Main Image'),
  // mapLocation: optionalValidation(required('Map Location')),
  // neighborhood: Joi.array().label('Property neighborhood').optional(),
  // gallery: Joi.array().label('Property gallery').optional(),
};
