/**
 * @fileoverview Test token utilities.
 */

const { tokenToSignificant, tokenToFixed } = require('../..');

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
      expect(
        tokenToSignificant(token18Small, 18, null, { groupSeparator: ',' }),
      ).toEqual('0.27897');
    });
  });
  describe('toFixed', () => {
    test('18 decimals default', () => {
      expect(tokenToFixed(token18, 18)).toEqual('2083.27897');
    });
    test('18 decimals 7 significant', () => {
      expect(tokenToFixed(token18, 18, 7)).toEqual('2083.2789702');
    });
    test('18 decimals 10 significant', () => {
      expect(tokenToFixed(token18, 18, 10)).toEqual('2083.2789701517');
    });
    test('Small 18 decimals default', () => {
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
    test('Small 18 decimals default fixed and custom formating', () => {
      expect(
        tokenToFixed(token18Small, 18, null, { groupSeparator: ',' }),
      ).toEqual('0.27897');
    });
  });
});
