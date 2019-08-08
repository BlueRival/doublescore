import * as assert from 'assert';
import __ from '../index';

export default function ( __: __ ) {

  describe( 'getType', () => {

    it( 'should handle UNDEFINED', () => {
      assert.strictEqual( __.getType( undefined ), 'undefined' );
      assert.strictEqual( __( undefined ).getType(), 'undefined' );
    } );

    it( 'should handle NULL', () => {
      assert.strictEqual( __.getType( null ), 'null' );
      assert.strictEqual( __( null ).getType(), 'null' );
    } );

    it( 'should handle strings', () => {
      assert.strictEqual( __.getType( 'string' ), 'string' );
      assert.strictEqual( __( 'string' ).getType(), 'string' );
    } );

    it( 'should handle integers', () => {
      [
        1,
        -1,
        0,
        0.0,
        -0,
        -0.0,
        Number.MAX_VALUE,
        -Number.MAX_VALUE
      ].forEach( ( val ) => {
        assert.strictEqual( __.getType( val ), 'integer' );
        assert.strictEqual( __( val ).getType(), 'integer' );
      } );

    } );

    it( 'should handle floats', () => {
      [
        1.1,
        -1.1,
        0.1,
        -0.1,
        Number.MIN_VALUE,
        -Number.MIN_VALUE
      ].forEach( ( val ) => {
        assert.strictEqual( __.getType( val ), 'float' );
        assert.strictEqual( __( val ).getType(), 'float' );
      } );

    } );

    it( 'should handle booleans', () => {
      assert.strictEqual( __.getType( true ), 'boolean' );
      assert.strictEqual( __.getType( false ), 'boolean' );
      assert.strictEqual( __( true ).getType(), 'boolean' );
      assert.strictEqual( __( false ).getType(), 'boolean' );
    } );

    it( 'should handle arrays', () => {
      assert.strictEqual( __.getType( new Array() ), 'array' );
      assert.strictEqual( __.getType( [] ), 'array' );
      assert.strictEqual( __.getType( [ 'one', 'two', 'three' ] ), 'array' );
      assert.strictEqual( __( new Array() ).getType(), 'array' );
      assert.strictEqual( __( [] ).getType(), 'array' );
      assert.strictEqual( __( [ 'one', 'two', 'three' ] ).getType(), 'array' );
    } );

    it( 'should handle functions', () => {
      assert.strictEqual( __.getType( () => {
        // NO-OP
      } ), 'function' );
      assert.strictEqual( __( () => {
        // NO-OP
      } ).getType(), 'function' );
    } );

    it( 'should handle {}', () => {
      assert.strictEqual( __.getType( {} ), 'object' );
      assert.strictEqual( __( {} ).getType(), 'object' );
    } );

    it( 'should handle Date', () => {
      assert.strictEqual( __.getType( new Date() ), 'date' );
      assert.strictEqual( __( new Date() ).getType(), 'date' );
    } );

    it( 'should handle RegExp', () => {
      assert.strictEqual( __.getType( new RegExp( 'match anything' ) ), 'regex' );
      assert.strictEqual( __( new RegExp( 'match anything' ) ).getType(), 'regex' );
      assert.strictEqual( __.getType( /regex/ ), 'regex' );
      assert.strictEqual( __( /regex/ ).getType(), 'regex' );
    } );

    it( 'should handle objects from custom class new Class()', () => {

      class Class {
        constructor() {
          // NO-OP
        }
      }

      assert.strictEqual( __.getType( new Class() ), 'object' );
      assert.strictEqual( __( new Class() ).getType(), 'object' );

    } );

  } );

}
