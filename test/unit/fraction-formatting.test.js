/**
 * @fileoverview Test fraction formatting.
 */

const { toAuto } = require('../..');

const {
  fractionAbove1Str,
  fractionBellow1Str,
  fractionAbove1Num,
  fractionBellow1Num,
  fractionAbove1BI,
  fractionBellow1BI,
} = require('../fixtures/tokens.fix');

const fixtures = {
  string: [fractionAbove1Str, fractionBellow1Str],
  number: [fractionAbove1Num, fractionBellow1Num],
  bigint: [fractionAbove1BI, fractionBellow1BI],
};

const fixturesAr = ['string', 'number', 'bigint'];

describe('Fraction Formatting', () => {
  describe('toAuto()', () => {
    fixturesAr.forEach((fixType) => {
      const [above1, bellow1] = fixtures[fixType];
      describe(`${fixType} Input`, () => {
        test(`toAuto above 1 default - ${fixType}`, () => {
          expect(toAuto(above1)).toEqual('476.19');
        });
        test(`toAuto above 1 decimals 7 - ${fixType}`, () => {
          expect(toAuto(above1, 7)).toEqual('476.1904762');
        });
        test(`toAuto above 1 decimals 10 - ${fixType}`, () => {
          expect(toAuto(above1, 10)).toEqual('476.1904761905');
        });
        test(`toAuto above 1 decimals 1 - ${fixType}`, () => {
          expect(toAuto(above1, 1)).toEqual('476.2');
        });
        test(`toAuto above 1 decimals 3 - ${fixType}`, () => {
          expect(toAuto(above1, 3)).toEqual('476.19');
        });
        test(`toAuto bellow 1 default - ${fixType}`, () => {
          expect(toAuto(bellow1)).toEqual('0.42857');
        });
        test(`toAuto bellow 1 decimals 7 - ${fixType}`, () => {
          expect(toAuto(bellow1, 7)).toEqual('0.4285714');
        });
        test(`toAuto bellow 1 decimals 1 - ${fixType}`, () => {
          expect(toAuto(bellow1, 1)).toEqual('0.4');
        });
        test(`toAuto bellow 1 decimals 0 - ${fixType}`, () => {
          expect(toAuto(bellow1, 0)).toEqual('0.42857');
        });
      });
    });
  });
});
