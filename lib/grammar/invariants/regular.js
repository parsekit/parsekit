
'use strict';

/**
 *
 *
 */
function isRightRegular(grammar) {

}

/**
 *
 *
 */
function isLeftRegular(grammar) {

}

function isRegular(grammar) {
	return isRightRegular(grammar) || isLeftRegular(grammar);
}


module.exports = {
	isLeftRegular: isLeftRegular,
	isRightRegular: isRightRegular,
	isRegular: isRegular
};
