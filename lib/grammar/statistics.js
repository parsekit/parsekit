
'use strict'

function statistics() {
	return {
		productions: {
			count: 5,
			reachable: 5,
			unreachable: 3
		},
		tokens: {
			count: 3,
			reachable: 2,
			unreachable: 1
		},
		nonTerminals: {
			count: 3,
			reachable: 2,
			unreachable: 1
		},

		// classes
		invariants: {
			cyclic: false,
			recursive: true,
			linear: false,
			regular: 'left',
			determinstic: true
		}
	};
}

module.exports = statistics;
