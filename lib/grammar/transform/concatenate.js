
'use strict';

var _ = require('lodash'),
	Grammar = require('../grammar'),
	Production = require('../production');

function concatenate(grammars) {
	Production(Symbol(), _.pluck(grammars, 'startSymbol'));

	_.pluck(grammars, 'nonTerminals');
	_.pluck(grammars, 'tokens');
	_.pluck(grammars, 'productions');

	return Grammar();
}

module.exports = concatenate;
