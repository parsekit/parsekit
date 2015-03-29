
var first = require('grammar/properties/first');

describe('grammar', function() {
	describe('#first', function() {
		var grammar, tokens, nonTerminals, productions;

		beforeEach(function() {
			tokens = [ "qus", "lbr", "rbr", "str", "exl" ];
			nonTerminals = [ "session", "facts", "fact", "question" ];
			productions = [
				{ symbol: 'session', derives: ["facts", "question"] },
				{ symbol: 'session', derives: ["lbr", "session", "rbr", "session"] },
				{ symbol: 'facts', derives: [ 'fact', 'facts' ]},
				{ symbol: 'facts', derives: epsilon },
				{ symbol: 'fact', derives: [ 'exl', 'str' ]},
				{ symbol: 'question', derives: [ 'qus', 'str' ]}
			];
			grammar = Grammar(tokens, nonTerminals, productions, 'session');
		});

		it('should compute token first sets correctly', function() {
			_.forEach(tokens, function(token) {
				expect(first(token)).to.equal([token])
			});
		});

		it('should compute epsilon derivatives correctly', function() {
			expect(first('facts')).to.contain(epsilon);
		});

		it('should compute non-terminal first sets correctly', function() {
			expect(first('session')).to.equal(["exl", "lbr", "qus"]);
			expect(first('facts')).to.equal(['exl', epsilon]);
			expect(first('fact')).to.equal(['exl']);
			expect(first('question')).to.equal(['qus']);
		});

		it('should compute sequence first sets correctly', function() {
			expect(first(['facts', 'qus'])).to.equal(['qus', 'exl']);
		});

		it('should foo', function() {
			expect(first(['session', 'rbr'])).to.equal(['exl', 'lbr', 'qus' ]);
		})
	});
});
