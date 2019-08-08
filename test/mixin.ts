import * as assert from 'assert';
import __ from '../index';

export default function ( __: __ ) {

  describe( 'mixin', () => {

    const theObject = {
      statusCode: 200,
      data: {
        subscription: {
          id: '1234567890',
          principal_id: 'STACK',
          callback_url: 'https://a.host.com',
          date_created: '2013-02-04T06:57:18Z',
          tags: {
            string: 'germany'
          }
        },
        contacts: [
          {
            name: 'user1'
          },
          {
            name: 'user2'
          }
        ]
      },
      func: () => {
        // NO-op
      }
    };

    const theDefaultObject = {
      statusCode: 500,
      data: {
        subscription: {
          id: null
        },
        contacts: []
      }
    };

    const theArray = [
      'one',
      1,
      'onepointone',
      1.1,
      {
        'hi': 'germany',
        'bye': 'france',
        'an array': [
          'one',
          () => {
            // NO-OP
          },
          1,
          'onepointone',
          1.1,
          {
            'hi 2': 'germany',
            'bye 2': 'france',
            'an array 2': []
          }
        ]
      }
    ];

    const theDefaultArray = [
      'two',
      undefined,
      null,
      null,
      {
        hi: null
      }
    ];

    // original should not be modified
    it( 'should not modify original object', () => {

      __.mixin( theDefaultObject, theObject );
      assert.notDeepStrictEqual( theObject, theDefaultObject );

      __( theDefaultObject ).mixin( theObject );
      assert.notDeepStrictEqual( theObject, theDefaultObject );

    } );
    it( 'should not modify original array', () => {
      __.mixin( theDefaultArray, theArray );
      assert.notDeepStrictEqual( theArray, theDefaultArray );

      __( theDefaultArray ).mixin( theArray );
      assert.notDeepStrictEqual( theArray, theDefaultArray );
    } );

    // a new one
    it( 'should return a new object', () => {
      assert.notStrictEqual( __.mixin( theObject, {} ), theObject );
      assert.notStrictEqual( __( theObject ).mixin( {} ), theObject );
    } );
    it( 'should return a new array', () => {
      assert.notStrictEqual( __.mixin( theArray, [] ), theArray );
      assert.notStrictEqual( __( theArray ).mixin( [] ), theArray );
    } );

    // deep structure with empty default
    it( 'should return the same deep structure with empty default object', () => {
      assert.notStrictEqual( __.mixin( {}, theObject ), theObject );
      assert.notStrictEqual( __( {} ).mixin( theObject ), theObject );
    } );
    it( 'should return the same deep structure with empty default array', () => {
      assert.notStrictEqual( __.mixin( [], theArray ), theArray );
      assert.notStrictEqual( __( [] ).mixin( theArray ), theArray );
    } );

    // deep structure with empty input
    it( 'should return the same deep structure with empty input object', () => {
      assert.deepStrictEqual( __.mixin( theObject, {} ), theObject );
      assert.deepStrictEqual( __( theObject ).mixin( {} ), theObject );
    } );
    it( 'should return the same deep structure with empty input array', () => {
      assert.deepStrictEqual( __.mixin( theArray, [] ), theArray );
      assert.deepStrictEqual( __( theArray ).mixin( [] ), theArray );
    } );

    // deep structure with undefined input
    it( 'should return the same deep structure with undefined input object', () => {
      assert.deepStrictEqual( __.mixin( theObject, undefined ), theObject );
      assert.deepStrictEqual( __( theObject ).mixin( undefined ), theObject );
    } );
    it( 'should return the same deep structure with undefined input array', () => {
      assert.deepStrictEqual( __.mixin( theArray, undefined ), theArray );
      assert.deepStrictEqual( __( theArray ).mixin( undefined ), theArray );
    } );

    // deep structure with null input
    it( 'should return the same deep structure with null input object', () => {
      assert.deepStrictEqual( __.mixin( theObject, null ), theObject );
      assert.deepStrictEqual( __( theObject ).mixin( null ), theObject );
    } );
    it( 'should return the same deep structure with null input array', () => {
      assert.deepStrictEqual( __.mixin( theArray, null ), theArray );
      assert.deepStrictEqual( __( theArray ).mixin( null ), theArray );
    } );

    // deep structure with initialized default
    it( 'should return the same deep structure with initialized default object', () => {
      // assert.deepStrictEqual( __.mixin( theDefaultObject, theObject ), theObject );
      assert.deepStrictEqual( __( theDefaultObject ).mixin( theObject ), theObject );
    } );
    it( 'should return the same deep structure with initialized default array', () => {
      assert.deepStrictEqual( __.mixin( theDefaultArray, theArray ), theArray );
      assert.deepStrictEqual( __( theDefaultArray ).mixin( theArray ), theArray );
    } );

    // mixin an object to an array
    it( 'should mixin all integer fields from the object to the array', () => {

      const theArrayFromObject = {
        'zero': 0,
        'one': 1,
        'two': 2,
        '0': 0,
        '1': 1,
        '2': 2,
        '3.0': 'three.zero',
        '3': 3,
        '4.1': 4,
        '5.2': 5,
        '6six': 6,
        '7': 7
      };

      const theDefaultArrayFromObject = [
        'zero',
        [
          'one'
        ],
        'two',
        'three',
        {
          four: 4
        }
      ];

      const expectedArrayFromObject = [
        0,
        [ 'one' ],
        2,
        3,
        {
          four: 4
        }
      ];
      expectedArrayFromObject[ 7 ] = 7;

      assert.deepStrictEqual( __.mixin( theDefaultArrayFromObject, theArrayFromObject ), expectedArrayFromObject );
      assert.deepStrictEqual( __( theDefaultArrayFromObject ).mixin( theArrayFromObject ), expectedArrayFromObject );

    } );

    // mixin an array to an object
    it(
      'should mixin in an array to an object by converting the integer indexes in the array to string field names in the object',
      () => {

        const theObjectFromArray = [
          'zero',
          'one',
          'two',
          'three'
        ];
        theObjectFromArray[ 5 ] = 'five';


        const theDefaultObjectFromArray = {
          zero: 0,
          one: 1,
          two: 2,
          0: 0,
          1: 1,
          2: 2
        };

        const expectedObjectFromArray = {
          0: 'zero',
          1: 'one',
          2: 'two',
          3: 'three',
          5: 'five',
          zero: 0,
          one: 1,
          two: 2
        };

        assert.deepStrictEqual( __.mixin( theDefaultObjectFromArray, theObjectFromArray ), expectedObjectFromArray );
        assert.deepStrictEqual( __( theDefaultObjectFromArray ).mixin( theObjectFromArray ), expectedObjectFromArray );

      } );

    it( 'should mixin nested arrays to objects', () => {

      const theInput = {
        two: [
          'zero',
          'one',
          'two',
          'three'
        ]
      };
      theInput.two[ 5 ] = 'five';


      const theDefault = {
        zero: 0,
        one: 1,
        two: {
          zero: 0,
          one: 1,
          two: 'two',
          0: 0,
          1: 1,
          2: 2
        },
        0: 0,
        1: 1,
        2: 2
      };

      const expectedObject = {
        0: 0,
        1: 1,
        2: 2,
        zero: 0,
        one: 1,
        two: {
          0: 'zero',
          1: 'one',
          2: 'two',
          3: 'three',
          5: 'five',
          zero: 0,
          one: 1,
          two: 'two'
        }
      };

      assert.deepStrictEqual( __.mixin( theDefault, theInput ), expectedObject );
      assert.deepStrictEqual( __( theDefault ).mixin( theInput ), expectedObject );

    } );

    it( 'should mixin arrays over primitives', () => {

      const theArray = [
        'one',
        'two',
        {
          three: 'four'
        },
        [
          'five'
        ]
      ];

      assert.deepStrictEqual( __.mixin( true, theArray ), theArray );
      assert.deepStrictEqual( __.mixin( false, theArray ), theArray );
      assert.deepStrictEqual( __.mixin( 1, theArray ), theArray );
      assert.deepStrictEqual( __.mixin( -1, theArray ), theArray );
      assert.deepStrictEqual( __.mixin( 1.1, theArray ), theArray );
      assert.deepStrictEqual( __.mixin( -1.1, theArray ), theArray );
      assert.deepStrictEqual( __.mixin( 0, theArray ), theArray );
      assert.deepStrictEqual( __.mixin( 0.0, theArray ), theArray );
      assert.deepStrictEqual( __.mixin( 'string', theArray ), theArray );
      assert.deepStrictEqual( __.mixin( '', theArray ), theArray );

      assert.deepStrictEqual( __( true ).mixin( theArray ), theArray );
      assert.deepStrictEqual( __( false ).mixin( theArray ), theArray );
      assert.deepStrictEqual( __( 1 ).mixin( theArray ), theArray );
      assert.deepStrictEqual( __( -1 ).mixin( theArray ), theArray );
      assert.deepStrictEqual( __( 1.1 ).mixin( theArray ), theArray );
      assert.deepStrictEqual( __( -1.1 ).mixin( theArray ), theArray );
      assert.deepStrictEqual( __( 0 ).mixin( theArray ), theArray );
      assert.deepStrictEqual( __( 0.0 ).mixin( theArray ), theArray );
      assert.deepStrictEqual( __( 'string' ).mixin( theArray ), theArray );
      assert.deepStrictEqual( __( '' ).mixin( theArray ), theArray );

    } );

    it( 'should mixin objects over primitives', () => {

      const theObject = {
        one: 1,
        two: 2,
        three: {
          four: 4
        },
        five: [
          'six'
        ]
      };

      assert.deepStrictEqual( __.mixin( true, theObject ), theObject );
      assert.deepStrictEqual( __.mixin( false, theObject ), theObject );
      assert.deepStrictEqual( __.mixin( 1, theObject ), theObject );
      assert.deepStrictEqual( __.mixin( -1, theObject ), theObject );
      assert.deepStrictEqual( __.mixin( 1.1, theObject ), theObject );
      assert.deepStrictEqual( __.mixin( -1.1, theObject ), theObject );
      assert.deepStrictEqual( __.mixin( 0, theObject ), theObject );
      assert.deepStrictEqual( __.mixin( 0.0, theObject ), theObject );
      assert.deepStrictEqual( __.mixin( 'string', theObject ), theObject );
      assert.deepStrictEqual( __.mixin( '', theObject ), theObject );

      assert.deepStrictEqual( __( true ).mixin( theObject ), theObject );
      assert.deepStrictEqual( __( false ).mixin( theObject ), theObject );
      assert.deepStrictEqual( __( 1 ).mixin( theObject ), theObject );
      assert.deepStrictEqual( __( -1 ).mixin( theObject ), theObject );
      assert.deepStrictEqual( __( 1.1 ).mixin( theObject ), theObject );
      assert.deepStrictEqual( __( -1.1 ).mixin( theObject ), theObject );
      assert.deepStrictEqual( __( 0 ).mixin( theObject ), theObject );
      assert.deepStrictEqual( __( 0.0 ).mixin( theObject ), theObject );
      assert.deepStrictEqual( __( 'string' ).mixin( theObject ), theObject );
      assert.deepStrictEqual( __( '' ).mixin( theObject ), theObject );

    } );

    it( 'should not mixin primitives over objects', () => {

      const theObject = {
        one: 1,
        two: 2,
        three: {
          four: 4
        },
        five: [
          'six'
        ]
      };

      assert.deepStrictEqual( __.mixin( theObject, undefined ), theObject );
      assert.deepStrictEqual( __.mixin( theObject, null ), theObject );
      assert.deepStrictEqual( __.mixin( theObject, true ), theObject );
      assert.deepStrictEqual( __.mixin( theObject, false ), theObject );
      assert.deepStrictEqual( __.mixin( theObject, 1 ), theObject );
      assert.deepStrictEqual( __.mixin( theObject, -1 ), theObject );
      assert.deepStrictEqual( __.mixin( theObject, 1.1 ), theObject );
      assert.deepStrictEqual( __.mixin( theObject, -1.1 ), theObject );
      assert.deepStrictEqual( __.mixin( theObject, 0 ), theObject );
      assert.deepStrictEqual( __.mixin( theObject, 0.0 ), theObject );
      assert.deepStrictEqual( __.mixin( theObject, 'string' ), theObject );
      assert.deepStrictEqual( __.mixin( theObject, '' ), theObject );

      assert.deepStrictEqual( __( theObject ).mixin( undefined ), theObject );
      assert.deepStrictEqual( __( theObject ).mixin( null ), theObject );
      assert.deepStrictEqual( __( theObject ).mixin( true ), theObject );
      assert.deepStrictEqual( __( theObject ).mixin( false ), theObject );
      assert.deepStrictEqual( __( theObject ).mixin( 1 ), theObject );
      assert.deepStrictEqual( __( theObject ).mixin( -1 ), theObject );
      assert.deepStrictEqual( __( theObject ).mixin( 1.1 ), theObject );
      assert.deepStrictEqual( __( theObject ).mixin( -1.1 ), theObject );
      assert.deepStrictEqual( __( theObject ).mixin( 0 ), theObject );
      assert.deepStrictEqual( __( theObject ).mixin( 0.0 ), theObject );
      assert.deepStrictEqual( __( theObject ).mixin( 'string' ), theObject );
      assert.deepStrictEqual( __( theObject ).mixin( '' ), theObject );

    } );

    it( 'should not mixin primitives over arrays', () => {

      const theArray = [
        'one',
        'two',
        {
          three: 'four'
        },
        [
          'five'
        ]
      ];

      assert.deepStrictEqual( __.mixin( theArray, undefined ), theArray );
      assert.deepStrictEqual( __.mixin( theArray, null ), theArray );
      assert.deepStrictEqual( __.mixin( theArray, true ), theArray );
      assert.deepStrictEqual( __.mixin( theArray, false ), theArray );
      assert.deepStrictEqual( __.mixin( theArray, 1 ), theArray );
      assert.deepStrictEqual( __.mixin( theArray, -1 ), theArray );
      assert.deepStrictEqual( __.mixin( theArray, 1.1 ), theArray );
      assert.deepStrictEqual( __.mixin( theArray, -1.1 ), theArray );
      assert.deepStrictEqual( __.mixin( theArray, 0 ), theArray );
      assert.deepStrictEqual( __.mixin( theArray, 0.0 ), theArray );
      assert.deepStrictEqual( __.mixin( theArray, 'string' ), theArray );
      assert.deepStrictEqual( __.mixin( theArray, '' ), theArray );

      assert.deepStrictEqual( __( theArray ).mixin( undefined ), theArray );
      assert.deepStrictEqual( __( theArray ).mixin( null ), theArray );
      assert.deepStrictEqual( __( theArray ).mixin( true ), theArray );
      assert.deepStrictEqual( __( theArray ).mixin( false ), theArray );
      assert.deepStrictEqual( __( theArray ).mixin( 1 ), theArray );
      assert.deepStrictEqual( __( theArray ).mixin( -1 ), theArray );
      assert.deepStrictEqual( __( theArray ).mixin( 1.1 ), theArray );
      assert.deepStrictEqual( __( theArray ).mixin( -1.1 ), theArray );
      assert.deepStrictEqual( __( theArray ).mixin( 0 ), theArray );
      assert.deepStrictEqual( __( theArray ).mixin( 0.0 ), theArray );
      assert.deepStrictEqual( __( theArray ).mixin( 'string' ), theArray );
      assert.deepStrictEqual( __( theArray ).mixin( '' ), theArray );

    } );

    it( 'should not recurse beyond 100 levels', () => {
      assert.throws( () => {

        const mixinObject1: any = {};
        const mixinObject2: any = {};
        let ref1 = mixinObject1;
        let ref2 = mixinObject2;

        for ( let i = 0; i < 300; i++ ) {
          ref1.nesting = {};
          ref1 = ref1.nesting;
          ref2.nesting = {};
          ref2 = ref2.nesting;
        }

        ref1.final = 'hi';
        ref2.final = 'bye';

        __.mixin( mixinObject1, mixinObject2 );

      } );

      assert.throws( () => {

        const mixinObject1: any = {};
        const mixinObject2: any = {};
        let ref1 = mixinObject1;
        let ref2 = mixinObject2;

        for ( let i = 0; i < 300; i++ ) {
          ref1.nesting = {};
          ref1 = ref1.nesting;
          ref2.nesting = {};
          ref2 = ref2.nesting;
        }

        ref1.final = 'hi';
        ref2.final = 'bye';

        __( mixinObject1 ).mixin( mixinObject2 );

      } );
    } );

  } );

}
