"use strict";

var assert = require( 'assert' );
var __ = require( '../' );

describe( 'getType', function() {

	it( 'should handle UNDEFINED', function() {
		assert.equal( __.getType( undefined ), 'undefined' );
		assert.equal( __( undefined ).getType(), 'undefined' );
	} );

	it( 'should handle NULL', function() {
		assert.equal( __.getType( null ), 'null' );
		assert.equal( __( null ).getType(), 'null' );
	} );

	it( 'should handle strings', function() {
		assert.equal( __.getType( "string" ), "string" );
		assert.equal( __( "string" ).getType(), "string" );
	} );

	it( 'should handle integers', function() {
		assert.equal( __.getType( 1 ), 'integer' );
		assert.equal( __.getType( -1 ), 'integer' );
		assert.equal( __.getType( 0 ), 'integer' );
		assert.equal( __.getType( 0.0 ), 'integer' );
		assert.equal( __.getType( Number.MAX_VALUE ), 'integer' );
		assert.equal( __.getType( -Number.MAX_VALUE ), 'integer' );

		assert.equal( __( 1 ).getType(), 'integer' );
		assert.equal( __( -1 ).getType(), 'integer' );
		assert.equal( __( 0 ).getType(), 'integer' );
		assert.equal( __( 0.0 ).getType(), 'integer' );
		assert.equal( __( Number.MAX_VALUE ).getType(), 'integer' );
		assert.equal( __( -Number.MAX_VALUE ).getType(), 'integer' );
	} );

	it( 'should handle floats', function() {
		assert.equal( __.getType( 1.1 ), 'float' );
		assert.equal( __.getType( -1.1 ), 'float' );
		assert.equal( __.getType( Number.MIN_VALUE ), 'float' );
		assert.equal( __.getType( -Number.MIN_VALUE ), 'float' );
		assert.equal( __( 1.1 ).getType(), 'float' );
		assert.equal( __( -1.1 ).getType(), 'float' );
		assert.equal( __( Number.MIN_VALUE ).getType(), 'float' );
		assert.equal( __( -Number.MIN_VALUE ).getType(), 'float' );
	} );

	it( 'should handle booleans', function() {
		assert.equal( __.getType( true ), 'boolean' );
		assert.equal( __.getType( false ), 'boolean' );
		assert.equal( __( true ).getType(), 'boolean' );
		assert.equal( __( false ).getType(), 'boolean' );
	} );

	it( 'should handle arrays', function() {
		assert.equal( __.getType( [] ), 'array' );
		assert.equal( __.getType( [ "one", "two", "three" ] ), 'array' );
		assert.equal( __( [] ).getType(), 'array' );
		assert.equal( __( [ "one", "two", "three" ] ).getType(), 'array' );
	} );

	it( 'should handle functions', function() {
		assert.equal( __.getType( function() {
		} ), 'function' );
		assert.equal( __( function() {
		} ).getType(), 'function' );
	} );

	it( 'should handle {}', function() {
		assert.equal( __.getType( {} ), 'object' );
		assert.equal( __( {} ).getType(), 'object' );
	} );

	describe( 'should handle any other kind of object:', function() {

		it( 'new Date()', function() {
			assert.equal( __.getType( new Date() ), 'object' );
		} );

		it( 'new RegExp()', function() {
			assert.equal( __.getType( new RegExp() ), 'object' );
		} );


		it( 'new Date()', function() {
			assert.equal( __( new Date() ).getType(), 'object' );
		} );

		it( 'new RegExp()', function() {
			assert.equal( __( new RegExp() ).getType(), 'object' );
		} );

	} );

} );
