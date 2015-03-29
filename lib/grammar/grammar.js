
'use strict';

var _ = require('lodash');

/**
 * Create a new grammar.
 * @constructor
 * @param {Array} V - The set of non-terminals.
 * @param {Array} Σ - The set of tokens.
 * @param {Array} R - The set of productions.
 * @param {Symbol} S - The start symbol.
 */
function grammar(options) {

	if (arguments.length > 1) {
		options = _.object([
			'nonTerminals',
			'tokens',
			'productions',
			'startSymbol'
		], arguments);
	}

	// The start symbol must be a non-terminal
	// Tokens and non-terminals must be disjoint
	// Every left-hand side of a production must be a non-terminal
	// Every right-hand side of a production must be a symbol

	return _.assign({ }, options);
}

module.exports = grammar;
