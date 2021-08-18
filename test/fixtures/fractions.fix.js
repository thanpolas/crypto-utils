/**
 * @fileoverview Fraction fixtures.
 */

const JSBI = require('jsbi');

const fix = (module.exports = {});

fix.fractionAbove1Str = ['10000', '21']; // 476.19047619047619
fix.fractionBellow1Str = ['21', '49']; // 0.428571428571429

fix.fractionAbove1Num = [10000, 21]; // 476.19047619047619
fix.fractionBellow1Num = [21, 49]; // 0.428571428571429

fix.fractionAbove1BI = [JSBI.BigInt('10000'), JSBI.BigInt('21')]; // 476.19047619047619
fix.fractionBellow1BI = [JSBI.BigInt('21'), JSBI.BigInt('49')]; // 0.428571428571429
