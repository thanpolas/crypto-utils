/**
 * @fileoverview Pool Tokens fixtures.
 */

const JSBI = require('jsbi');

const fix = (module.exports = {});

fix.dai_weth_decimals_num = [18, 18];
fix.dai_weth_decimals_str = ['18', '18'];

// 3236.0404424781496715 - Reversed: 0.00030901962375791667205
fix.dai_weth_pool_str = [
  '124393780771528474299654469',
  '38440119331842498607318',
];

// 3236.0404424781496715 - Reversed: 0.00030901962375791667205
fix.dai_weth_pool_bi = [
  JSBI.BigInt('124393780771528474299654469'),
  JSBI.BigInt('38440119331842498607318'),
];

fix.dai_usdc_decimals_str = ['18', '6'];

// 1.00262163145744571940 - Reversed: 0.99738522352282104205
fix.dai_usdc_pool_str = ['46970232789826458004057', '46847416130'];
