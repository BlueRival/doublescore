import * as assert from 'assert';
import __ from '../index';

export default function ( __: __ ) {

  describe( 'isObject', () => {

    it( 'should return false for an array', () => {
      assert.strictEqual( __.isObject( [] ), false );
      assert.strictEqual( __.isObject( [ 'one', 'two', 'three' ] ), false );

      assert.strictEqual( __( [] ).isObject(), false );
      assert.strictEqual( __( [ 'one', 'two', 'three' ] ).isObject(), false );
    } );

    it( 'should return false for NULL', () => {
      assert.strictEqual( __.isObject( null ), false );
      assert.strictEqual( __( null ).isObject(), false );
    } );

    it( 'should return false for Infinity', () => {
      assert.strictEqual( __.isObject( Infinity ), false );
      assert.strictEqual( __( Infinity ).isObject(), false );
    } );

    it( 'should return false for NaN', () => {
      assert.strictEqual( __.isObject( NaN ), false );
      assert.strictEqual( __( NaN ).isObject(), false );
    } );

    it( 'should return false for UNDEFINED', () => {
      assert.strictEqual( __.isObject( undefined ), false );
      assert.strictEqual( __( undefined ).isObject(), false );
    } );

    it( 'should return false for a string', () => {
      assert.strictEqual( __.isObject( 'string' ), false );
      assert.strictEqual( __.isObject( '' ), false );

      assert.strictEqual( __( 'string' ).isObject(), false );
      assert.strictEqual( __( '' ).isObject(), false );
    } );

    it( 'should return false for an integer', () => {
      assert.strictEqual( __.isObject( 1 ), false );
      assert.strictEqual( __.isObject( 0 ), false );
      assert.strictEqual( __.isObject( -1 ), false );

      assert.strictEqual( __( 1 ).isObject(), false );
      assert.strictEqual( __( 0 ).isObject(), false );
      assert.strictEqual( __( -1 ).isObject(), false );
    } );

    it( 'should return false for a float', () => {
      assert.strictEqual( __.isObject( 1.1 ), false );
      assert.strictEqual( __.isObject( 0.0 ), false );
      assert.strictEqual( __.isObject( -1.1 ), false );

      assert.strictEqual( __( 1.1 ).isObject(), false );
      assert.strictEqual( __( 0.0 ).isObject(), false );
      assert.strictEqual( __( -1.1 ).isObject(), false );
    } );

    it( 'should return false for a boolean', () => {
      assert.strictEqual( __.isObject( true ), false );
      assert.strictEqual( __.isObject( false ), false );

      assert.strictEqual( __( true ).isObject(), false );
      assert.strictEqual( __( false ).isObject(), false );
    } );

    it( 'should return true for an object {}', () => {
      assert.strictEqual( __.isObject( {} ), true );

      assert.strictEqual( __( {} ).isObject(), true );
    } );

    describe( 'should return true for any other kind of object:', () => {

      it( 'new Date()', () => {
        assert.strictEqual( __.isObject( new Date() ), true );
      } );

      it( 'new RegExp()', () => {
        assert.strictEqual( __.isObject( new RegExp( 'match anything' ) ), true );
      } );

      it( 'new Date()', () => {
        assert.strictEqual( __( new Date() ).isObject(), true );
      } );

      it( 'new RegExp()', () => {
        assert.strictEqual( __( new RegExp( 'match anything' ) ).isObject(), true );
      } );

    } );

  } );

}
