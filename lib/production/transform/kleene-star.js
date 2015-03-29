
'use strict';

var epsilon = require('epsilon');

/**
 * Create derivations that render `target` repeatable 0 or more times.
 * @param {Symbol} target The symbol to make repeatable.
 * @returns {Array} Array of new derivations.
 */
function kleeneStar(target) {
	return [
		[ epsilon ],
		[ self, target ]
	];
}

module.exports = kleeneStar;
