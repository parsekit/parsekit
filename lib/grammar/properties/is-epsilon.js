
'use strict';

var epsilon = require('../epsilon');

/**
 * Check if a symbol is epsilon.
 * @param {Symbol} symbol Symbol to check.
 * @returns {Boolean} True if symbol is epsilon.
 */
function isEpsilon(symbol) {
	return symbol === epsilon;
}

module.exports = isSymbol;
