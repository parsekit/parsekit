
var _ = require('lodash');

function symbols(grammar) {
	return _.union(grammar.tokens, grammar.nonTerminals);
}

module.exports = symbols;
