# Crypto Utils

> Crypto utilities for formatting tokens and fractions.

[![NPM Version][npm-image]][npm-url]
[![CircleCI](https://circleci.com/gh/thanpolas/crypto-utils.svg?style=svg)](https://circleci.com/gh/thanpolas/crypto-utils)
[![Discord](https://img.shields.io/discord/847075821276758096?label=discord&color=CBE9F0)](https://discord.gg/GkyEqzJWEY)
[![Twitter Follow](https://img.shields.io/twitter/follow/thanpolas.svg?label=thanpolas&style=social)](https://twitter.com/thanpolas)

## Features

-   [Get crypto token values in human readable format][token_formatting].
-   [Get fraction value in human readable format][fraction_formatting].

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

## tokenToSignificant(tokenQuantity, tokenDecimals, optSignificantDigits, optFormatting)

Calculates the value of token quantity to significant digits, default of significant digits is 5.

`tokenToSignificant()` is better suited for values that are bellow `1`.

-   **tokenQuantity** `{number|string|bigint}` The quantity of tokens to be formatted.
-   **tokenDecimals** `{number|string}` How many decimals this token has.
-   **optSignificantDigits** `{number=}` Number of significant digits, default `5`.
-   **optFormatting** `{boolean|Array=}` Number formatting, read more on [Formatting][formatting].
-   **Returns** `{string}` Formatted token.

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

## toFixed(tokenQuantity, tokenDecimals, optDecimals, optFormatting)

Calculates the value of token quantity with fixed decimal digits, default of decimal digits is 5.

`tokenToFixed()` is better suited for values that are above `1`.

-   **tokenQuantity** `{number|string|bigint}` The quantity of tokens to be formatted.
-   **tokenDecimals** `{number|string}` How many decimals this token has.
-   **optDecimals** `{number=}` Number of decimal places to use on formatted result, default `5`.
-   **optFormatting** `{boolean|Array=}` Number formatting, read more on [Formatting][formatting].
-   **Returns** `{string}` Formatted token.

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

## tokenToAuto(tokenQuantity, tokenDecimals, optDecimals, optFormatting)

Will automatically use `toFixed()` if the value is above `1` or use `toSignificant()` if the value is bellow `1`.

-   **tokenQuantity** `{number|string|bigint}` The quantity of tokens to be formatted.
-   **tokenDecimals** `{number|string}` How many decimals this token has.
-   **optDecimals** `{number=}` Number of decimal places or significant units depending on the function used. Default for fixed is `2` and default for significant is `5`.
-   **optFormatting** `{boolean|Array=}` Number formatting, read more on [Formatting][formatting].
-   **Returns** `{string}` Formatted token.

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

## toSignificant(fraction, significantDigits = 5, optFormatting, rounding = Decimal.ROUND_HALF_UP)

Underlying function that calculates to significant digits of a fraction. Fraction is a tuple Array (an array with two elements, the numerator and denominator). Rounding is a constant from the [decimal.js Package][decimal].

Tuple array items can be of type `string`, `number` or `bigint`.

-   **fraction** `{Array<number|string|bigint>}` The tuple fraction, an Array with two items representing the numerator and denominator.
-   **significantDigits** `{number=}` Number of significant digits, default `5`.
-   **optFormatting** `{boolean|Array=}` Number formatting, read more on [Formatting][formatting].
-   **rounding** `{Decimal=}` [Decimal.js][decimal] enumeration of rounding function, default `Decimal.ROUND_HALF_UP`.
-   **Returns** `{string}` Formatted token.

```js
const { toSignificant } = require('@thanpolas/crypto-utils');

const fraction = [1000000, 21]; // 47619.047619047619

console.log(toSignificant(fraction));
// '47619'

console.log(toSignificant(fraction, 7));
// '47619.05'

console.log(toSignificant(fraction, 7, true));
// '47,619.05'
```

## toFixed(fraction, decimalPlaces = 5, optFormatting, rounding = Decimal.ROUND_HALF_UP)

Underlying function that calculates to fixed decimals of a fraction. Fraction is a tuple Array (an array with two elements, the numerator and denominator). Rounding is a constant from the [decimal.js Package][decimal].

Tuple array items can be of type `string`, `number` or `bigint`.

-   **fraction** `{Array<number|string|bigint>}` The tuple fraction, an Array with two items representing the numerator and denominator.
-   **decimalPlaces** `{number=}` Number of decimal places to use, default `5`.
-   **optFormatting** `{boolean|Array=}` Number formatting, read more on [Formatting][formatting].
-   **rounding** `{Decimal=}` [Decimal.js][decimal] enumeration of rounding function, default `Decimal.ROUND_HALF_UP`.
-   **Returns** `{string}` Formatted token.

```js
const { toFixed } = require('@thanpolas/crypto-utils');

const fraction = [1000000, 21]; // 47619.047619047619

console.log(toFixed(fraction));
// '47619.04762'

console.log(toFixed(fraction, 7));
// '47619.0476190'

console.log(toFixed(fraction, 7, true));
// "47,619.04762"
```

## toAuto(fraction, decimalPlaces, optFormatting, rounding = Decimal.ROUND_HALF_UP)

Underlying function that does automatic decimal calculation and applies appropriate function. If result is above `1` then [toFixed()][tofixed] is applied, if under `1` then [toSignificant()][tosignificant] is applied.

Tuple array items can be of type `string`, `number` or `bigint`.

-   **fraction** `{Array<number|string|bigint>}` The tuple fraction, an Array with two items representing the numerator and denominator.
-   **decimalPlaces** `{number=}` Number of decimal places to use. Depending on the function used ([toFixed()][tofixed] or [toSignificant()][tosignificant]) the corresponding default value is applied if not set.
-   **optFormatting** `{boolean|Array=}` Number formatting, read more on [Formatting][formatting].
-   **rounding** `{Decimal=}` [Decimal.js][decimal] enumeration of rounding function, default `Decimal.ROUND_HALF_UP`.
-   **Returns** `{string}` Formatted token.

```js
const { toAuto } = require('@thanpolas/crypto-utils');

// A fraction that has a result of above 1.
const fractionAbove1 = [1000000, 21]; // 47619.047619047619

console.log(toAuto(fractionAbove1));
// "47619.05"

console.log(toAuto(fractionAbove1, 7));
// "47619.0476190"

console.log(toAuto(fractionAbove1, 5, true));
// "47,619.04762"

//
// A fraction that has a result of below 1.
//
const fractionBelow1 = [21, 49]; // 0.428571428571429

const value = toAuto(fractionBelow1, decimals);
console.log(value);
// "0.42857"

const value = toAuto(fractionBelow1, decimals, 7);
console.log(value);
// "0.4285714"
```

---

## Formatting

The Crypto Utilities package uses the [`Intl.NumberFormat` function][intl-numberformat] to format the output when desired. By default, no formatting will be applied. Let's have a look at the formatting argument one more time:

-   **optFormatting** `{boolean|Array=}` Number formatting, read more on [Formatting][formatting].

### Boolean True Formatting

When a boolean `true` is used, the default formatting is applied:

-   **Locale**: `en-US`.
-   **Options**: Either `maximumSignificantDigits` when toSignificant() function is used, or `maximumFractionDigits` when toFixed() function is used. The value passed to this option is the decimal parts.

```js
const { toFixed } = require('@thanpolas/crypto-utils');

const fraction = [1000000, 21]; // 47619.047619047619

console.log(toFixed(fraction, 7, true));
// '47,619.04762'
```

### Array Custom Formatting

When an array is used, then you can provide one or both arguments of the [`Intl.NumberFormat` function][intl-numberformat].

**Note**: Custom formatting options will **override** the decimal places argument.

```js
const { toFixed } = require('@thanpolas/crypto-utils');

const fraction = [1000000, 21]; // 47619.047619047619

console.log(toFixed(fraction, 7, ['en-US']));
// '47,619.048' -- decimal places (7) gets overriden by Intl.NumberFormat!

console.log(
    toFixed(fraction, 7, ['en-US', { style: 'currency', currency: 'USD' }]),
);
// '$47,619.05' -- decimal places (7) gets overriden by Intl.NumberFormat!

console.log(
    toFixed(fraction, 7, [
        'en-US',
        { style: 'currency', currency: 'USD', maximumFractionDigits: 3 },
    ]),
);
// '$47,619.048' -- decimal places (7) gets overriden by Intl.NumberFormat!
```

---

## Available Utility Functions

The crypto-utils exposes a few utility functions for more low-level calculations:

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

-   **v0.2.0**, _18 Aug 2021_
    -   **Breaking** renamed `tokenAuto` to `tokenToAuto`.
    -   Added [formatting][formatting] argument on all methods.
    -   Created `toAuto()` function for fractions.
    -   More tests, especially for fractions.
    -   More lax node engine setting (set to `>=12`).
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
[fraction_formatting]: #fraction-formatting
[formatting]: #formatting
[npm-image]: https://img.shields.io/npm/v/@thanpolas/crypto-utils.svg
[npm-url]: https://npmjs.org/package/@thanpolas/crypto-utils
[intl-numberformat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
