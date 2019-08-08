import * as assert from 'assert';
import __ from '../index';

export default function ( __: __ ) {

  describe( 'clone', () => {

    describe( 'string', () => {

      const theString = 'the string';

      it( 'should return a string', () => {
        assert.strictEqual( typeof __.clone( theString ), 'string' );
        assert.strictEqual( typeof __( theString ).clone(), 'string' );
      } );

      it( 'should return a new string with same value', () => {
        assert.strictEqual( __.clone( theString ), theString );
        assert.strictEqual( __( theString ).clone(), theString );
      } );

    } );

    describe( 'Date', () => {

      const theDate = new Date();

      it( 'should return a date object', () => {
        assert.ok( __.clone( theDate ) instanceof Date );
        assert.ok( __( theDate ).clone() instanceof Date );
      } );

      it( 'should have the same ISO date', () => {
        assert.strictEqual( __.clone( theDate ).toISOString(), theDate.toISOString() );
        assert.strictEqual( __( theDate ).clone().toISOString(), theDate.toISOString() );
      } );

      it( 'should be a new object', () => {
        assert.notStrictEqual( __.clone( theDate ), theDate );
        assert.notStrictEqual( __( theDate ).clone(), theDate );
      } );

    } );

    describe( 'Objects and Arrays', () => {

      const theObject = {
        'array field': [
          'hi', 'there'
        ],
        'number': 1,
        'float': 1.04,
        'array numbers': [
          1, 4.45, 32, 3, 3413, () => {
            // NO-OP
          }
        ],
        'func': () => {
          // NO-OP
        },
        'object': {
          'array field': [
            'hi', 'there'
          ],
          'number': 1,
          'float': 1.04,
          'array numbers': [
            1, 4.45, 32, 3, 3413,
            {
              name: 'user1'
            },
            {
              name: 'user2'
            }
          ],
          'object': {
            deep: {
              array: [
                {
                  more: 'here'
                }
              ]
            }
          }
        }
      };

      it( 'should return an object', () => {
        assert.ok( __.clone( theObject ) instanceof Object );
        assert.ok( __( theObject ).clone() instanceof Object );
      } );

      it( 'should have the same structure and values', () => {
        assert.deepEqual( __.clone( theObject ), theObject );
        assert.deepEqual( __( theObject ).clone(), theObject );
      } );

      it( 'should be a new object', () => {
        assert.notStrictEqual( __.clone( theObject ), theObject );
        assert.notStrictEqual( __( theObject ).clone(), theObject );
      } );

      it( 'should not recurse beyond 100 levels', () => {
        assert.throws( () => {

          const cloneObject: any = {};
          let ref = cloneObject;

          for ( let i = 0; i < 300; i++ ) {
            ref.nesting = {};
            ref = ref.nesting;
          }

          ref.final = 'hi';

          __.clone( cloneObject );

        } );
        assert.throws( () => {

          const cloneObject: any = {};
          let ref = cloneObject;

          for ( let i = 0; i < 300; i++ ) {
            ref.nesting = {};
            ref = ref.nesting;
          }

          ref.final = 'hi';

          __( cloneObject ).clone();

        } );
      } );

    } );

    describe( 'everything else', () => {

      const theFunction = () => {
        return 'hello';
      };

      it( 'should be === of original', () => {
        assert.strictEqual( __.clone( theFunction ), theFunction );
        assert.strictEqual( __( theFunction ).clone(), theFunction );
      } );

    } );

  } );
}
