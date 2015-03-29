
'use strict';

// for item i edges are
// if i is not complete, item with same production but dot+1 via i.symbol
// all items of the shape X ->  i.symbol • ... via epsilon

var _ = require('lodash'),
	Item = require('./item'),
	epsilon = require('./epsilon');



// FIRST(x) = reachable(x).edges.filter(isToken).uniq()

function nextEdges(origins, item) {
	return _.chain(origins)
		.filter(function check(other) {
			return item.symbol === other.production.symbol;
		})
		.map(function connect(destination) {
			return { edge: epsilon, destination: destination };
		})
		.value();
}

function localEdges(origins, item) {
	if (item.isComplete) {
		return [];
	} else {
		return [{ edge: item.symbol, destination: item.next }];
	}
}


function create(productions) {

	var origins = _.map(productions, function buildItem(production) {
		return new Item(production, 0);
	});

	function edges(item) {
		return _.flatten([
			nextEdges(origins, item),
			localEdges(origins, item)
		]);
	}

	return {
		edges: _.memoize(edges),
		origins: origins
	};
}


function forest(nodes, walk) {
	var seen = new WeakSet();
	function _dff(nodes) {
		return _.reduce(nodes, function(result, node) {
			if (seen.has(node)) {
				return result;
			} else {
				seen.add(node);
				return result.concat(walk(node, _dff));
			}
		}, []);
	}
	return _dff(nodes);
}


_.mixin({
	forest: forest
});

module.exports = create;
