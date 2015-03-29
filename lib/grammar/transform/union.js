
'use strict';

var _ = require('lodash'),
	Grammar = require('../grammar'),
	Production = require('../production');

function union(grammars) {
	var S = Symbol(), start = _.partial(Production, S);
	var productions = _.chain(grammars)
		.pluck('startSymbol')
		.map(start)
		.value();

	return Grammar(
		_.union(_.pluck(grammars, 'nonTerminals')),
		_.union(_.pluck(grammars, 'tokens')),
		_.union(_.pluck(grammars, 'productions'), productions),
		S
	);
}

module.exports = union;
