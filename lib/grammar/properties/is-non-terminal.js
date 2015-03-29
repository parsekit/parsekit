
'use strict';

var _ = require('lodash');

/**
 * Check if a symbol is a non-terminal.
 * @param {Symbol} symbol Symbol to check.
 * @returns {Boolean} True if symbol is a non-terminal.
 */
function isNonTerminal(symbol, grammar) {
	return _.contains(grammar.nonTerminals, symbol);
}

module.exports = isToken;
