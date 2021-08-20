/**
 * @fileoverview Test Pooled tokens fraction calculation and formatting.
 */

const { poolTokensToAuto } = require('../..');

const {
  dai_weth_decimals_num,
  dai_weth_decimals_str,
  dai_weth_pool_str,
  dai_weth_pool_bi,
  dai_usdc_decimals_num,
  dai_usdc_decimals_str,
  dai_usdc_pool_str,
  dai_usdc_pool_bi,
} = require('../fixtures/pool-tokens.fix');

describe('Pool Tokens', () => {
  describe(`happy path`, () => {
    describe('Default Calculations', () => {
      test(`poolTokensToAuto above 1 default`, () => {
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str),
        ).toEqual('3236.04044');
      });
      test(`poolTokensToAuto bellow 1 default`, () => {
        expect(
          poolTokensToAuto(dai_usdc_pool_str, dai_usdc_decimals_str),
        ).toEqual('1.00262');
      });
    });

    describe('Decimal Places Option', () => {
      test(`poolTokensToAuto above 1 decimals 7`, () => {
        const opts = { decimalPlaces: 7 };
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts),
        ).toEqual('3236.0404425');
      });
      test(`poolTokensToAuto above 1 decimals 10`, () => {
        const opts = { decimalPlaces: 10 };
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts),
        ).toEqual('3236.0404424781');
      });
      test(`poolTokensToAuto above 1 decimals 1`, () => {
        const opts = { decimalPlaces: 1 };
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts),
        ).toEqual('3236.0');
      });
      test(`poolTokensToAuto above 1 decimals 3`, () => {
        const opts = { decimalPlaces: 3 };

        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts),
        ).toEqual('3236.040');
      });
      test(`poolTokensToAuto bellow 1 decimals 7`, () => {
        const opts = { decimalPlaces: 7 };

        expect(
          poolTokensToAuto(dai_usdc_pool_str, dai_usdc_decimals_str, opts),
        ).toEqual('1.0026216');
      });
      test(`poolTokensToAuto bellow 1 decimals 1`, () => {
        const opts = { decimalPlaces: 1 };
        expect(
          poolTokensToAuto(dai_usdc_pool_str, dai_usdc_decimals_str, opts),
        ).toEqual('1.0');
      });
      test(`poolTokensToAuto bellow 1 decimals 0`, () => {
        const opts = { decimalPlaces: 0 };
        expect(
          poolTokensToAuto(dai_usdc_pool_str, dai_usdc_decimals_str, opts),
        ).toEqual('1.00262');
      });
    });
    describe('formatting', () => {
      test(`null decimals, default format`, () => {
        const opts = { formatting: true };
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts),
        ).toEqual('3,236.04044');
      });
      test(`7 decimals, default format`, () => {
        const opts = { formatting: true, decimalPlaces: 7 };
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts),
        ).toEqual('3,236.0404425');
      });
      test(`money format`, () => {
        const opts = {
          formatting: ['en-US', { style: 'currency', currency: 'USD' }],
        };
        expect(
          poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts),
        ).toEqual('$3,236.04');
      });
    });
  });
});
