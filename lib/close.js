'use strict';

var Mixin = require( './mixin' );

var Close = module.exports = {
	close: function( params ) {

		params = Mixin.mixin( {
			max:          1,
			maxException: false,
			ttl:          30000
		}, params );

		return function( cb ) {

			var calls = 0;
			var timeout = null;

			if ( params.ttl && params.ttl > 0 ) {
				timeout = setTimeout( function() {
					calls++;
					timeout = null;
					setImmediate( cb, new Error( 'timeout' ) );
				}, params.ttl );
			}

			return function( err, data ) {

				calls++;

				if ( params.max > -1 && calls > params.max ) {

					if ( params.maxException ) {
						throw new Error( 'max callbacks ' + params.max );
					}

					return false;
				}

				if ( timeout ) {
					clearTimeout( timeout );
					timeout = null;
				}

				if ( err ) {
					cb( err );
				} else if ( arguments.length > 1 ) {
					cb( null, data );
				} else {
					cb( null );
				}

				return true;

			};

		};

	}
};