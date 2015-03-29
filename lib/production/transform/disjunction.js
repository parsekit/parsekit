
'use strict';

var map = require('lodash/map');

/**
 * Create derivations that map to any of the given targets.
 * @param {Array} targets Targets to potentially derive.
 * @returns {Array} Array of new derivations.
 */
function disjunction(targets) {
	return map(targets, function(target) {
		return [target];
	});
}

module.exports = disjunction;
