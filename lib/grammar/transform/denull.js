
'use strict';

var _ = require('lodash');

//http://en.wikipedia.org/wiki/Power_set
function powerSet(items) {
	return _.reduce(items, function(result, item) {
		return result.concat(result.map(function(set) {
			return set.concat(item);
		}));
	}, [[]]);
}

function removeEpsilonProductions(grammar) {



	//Remove all "useless" productions; ones which have no rhs due to epsilons; then remove all
	//epsilons from all remaining productions. For each production containing A: Replicate it 2^k times where k is the
	//number of A instances in the production, such that all combinations of A
	//being there or not will be represented.
	var nullableSymbols = this.getNullableSymbols();
	if (nullableSymbols.length === 0)
		return this;

	var productions = this.productions.reduce(function(result, production) {

		var nullablePositions = production.rightHandSide.map(function(symbol, i) {
			return nullableSymbols.contains(symbol) ? i : -1;
		}).filter(function(position) {
			return position !== -1;
		});

		if (nullablePositions.length === 0)
			return result;

		return result.concat(powerSet(nullablePositions).map(function(symbolsNotPresent) {
			var rhs = production.rightHandSide.filter(function(item, i){ return symbolsNotPresent.indexOf(i) === -1; });
			return new Production(production.leftHandSide, rhs.length === 0 ? [Grammar.epsilon] : rhs, production);
		}));
	}, this.productions).filter(function(production) {
		return !production.rightHandSide.every(function(symbol) { return symbol === Grammar.epsilon; });
	}).map(function(production) {
		return new Production(production.leftHandSide, production.rightHandSide.filter(function(symbol) { return symbol !== Grammar.epsilon; }), production);
	});

	//FIXME: Is there a more elegant way of doing this? Is there any way of sourcing the original production
	//that causes this?
	if (nullableSymbols.contains(Grammar.internalStartSymbol))
		productions = productions.insert(new Production(Grammar.internalStartSymbol, [ Grammar.endOfInput ]));

	return new Grammar(this.nonTerminals, this.tokens, productions, this.startSymbol);
}
