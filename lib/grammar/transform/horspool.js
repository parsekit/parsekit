
// Transform a grammar into one with fewer states and stack operations
// For linear grammars this results in a discrete finite automata.

// Input is some category; normal parsing may be utf-8 strings; binary parsing
// may be bytes or something.

// Combining parses requires morphism of input?

// Explore possible inputs
// eg:
// cmt -> //[^:newline:]+
// id -> [a-z]+
// key -> apple
// chp -> a5

// For these "reducing" won't actually build the tree, but create a range from
// which the token can be constructed.
//
// e.g. `//foo` results in
//
// right-recursive:
// shift /
// shift /
// shift f
// shift o
// shift o
// reduce cmt2
// reduce cmt2
// reduce cmt2
// reduce cmt1
//
// vs. left-recursive
// shift /
// shift /
// shift f
// reduce cmt2
// shift o
// reduce cmt2
// shift o
// reduce cmt2
// reduce cmt1

// where at the start we have curptr = initptr, for every shift ++curptr
// for final reduce we take range initptr - curptr of the input buffer
// then set initptr = curptr; real stack operations can occur for nodes that
// we care about. this basically makes the depth of the stack 1 for regex
// only things. we get curptr and initptr for free pretty much since the parser
// should be keeping track of line/column/byte position anyway

cmt -> / / cmt2
cmt2# -> [^:newline:]
cmt2# -> cmt2 [^:newline:]

id -> id2#
id2# -> [a-z]
id2# -> id2# [a-z]

key -> a p p l e

chp -> a 5

// # == don't care about the result, so flatten the stack. all children of #
// nodes must also be # nodes for this to work. example of possible failure case

$([0-9]+).([0-9]+)

money -> $ intp# . intp#
inpt# -> [0-9]
inpt# -> [0-9] inpt#

// if there are () then tree structure comes back into play. ignoring these
// groups

// Optimization pass for # nodes: since structure doesn't matter (who cares if
// it's a foo# vs a bar# try to unify as many productions as possible.
// e.g. if there is production X -> X [0-9] and production Y -> Y [0-9] then
// they are unifiable.

// To begin state space exploration we find list of inputs that trigger all
// possible matches. from above grammar it is clear that the following are
// initial items.

[a-z], a, a, /

// howto conflicts? input of / is clearly not ambiguous, whilst a clearly is
// shift-shift conflicts are not possible?
