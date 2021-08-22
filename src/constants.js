/**
 * @fileoverview Constants needed.
 */

const Decimal = require('decimal.js');

const consts = (module.exports = {});

/**
 * @enum {number} Rounding constants of Decimal package.
 * @see https://mikemcl.github.io/decimal.js/#modes
 */
consts.Rounding = {
  ROUND_UP: Decimal.ROUND_UP,
  ROUND_DOWN: Decimal.ROUND_DOWN,
  ROUND_CEIL: Decimal.ROUND_CEIL,
  ROUND_FLOOR: Decimal.ROUND_FLOOR,
  ROUND_HALF_UP: Decimal.ROUND_HALF_UP,
  ROUND_HALF_DOWN: Decimal.ROUND_HALF_DOWN,
  ROUND_HALF_EVEN: Decimal.ROUND_HALF_EVEN,
  ROUND_HALF_CEIL: Decimal.ROUND_HALF_CEIL,
  ROUND_HALF_FLOO: Decimal.ROUND_HALF_FLOO,
};
