import * as assert from 'assert';
import __ from '../index';

export default function ( __: __ ) {

  describe( 'iterate', () => {

    const iterateCheck = ( check: any, wrapper: any ) => {

      let iteratorCallCount = 0; // counts how many times the iterator was called
      const iteratorCallValues = check.output; // all the expected values passed to the iterator

      const iterator = ( value: any, index: any ) => {

        // if the iterator is called, there should be more values expected
        assert.ok( iteratorCallCount < iteratorCallValues.length );

        // make sure the index passed back is the expected one
        assert.strictEqual( JSON.stringify( index, null, 4 ), JSON.stringify( iteratorCallValues[ iteratorCallCount ].index, null, 4 ) );

        // make sure the value passed back is the expected one
        assert.strictEqual( JSON.stringify( value, null, 4 ), JSON.stringify( iteratorCallValues[ iteratorCallCount ].value, null, 4 ) );

        // increment to look for the next value, if any
        iteratorCallCount++;

      };

      // run iterator
      if ( wrapper ) {
        __.apply( __, check.input ).iterate( iterator );
      } else {
        // push test iterator function onto values to check
        check.input.push( iterator );
        __.iterate.apply( __, check.input );
        // remove the test iterator
        check.input.pop();
      }

      // make sure all expected values were output
      assert.ok( iteratorCallCount >= iteratorCallValues.length );

    };

    const iterateChecks = ( checks: any ) => {

      // tslint:disable-next-line:prefer-for-of
      for ( let i = 0; i < checks.length; i++ ) {
        iterateCheck( checks[ i ], true );
        iterateCheck( checks[ i ], false );
      }

    };

    it( 'should loop recursively through an arbitrary set of nested arrays, objects and scalar values', () => {

      iterateChecks( [
        {
          input: [
            0,
            [
              1,
              2
            ],
            {
              three: 4,
              five: 6
            },
            7,
            8,
            [
              9,
              {
                ten: 11,
                twelve: [
                  13,
                  15,
                  [
                    [
                      [
                        [
                          16
                        ]
                      ]
                    ],
                    17
                  ]
                ]
              },
              [
                18,
                [
                  [
                    [
                      19
                    ],
                    20
                  ]
                ]
              ]
            ],
            21
          ],
          output: [
            {
              value: 0,
              index: [ 0 ]
            },
            {
              value: 1,
              index: [ 1, 0 ]
            },
            {
              value: 2,
              index: [ 1, 1 ]
            },
            {
              value: 4,
              index: [ 2, 'three' ]
            },
            {
              value: 6,
              index: [ 2, 'five' ]
            },
            {
              value: 7,
              index: [ 3 ]
            },
            {
              value: 8,
              index: [ 4 ]
            },
            {
              value: 9,
              index: [ 5, 0 ]
            },
            {
              value: 11,
              index: [ 5, 1, 'ten' ]
            },
            {
              value: 13,
              index: [ 5, 1, 'twelve', 0 ]
            },
            {
              value: 15,
              index: [ 5, 1, 'twelve', 1 ]
            },
            {
              value: 16,
              index: [ 5, 1, 'twelve', 2, 0, 0, 0, 0 ]
            },
            {
              value: 17,
              index: [ 5, 1, 'twelve', 2, 1 ]
            },
            {
              value: 18,
              index: [ 5, 2, 0 ]
            },
            {
              value: 19,
              index: [ 5, 2, 1, 0, 0, 0 ]
            },
            {
              value: 20,
              index: [ 5, 2, 1, 0, 1 ]
            },
            {
              value: 21,
              index: [ 6 ]
            }
          ]
        }
      ] );

    } );

    describe( 'flatten', () => {

      it( 'should combine multiple 1d arrays into a single array, using stable recursive merge', () => {

        assert.deepStrictEqual(
          __.iterate.flatten(
            [ 0, 1, 2, 3 ],
            [ 'a', 'b', 'c' ],
            [ { one: 'two', three: -3, four: false }, 'b', 'c' ],
            [],
            [ -1, null ],
            [ 'a', [ false, true, -1, null ], 'c' ]
          ),
          [ 0, 1, 2, 3, 'a', 'b', 'c', 'two', -3, false, 'b', 'c', -1, null, 'a', false, true, -1, null, 'c' ]
        );

        assert.deepStrictEqual(
          __(
            [ 0, 1, 2, 3 ],
            [ 'a', 'b', 'c' ],
            [ { one: 'two', three: -3, four: false }, 'b', 'c' ],
            [],
            [ -1, null ],
            [ 'a', [ false, true, -1, null ], 'c' ]
          ).iterate.flatten(),
          [ 0, 1, 2, 3, 'a', 'b', 'c', 'two', -3, false, 'b', 'c', -1, null, 'a', false, true, -1, null, 'c' ]
        );

      } );

    } );

  } );

}
