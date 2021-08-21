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
 * @param {Object=} optOptions Calculation options.
 * @param {number=} optOptions.decimalPlaces How many decimals to use.
 * @param {boolean|Array=} optOptions.format Format the output using Intl.NumberFormat.
 * @return {string} the formatted result.
 */
token.tokenToSignificant = (tokens, decimals, optOptions) => {
  const decimalsExp = expDecs(decimals);

  const fraction = [tokens, decimalsExp];
  return toSignificant(fraction, optOptions);
};

/**
 * Will format the token quantity with fixed decimals.
 *
 * @param {string|bigint} tokens Quantity of Tokens.
 * @param {string|number} decimals Decimal places of the token.
 * @param {Object=} optOptions Calculation options.
 * @param {number=} optOptions.decimalPlaces How many decimals to use.
 * @param {boolean|Array=} optOptions.format Format the output using Intl.NumberFormat.
 * @return {string} the formatted result.
 */
token.tokenToFixed = (tokens, decimals, optOptions) => {
  const decimalsExp = expDecs(decimals);

  const fraction = [tokens, decimalsExp];
  return toFixed(fraction, optOptions);
};

/**
 * Will format the token quantity with fixed decimals.
 *
 * @param {string|bigint} tokens Quantity of Tokens.
 * @param {string|number} decimals Decimal places of the token.
 * @param {Object=} optOptions Calculation options.
 * @param {number=} optOptions.decimalPlaces How many decimals to use.
 * @param {boolean|Array=} optOptions.format Format the output using Intl.NumberFormat.
 * @return {string} the formatted result.
 */
token.tokenToAuto = (tokens, decimals, optOptions) => {
  const decimalsExp = expDecs(decimals);

  const fraction = [tokens, decimalsExp];
  return toAuto(fraction, optOptions);
};
