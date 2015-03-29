
'use strict';

var Production = require('grammar/production'),
	Item = require('grammar/item');

describe('Item', function() {
	describe('#complete', function() {
		it('should work', function() {
			var p = new Production('a', ['b', 'c']),
				a = new Item(p, 0),
				b = new Item(p, 1),
				c = new Item(p, 2);
			expect(a.complete).to.be.false;
			expect(b.complete).to.be.false;
			expect(c.complete).to.be.true;
		});
	});
	describe('#precedes', function() {
		it('should work correctly', function() {
			var p = new Production('a', ['b', 'c']),
				a = new Item(p, 0),
				b = new Item(p, 1);
			expect(a.precedes(b)).to.be.true;
		});
		it('should work correctly2', function() {
			var p = new Production('a', ['b', 'c']),
				a = new Item(p, 0),
				b = new Item(p, 1);
			expect(b.precedes(a)).to.be.false;
		});
	});
	describe('#derives', function() {
		it('should work correctly', function() {
			var p = new Production('a', ['b', 'c']),
				q = new Production('b', ['c', 'd']),
				a = new Item(p, 0),
				b = new Item(q, 0);
			expect(a.derives(b)).to.be.true;
		});
	});
});
