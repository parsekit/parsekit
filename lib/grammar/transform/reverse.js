
'use strict';

var _ = require('lodash'),
	Grammar = require('../grammar'),
	Production = require('../production');

function reverse(grammar) {
	return Grammar(
		grammar.nonTerminals,
		grammar.tokens,
		_.map(grammar.productions, function reverseProduction(production) {
			return Production(production.symbol, _.reverse(production.derives));
		}),
		grammar.startSymbol
	);
}

module.exports = reverse;
