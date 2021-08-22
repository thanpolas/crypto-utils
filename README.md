# Crypto Utils

> Crypto utilities for formatting tokens and fractions.

[![NPM Version][npm-image]][npm-url]
[![CircleCI](https://circleci.com/gh/thanpolas/crypto-utils.svg?style=svg)](https://circleci.com/gh/thanpolas/crypto-utils)
[![codecov](https://codecov.io/gh/thanpolas/crypto-utils/branch/main/graph/badge.svg?token=GMSGENFPYS)](https://codecov.io/gh/thanpolas/crypto-utils)
[![Discord](https://img.shields.io/discord/847075821276758096?label=discord&color=CBE9F0)](https://discord.gg/GkyEqzJWEY)
[![Twitter Follow](https://img.shields.io/twitter/follow/thanpolas.svg?label=thanpolas&style=social)](https://twitter.com/thanpolas)

## Features

-   [Get Liquidity Pool ratios of Tokens][liquidity_pool_tokens].
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
// "2083.27897"
```

# Liquidity Pool Tokens Ratio

## poolTokensToAuto(poolFraction, decimalFraction, optOptions)

Calculates the ratio between the reserves of two tokens in a liquidity pool.

-   **poolFraction** `{Array<string|bigint>}` The tuple fraction, an Array with two items representing the liquidity pool token reserves.
-   **decimalFraction** `{Array<string|number>}` An Array tuple with two items representing the decimal places of token0 and token1 as defined in the "poolFraction" argument.
-   **optOptions** `{Object=}` An object with calculation options, [read more about available options here][options].
-   **Returns** `{string}` Formatted token.

```js
const { poolTokensToAuto } = require('@thanpolas/crypto-utils');


// 3236.0404424781496715 - Reversed: 0.00030901962375791667205
const dai_weth_pool_str = [
  '124393780771528474299654469',
  '38440119331842498607318',
];

const dai_weth_decimals_str = ['18', '18'];

const value = poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str);
console.log(value);
// "3236.04044"

const opts {
    reverse: true;
}
const value = poolTokensToAuto(dai_weth_pool_str, dai_weth_decimals_str, opts);
console.log(value);
// "0.00030902"
```

# Token Formatting

## tokenToSignificant(tokenQuantity, tokenDecimals, optOptions)

Calculates the value of token quantity to significant digits, default of significant digits is 5.

`tokenToSignificant()` is better suited for values that are bellow `1`.

-   **tokenQuantity** `{number|string|bigint}` The quantity of tokens to be formatted.
-   **tokenDecimals** `{number|string}` How many decimals this token has.
-   **optOptions** `{Object=}` An object with calculation options, [read more about available options here][options].
-   **Returns** `{string}` Formatted token.

```js
const { tokenToSignificant } = require('@thanpolas/crypto-utils');

const tokenQuantity = '2083278970151697065687';
const decimals = 18;

const value = tokenToSignificant(tokenQuantity, decimals);
console.log(value);
// "2083.3"

const opts = { decimalPlaces: 7 };
const value = tokenToSignificant(tokenQuantity, decimals, opts);
console.log(value);
// "2083.279"
```

## tokenToFixed(tokenQuantity, tokenDecimals, optOptions)

Calculates the value of token quantity with fixed decimal digits, default of decimal digits is 5.

`tokenToFixed()` is better suited for values that are above `1`.

-   **tokenQuantity** `{number|string|bigint}` The quantity of tokens to be formatted.
-   **tokenDecimals** `{number|string}` How many decimals this token has.
-   **optOptions** `{Object=}` An object with calculation options, [read more about available options here][options].
-   **Returns** `{string}` Formatted token.

```js
const { tokenToFixed } = require('@thanpolas/crypto-utils');

const tokenQuantity = '2083278970151697065687';
const decimals = 18;

const value = tokenToFixed(tokenQuantity, decimals);
console.log(value);
// "2083.27897"

const opts = { decimalPlaces: 7 };
const value = tokenToFixed(tokenQuantity, decimals, opts);
console.log(value);
// "2083.2789702"
```

## tokenToAuto(tokenQuantity, tokenDecimals, optOptions)

Will automatically use `toFixed()` if the value is above `1` or use `toSignificant()` if the value is bellow `1`.

-   **tokenQuantity** `{number|string|bigint}` The quantity of tokens to be formatted.
-   **tokenDecimals** `{number|string}` How many decimals this token has.
-   **optOptions** `{Object=}` An object with calculation options, [read more about available options here][options].
-   **Returns** `{string}` Formatted token.

```js
const { tokenToAuto } = require('@thanpolas/crypto-utils');

const tokenQuantity = '2083278970151697065687';
const decimals = 18;

const value = tokenToAuto(tokenQuantity, decimals);
console.log(value);
// "2083.27897"

const opts = { decimalPlaces: 7 };
const value = tokenToAuto(tokenQuantity, decimals, opts;
console.log(value);
// "2083.2789701"

//
// Use a quantity that's bellow 1
//
const tokenSmallQuantity = '278970151697065687';

const value = tokenToAuto(tokenSmallQuantity, decimals);
console.log(value);
// "0.27897"

const opts = { decimalPlaces: 7 };
const value = tokenToAuto(tokenSmallQuantity, decimals, opts);
console.log(value);
// "0.2789702"
```

---

# Fraction Formatting

## toSignificant(fraction, optOptions)

Underlying function that calculates to significant digits of a fraction.

-   **fraction** `{Array<number|string|bigint>}` The tuple fraction, an Array with two items representing the numerator and denominator.
-   **optOptions** `{Object=}` An object with calculation options, [read more about available options here][options].
-   **Returns** `{string}` Formatted token.

```js
const { toSignificant } = require('@thanpolas/crypto-utils');

const fraction = [1000000, 21]; // 47619.047619047619

console.log(toSignificant(fraction));
// "47619"

const opts = { decimalPlaces: 7 };
console.log(toSignificant(fraction, opts));
// "47619.05"

const opts = { decimalPlaces: 7, format: true };
console.log(toSignificant(fraction, opts));
// "47,619.05"
```

## toFixed(fraction, optOptions)

Underlying function that calculates to fixed decimals of a fraction.

-   **fraction** `{Array<number|string|bigint>}` The tuple fraction, an Array with two items representing the numerator and denominator.
-   **optOptions** `{Object=}` An object with calculation options, [read more about available options here][options].
-   **Returns** `{string}` Formatted token.

```js
const { toFixed } = require('@thanpolas/crypto-utils');

const fraction = [1000000, 21]; // 47619.047619047619

console.log(toFixed(fraction));
// "47619.04762"

const opts = { decimalPlaces: 7 };
console.log(toFixed(fraction, opts));
// "47619.0476190"

const opts = { decimalPlaces: 7, format: true };
console.log(toFixed(fraction, opts));
// "47,619.0476190"
```

## toAuto(fraction, optOptions)

Underlying function that does automatic decimal calculation and applies appropriate function. If result is above `1` then [toFixed()][tofixed] is applied, if under `1` then [toSignificant()][tosignificant] is applied.

Tuple array items can be of type `string`, `number` or `bigint`.

-   **fraction** `{Array<number|string|bigint>}` The tuple fraction, an Array with two items representing the numerator and denominator.
-   **optOptions** `{Object=}` An object with calculation options, [read more about available options here][options].
-   **Returns** `{string}` Formatted token.

```js
const { toAuto } = require('@thanpolas/crypto-utils');

// A fraction that has a result of above 1.
const fractionAbove1 = [1000000, 21]; // 47619.047619047619

console.log(toAuto(fractionAbove1));
// "47619.05"

const opts = { decimalPlaces: 7 };
console.log(toAuto(fractionAbove1, opts));
// "47619.0476190"

const opts = { format: true };
console.log(toAuto(fractionAbove1, opts));
// "47,619.04762"

//
// A fraction that has a result of below 1.
//
const fractionBelow1 = [21, 49]; // 0.428571428571429

const value = toAuto(fractionBelow1, decimals);
console.log(value);
// "0.42857"

const opts = { decimalPlaces: 7 };
const value = toAuto(fractionBelow1, decimals, opts);
console.log(value);
// "0.4285714"
```

---

# Calculation and Formatting Options

The following options are available on all functions:

-   **decimalPlaces** `{string|number}` Define how many decimal places you want the result to be. When the calculation function is "toSignificant()" then this parameter gets translated to how many significant digits should be returned.
-   **reverse** `{boolean}` Set to true to reverse the fraction before the calculation.
-   **format** `{boolean|Array}` Format the output, [see next section about formatting][formatting].
-   **rounding** `{number}` Value for rounding function, default `Rounding.ROUND_HALF_UP`, [see Roudning][rounding].

## Rounding

Rounding is an enumeration of constants from [Decimal.js][decimal]:

| Property         | Value | Description                                                                     |
| ---------------- | ----- | ------------------------------------------------------------------------------- |
| ROUND_UP         | 0     | Rounds away from zero                                                           |
| ROUND_DOWN       | 1     | Rounds towards zero                                                             |
| ROUND_CEIL       | 2     | Rounds towards Infinity                                                         |
| ROUND_FLOOR      | 3     | Rounds towards -Infinity                                                        |
| ROUND_HALF_UP    | 4     | Rounds towards nearest neighbour. If equidistant, rounds away from zero         |
| ROUND_HALF_DOWN  | 5     | Rounds towards nearest neighbour. If equidistant, rounds towards zero           |
| ROUND_HALF_EVEN  | 6     | Rounds towards nearest neighbour. If equidistant, rounds towards even neighbour |
| ROUND_HALF_CEIL  | 7     | Rounds towards nearest neighbour. If equidistant, rounds towards Infinity       |
| ROUND_HALF_FLOOR | 8     | Rounds towards nearest neighbour. If equidistant, rounds towards -Infinity      |

### Rounding Example

```js
const { toFixed } = require('@thanpolas/crypto-utils');

const fraction = [21, 49]; // 0.428571428571429

//
// Default Rounding
//
const opts = {
    decimalPlaces: 3,
};
toFixed(fraction, opts);
// 0.429 - Default rounding is ROUND_HALF_UP

//
// ROUND_FLOOR Rounding
//
const opts = {
    decimalPlaces: 3,
    rounding: Rounding.ROUND_FLOOR,
};

toFixed(fraction, opts);
// 0.428 - Override rounding to ROUND_FLOOR
```

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

const opts = { decimalPlaces: 7, format: true };
console.log(toFixed(fraction, opts));
// '47,619.0476190'
```

### Array Custom Formatting

When an array is used, then you can provide one or both arguments of the [`Intl.NumberFormat` function][intl-numberformat].

**Note**: Custom formatting options will **override** the decimal places argument.

```js
const { toFixed } = require('@thanpolas/crypto-utils');

const fraction = [1000000, 21]; // 47619.047619047619

const opts = { decimalPlaces: 7, format: ['en-US'] };
console.log(toFixed(fraction, opts));
// '47,619.048' -- decimal places (7) gets overriden by Intl.NumberFormat!

const opts = {
    decimalPlaces: 7,
    format: ['en-US', { style: 'currency', currency: 'USD' }],
};
console.log(toFixed(fraction, opts));
// '$47,619.05' -- decimal places (7) gets overriden by Intl.NumberFormat!

const opts = {
    decimalPlaces: 7,
    format: [
        'en-US',
        { style: 'currency', currency: 'USD', maximumFractionDigits: 3 },
    ],
};
console.log(toFixed(fraction, opts));
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

-   **v0.3.1**, _22 Aug 2021_
    -   Expose the `Rounding` enumeration for [Rounding constants][rounding].
-   **v0.3.0**, _21 Aug 2021_
    -   Implemented the new `poolTokensToAuto()` to calculate pooled tokens ratios.
    -   **Breaking** Moved all options in an object argument.
    -   Introduced the `reverse` option to reverse numerator and denominator in fractions before division.
    -   Forgot to add documentation for `toAuto()`, now done.
    -   Changed default decimal places on auto functions to `5` for both toFixed and toSignificant calls.
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
[utils]: #available-utility-functions
[token_formatting]: #token-formatting
[fraction_formatting]: #fraction-formatting
[formatting]: #formatting
[npm-image]: https://img.shields.io/npm/v/@thanpolas/crypto-utils.svg
[npm-url]: https://npmjs.org/package/@thanpolas/crypto-utils
[intl-numberformat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
[thanpolas]: https://github.com/thanpolas
[tosignificant]: #tosignificantfraction-optoptions
[tofixed]: #tofixedfraction-optoptions
[liquidity_pool_tokens]: #liquidity-pool-tokens-ratio
[options]: #calculation-and-formatting-options
[rounding]: #rounding
