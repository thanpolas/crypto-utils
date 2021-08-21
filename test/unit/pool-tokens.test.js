/**
 * @fileoverview Test Pooled tokens fraction calculation and format.
 */

const { poolTokensToAuto } = require('../..');

const {
  dai_weth_decimals_num,
  dai_weth_decimals_str,
  dai_weth_pool_str,
  dai_weth_pool_bi,
  dai_usdc_decimals_str,
  dai_usdc_pool_str,
} = require('../fixtures/pool-tokens.fix');

describe('Pool Tokens', () => {
  describe(`happy path`, () => {
    describe('Default Calculations', () => {
      test(`poolTokensToAuto - above 1 - default`, () => {
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str),
        ).toEqual('3236.04044');
      });
      test(`poolTokensToAuto - stables - default`, () => {
        expect(
          poolTokensToAuto(dai_usdc_pool_str, dai_usdc_decimals_str),
        ).toEqual('1.00262');
      });
    });

    describe('Decimal Places Option', () => {
      test(`poolTokensToAuto - above 1 - decimals 7`, () => {
        const opts = { decimalPlaces: 7 };
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts),
        ).toEqual('3236.0404425');
      });
      test(`poolTokensToAuto - above 1 - decimals 10`, () => {
        const opts = { decimalPlaces: 10 };
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts),
        ).toEqual('3236.0404424781');
      });
      test(`poolTokensToAuto - above 1 - decimals 1`, () => {
        const opts = { decimalPlaces: 1 };
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts),
        ).toEqual('3236.0');
      });
      test(`poolTokensToAuto - above 1 - decimals 3`, () => {
        const opts = { decimalPlaces: 3 };

        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts),
        ).toEqual('3236.040');
      });
      test(`poolTokensToAuto - stables - decimals 7`, () => {
        const opts = { decimalPlaces: 7 };

        expect(
          poolTokensToAuto(dai_usdc_pool_str, dai_usdc_decimals_str, opts),
        ).toEqual('1.0026216');
      });
      test(`poolTokensToAuto - stables - decimals 1`, () => {
        const opts = { decimalPlaces: 1 };
        expect(
          poolTokensToAuto(dai_usdc_pool_str, dai_usdc_decimals_str, opts),
        ).toEqual('1.0');
      });
      test(`poolTokensToAuto - stables - decimals 0`, () => {
        const opts = { decimalPlaces: 0 };
        expect(
          poolTokensToAuto(dai_usdc_pool_str, dai_usdc_decimals_str, opts),
        ).toEqual('1.00262');
      });
    });
    describe('format', () => {
      test(`Above1 - default format`, () => {
        const opts = { format: true };
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts),
        ).toEqual('3,236.04044');
      });
      test(`Above1 - decimals 7 - default format`, () => {
        const opts = { format: true, decimalPlaces: 7 };
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts),
        ).toEqual('3,236.0404425');
      });
      test(`Above1 - money format`, () => {
        const opts = {
          format: ['en-US', { style: 'currency', currency: 'USD' }],
        };
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts),
        ).toEqual('$3,236.04');
      });
    });
    describe('Reversing', () => {
      test(`Above1 - Reverse true`, () => {
        const opts = { reverse: true };
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts),
        ).toEqual('0.00030902');
      });
      test(`Above1 - decimals 7 - reverse true`, () => {
        const opts = { decimalPlaces: 7, reverse: true };
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts),
        ).toEqual('0.0003090196');
      });
      test(`Stables - Decimals 7 - reverse true`, () => {
        const opts = { decimalPlaces: 7, reverse: true };
        expect(
          poolTokensToAuto(dai_usdc_pool_str, dai_usdc_decimals_str, opts),
        ).toEqual('0.9973852');
      });
    });
    describe('All types of input', () => {
      test(`poolTokensToAuto - above 1 - decimals as numbers`, () => {
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_num),
        ).toEqual('3236.04044');
      });
      test(`poolTokensToAuto - above 1 - values as bigint - decimals as numbers`, () => {
        expect(
          poolTokensToAuto(dai_weth_pool_bi, dai_weth_decimals_num),
        ).toEqual('3236.04044');
      });
    });
  });
});
