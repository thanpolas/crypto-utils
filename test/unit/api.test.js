const cryptoUtils = require('../..');

describe('API Surface Tests', () => {
  describe('Properties', () => {
    it('Exposes only the expected properties at root level', () => {
      expect(cryptoUtils).toContainAllKeys([
        'tokenToSignificant',
        'tokenToFixed',
        'tokenToAuto',
        'toSignificant',
        'toFixed',
        'toAuto',
        'expDecs',
        'biConv',
      ]);
    });
  });
  describe('Check Types', () => {
    it('Default export is an object', () => {
      expect(cryptoUtils).toBeObject();
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
  });
});
