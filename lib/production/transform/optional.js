
'use strict';

/**
 * Create derivations that render `target` optional.
 * @param {Symbol} target The symbol to make optional.
 * @returns {Array} Array of new derivations.
 */
function optional(target) {
	return [
		[ epsilon ],
		[ target ]
	];
}

module.exports = optional;
