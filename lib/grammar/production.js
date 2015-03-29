
'use strict';

/**
 * A grammar production.
 * @constructor
 * @param {Symbol} N - The non-terminal.
 * @param {Array} R - The right-hand side.
 */
function Production(N, R) {
	if (this instanceof Production === false) {
		return new Production(N, R);
	}
	this.symbol = N;
	this.derives = R;
}

/**
 * Generate string representation of production.
 * @returns {String} Production value.
 */
Production.prototype.toString = function toString() {
	return this.symbol + ' → ' + this.derives.join(' ');
};

module.exports = Production;
