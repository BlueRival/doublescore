import * as assert from 'assert';
import __ from '../index';

export default function ( __: __ ) {

  describe( 'isArray', () => {

    it( 'should return true for an array', () => {
      assert.strictEqual( __.isArray( [] ), true );
      assert.strictEqual( __.isArray( new Array() ), true );
      assert.strictEqual( __.isArray( [ 'one', 'two', 'three' ] ), true );

      assert.strictEqual( __( [] ).isArray(), true );
      assert.strictEqual( __( new Array() ).isArray(), true );
      assert.strictEqual( __( [ 'one', 'two', 'three' ] ).isArray(), true );
    } );

    it( 'should return false for NULL', () => {
      assert.strictEqual( __.isArray( null ), false );
      assert.strictEqual( __( null ).isArray(), false );
    } );

    it( 'should return false for UNDEFINED', () => {
      assert.strictEqual( __.isArray( undefined ), false );
      assert.strictEqual( __( undefined ).isArray(), false );
    } );

    it( 'should return false for Infinity', () => {
      assert.strictEqual( __.isArray( Infinity ), false );
      assert.strictEqual( __( Infinity ).isArray(), false );
    } );

    it( 'should return false for NaN', () => {
      assert.strictEqual( __.isArray( NaN ), false );
      assert.strictEqual( __( NaN ).isArray(), false );
    } );

    it( 'should return false for a string', () => {
      assert.strictEqual( __.isArray( 'string' ), false );
      assert.strictEqual( __.isArray( '' ), false );
      assert.strictEqual( __( 'string' ).isArray(), false );
      assert.strictEqual( __( '' ).isArray(), false );
    } );

    it( 'should return false for an integer', () => {
      assert.strictEqual( __.isArray( 1 ), false );
      assert.strictEqual( __.isArray( 0 ), false );
      assert.strictEqual( __.isArray( -1 ), false );
      assert.strictEqual( __( 1 ).isArray(), false );
      assert.strictEqual( __( 0 ).isArray(), false );
      assert.strictEqual( __( -1 ).isArray(), false );
    } );

    it( 'should return false for a float', () => {
      assert.strictEqual( __.isArray( 1.1 ), false );
      assert.strictEqual( __.isArray( 0.0 ), false );
      assert.strictEqual( __.isArray( -1.1 ), false );
      assert.strictEqual( __( 1.1 ).isArray(), false );
      assert.strictEqual( __( 0.0 ).isArray(), false );
      assert.strictEqual( __( -1.1 ).isArray(), false );
    } );

    it( 'should return false for a boolean', () => {
      assert.strictEqual( __.isArray( true ), false );
      assert.strictEqual( __.isArray( false ), false );
      assert.strictEqual( __( true ).isArray(), false );
      assert.strictEqual( __( false ).isArray(), false );
    } );

    it( 'should return false for an object {}', () => {
      assert.strictEqual( __.isArray( {} ), false );
      assert.strictEqual( __( {} ).isArray(), false );
    } );

    describe( 'should return false for any kind of object:', () => {

      it( 'new Date()', () => {
        assert.strictEqual( __.isArray( new Date() ), false );
      } );

      it( 'new RegExp()', () => {
        assert.strictEqual( __.isArray( new RegExp( 'match anything' ) ), false );
      } );


      it( 'new Date()', () => {
        assert.strictEqual( __( new Date() ).isArray(), false );
      } );

      it( 'new RegExp()', () => {
        assert.strictEqual( __( new RegExp( 'match anything' ) ).isArray(), false );
      } );

    } );

  } );

}
