
var Grammar = require(__dirname+'/../lib/grammar/grammar'),
	Production = Grammar.Production;

var _ = require('lodash');

var chai = require('chai'),
	expect = chai.expect;

chai.use(require('chai-things'));

describe('Grammar', function() {

	describe('items', function() {
		it('should generate the correct number of items', function() {
			var production = new Production('stmt', [ 'if', 'x', '{', 'stmt', '}' ]),
				items = Grammar.items([production]);

			expect(items).to.have.length(production.derives.length+1);
		});

		it('should generate items whose productions belong', function() {
			var productions = [
				new Production('stmt', [ 'if', 'x', '{', 'stmt', '}' ]),
				new Production('stmt', [ 'id', '=', 'x' ])
			], items = Grammar.items(productions);

			expect(items).to.all.satisfy(function(e) {
				return _.contains(productions, e.production);
			});
		});
	})

	it('should do stuff', function() {
		var productions = [
			new Production('stmt', [ 'if', 'x', '{', 'stmt', '}' ]),
			new Production('stmt', [ 'id', '=', 'x' ])
		];

	});
});
