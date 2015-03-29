
'use strict';

var production = require('grammar/production'),
	graph = require('grammar/graph');

var epsilon = require('grammar/epsilon');

var _ = require('lodash');

describe('grammar', function() {
	describe('Graph', function() {
		it('should woohoo', function() {
			var productions = [
				production('S', ['E']),
				production('E', ['T']),
				production('E', ['(', 'E', ')']),
				production('T', ['n']),
				production('T', ['+', 'T']),
				production('T', ['T', '+', 'n'])
			];

			var g = graph(productions);

			var s0 = _.chain([g.origins[0]])
				.forest(function(node, explore) {
					return _.chain(g.edges(node))
						.filter({ edge: epsilon })
						.pluck('destination')
						.thru(explore)
						.concat(node)
						.value();
				})
				.map(g.edges)
				.flatten()
				.reject({ edge: epsilon })
				.pluck('edge')
				.value();


			console.log(s0);
		});
	});
});
