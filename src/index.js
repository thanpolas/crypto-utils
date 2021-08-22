/**
 * crypto-utils
 * Crypto utilities for tokens and format
 *
 * https://github.com/thanpolas/crypto-utils
 *
 * Copyright © Thanos Polychronakis
 * LICENSE on /LICENSE file.
 */

/**
 * @fileoverview bootstrap and master exporting module.
 */

const { tokenToSignificant, tokenToFixed, tokenToAuto } = require('./tokens');
const { toSignificant, toFixed, toAuto } = require('./fractions');
const { poolTokensToAuto } = require('./pool-tokens');
const { expDecs, biConv } = require('./utils');
const { Rounding } = require('./constants');

const app = (module.exports = {});

app.tokenToSignificant = tokenToSignificant;
app.tokenToFixed = tokenToFixed;
app.tokenToAuto = tokenToAuto;
app.poolTokensToAuto = poolTokensToAuto;
app.toSignificant = toSignificant;
app.toFixed = toFixed;
app.toAuto = toAuto;
app.expDecs = expDecs;
app.biConv = biConv;
app.Rounding = Rounding;
