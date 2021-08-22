/**
 * @fileoverview API surface tests.
 */

const Decimal = require('decimal.js');

const cryptoUtils = require('../..');

describe('API Surface Tests', () => {
  describe('Properties', () => {
    it('Exposes only the expected properties at root level', () => {
      expect(cryptoUtils).toContainAllKeys([
        'tokenToSignificant',
        'tokenToFixed',
        'tokenToAuto',
        'poolTokensToAuto',
        'toSignificant',
        'toFixed',
        'toAuto',
        'expDecs',
        'biConv',
        'Rounding',
      ]);
    });
  });
  describe('Check Types', () => {
    it('Default export is an object', () => {
      expect(cryptoUtils).toBeObject();
    });

    it('poolTokensToAuto is a function', () => {
      expect(cryptoUtils.poolTokensToAuto).toBeFunction();
    });

    it('tokenToSignificant is a function', () => {
      expect(cryptoUtils.tokenToSignificant).toBeFunction();
    });

    it('tokenToFixed is a function', () => {
      expect(cryptoUtils.tokenToFixed).toBeFunction();
    });

    it('tokenToAuto is a function', () => {
      expect(cryptoUtils.tokenToAuto).toBeFunction();
    });

    it('toSignificant is a function', () => {
      expect(cryptoUtils.toSignificant).toBeFunction();
    });

    it('toFixed is a function', () => {
      expect(cryptoUtils.toFixed).toBeFunction();
    });
    it('toAuto is a function', () => {
      expect(cryptoUtils.toAuto).toBeFunction();
    });

    it('expDecs is a function', () => {
      expect(cryptoUtils.expDecs).toBeFunction();
    });

    it('biConv is a function', () => {
      expect(cryptoUtils.biConv).toBeFunction();
    });

    it('Rounding is an Object', () => {
      expect(cryptoUtils.Rounding).toBeObject();
    });
  });

  describe('Values', () => {
    it('Should have Rounding values matching the ones from Decimal.js', () => {
      expect(cryptoUtils.Rounding.ROUND_UP).toEqual(Decimal.ROUND_UP);
      expect(cryptoUtils.Rounding.ROUND_DOWN).toEqual(Decimal.ROUND_DOWN);
      expect(cryptoUtils.Rounding.ROUND_CEIL).toEqual(Decimal.ROUND_CEIL);
      expect(cryptoUtils.Rounding.ROUND_FLOOR).toEqual(Decimal.ROUND_FLOOR);
      expect(cryptoUtils.Rounding.ROUND_HALF_UP).toEqual(Decimal.ROUND_HALF_UP);
      expect(cryptoUtils.Rounding.ROUND_HALF_DOWN).toEqual(
        Decimal.ROUND_HALF_DOWN,
      );
      expect(cryptoUtils.Rounding.ROUND_HALF_EVEN).toEqual(
        Decimal.ROUND_HALF_EVEN,
      );
      expect(cryptoUtils.Rounding.ROUND_HALF_CEIL).toEqual(
        Decimal.ROUND_HALF_CEIL,
      );
      expect(cryptoUtils.Rounding.ROUND_HALF_FLOO).toEqual(
        Decimal.ROUND_HALF_FLOO,
      );
    });
  });
});
