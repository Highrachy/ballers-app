import React from 'react';
import Humanize from 'humanize-plus';
import Converter from 'number-to-words';
import { MALE_TITLES, FEMALE_TITLES } from './constants';

export const commaNumber = (value, prependCurrency = false) => {
  const number = parseInt(value, 10);
  const currency = prependCurrency ? '₦' : '';
  return currency + Humanize.intComma(number);
};

export const moneyFormat = (value) => Humanize.formatNumber(value, 2);
export const moneyFormatInNaira = (value) => commaNumber(value, true);

export const listJsonItems = (items, defaultValue = null) => {
  try {
    const parsedItems = JSON.parse(items);
    if (!parsedItems) return defaultValue;
    if (parsedItems.length <= 1) return parsedItems;
    return parsedItems.join(', ');
  } catch (error) {
    return defaultValue;
  }
};

export const dashedLowerCase = (text) =>
  text && text.toString().replace(/\s+/g, '-').toLowerCase();

export const getItems = (items, end) => {
  if (items == null) return items;
  // The slice() method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.
  return items.slice(0, end);
};

export const numToWords = (num) => Humanize.titleCase(Converter.toWords(num));
export const numToOrdinal = (num) =>
  Humanize.titleCase(Converter.toWordsOrdinal(num));

export const getPercentage = (value) => parseFloat(value) / 100;
export const getNairaSymbol = () => <>&#8358;</>;
export const ONE_MILLION = 1000000;
export const nearestMillion = (value) =>
  moneyFormatInNaira(Math.round(value / ONE_MILLION) * ONE_MILLION);

export const isDevEnvironment = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const getProxy = () =>
  isDevEnvironment() ? 'http://localhost:8080' : '';

export const getError = (error) =>
  (error &&
    error.response &&
    error.response.data &&
    (error.response.data.error || error.response.data.message)) ||
  'An error has occured. Please try again later.';

export const generateNumOptions = (number = 12, type = '', options = {}) => {
  const startFrom =
    options.startFrom || options.startFrom === 0 ? options.startFrom : 1;
  const firstMonthText = options.firstMonthText;
  const pluralizeText = options.pluralizeText || true;

  return [...Array(number).keys()].map((value) => {
    const num = value + startFrom;
    return {
      value: num.toString(),
      label:
        num.toString() === startFrom.toString() && firstMonthText
          ? firstMonthText
          : `${num} ${pluralizeText ? Humanize.pluralize(num, type) : type}`,
    };
  });
};

export const generateBudgetOptions = (options) => {
  const start = options.start || 5;
  const end = options.end || 30;
  const defaultValue = options.defaultValue || 0;
  const showBlankOption = options.showBlankOption || false;

  const blankOption = [
    { value: defaultValue.toString(), label: 'Not Applicable' },
  ];
  const budget = [...Array(end - start).keys()].map((value) => {
    const num = value + start;
    return {
      value: (num * ONE_MILLION).toString(),
      label: `${num.toString()} Million Naira`,
    };
  });

  return showBlankOption ? [...blankOption, ...budget] : budget;
};

export const valuesToOptions = (values, defaultLabel = null) => {
  const output = values.map((value) => ({
    value: value.toString(),
    label: value,
  }));

  return defaultLabel
    ? [{ value: '', label: defaultLabel }, ...output]
    : output;
};

export const getGenderFromTitle = (title) => {
  if (MALE_TITLES.includes(title)) return 'Sir';
  if (FEMALE_TITLES.includes(title)) return 'Ma';
  return 'Sir/Ma';
};

export const getLocationFromAddress = (address) => {
  let output = '';
  if (address.street1) {
    output += address.street1;

    if (address.street2) {
      output += `, ${address.street2}`;
    }

    if (address.city) {
      output += `, ${address.city}`;
    }

    if (address.state) {
      output += `, ${address.state}.`;
    }
  }
  return output;
};
