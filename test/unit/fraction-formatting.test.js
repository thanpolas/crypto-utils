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
} = require('../fixtures/fractions.fix');

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
          expect(toAuto(above1)).toEqual('47619.05');
        });
        test(`toAuto above 1 decimals 7 - ${fixType}`, () => {
          expect(toAuto(above1, 7)).toEqual('47619.0476190');
        });
        test(`toAuto above 1 decimals 10 - ${fixType}`, () => {
          expect(toAuto(above1, 10)).toEqual('47619.0476190476');
        });
        test(`toAuto above 1 decimals 1 - ${fixType}`, () => {
          expect(toAuto(above1, 1)).toEqual('47619.0');
        });
        test(`toAuto above 1 decimals 3 - ${fixType}`, () => {
          expect(toAuto(above1, 3)).toEqual('47619.048');
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

        describe('formatting', () => {
          test('null decimals, default format', () => {
            expect(toAuto(above1, null, true)).toEqual('47,619.05');
          });
          test('5 decimals, default format', () => {
            expect(toAuto(above1, 5, true)).toEqual('47,619.04762');
          });
          test('null decimals, money format', () => {
            expect(
              toAuto(above1, null, true, [
                'en-US',
                { style: 'currency', currency: 'USD' },
              ]),
            ).toEqual('$47,619.05');
          });
        });
      });
    });
  });
});
