import * as async from 'async';
import rimraf from 'rimraf';
import { exec } from 'child_process';

export function build( done: ( err ) => void ): void {

  async.waterfall( [
    ( done ) => {
      rimraf( 'dist/**/*', done );
    },
    ( done ) => {
      exec( 'npm run build', ( err ) => {
        if ( err ) {
          return done( err );
        }
        done();
      } );
    }
  ], done );

}
