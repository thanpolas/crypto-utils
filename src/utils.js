/**
 * @fileoverview Utilities and helpers.
 */
const JSBI = require('jsbi');

const utils = (module.exports = {});

/**
 * Will calculate the exponent for the given decimals number.
 *
 * @param {string|number} decs The decimal number.
 * @return {bigint} The decimals exponent.
 */
utils.expDecs = (decs) => {
  return JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decs));
};

/**
 * Converts a value to JSBI, if it's already a JSBI will just return it.
 *
 * @param {string|number|JSBI} numstr The value to convert.
 * @return {bigint} JSBI representation of the value.
 */
utils.biConv = (numstr) => {
  let bi = numstr;
  if (typeof sqrtRatio !== 'bigint') {
    bi = JSBI.BigInt(numstr);
  }
  return bi;
};
