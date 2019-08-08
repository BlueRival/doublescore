'use strict';

import { isArray, isObject } from './types';

let cloneDepth = 0;
const clone = ( arg: object | Date | any[] | string | number | boolean | null ) => {

  cloneDepth++;

  if ( cloneDepth >= 100 ) {
    cloneDepth = 0;
    throw new Error( 'max clone depth of 100 reached' );
  }

  let target: any;

  if ( arg instanceof Date ) {
    target = new Date( arg.toISOString() );
  } else if ( isArray( arg ) ) {

    target = [];
    (<any[]>arg).forEach( ( value, i ) => {
      target[ i ] = clone( value );
    } );

  } else if ( isObject( arg ) && arg !== null ) {
    target = {};

    const myArg = <any>arg;

    Object.keys( myArg ).forEach( ( field: string ) => {

      if ( (myArg).hasOwnProperty( field ) ) {
        target[ field ] = clone( myArg[ field ] );
      }

    } );

  } else { // functions, etc. not cloneable, and will pass through, though for primitives like strings and numbers, arg is cloning
    target = arg;
  }

  cloneDepth--;

  return target;

};

export default clone;
