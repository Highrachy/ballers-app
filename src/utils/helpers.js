import React from 'react';
import Humanize from 'humanize-plus';

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

export const getPercentage = (value) => parseFloat(value) / 100;
export const getNairaSymbol = () => <>&#8358;</>;
export const ONE_MILLION = 1000000;
export const nearestMillion = (value) =>
  moneyFormatInNaira(Math.round(value / ONE_MILLION) * ONE_MILLION);

export const isDevEnvironment = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const getProxy = () =>
  isDevEnvironment() ? 'http://localhost:8080' : '';
