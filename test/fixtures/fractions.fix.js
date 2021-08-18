/**
 * @fileoverview Fraction fixtures.
 */

const JSBI = require('jsbi');

const fix = (module.exports = {});

fix.fractionAbove1Str = ['1000000', '21']; // 47619.047619047619
fix.fractionBellow1Str = ['21', '49']; // 0.428571428571429

fix.fractionAbove1Num = [1000000, 21]; // 47619.047619047619
fix.fractionBellow1Num = [21, 49]; // 0.428571428571429

fix.fractionAbove1BI = [JSBI.BigInt('1000000'), JSBI.BigInt('21')]; // 47619.047619047619
fix.fractionBellow1BI = [JSBI.BigInt('21'), JSBI.BigInt('49')]; // 0.428571428571429
