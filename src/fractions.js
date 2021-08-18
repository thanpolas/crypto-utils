/**
 * @fileoverview Converts Big Integers to human readable format.
 */

const invariant = require('invariant');
const Decimal = require('decimal.js');

const formatting = (module.exports = {});

/**
 * Will convert the fraction of the two tokens into a significant representation.
 *
 * @param {Array<bigint>} fraction Fraction tupple array containing the numerator
 *    and denominator.
 * @param {number=} significantDigits How many significant digits to use.
 * @param {number=} rounding Desired rounding.
 * @return {string} The result.
 */
formatting.toSignificant = (
  fraction,
  significantDigits = 5,
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

  return res;
};

/**
 * Will convert the fraction of the two tokens into a fixed representation.
 *
 * @param {Array<bigint>} fraction Fraction tupple Array containing the numerator
 *    and denominator.
 * @param {number=} decimalPlaces How many decimal places to use.
 * @param {Rounding} rounding Desired rounding.
 * @return {string} The result.
 */
formatting.toFixed = (
  fraction,
  decimalPlaces = 5,
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

  return res;
};

/**
 * Will divide and format the fraction by either using toFixed or toSignificant
 * automatically, depending if the fracrtion division is above or bellow 1.
 *
 * @param {Array<bigint>} fraction Fraction tupple Array containing the numerator
 *    and denominator.
 * @param {number=} decimalPlaces How many decimal places to use.
 * @param {Rounding=} rounding Desired rounding.
 * @return {string} The result.
 */
formatting.toAuto = (
  fraction,
  decimalPlaces,
  rounding = Decimal.ROUND_HALF_UP,
) => {
  const [numerator, denominator] = fraction;

  const tempRes = Decimal.div(
    numerator.toString(),
    denominator.toString(),
  ).toNumber();

  if (tempRes > 1) {
    if (!decimalPlaces) {
      decimalPlaces = 2;
    }
    return formatting.toFixed(fraction, decimalPlaces, rounding);
  }

  if (!decimalPlaces) {
    decimalPlaces = 5;
  }
  return fractions.toSignificant(fraction, decimalPlaces, rounding);
};
