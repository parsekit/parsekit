
'use strict';

var _ = require('lodash');

function removeCyclicProductions(grammar) {

	var graph = this.getFirstSetGraph();

	var actions = this.getCyclicProductionGroups().reduce(function(previous, set) {
		return Collections.cartesianProduct([set,set]).reduce(function(previous, x) {
			//FIXME: No direct access to x members!
			var nonTerminal = x.data, otherNonTerminal = x.previous.data;
			if (nonTerminal === otherNonTerminal)
				return previous;
			console.log(nonTerminal+' -> '+otherNonTerminal)
			//
			return grammar.getProductionsFor(otherNonTerminal).reduce(function(previous, production) {
				if (production.rightHandSide.some(function(symbol) {
					return graph.isConnected(otherNonTerminal, symbol) && set.contains(symbol);
				}))
					return { created: previous.created, destroyed: previous.destroyed.push(production) };
				else
					return { created: previous.created.push(new Production(nonTerminal, production.rightHandSide, production)), destroyed: previous.destroyed };
			}, previous)
		}, previous);
	}, { created: Collections.Set.empty(grammar.productions.compare), destroyed: Collections.Set.empty(grammar.productions.compare) });

	//Create a new grammar without the cycles
	return new Grammar(this.nonTerminals, this.tokens, this.productions.difference(actions.destroyed).union(actions.created), this.startSymbol);
}
