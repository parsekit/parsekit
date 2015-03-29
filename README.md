#![parsekit](http://i.imgur.com/mvPivuq.png)

Because all the existing language tooling is terrible.

![build status](http://img.shields.io/travis/izaakschroeder/parsekit/master.svg?style=flat)
![coverage](http://img.shields.io/coveralls/izaakschroeder/parsekit/master.svg?style=flat)
![license](http://img.shields.io/npm/l/parsekit.svg?style=flat)
![version](http://img.shields.io/npm/v/parsekit.svg?style=flat)
![downloads](http://img.shields.io/npm/dm/parsekit.svg?style=flat)

Looking to parse something?

Language      | Project
------------- | -------------
Markdown      | parsekit/language-markdown

Driver        | Project
------------- | -------------
Ruby          | parsekit/driver-ruby

Features
 * Incredibly [fast]
 * Full [SourceMap] support
 * Handle [complex grammars]
 * Tree building & traversal
 * Error handling & recovery
 * Meta-data retention
 * Multiple [backends]

Installation

```sh
npm install --save-dev parsekit
```

Create parser

```
parsekit parser --print my-grammar.md > my-parser.js
cat my-file | node my-parser.js
```

## Grammars

Supports any context-free grammar including:
 * Indentation-sensitive
 * Left-recursive / Right-recursive
 * Cyclic
 * Ambiguous

```
var ParseKit = require('parsekit');
var grammar = ParseKit.Grammar(fs.readFileSync('./my-grammar.md'));

```

```markdown
# My Grammar

## Statements
### expression: expression*

## Expressions
### literal: identifier | number
### add: expression '+' expression
### subtract: expression '-' expression

## Tokens
### identifier: /[A-Za-z]+/
### number: /[0-9]+/
```

## Parsing

```
var ParseKit = require('parsekit');
var Parser = ParseKit.Parser(fs.readFileSync('./my-grammar.md'));

var tree = Parser.parse(input);
```

## Parse Trees

```
var Builder = ParseKit.Builder(grammar);
var Visitor = ParseKit.Visitor(grammar);

// Replace all expressions of the form `left - right` with `left + 2`
var visitor = Visitor({
    'expression.subtract': function(node, visit) {
        return Builder.expression.add(visit(node.left), 2);
    }
});

// Generate the new tree
var result = visitor(tree);
```


```sh
brew install llvm --with-clang --with-lld --with-lldb --shared
```


## Performance

ParseKit generates and optimizes automata for the given grammar and then compiles that automata to machine code via LLVM. The resulting LLVM code is then callable via any host language.


## Backends

 * javascript
 * ruby

## References
 * http://usejsdoc.org/
 * http://chaijs.com/api/bdd/
 * http://en.wikipedia.org/wiki/Regular_grammar
 * http://nodejs.org/api/stream.html#stream_object_mode
 * http://michaeldadams.org/papers/layout_parsing/LayoutParsing.pdf
 * http://webhome.cs.uvic.ca/~nigelh/Publications/czech.pdf
 * http://infolab.stanford.edu/~ullman/ialc/slides/slides9.pdf
 * https://github.com/SalomonBrys/LLVM-RE-Gen
 * http://en.wikipedia.org/wiki/Regular_grammar
