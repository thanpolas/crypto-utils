/**
 * @fileoverview Test fraction formatting.
 */

const { toSignificant, toFixed, toAuto } = require('../..');

const {
  fractionAbove1Str,
  fractionBellow1Str,
  fractionAbove1Num,
  fractionBellow1Num,
  fractionAbove1BI,
  fractionBellow1BI,
} = require('../fixtures/fractions.fix');

describe('Fraction Formatting', () => {
  describe('toSignificant', () => {
    test('Above 1 fraction - significant default decimals', () => {
      expect(toSignificant(fractionAbove1Str)).toEqual('47619');
    });
    test('Above 1 fraction - 7 significant', () => {
      expect(toSignificant(fractionAbove1Str, 7)).toEqual('47619.05');
    });
    test('Above 1 fraction - 10 significant', () => {
      expect(toSignificant(fractionAbove1Str, 10)).toEqual('47619.04762');
    });
    test('Above 1 fraction - significant default decimals - default formatting', () => {
      expect(toSignificant(fractionAbove1Str, null, true)).toEqual('47,619');
    });
    test('Bellow 1 fraction - significant default decimals', () => {
      expect(toSignificant(fractionBellow1Str)).toEqual('0.42857');
    });
    test('Bellow 1 fraction - 7 significant', () => {
      expect(toSignificant(fractionBellow1Str, 7)).toEqual('0.4285714');
    });
    test('Bellow 1 fraction - 1 significant', () => {
      expect(toSignificant(fractionBellow1Str, 1)).toEqual('0.4');
    });
    test('Bellow 1 fraction - 0 significant', () => {
      expect(toSignificant(fractionBellow1Str, 0)).toEqual('0.42857');
    });
    test('Bellow 1 fraction - default significant decimals - default formating', () => {
      expect(toSignificant(fractionBellow1Str, null, true)).toEqual('0.42857');
    });
  });

  describe('toFixed', () => {
    test('Above 1 fraction - fixed default decimals', () => {
      expect(toFixed(fractionAbove1Str)).toEqual('47619.04762');
    });
    test('Above 1 fraction - 7 fixed', () => {
      expect(toFixed(fractionAbove1Str, 7)).toEqual('47619.0476190');
    });
    test('Above 1 fraction - 10 fixed', () => {
      expect(toFixed(fractionAbove1Str, 10)).toEqual('47619.0476190476');
    });
    test('Above 1 fraction - default decimals - default formatting', () => {
      expect(toFixed(fractionAbove1Str, null, true)).toEqual('47,619.04762');
    });
    test('Above 1 fraction - default decimals - custom formatting', () => {
      expect(toFixed(fractionAbove1Str, null, ['en-US'])).toEqual('47,619.048');
    });
    test('Above 1 fraction - default decimals - custom formatting - currency', () => {
      expect(
        toFixed(fractionAbove1Str, null, [
          'en-US',
          {
            style: 'currency',
            currency: 'USD',
          },
        ]),
      ).toEqual('$47,619.05');
    });
    test('Above 1 fraction - default decimals - custom formatting - currency and decimals', () => {
      expect(
        toFixed(fractionAbove1Str, null, [
          'en-US',
          { style: 'currency', currency: 'USD', maximumFractionDigits: 3 },
        ]),
      ).toEqual('$47,619.048');
    });

    test('Bellow 1 fraction - fixed default', () => {
      expect(toFixed(fractionBellow1Str)).toEqual('0.42857');
    });
    test('Bellow 1 fraction - 7 fixed', () => {
      expect(toFixed(fractionBellow1Str, 7)).toEqual('0.4285714');
    });
    test('Bellow 1 fraction - 1 fixed', () => {
      expect(toFixed(fractionBellow1Str, 1)).toEqual('0.4');
    });
    test('Bellow 1 fraction - 0 fixed', () => {
      expect(toFixed(fractionBellow1Str, 0)).toEqual('0.42857');
    });
  });

  describe('toAuto()', () => {
    const fixtures = {
      string: [fractionAbove1Str, fractionBellow1Str],
      number: [fractionAbove1Num, fractionBellow1Num],
      bigint: [fractionAbove1BI, fractionBellow1BI],
    };

    const fixturesAr = ['string', 'number', 'bigint'];

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
              toAuto(above1, null, [
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
