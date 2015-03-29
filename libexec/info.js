
'use strict';

var _ = require('lodash'),
	ParseKit = require('../'),
	bl = require('bl'),
	yargs = require('yargs'),
	format = require('cli-color');

var Grammar = ParseKit.Grammar,
	argv = yargs.argv;


function section(name) {
	return name + '\n' + '============================';
}

process.stdin.pipe(bl(function(err, data) {
	if (err) {
		throw err;
	}

	var grammar = JSON.parse(data.toString('utf8'));


	console.log(section('Tokens'));
	_.forEach(grammar.tokens, function(symbol) {
		console.log(' *',symbol);
	});
	console.log();

	var props = {
		N: Grammar.Symbol.isNullable,
	}

	console.log(section('Non-Terminals'));
	_.forEach(grammar.nonTerminals, function(symbol) {
		console.log(' *',symbol);
	});
	console.log();

	console.log(section('Productions'));
	console.log();

}));
