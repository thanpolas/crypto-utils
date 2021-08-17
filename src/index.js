/**
 * crypto-utils
 * Crypto utilities for tokens and formatting
 *
 * https://github.com/thanpolas/crypto-utils
 *
 * Copyright © Thanos Polychronakis
 * LICENSE on /LICENSE file.
 */

/**
 * @fileoverview bootstrap and master exporting module.
 */

const { tokenToSignificant, tokenToFixed } = require('./tokens');

const app = (module.exports = {});

app.tokenToSignificant = tokenToSignificant;
app.tokenToFixed = tokenToFixed;
