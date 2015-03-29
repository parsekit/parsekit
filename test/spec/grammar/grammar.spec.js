
'use strict';

var _ = require('lodash'),
	Grammar = require('grammar/grammar'),
	Production = require('grammar/production');

describe('Grammar', function() {

	describe('#constructor', function() {
		it('should produce a grammar even when called without new', function() {
			expect(Grammar(['a'], ['b'], [], 'a')).to.be.an.instanceof(Grammar);
		});

		it('should throw an error if S ∉ V', function() {
			expect(_.partial(Grammar, ['a'], ['b'], [], 'b'))
				.to.throw(TypeError);
		});

		it('should throw an error if ∃ x : x ∈ V ∧ x ∈ Σ', function() {
			expect(_.partial(Grammar, ['a'], ['a'], [], 'a'))
				.to.throw(TypeError);
		});

		it('should throw an error if ∃ (s,rhs) ∈ R : s ∉ V', function() {
			expect(_.partial(Grammar, ['a'], ['b'], [ { symbol: 'b', derives: [ 'a' ] } ], 'a'))
				.to.throw(TypeError);
		});

		it('should throw an error if ∃ (s,rhs) ∈ R : rhs - (V ∪ Σ) ≠ ∅', function() {
			expect(_.partial(Grammar, ['a'], ['b'], [ { symbol: 'a', derives: [ 'c' ] } ], 'a'))
				.to.throw(TypeError);
		});
	});

	describe('#symbols', function() {
		it('should equal V ∪ Σ', function() {
			expect(Grammar(['a'], ['b'], [], 'a').symbols)
				.to.have.members(['a', 'b']);
		});
	});

	describe('#isNonTerminal', function() {
		it('should return true if symbol is a non-terminal', function() {
			expect(Grammar(['a'], ['b'], [], 'a').isNonTerminal('a')).to.be.true;
		});
		it('should return false if a symbol is not a non-terminal', function() {
			expect(Grammar(['a'], ['b'], [], 'a').isNonTerminal('b')).to.be.false;
		});
	});

	describe('#isToken', function() {
		it('should return true if symbol is a token', function() {
			expect(Grammar(['a'], ['b'], [], 'a').isToken('b')).to.be.true;
		});
		it('should return false if a symbol is not a token', function() {
			expect(Grammar(['a'], ['b'], [], 'a').isToken('a')).to.be.false;
		});
	});

	describe('items', function() {

		it('should generate the correct number of items', function() {
			var production = new Production('stmt', [ 'if', 'x', '{', 'stmt', '}' ]),
				items = Grammar.items([production]);

			expect(items).to.have.length(production.derives.length + 1);
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
	});

});
