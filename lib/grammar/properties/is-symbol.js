
'use strict';

var isToken = require('./is-token'),
	isNonTerminal = require('./is-non-terminal');

function isSymbol(symbol, grammar) {
	return isToken(symbol, grammar) || isNonTerminal(symbol, grammar);
}

module.exports = isSymbol;
