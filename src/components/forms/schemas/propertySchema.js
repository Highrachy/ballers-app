import {
  stringValidation,
  positiveNumberValidation,
  email,
  phoneNumber,
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
  bathrooms: positiveNumberValidation('Bathrooms'),
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

export const addAreaSchema = {
  area: required('Area'),
  state: required('State'),
};

export const addContentPropertySchema = {
  areaId: required('Area Id'),
  category: required('Category'),
  houseType: required('Property Type'),
  price: required('Price'),
  website: optionalValidation(required('Website')),
  link: optionalValidation(required('Link')),
};
export const uploadContentPropertySchema = {
  areaId: required('Area Id'),
  state: required('State'),
};

export const propertyFilterSchema = {
  name: optionalValidation(required('Property Name')),
  price: optionalValidation(required('Price')),
  toilets: optionalValidation(required('Toilets')),
  role: optionalValidation(required('Role')),
};
