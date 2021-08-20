/**
 * @fileoverview Converts Big Integers to human readable format.
 */

const invariant = require('invariant');
const Decimal = require('decimal.js');

const fractions = (module.exports = {});

/**
 * Will convert the fraction of the two tokens into a significant representation.
 *
 * @param {Array<bigint>} fraction Fraction tupple array containing the numerator
 *    and denominator.
 * @param {Object=} optOptions Calculation options.
 * @param {number=} optOptions.significantDigits How many significant digits to use.
 * @param {boolean|Array=} optOptions.formatting Format the output using Intl.NumberFormat.
 * @param {boolean=} optOptions.reverse Set to true to reverse the ratio calculation.
 * @return {string} The result.
 */
fractions.toSignificant = (fraction, optOptions = {}) => {
  const { formatting, reverse } = optOptions;
  let { significantDigits, rounding } = optOptions;

  if (!significantDigits) {
    significantDigits = 5;
  }

  if (!rounding) {
    rounding = Decimal.ROUND_HALF_UP;
  }

  let [numerator, denominator] = fraction;

  if (reverse) {
    const tmpNumerator = numerator;
    numerator = denominator;
    denominator = tmpNumerator;
  }

  const res = new Decimal(numerator.toString())
    .div(denominator.toString())
    .toSignificantDigits(significantDigits, rounding)
    .toString();

  return fractions._checkFormatting(
    res,
    'significant',
    significantDigits,
    formatting,
  );
};

/**
 * Will convert the fraction of the two tokens into a fixed representation.
 *
 * @param {Array<bigint>} fraction Fraction tupple Array containing the numerator
 *    and denominator.
 * @param {Object=} optOptions Calculation options.
 * @param {number=} optOptions.decimalPlaces How many decimals to use.
 * @param {boolean|Array=} optOptions.formatting Format the output using Intl.NumberFormat.
 * @param {boolean=} optOptions.reverse Set to true to reverse the ratio calculation.
 * @return {string} The result.
 */
fractions.toFixed = (fraction, optOptions = {}) => {
  const { formatting, reverse } = optOptions;
  let { decimalPlaces, rounding } = optOptions;

  if (!decimalPlaces) {
    decimalPlaces = 5;
  }

  if (!rounding) {
    rounding = Decimal.ROUND_HALF_UP;
  }

  let [numerator, denominator] = fraction;

  if (reverse) {
    const tmpNumerator = numerator;
    numerator = denominator;
    denominator = tmpNumerator;
  }

  const res = new Decimal(numerator.toString())
    .div(denominator.toString())
    .toFixed(decimalPlaces, rounding);

  return fractions._checkFormatting(res, 'fixed', decimalPlaces, formatting);
};

/**
 * Will divide and format the fraction by either using toFixed or toSignificant
 * automatically, depending if the fracrtion division is above or bellow 1.
 *
 * @param {Array<bigint>} fraction Fraction tupple Array containing the numerator
 *    and denominator.
 * @param {Object=} optOptions Calculation options.
 * @param {number=} optOptions.decimalPlaces How many decimals to use.
 * @param {boolean|Array=} optOptions.formatting Format the output using Intl.NumberFormat.
 * @param {boolean=} optOptions.reverse Set to true to reverse the ratio calculation.
 * @return {string} The result.
 */
fractions.toAuto = (fraction, optOptions = {}) => {
  const { reverse } = optOptions;

  let [numerator, denominator] = fraction;

  if (reverse) {
    const tmpNumerator = numerator;
    numerator = denominator;
    denominator = tmpNumerator;
  }

  const tempRes = Decimal.div(
    numerator.toString(),
    denominator.toString(),
  ).toNumber();

  if (tempRes > 1) {
    return fractions.toFixed(fraction, optOptions);
  }

  return fractions.toSignificant(fraction, optOptions);
};

/**
 * Checks and applies formatting if it exists.
 *
 * @param {string} res result from the calculations
 * @param {string} callee Invoking function.
 * @param {number} decimalPlaces How many decimal places to use.
 * @param {boolean|Array=} optFormatting Format the output using Intl.NumberFormat.
 * @return {string} Formatted outcome.
 * @private
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 */
fractions._checkFormatting = (res, callee, decimalPlaces, optFormatting) => {
  if (!optFormatting) {
    return res;
  }

  if (optFormatting === true) {
    const options = {};
    if (callee === 'significant') {
      options.maximumSignificantDigits = decimalPlaces;
    }
    if (callee === 'fixed') {
      options.maximumFractionDigits = decimalPlaces;
    }
    return Intl.NumberFormat('en-US', options).format(res);
  }

  if (Array.isArray(optFormatting)) {
    return Intl.NumberFormat.apply(null, optFormatting).format(res);
  }

  invariant(false, 'Formatting argument can be either a boolean or an Array');
};
