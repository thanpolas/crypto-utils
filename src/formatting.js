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
 * @param {Object=} format Formatting of the output.
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
