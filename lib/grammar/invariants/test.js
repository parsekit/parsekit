
'use strict';

var _ = require('lodash');

function hasNonSymbolicProductions(grammar) {
	return _.find(grammar.productions, function checkProduction(production) {
		return _.difference(production.derives, grammar.symbols);
	});
}

function hasTokenProductions(grammar) {
	return _.find(grammar.productions, function checkProduction(production) {
		return !_.contains(grammar.nonTerminals, production.symbol);
	});
}

module.exports = [
	hasNonSymbolicProductions,
	hasTokenProductions
];
