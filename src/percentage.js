/**
 * @fileoverview Calculate percentages of bignumbers
 */

const entity = (module.exports = {});

/**
 * Get the percentage of the number (i.e. for 100 and 5%, return 5).
 *
 * @param {bigint} biNum The number to get the percentage of.
 * @param {number} basisPoints Percent expressed with a precision of 10000
 *   (i.e. 1% = 100).
 * @param {number=} optPrecision The precision of the percentage, default 10000.
 * @return {bigint} The percentage of the number.
 */
entity.percentage = (biNum, basisPoints, optPrecision = 10000) => {
  const precision = BigInt(optPrecision);
  const percentageMult = biNum * BigInt(basisPoints);
  const percentage = percentageMult / precision;

  return percentage;
};

/**
 * Get the percentage remainter of the number (i.e. for 100 and 5%, return 95).
 *
 * @param {bigint} biNum The number to get the percentage of.
 * @param {number} basisPoints Percent expressed with a precision of 10000
 *   (i.e. 1% = 100).
 * @param {number=} optPrecision The precision of the percentage, default 10000.
 * @return {bigint} The percentage remainter of the number.
 */
entity.percentRemainder = (biNum, basisPoints, optPrecision = 10000) => {
  const percentage = entity.percentage(biNum, basisPoints, optPrecision);
  const remainter = biNum - percentage;
  return remainter;
};
