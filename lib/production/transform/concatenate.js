
'use strict';

var map = require('lodash/map');

/**
 * Creates derivations that result in the concatenation of `targets`.
 * @param {Array} targets Targets to concatenate.
 * @returns {Array} Array of new derivations.
 */
function concatenate(targets) {
	return [
		targets
	];
}

module.exports = concatenate;
