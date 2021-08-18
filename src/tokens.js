/**
 * @fileoverview Token related utilities.
 */

const { expDecs } = require('./utils');
const { toSignificant, toFixed, toAuto } = require('./fractions');

const token = (module.exports = {});

/**
 * Will format the token quantity with significant decimals.
 *
 * @param {string|bigint} tokens Quantity of Tokens.
 * @param {string|number} decimals Decimal places of the token.
 * @param {number=} optSignificantDigits How many significant digits to use.
 * @param {boolean|Array=} optFormatting Format the output using Intl.NumberFormat.
 * @return {string} the formatted result.
 */
token.tokenToSignificant = (
  tokens,
  decimals,
  optSignificantDigits = 5,
  optFormatting,
) => {
  const decimalsExp = expDecs(decimals);

  if (!optSignificantDigits) {
    optSignificantDigits = 5;
  }

  const fraction = [tokens, decimalsExp];
  return toSignificant(fraction, optSignificantDigits, optFormatting);
};

/**
 * Will format the token quantity with fixed decimals.
 *
 * @param {string|bigint} tokens Quantity of Tokens.
 * @param {string|number} decimals Decimal places of the token.
 * @param {number=} optDecimalPlaces How many decimals to use.
 * @param {boolean|Array=} optFormatting Format the output using Intl.NumberFormat.
 * @return {string} the formatted result.
 */
token.tokenToFixed = (
  tokens,
  decimals,
  optDecimalPlaces = 5,
  optFormatting,
) => {
  const decimalsExp = expDecs(decimals);

  if (!optDecimalPlaces) {
    optDecimalPlaces = 5;
  }

  const fraction = [tokens, decimalsExp];
  return toFixed(fraction, optDecimalPlaces, optFormatting);
};

/**
 * Will format the token quantity with fixed decimals.
 *
 * @param {string|bigint} tokens Quantity of Tokens.
 * @param {string|number} decimals Decimal places of the token.
 * @param {number=} optDecimalPlaces How many decimals to use.
 * @param {boolean|Array=} optFormatting Format the output using Intl.NumberFormat.
 * @return {string} the formatted result.
 */
token.tokenToAuto = (tokens, decimals, optDecimalPlaces, optFormatting) => {
  const decimalsExp = expDecs(decimals);

  const fraction = [tokens, decimalsExp];
  return toAuto(fraction, optDecimalPlaces, optFormatting);
};
