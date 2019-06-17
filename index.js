'use strict';

var Clone = require( './lib/clone' );
var Close = require( './lib/close' );
var Mixin = require( './lib/mixin' );
var Timer = require( './lib/timer' );
var Types = require( './lib/types' );

module.exports = function( obj ) {
	return {
		clone:    function() {
			return Clone.clone( obj );
		},
		close:    function() {
			return Close.close( obj );
		},
		getType:  function() {
			return Types.getType( obj );
		},
		isArray:  function() {
			return Types.isArray( obj );
		},
		isNumber: function() {
			return Types.isNumber( obj );
		},
		isObject: function() {
			return Types.isObject( obj );
		},
		mixin:    function() {
			var args = [ obj ];
			for ( var i in  arguments ) {
				if ( arguments.hasOwnProperty( i ) ) {
					args.push( arguments[ i ] );
				}
			}
			return Mixin.mixin.apply( module.exports, args );
		}
	};
};

module.exports.clone = Clone.clone;
module.exports.close = Close.close;
module.exports.getType = Types.getType;
module.exports.timer = Timer.timer;
module.exports.isArray = Types.isArray;
module.exports.isNumber = Types.isNumber;
module.exports.isObject = Types.isObject;
module.exports.mixin = Mixin.mixin;
