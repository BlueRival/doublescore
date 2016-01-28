'use strict';

var assert = require( 'assert' );
var __ = require( '../' );

describe( 'close', function() {

	it( 'should return the correct number of arguments', function() {

		var c = __.close( { max: 100 } );

		var args = null;
		var cb = c( function() {
			args = arguments.length;
		} );

		cb( null, 200 );
		assert.strictEqual( args, 2 );

		cb( null, 200, 300, 400 );
		assert.strictEqual( args, 4 );

		cb( false, 200 );
		assert.strictEqual( args, 2 );

		cb( undefined, 200 );
		assert.strictEqual( args, 2 );

		cb( 0, 200 );
		assert.strictEqual( args, 2 );

		cb( new Error( 'hi' ), 200 );
		assert.strictEqual( args, 1 );

		cb( new Error( 'hi' ), 200, 300, 400 );
		assert.strictEqual( args, 1 );

		cb( new Error( 'hi' ) );
		assert.strictEqual( args, 1 );

		cb( null );
		assert.strictEqual( args, 1 );

		cb();
		assert.strictEqual( args, 1 );

	} );

	it( 'should return data once', function() {

		var c = __.close();

		var calls = 0;
		var lastData = null;

		var cb = c( function( err, data ) {
			lastData = data;
			calls++;
		} );

		cb( null, 200 );
		cb( null, 'hi' );

		assert.strictEqual( lastData, 200 );
		assert.strictEqual( calls, 1 );

	} );

	it( 'should return data twice', function() {

		var c = __.close( {
			max: 2
		} );

		var calls = 0;
		var data = [];

		var cb = c( function( err, datum ) {
			data.push( datum );
			calls++;
		} );

		cb( null, 200 );
		cb( null, 'hi' );
		cb( null, 'bye' );

		assert.deepEqual( data, [ 200, 'hi' ] );
		assert.strictEqual( calls, 2 );

	} );

	it( 'should timeout error', function( done ) {

		var c = __.close( {
			ttl: 10
		} );

		var cb = c( function( err, data ) {
			try {

				assert( err );
				assert.strictEqual( data, undefined );
				done();

			} catch ( e ) {
				done( e );
			}
		} );

		setTimeout( function() {
			cb( null, true );
		}, 100 );

	} );

	it( 'should throw exception on extra callbacks', function() {

		var c = __.close( {
			maxException: true
		} );

		var calls = 0;
		var lastData = null;

		var cb = c( function( err, data ) {
			lastData = data;
			calls++;
		} );

		cb( null, 200 );

		assert.throws( function() {
			cb( null, 'exception' );
		}, /max callbacks 1/ );
		assert.strictEqual( calls, 1 );

	} );

} );
