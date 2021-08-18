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
 * @param {number=} significantDigits How many significant digits to use.
 * @param {boolean|Array=} optFormatting Format the output using Intl.NumberFormat.
 * @param {number=} rounding Desired rounding.
 * @return {string} The result.
 */
fractions.toSignificant = (
  fraction,
  significantDigits = 5,
  optFormatting,
  rounding = Decimal.ROUND_HALF_UP,
) => {
  invariant(
    Number.isInteger(significantDigits),
    `${significantDigits} is not an integer.`,
  );
  invariant(significantDigits > 0, `${significantDigits} is not positive.`);

  const [numerator, denominator] = fraction;

  const res = new Decimal(numerator.toString())
    .div(denominator.toString())
    .toSignificantDigits(significantDigits, rounding)
    .toString();

  return fractions._checkFormatting(
    res,
    'significant',
    significantDigits,
    optFormatting,
  );
};

/**
 * Will convert the fraction of the two tokens into a fixed representation.
 *
 * @param {Array<bigint>} fraction Fraction tupple Array containing the numerator
 *    and denominator.
 * @param {number=} decimalPlaces How many decimal places to use.
 * @param {boolean|Array=} optFormatting Format the output using Intl.NumberFormat.
 * @param {Rounding} rounding Desired rounding.
 * @return {string} The result.
 */
fractions.toFixed = (
  fraction,
  decimalPlaces = 5,
  optFormatting,
  rounding = Decimal.ROUND_HALF_UP,
) => {
  invariant(
    Number.isInteger(decimalPlaces),
    `${decimalPlaces} is not an integer.`,
  );
  invariant(decimalPlaces >= 0, `${decimalPlaces} is negative.`);

  const [numerator, denominator] = fraction;

  const res = new Decimal(numerator.toString())
    .div(denominator.toString())
    .toFixed(decimalPlaces, rounding);

  return fractions._checkFormatting(res, 'fixed', decimalPlaces, optFormatting);
};

/**
 * Will divide and format the fraction by either using toFixed or toSignificant
 * automatically, depending if the fracrtion division is above or bellow 1.
 *
 * @param {Array<bigint>} fraction Fraction tupple Array containing the numerator
 *    and denominator.
 * @param {number=} decimalPlaces How many decimal places to use.
 * @param {boolean|Array=} optFormatting Format the output using Intl.NumberFormat.
 * @param {Rounding=} rounding Desired rounding.
 * @return {string} The result.
 */
fractions.toAuto = (
  fraction,
  decimalPlaces,
  optFormatting,
  rounding = Decimal.ROUND_HALF_UP,
) => {
  invariant(
    Array.isArray(fraction),
    'First argument is the fraction, must be array',
  );
  invariant(fraction.length === 2, 'fraction must have two items');

  const [numerator, denominator] = fraction;

  const tempRes = Decimal.div(
    numerator.toString(),
    denominator.toString(),
  ).toNumber();

  if (tempRes > 1) {
    if (!decimalPlaces) {
      decimalPlaces = 2;
    }
    return fractions.toFixed(fraction, decimalPlaces, optFormatting, rounding);
  }

  if (!decimalPlaces) {
    decimalPlaces = 5;
  }
  return fractions.toSignificant(
    fraction,
    decimalPlaces,
    optFormatting,
    rounding,
  );
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
