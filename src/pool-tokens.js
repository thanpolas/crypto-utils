/**
 * @fileoverview Calculates rate between two liquidity pool tokens.
 */

const JSBI = require('jsbi');

const { expDecs, biConv } = require('./utils');
const { toAuto } = require('./fractions');

const token = (module.exports = {});

/**
 * Calculates rate between two liquidity pool tokens.
 *
 * @param {Array<string|bigint>} poolFraction Array tuple with liquidity pool
 *    quantity of Tokens.
 * @param {Array<string|number>} decimalFraction Array tuple of decimal
 *    places of each token in poolFraction.
 * @param {Object=} optOptions Calculation options.
 * @param {number=} optOptions.decimalPlaces How many decimals to use.
 * @param {boolean|Array=} optOptions.formatting Format the output using Intl.NumberFormat.
 * @param {boolean=} optOptions.reverse Set to true to reverse the ratio calculation.
 * @return {string} the formatted result.
 */
token.poolTokensToAuto = (poolFraction, decimalFraction, optOptions = {}) => {
  const [token0Reserves, token1Reserves] = poolFraction;
  const [token0Decimals, token1Decimals] = decimalFraction;

  const scalarNumerator = expDecs(biConv(token0Decimals));
  const scalarDenominator = expDecs(biConv(token1Decimals));

  const adjustedForDecimalsNumerator = JSBI.BigInt(
    JSBI.multiply(scalarDenominator, biConv(token0Reserves)),
  );
  const adjustedForDecimalsDenominator = JSBI.BigInt(
    JSBI.multiply(scalarNumerator, biConv(token1Reserves)),
  );

  let numerator = adjustedForDecimalsNumerator;
  let denominator = adjustedForDecimalsDenominator;

  if (optOptions.reverse) {
    numerator = adjustedForDecimalsDenominator;
    denominator = adjustedForDecimalsNumerator;
  }

  const fraction = [numerator, denominator];

  return toAuto(fraction, optOptions);
};
