/**
 * @fileoverview Test Percentage functions.
 */

const { percentage, percentRemainter } = require('../..');

describe('Percentage', () => {
  describe(`happy path`, () => {
    describe('Percentage Calculations', () => {
      test(`100 to 5%`, () => {
        const percentageRes = percentage(BigInt(100), 500);
        expect(percentageRes).toEqual(BigInt(5));
      });
      test(`100 to 5% with lower precision`, () => {
        const percentageRes = percentage(BigInt(100), 5, 100);
        expect(percentageRes).toEqual(BigInt(5));
      });
      test(`100 to 5% with higher precision`, () => {
        const percentageRes = percentage(BigInt(100), 50000, 1000000);
        expect(percentageRes).toEqual(BigInt(5));
      });
      test(`100 to 0.5%`, () => {
        const percentageRes = percentage(BigInt(100), 50);
        expect(percentageRes).toEqual(BigInt(0));
      });
    });
    describe('Percent Remainter Calculations', () => {
      test(`100 to 5%`, () => {
        const percentageRes = percentRemainter(BigInt(100), 500);
        expect(percentageRes).toEqual(BigInt(95));
      });
      test(`100 to 5% with lower precision`, () => {
        const percentageRes = percentRemainter(BigInt(100), 5, 100);
        expect(percentageRes).toEqual(BigInt(95));
      });
      test(`100 to 5% with higher precision`, () => {
        const percentageRes = percentRemainter(BigInt(100), 50000, 1000000);
        expect(percentageRes).toEqual(BigInt(95));
      });
      test(`100 to 0.5%`, () => {
        const percentageRes = percentRemainter(BigInt(100), 50);
        expect(percentageRes).toEqual(BigInt(100));
      });
    });
  });
});
