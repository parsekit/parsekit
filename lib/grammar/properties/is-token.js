
'use strict';

var _ = require('lodash');

/**
 * Check if a symbol is a token.
 * @param {Symbol} symbol Symbol to check.
 * @returns {Boolean} True if symbol is a token.
 */
function isToken(symbol, grammar) {
	return _.contains(grammar.tokens, symbol);
}

module.exports = isToken;
