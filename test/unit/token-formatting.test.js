/**
 * @fileoverview Test token utilities.
 */

const { tokenToSignificant, tokenToFixed, tokenToAuto } = require('../..');

const { token18, token18Small } = require('../fixtures/tokens.fix');

describe('Token Formatting', () => {
  describe('toSignificant', () => {
    test('18 decimals default', () => {
      expect(tokenToSignificant(token18, 18)).toEqual('2083.3');
    });
    test('18 decimals 7 significant', () => {
      expect(tokenToSignificant(token18, 18, 7)).toEqual('2083.279');
    });
    test('18 decimals 10 significant', () => {
      expect(tokenToSignificant(token18, 18, 10)).toEqual('2083.27897');
    });
    test('Small 18 decimals default', () => {
      expect(tokenToSignificant(token18Small, 18)).toEqual('0.27897');
    });
    test('Small 18 decimals 7 significant', () => {
      expect(tokenToSignificant(token18Small, 18, 7)).toEqual('0.2789702');
    });
    test('Small 18 decimals 1 significant', () => {
      expect(tokenToSignificant(token18Small, 18, 1)).toEqual('0.3');
    });
    test('Small 18 decimals 0 significant', () => {
      expect(tokenToSignificant(token18Small, 18, 0)).toEqual('0.27897');
    });
    test('Small 18 decimals default significant and custom formating', () => {
      expect(tokenToSignificant(token18Small, 18, null, true)).toEqual(
        '0.27897',
      );
    });
  });
  describe('toFixed', () => {
    test('18 decimals fixed default', () => {
      expect(tokenToFixed(token18, 18)).toEqual('2083.27897');
    });
    test('18 decimals 7 fixed', () => {
      expect(tokenToFixed(token18, 18, 7)).toEqual('2083.2789702');
    });
    test('18 decimals 10 fixed', () => {
      expect(tokenToFixed(token18, 18, 10)).toEqual('2083.2789701517');
    });
    test('Small 18 decimals fixed default', () => {
      expect(tokenToFixed(token18Small, 18)).toEqual('0.27897');
    });
    test('Small 18 decimals 7 fixed', () => {
      expect(tokenToFixed(token18Small, 18, 7)).toEqual('0.2789702');
    });
    test('Small 18 decimals 1 fixed', () => {
      expect(tokenToFixed(token18Small, 18, 1)).toEqual('0.3');
    });
    test('Small 18 decimals 0 fixed', () => {
      expect(tokenToFixed(token18Small, 18, 0)).toEqual('0.27897');
    });
  });
  describe('toAuto', () => {
    test('18 decimals auto default', () => {
      expect(tokenToAuto(token18, 18)).toEqual('2083.28');
    });
    test('18 decimals 7 auto', () => {
      expect(tokenToAuto(token18, 18, 7)).toEqual('2083.2789702');
    });
    test('18 decimals 10 auto', () => {
      expect(tokenToAuto(token18, 18, 10)).toEqual('2083.2789701517');
    });
    test('18 decimals 1 auto', () => {
      expect(tokenToAuto(token18, 18, 1)).toEqual('2083.3');
    });
    test('18 decimals 3 auto', () => {
      expect(tokenToAuto(token18, 18, 3)).toEqual('2083.279');
    });
    test('Small 18 decimals auto default', () => {
      expect(tokenToAuto(token18Small, 18)).toEqual('0.27897');
    });
    test('Small 18 decimals 7 auto', () => {
      expect(tokenToAuto(token18Small, 18, 7)).toEqual('0.2789702');
    });
    test('Small 18 decimals 1 auto', () => {
      expect(tokenToAuto(token18Small, 18, 1)).toEqual('0.3');
    });
    test('Small 18 decimals 0 auto', () => {
      expect(tokenToAuto(token18Small, 18, 0)).toEqual('0.27897');
    });
    describe('formatting', () => {
      test('null decimals, default format', () => {
        expect(tokenToAuto(token18, 18, null, true)).toEqual('2,083.28');
      });
      test('5 decimals, default format', () => {
        expect(tokenToAuto(token18, 18, 5, true)).toEqual('2,083.27897');
      });
      test('null decimals, money format', () => {
        expect(
          tokenToAuto(token18, 18, null, [
            'en-US',
            { style: 'currency', currency: 'USD' },
          ]),
        ).toEqual('$2,083.28');
      });
    });
  });
});
