
var _ = require('lodash');

function Production(N, R) {
	this.symbol = N;
	this.derives = R;
}

Production.prototype.toString = function() {
	return this.symbol + ' → ' + this.derives.join(' ');
}

function Item(P, i) {
	this.production = P;
	this.dot = i;
}

Object.defineProperty(Item.prototype, 'symbol', {
	get: function() {
		return this.production.derives[this.dot];
	}
});

Item.prototype.toString = function() {
	var x = this.production.derives.slice();
	x.splice(this.dot, 0, '⋅');
	return '' + this.production.symbol + ' → ' + x.join(' ');
}

var ε = 'ε'; //Symbol();

function connections(a, b) {
	var edges = [ ];
	if (a.production === b.production && b.dot === a.dot+1)
		edges.push(a.symbol);
	if (a.symbol === b.production.symbol)
		edges.push(ε);
	return edges.length > 0 ? edges : null;
}

function neighbors(symbol) {
	return _(symbols).find(_.partial(connected, symbol));
}

function dfs() {
	var explored = new Set(), result = [ ];
	function walk() {
		if (explored.contains(node)) return;
		explored.add(node);
		_.each(neighbors(node), walk);
		result.push(node);
	}
	return walk(node);
}



function Grammar(V, Σ, R, S) {

}

Grammar.prototype = {

}

Grammar.Production = Production;

Grammar.items = function(productions) {
	return _.chain(productions)
		.map(function items(production) {
			return _.range(production.derives.length + 1).map(function(i) {
				return new Item(production, i);
			});
		})
		.flatten()
		.value();
}

module.exports = Grammar;

