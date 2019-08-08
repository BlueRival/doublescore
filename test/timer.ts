import * as async from 'async';
import * as assert from 'assert';
import __ from '../index';

export default function ( __: __ ) {

  describe( 'timer', () => {

    it( 'should measure time delta with <= 0.5% error', ( done ) => {

      const timer = __.timer();

      async.times( 100, ( i: number, done: ( err?: Error ) => void ) => {

        const timeout = 50 + i * 5;
        setTimeout( () => {

          const delta = timer();
          const error = Math.abs( delta - timeout );
          const errorRate = error / timeout;

          try {
            assert.ok( errorRate <= 0.5 );
            done();
          } catch ( e ) {
            done( e );
          }

        }, timeout );

      }, done );

    } );

    it( 'should take intervals with <= 0.5% error per interval', ( done ) => {

      const timer = __.timer();
      let total = 0;
      async.timesSeries( 10, ( i: number, done: ( err?: Error ) => void ) => {

        // count from 1;
        i++;

        const timeout = 50;

        setTimeout( () => {

          total += timeout;

          const delta = timer();

          const error = Math.abs( delta - total );
          const errorRate = error / timeout;

          try {
            assert.ok( errorRate <= (i * 0.5) );
            done();
          } catch ( e ) {
            done( e );
          }

        }, timeout );

      }, done );

    } );

    it( 'should reset intervals with <= 0.5% error per interval', ( done ) => {

      const timer = __.timer();
      async.timesSeries( 10, ( i: number, done: ( err?: Error ) => void ) => {

        const timeout = 50;

        setTimeout( () => {

          // -1 to account for async framework
          const delta = timer( true ) - 1;

          const error = Math.abs( delta - timeout );
          const errorRate = error / timeout;

          try {
            assert.ok( errorRate <= 0.5 );

            done();
          } catch ( e ) {
            done( e );
          }

        }, timeout );

      }, done );

    } );

  } );

}
