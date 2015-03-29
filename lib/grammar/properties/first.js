
'use strict';

function firstToken(grammar, token) {
	return [ token ];
}

function firstNonTerminal(nonTerminal, grammar) {
	_.chain(grammar.productions)
		.where({ symbol: nonTerminal })
		.map(item)
		.map(firstItem)
		.uniq()
		.value();
}

function firstItem(item, grammar) {
	// find all edges reachable from item allowing e-transitions

}

function first(s) {
	
}

module.exports = first;
