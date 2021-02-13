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
  error?.response?.data
    ? JSON.stringify(error?.response?.data?.error) ||
      JSON.stringify(error?.response?.data?.message) ||
      JSON.stringify(error)
    : 'An error has occured. Please try again later.';

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

export const objectToOptions = (obj, defaultLabel = null, inverse = false) => {
  const output = Object.entries(obj).map(([label, value]) => ({
    value: inverse ? label.toString() : value.toString(),
    label: inverse
      ? Humanize.titleCase(value.toString())
      : Humanize.titleCase(label.toString()),
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
    output += address.street1.trim();

    if (address.street2) {
      output += `, ${address.street2.trim()}`;
    }

    if (address.city) {
      output += `, ${address.city.trim()}`;
    }

    if (address.state) {
      output += `, ${address.state.trim()}.`;
    }
  }
  return output.replaceAll(',,', ',');
};

export const getFormattedAddress = ({
  street1,
  street2,
  city,
  state,
  country,
}) => (
  <address>
    {street1}
    <br />
    {street2 && (
      <>
        {street2} <br />{' '}
      </>
    )}
    {city}, {state} <br />
    {country}.
  </address>
);

export const isValidURL = (str) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
};

export const statusIsSuccessful = (status) => status === 200 || status === 201;

// Manual Waiting
//  manualWait(() => {
//   setCommentLoading(null);
//   console.log('payload', payload);
// }, 3000);
export const manualWait = async (func, delay = 1000) =>
  await new Promise((resolve) =>
    setTimeout(() => {
      func();
      resolve();
    }, delay)
  );
