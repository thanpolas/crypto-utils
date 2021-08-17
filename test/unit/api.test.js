const cryptoUtils = require('../..');

describe('API Surface Tests', () => {
  describe('Properties', () => {
    it('Exposes only the expected properties at root level', () => {
      expect(cryptoUtils).toContainAllKeys([
        'tokenToSignificant',
        'tokenToFixed',
        'tokenAuto',
        'toSignificant',
        'toFixed',
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

    it('tokenAuto is a function', () => {
      expect(cryptoUtils.tokenAuto).toBeFunction();
    });

    it('toSignificant is a function', () => {
      expect(cryptoUtils.toSignificant).toBeFunction();
    });

    it('toFixed is a function', () => {
      expect(cryptoUtils.toFixed).toBeFunction();
    });

    it('expDecs is a function', () => {
      expect(cryptoUtils.expDecs).toBeFunction();
    });

    it('biConv is a function', () => {
      expect(cryptoUtils.biConv).toBeFunction();
    });
  });
});
