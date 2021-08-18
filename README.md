# Crypto Utils

> Crypto utilities for tokens and formatting

[![NPM Version][npm-image]][npm-url]
[![CircleCI](https://circleci.com/gh/thanpolas/crypto-utils.svg?style=svg)](https://circleci.com/gh/thanpolas/crypto-utils)
[![Discord](https://img.shields.io/discord/847075821276758096?label=discord&color=CBE9F0)](https://discord.gg/GkyEqzJWEY)
[![Twitter Follow](https://img.shields.io/twitter/follow/thanpolas.svg?label=thanpolas&style=social)](https://twitter.com/thanpolas)

## Features

-   [Get tokens in human readable format][token_formatting].
-   [toSignificant and toFixed calculations for fractions][utils].

## Install

Install the module using NPM:

```
npm install @thanpolas/crypto-utils --save
```

## Quick Start

```js
const { tokenAuto } = require('@thanpolas/crypto-utils');

const tokenQuantity = '2083278970151697065687';
const decimals = 18;

const value = tokenAuto(tokenQuantity, decimals);

console.log(value);
// 2083.28
```

# Token Formatting

## tokenToSignificant(tokenQuantity, decimals, optSignificantDigits)

Calculates the value of token quantity to significant digits, default of significant digits is 5.

`tokenToSignificant()` is better suited for values that are bellow `1`.

```js
const { tokenToSignificant } = require('@thanpolas/crypto-utils');

const tokenQuantity = '2083278970151697065687';
const decimals = 18;

const value = tokenToSignificant(tokenQuantity, decimals);
console.log(value);
// 2083.3

const value = tokenToSignificant(tokenQuantity, decimals, 7);
console.log(value);
// 2083.279
```

## toFixed(tokenQuantity, decimals, optDecimals)

Calculates the value of token quantity with fixed decimal digits, default of decimal digits is 5.

`tokenToFixed()` is better suited for values that are above `1`.

```js
const { tokenToFixed } = require('@thanpolas/crypto-utils');

const tokenQuantity = '2083278970151697065687';
const decimals = 18;

const value = tokenToFixed(tokenQuantity, decimals);
console.log(value);
// 2083.27897

const value = tokenToFixed(tokenQuantity, decimals, 7);
console.log(value);
// 2083.2789702
```

## tokenToAuto(tokenQuantity, decimals, optDecimals)

Will automatically use `toFixed()` if the value is above `1` or use `toSignificant()` if the value is bellow `1`.

```js
const { tokenAuto } = require('@thanpolas/crypto-utils');

const tokenQuantity = '2083278970151697065687';
const decimals = 18;

const value = tokenAuto(tokenQuantity, decimals);
console.log(value);
// 2083.27

const value = tokenAuto(tokenQuantity, decimals, 5);
console.log(value);
// 2083.27897

//
// Use a quantity that's bellow 1
//
const tokenSmallQuantity = '278970151697065687';

const value = tokenAuto(tokenSmallQuantity, decimals);
console.log(value);
// 0.27897

const value = tokenAuto(tokenSmallQuantity, decimals, 7);
console.log(value);
// 0.2789702
```

---

# Fraction Formatting

## toSignificant(fraction, significantDigits = 5, rounding = Decimal.ROUND_HALF_UP)

Underlying function that calculates to significant digits of a fraction. Fraction is a tuple Array (an array with two elements, the numerator and denominator). Rounding is a constant from the [decimal.js Package][decimal].

Tuple array items can be any of type `string`, `number` or `bigint`.

```js
const fraction = [10000, 21];
```

---

## Available Utility Functions

The crypto-utils exposes a few utility functions for more low-level calculations:

-   `toSignificant(fraction, significantDigits = 5, rounding = Decimal.ROUND_HALF_UP)` Underlying function that calculates to significant digits of a fraction. Fraction is a tuple Array (an array with two elements, the numerator and denominator). Rounding is a constant from the [decimal.js Package][decimal].
-   `toFixed(fraction, decimalPlaces = 5, rounding = Decimal.ROUND_HALF_UP)` Underlying function that calculates to fixed decimals of a fraction. Fraction is a tuple Array (an array with two elements, the numerator and denominator). Rounding is a constant from the [decimal.js Package][decimal].
-   `expDecs(decimals)` Will return the exponent of the given decimals number.
-   `biConv(value)` Will safely convert any value to JSBI and not touch values that are of JSBI type.

---

# Maintenance & Development

## Update Node Version

When a new node version is available you need to updated it in the following:

-   `/package.json`
-   `/.nvmrc`
-   `/.circleci/config.yml`

## Releasing

1. Update the changelog bellow ("Release History").
1. Ensure you are on master and your repository is clean.
1. Type: `npm run release` for patch version jump.
    - `npm run release:minor` for minor version jump.
    - `npm run release:major` for major major jump.

## Release History

-   **v0.1.1**, _17 Aug 2021_
    -   Fixed and tweaked README badges.
-   **v0.1.0**, _17 Aug 2021_
    -   Big Bang

### Acknowledgements & Credits

This library was inspired from [Uniswap SDK core][unisdkcore].

## License

Copyright © [Thanos Polychronakis][thanpolas] and Authors, [Licensed under ISC](/LICENSE).

[decimal]: https://github.com/MikeMcl/decimal.js/
[unisdkcore]: https://github.com/uniswap/uniswap-sdk-core
[token_to_significant]: #tokentosignificanttokenquantity-decimals-optsignificantdigits
[utils]: #available-utility-functions
[token_formatting]: #token-formatting
[npm-image]: https://img.shields.io/npm/v/@thanpolas/crypto-utils.svg
[npm-url]: https://npmjs.org/package/@thanpolas/crypto-utils
