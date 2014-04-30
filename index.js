"use strict";

var myArray = Array;

if ( !myArray.isArray ) {
	myArray = {
		isArray: function( arg ) {
			return Object.prototype.toString.call( arg ) === '[object Array]';
		}
	};
}

function isArray( arg ) {
	return myArray.isArray( arg );
}

function isObject( arg ) {
	return typeof arg === 'object' && !Array.isArray( arg ) && arg !== null;
}

function getType( arg ) {

	// handle exceptions that typeof doesn't handle
	if ( arg === null ) {
		return 'null';
	}
	else if ( Array.isArray( arg ) ) {
		return 'array';
	}

	var type = typeof arg;

	// more resolution on numbers
	if ( type === 'number' ) {
		if ( Math.ceil( arg ) > Math.floor( arg ) ) {
			type = 'float';
		}
		else {
			type = 'integer';
		}
	}

	return type;

}

var cloneDepth = 0;
function clone( arg ) {

	cloneDepth++;

	if ( cloneDepth >= 100 ) {
		cloneDepth = 0;
		throw new Error( 'max clone depth of 100 reached' );
	}

	var target = null;

	if ( arg instanceof Date ) {
		target = new Date( arg.toISOString() );
	}
	else if ( isArray( arg ) ) {
		target = [];
		for ( var i = 0; i < arg.length; i++ ) {
			target[i] = clone( arg[i] );
		}
	}
	else if ( isObject( arg ) ) {
		target = {};
		for ( var field in arg ) {
			if ( arg.hasOwnProperty( field ) ) {
				target[field] = clone( arg[field] );
			}
		}
	}
	else { // functions, etc. not clonable, and will pass through, though for primitives like strings and numbers, arg is cloning
		target = arg;
	}

	cloneDepth--;

	return target;
}

var mixinDepth = 0;
function mixin( arg ) {

	mixinDepth++;

	if ( mixinDepth >= 100 ) {
		mixinDepth = 0;
		throw new Error( 'max mixin depth of 100 reached' );
	}

	var target = clone( arg ); // clone so we don't modify the original

	// handle arbitrary number of mixins. precedence is from last to first item passed in.
	for ( var i = 1; i < arguments.length; i++ ) {

		var source = arguments[i];

		// mixin the source differently depending on what is in the destination
		switch ( getType( target ) ) {

			case 'object':
			case 'array':
			case 'function':

				// mixin in the source differently depending on its type
				switch ( getType( source ) ) {

					case 'array':
					case 'object':
					case 'function':

						// we don't care what descendant of object the source is
						for ( var field in source ) {

							// don't mixin parent fields
							if ( source.hasOwnProperty( field ) ) {

								// if the target is an array, only take fields that are integers
								if ( Array.isArray( target ) ) {

									var fieldFloat = parseFloat( field );

									// the field started with a number, or no number at all, then had non-numeric characters
									if ( isNaN( fieldFloat ) || fieldFloat.toString().length !== field.length || getType( fieldFloat ) !== 'integer' ) {
										continue;
									}

								}

								// recurse mixin differently depending on what the target value is
								switch ( getType( target[field] ) ) {

									// for any non-objects, do this
									case 'undefined':
									case 'null':

										switch ( getType( source[field] ) ) {
											case 'undefined':
												// NO-OP undefined doesn't override anything
												break;
											case 'null':
												target[field] = null;
												break;
											default:
												target[field] = clone( source[field] );
												break;
										}

										break;

									// if the target is already an object, we can mixin on it
									default:

										target[field] = mixin( target[field], source[field] );

										break;
								}

							}
						}

						break;

					default:
						// NO-OP, primitives can't mixin to objects, arrays and functions
						break;

				}

				break;

			default:

				// mixin in the source differently depending on its type
				switch ( getType( source ) ) {

					// arrays and objects just replace primitives
					case 'array':
					case 'object':

						// override primitives by just passing through a clone of parent
						target = clone( source );

						break;

					default:

						// target is a primitive and can't be null or undefined here, and all other primitives have equal precedence, so just pass through
						target = source;

						break;

				}

				break;
		}

	}

	mixinDepth--;

	return target;

}

module.exports = function( obj ) {
	return {
		isObject: function() {
			return isObject( obj );
		},
		isArray: function() {
			return isArray( obj );
		},
		getType: function() {
			return getType( obj );
		},
		mixin: function() {
			var args = [obj];
			for ( var i in  arguments ) {
				if ( arguments.hasOwnProperty( i ) ) {
					args.push( arguments[i] );
				}
			}
			return mixin.apply( module.exports, args );
		},
		clone: function() {
			return clone( obj );
		}
	};
};

module.exports.mixin = mixin;
module.exports.clone = clone;
module.exports.isObject = isObject;
module.exports.isArray = isArray;
module.exports.getType = getType;
