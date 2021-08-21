/**
 * @fileoverview Test token utilities.
 */

const { tokenToSignificant, tokenToFixed, tokenToAuto } = require('../..');

const { token18, token18Small } = require('../fixtures/tokens.fix');

describe('Token format', () => {
  describe('toSignificant', () => {
    test('18 decimals default', () => {
      expect(tokenToSignificant(token18, 18)).toEqual('2083.3');
    });
    test('18 decimals 7 significant', () => {
      const opts = { decimalPlaces: 7 };
      expect(tokenToSignificant(token18, 18, opts)).toEqual('2083.279');
    });
    test('18 decimals 10 significant', () => {
      const opts = { decimalPlaces: 10 };
      expect(tokenToSignificant(token18, 18, opts)).toEqual('2083.27897');
    });
    test('Small 18 decimals default', () => {
      expect(tokenToSignificant(token18Small, 18)).toEqual('0.27897');
    });
    test('Small 18 decimals 7 significant', () => {
      const opts = { decimalPlaces: 7 };
      expect(tokenToSignificant(token18Small, 18, opts)).toEqual('0.2789702');
    });
    test('Small 18 decimals 1 significant', () => {
      const opts = { decimalPlaces: 1 };
      expect(tokenToSignificant(token18Small, 18, opts)).toEqual('0.3');
    });
    test('Small 18 decimals 0 significant', () => {
      const opts = { decimalPlaces: 0 };
      expect(tokenToSignificant(token18Small, 18, opts)).toEqual('0.27897');
    });
    test('Small 18 decimals default significant and custom formating', () => {
      const opts = { format: true };
      expect(tokenToSignificant(token18Small, 18, opts)).toEqual('0.27897');
    });
  });
  describe('toFixed', () => {
    test('18 decimals fixed default', () => {
      expect(tokenToFixed(token18, 18)).toEqual('2083.27897');
    });
    test('18 decimals 7 fixed', () => {
      const opts = { decimalPlaces: 7 };
      expect(tokenToFixed(token18, 18, opts)).toEqual('2083.2789702');
    });
    test('18 decimals 10 fixed', () => {
      const opts = { decimalPlaces: 10 };
      expect(tokenToFixed(token18, 18, opts)).toEqual('2083.2789701517');
    });
    test('Small 18 decimals fixed default', () => {
      expect(tokenToFixed(token18Small, 18)).toEqual('0.27897');
    });
    test('Small 18 decimals 7 fixed', () => {
      const opts = { decimalPlaces: 7 };
      expect(tokenToFixed(token18Small, 18, opts)).toEqual('0.2789702');
    });
    test('Small 18 decimals 1 fixed', () => {
      const opts = { decimalPlaces: 1 };
      expect(tokenToFixed(token18Small, 18, opts)).toEqual('0.3');
    });
    test('Small 18 decimals 0 fixed', () => {
      const opts = { decimalPlaces: 0 };
      expect(tokenToFixed(token18Small, 18, opts)).toEqual('0.27897');
    });
  });
  describe('toAuto', () => {
    test('18 decimals auto default', () => {
      expect(tokenToAuto(token18, 18)).toEqual('2083.27897');
    });
    test('18 decimals 7 auto', () => {
      const opts = { decimalPlaces: 7 };
      expect(tokenToAuto(token18, 18, opts)).toEqual('2083.2789702');
    });
    test('18 decimals 10 auto', () => {
      const opts = { decimalPlaces: 10 };
      expect(tokenToAuto(token18, 18, opts)).toEqual('2083.2789701517');
    });
    test('18 decimals 1 auto', () => {
      const opts = { decimalPlaces: 1 };
      expect(tokenToAuto(token18, 18, opts)).toEqual('2083.3');
    });
    test('18 decimals 3 auto', () => {
      const opts = { decimalPlaces: 3 };
      expect(tokenToAuto(token18, 18, opts)).toEqual('2083.279');
    });
    test('Small 18 decimals auto default', () => {
      expect(tokenToAuto(token18Small, 18)).toEqual('0.27897');
    });
    test('Small 18 decimals 7 auto', () => {
      const opts = { decimalPlaces: 7 };
      expect(tokenToAuto(token18Small, 18, opts)).toEqual('0.2789702');
    });
    test('Small 18 decimals 1 auto', () => {
      const opts = { decimalPlaces: 1 };
      expect(tokenToAuto(token18Small, 18, opts)).toEqual('0.3');
    });
    test('Small 18 decimals 0 auto', () => {
      const opts = { decimalPlaces: 0 };
      expect(tokenToAuto(token18Small, 18, opts)).toEqual('0.27897');
    });
    describe('format', () => {
      test('null decimals, default format', () => {
        const opts = { format: true };
        expect(tokenToAuto(token18, 18, opts)).toEqual('2,083.27897');
      });
      test('5 decimals, default format', () => {
        const opts = { format: true, decimalPlaces: 2 };
        expect(tokenToAuto(token18, 18, opts)).toEqual('2,083.28');
      });
      test('null decimals, money format', () => {
        const opts = {
          format: ['en-US', { style: 'currency', currency: 'USD' }],
        };
        expect(tokenToAuto(token18, 18, opts)).toEqual('$2,083.28');
      });
    });
  });
});
