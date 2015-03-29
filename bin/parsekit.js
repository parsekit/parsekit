#!/usr/bin/env node

'use strict';

var path = require('path');

var cmd;
for (var i = 2; i < process.argv.length; ++i) {
	if (process.argv[i].charAt(0) === '-') {
		continue;
	}
	cmd = process.argv.splice(i, 1)[0];
	break;
}

if (!/^[a-z-]+$/.test(cmd)) {
	throw new Error();
}

var bin = path.join(__dirname, '..', 'libexec', cmd);

require(bin);
