
'use strict';

/**
 * Create derivations that render `target` repeatable 1 or more times.
 * @param {Symbol} target The symbol to make repeatable.
 * @returns {Array} Array of new derivations.
 */
function kleenePlus(target) {
	return [
		[ self, target ],
		[ target ]
	];
}

module.exports = kleenePlus;
