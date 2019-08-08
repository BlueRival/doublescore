// import * as async from 'async';
// import { build } from './lib/util';
import __TS from '../index';

import tslintTests from './tslint';
import cloneTests from './clone';
import getTypeTests from './getType';
import isArrayTests from './isArray';
import isObjectTests from './isObject';
import iterateTests from './iterate';
import mixinTests from './mixin';
import timerTests from './timer';


describe( 'TS Tests', () => {

  console.log( 'process.pid 1', process.pid );

  tslintTests();
  cloneTests( __TS );
  getTypeTests( __TS );
  isArrayTests( __TS );
  isObjectTests( __TS );
  iterateTests( __TS );
  mixinTests( __TS );
  timerTests( __TS );

} );

// describe( 'JS Tests', () => {
//
//   console.log( 'process.pid 2', process.pid );
//
//   let __JS = require( '../dist/index.js' );
//
//   before( function ( done ) {
//     this.timeout( 20000 );
//
//     console.log( 'before All' );
//     async.series( [
//       ( done ) => {
//         build( done );
//       },
//       ( done ) => {
//         __JS = require( '../dist/index.js' );
//         done();
//       }
//     ], done );
//
//   } );
//
//   cloneTests( __JS );
//   getTypeTests( __JS );
//   isArrayTests( __JS );
//   isObjectTests( __JS );
//   iterateTests( __JS );
//   mixinTests( __JS );
//   timerTests( __JS );
//
// } );
