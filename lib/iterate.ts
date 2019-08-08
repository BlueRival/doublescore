'use strict';

import clone from './clone';
import * as types from './types';

function iterate( ...args: any[] ) {

  if ( args.length < 2 ) {
    return;
  }

  const indexStack: any[] = [];

  const iterator = args[ args.length - 1 ];

  const eachArr = ( arr: any[] ) => {
    arr.forEach( ( value, index ) => {
      each( value, index );
    } );
  };

  const eachObj = ( obj: any ) => {
    for ( const index in obj ) {
      if ( obj.hasOwnProperty( index ) ) {
        each( obj[ index ], index );
      }
    }
  };

  const each = ( value: any, index: any ) => {

    indexStack.push( index );

    if ( types.isArray( value ) ) {
      eachArr( value );
    } else if ( types.isObject( value ) ) {
      eachObj( value );
    } else {
      iterator( value, clone( indexStack ) );
    }

    indexStack.pop();

  };

  for ( let i = 0; i < args.length - 1; i++ ) {

    const arg = args[ i ];
    each( arg, i );

  }

}

namespace iterate {

  export function flatten( ...args: any[] ): any[] {

    const output: any[] = [];

    // add a callback to the args of inputs to handle all the iterations
    args.push( ( value: any ) => {
      output.push( value );
    } );

    iterate.apply( module.exports, args );

    return output;

  }

}

export default iterate;
