'use strict';

import clone from './clone';
import * as types from './types';

let mixinDepth = 0;
export default function mixin( ...args: any[] ): any {

  if ( args.length < 1 ) {
    mixinDepth = 0;
    return undefined;
  }

  mixinDepth++;

  if ( mixinDepth >= 100 ) {
    mixinDepth = 0;
    throw new Error( 'max mixin depth of 100 reached' );
  }

  let target = clone( args[ 0 ] ); // clone so we don't modify the original

  // handle arbitrary number of mixins. precedence is from last to first item passed in.
  for ( let i = 1; i < args.length; i++ ) {

    const source = args[ i ];

    // mixin the source differently depending on what is in the destination
    switch ( types.getType( target ) ) {

      case 'object':
      case 'array':
      case 'function':

        // mixin in the source differently depending on its type
        switch ( types.getType( source ) ) {

          case 'array':
          case 'object':
          case 'function':

            // we don't care what descendant of object the source is
            for ( const field in source ) {

              // don't mixin parent fields
              if ( source.hasOwnProperty( field ) ) {

                // if the target is an array, only take fields that are integers
                if ( types.isArray( target ) ) {

                  const fieldFloat = parseFloat( field );

                  // the field started with a number, or no number at all, then had non-numeric characters
                  if ( isNaN( fieldFloat ) || fieldFloat.toString().length !== field.length || types.getType( fieldFloat ) !== 'integer' ) {
                    continue;
                  }

                }

                // recurse mixin differently depending on what the target value is
                switch ( types.getType( target[ field ] ) ) {

                  // for any non-objects, do this
                  case 'undefined':
                  case 'null':

                    switch ( types.getType( source[ field ] ) ) {
                      case 'undefined':
                        // NO-OP undefined doesn't override anything
                        break;
                      case 'null':
                        // tslint:disable-next-line:no-null-keyword
                        target[ field ] = null;
                        break;
                      default:
                        target[ field ] = clone( source[ field ] );
                        break;
                    }

                    break;

                  // if the target is already an object, we can mixin on it
                  default:

                    target[ field ] = mixin( target[ field ], source[ field ] );

                    break;
                }

              }
            }

            break;

          default:
            // NO-OP, primitives can't mixin to objects, arrays and functions
            break;

        }

        break;

      default:

        // mixin in the source differently depending on its type
        switch ( types.getType( source ) ) {

          // arrays and objects just replace primitives
          case 'array':
          case 'object':

            // override primitives by just passing through a clone of parent
            target = clone( source );

            break;

          default:

            // target is a primitive and can't be null or undefined here, and all other primitives have equal precedence, so just pass through
            target = source;

            break;

        }

        break;
    }

  }

  mixinDepth--;

  return target;

}
