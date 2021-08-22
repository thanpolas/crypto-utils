/**
 * @fileoverview Test fraction format.
 */

const { toSignificant, toFixed, toAuto, Rounding } = require('../..');

const {
  fractionAbove1Str,
  fractionBellow1Str,
  fractionAbove1Num,
  fractionBellow1Num,
  fractionAbove1BI,
  fractionBellow1BI,
} = require('../fixtures/fractions.fix');

describe('Fraction format', () => {
  describe('toSignificant', () => {
    test('Above 1 fraction - significant default decimals', () => {
      expect(toSignificant(fractionAbove1Str)).toEqual('47619');
    });
    test('Above 1 fraction - 7 significant', () => {
      const opts = { decimalPlaces: 7 };
      expect(toSignificant(fractionAbove1Str, opts)).toEqual('47619.05');
    });
    test('Above 1 fraction - 10 significant', () => {
      const opts = { decimalPlaces: 10 };
      expect(toSignificant(fractionAbove1Str, opts)).toEqual('47619.04762');
    });
    test('Above 1 fraction - significant default decimals - default format', () => {
      const opts = { format: true };
      expect(toSignificant(fractionAbove1Str, opts)).toEqual('47,619');
    });
    test('Bellow 1 fraction - significant default decimals', () => {
      expect(toSignificant(fractionBellow1Str)).toEqual('0.42857');
    });
    test('Bellow 1 fraction - 7 significant', () => {
      const opts = { decimalPlaces: 7 };
      expect(toSignificant(fractionBellow1Str, opts)).toEqual('0.4285714');
    });
    test('Bellow 1 fraction - 1 significant', () => {
      const opts = { decimalPlaces: 1 };
      expect(toSignificant(fractionBellow1Str, opts)).toEqual('0.4');
    });
    test('Bellow 1 fraction - 0 significant', () => {
      const opts = { decimalPlaces: 0 };
      expect(toSignificant(fractionBellow1Str, opts)).toEqual('0.42857');
    });
    test('Bellow 1 fraction - default significant decimals - default formating', () => {
      const opts = { format: true };
      expect(toSignificant(fractionBellow1Str, opts)).toEqual('0.42857');
    });
    test('Bellow 1 fraction - Rounding - significant', () => {
      const opts = {
        decimalPlaces: 3,
        rounding: Rounding.ROUND_FLOOR,
      };
      expect(toSignificant(fractionBellow1Str, opts)).toEqual('0.428');
    });
  });

  describe('toFixed', () => {
    test('Above 1 fraction - fixed default decimals', () => {
      expect(toFixed(fractionAbove1Str)).toEqual('47619.04762');
    });
    test('Above 1 fraction - fixed - default decimals - reversed', () => {
      expect(toFixed(fractionAbove1Str, { reverse: true })).toEqual('0.00002');
    });
    test('Above 1 fraction - 7 fixed', () => {
      const opts = { decimalPlaces: 7 };
      expect(toFixed(fractionAbove1Str, opts)).toEqual('47619.0476190');
    });
    test('Above 1 fraction - 10 fixed', () => {
      const opts = { decimalPlaces: 10 };
      expect(toFixed(fractionAbove1Str, opts)).toEqual('47619.0476190476');
    });
    test('Above 1 fraction - default decimals - default format', () => {
      const opts = { format: true };
      expect(toFixed(fractionAbove1Str, opts)).toEqual('47,619.04762');
    });
    test('Above 1 fraction - default decimals - custom format', () => {
      const opts = { format: ['en-US'] };
      expect(toFixed(fractionAbove1Str, opts)).toEqual('47,619.048');
    });
    test('Above 1 fraction - default decimals - bad format', () => {
      const opts = { format: 1 };
      expect(() => toFixed(fractionAbove1Str, opts)).toThrow(
        'format argument can be either a boolean or an Array',
      );
    });

    test('Above 1 fraction - default decimals - custom format - currency', () => {
      const opts = {
        format: [
          'en-US',
          {
            style: 'currency',
            currency: 'USD',
          },
        ],
      };
      expect(toFixed(fractionAbove1Str, opts)).toEqual('$47,619.05');
    });
    test('Above 1 fraction - default decimals - custom format - currency and decimals', () => {
      const opts = {
        format: [
          'en-US',
          { style: 'currency', currency: 'USD', maximumFractionDigits: 3 },
        ],
      };
      expect(toFixed(fractionAbove1Str, opts)).toEqual('$47,619.048');
    });

    test('Bellow 1 fraction - fixed default', () => {
      expect(toFixed(fractionBellow1Str)).toEqual('0.42857');
    });
    test('Bellow 1 fraction - 7 fixed', () => {
      const opts = { decimalPlaces: 7 };
      expect(toFixed(fractionBellow1Str, opts)).toEqual('0.4285714');
    });
    test('Bellow 1 fraction - 1 fixed', () => {
      const opts = { decimalPlaces: 1 };
      expect(toFixed(fractionBellow1Str, opts)).toEqual('0.4');
    });
    test('Bellow 1 fraction - 0 fixed', () => {
      const opts = { decimalPlaces: 0 };
      expect(toFixed(fractionBellow1Str, opts)).toEqual('0.42857');
    });
    test('Bellow 1 fraction - Rounding - fixed', () => {
      const opts = {
        decimalPlaces: 3,
        rounding: Rounding.ROUND_FLOOR,
      };
      expect(toFixed(fractionBellow1Str, opts)).toEqual('0.428');
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
          expect(toAuto(above1)).toEqual('47619.04762');
        });
        test(`toAuto above 1 decimals 7 - ${fixType}`, () => {
          const opts = { decimalPlaces: 7 };
          expect(toAuto(above1, opts)).toEqual('47619.0476190');
        });
        test(`toAuto above 1 decimals 10 - ${fixType}`, () => {
          const opts = { decimalPlaces: 10 };
          expect(toAuto(above1, opts)).toEqual('47619.0476190476');
        });
        test(`toAuto above 1 decimals 1 - ${fixType}`, () => {
          const opts = { decimalPlaces: 1 };
          expect(toAuto(above1, opts)).toEqual('47619.0');
        });
        test(`toAuto above 1 decimals 3 - ${fixType}`, () => {
          const opts = { decimalPlaces: 3 };
          expect(toAuto(above1, opts)).toEqual('47619.048');
        });
        test(`toAuto bellow 1 default - ${fixType}`, () => {
          expect(toAuto(bellow1)).toEqual('0.42857');
        });
        test(`toAuto bellow 1 decimals 7 - ${fixType}`, () => {
          const opts = { decimalPlaces: 7 };
          expect(toAuto(bellow1, opts)).toEqual('0.4285714');
        });
        test(`toAuto bellow 1 decimals 1 - ${fixType}`, () => {
          const opts = { decimalPlaces: 1 };
          expect(toAuto(bellow1, opts)).toEqual('0.4');
        });
        test(`toAuto bellow 1 decimals 0 - ${fixType}`, () => {
          const opts = { decimalPlaces: 0 };
          expect(toAuto(bellow1, opts)).toEqual('0.42857');
        });
        test('toAuto Bellow 1 fraction - Rounding', () => {
          const opts = {
            decimalPlaces: 3,
            rounding: Rounding.ROUND_FLOOR,
          };
          expect(toAuto(fractionBellow1Str, opts)).toEqual('0.428');
        });

        describe('format', () => {
          test('null decimals, default format', () => {
            const opts = { format: true };
            expect(toAuto(above1, opts)).toEqual('47,619.04762');
          });
          test('5 decimals, default format', () => {
            const opts = { decimalPlaces: 2, format: true };
            expect(toAuto(above1, opts)).toEqual('47,619.05');
          });
          test('null decimals, money format', () => {
            const opts = {
              format: ['en-US', { style: 'currency', currency: 'USD' }],
            };
            expect(toAuto(above1, opts)).toEqual('$47,619.05');
          });
        });
      });
    });
  });
});
