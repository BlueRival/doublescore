import * as types from './lib/types';
import clone from './lib/clone';
import iterate from './lib/iterate';
import mixin from './lib/mixin';
import timer from './lib/timer';

function DoubleScore( ...args: any[] ) {

  const iterateWrapper = ( iterator: ( item: any, index?: any[] ) => void ) => {
    return iterate.apply( iterate, args.concat( iterator ) );
  };

  iterateWrapper.flatten = () => {
    return iterate.flatten.apply( iterate, args );
  };

  return {
    iterate: iterateWrapper,
    clone: () => {
      return clone( args[ 0 ] );
    },
    getType: () => {
      return types.getType( args[ 0 ] );
    },
    isArray: () => {
      return types.isArray( args[ 0 ] );
    },
    isNumber: () => {
      return types.isNumber( args[ 0 ] );
    },
    isObject: () => {
      return types.isObject( args[ 0 ] );
    },
    mixin: ( ...myArgs: any[] ) => {
      return mixin.apply( {}, args.concat( myArgs ) );
    }
  };
}

DoubleScore.clone = clone;
DoubleScore.getType = types.getType;
DoubleScore.isArray = types.isArray;
DoubleScore.isNumber = types.isNumber;
DoubleScore.isObject = types.isObject;
DoubleScore.iterate = iterate;
DoubleScore.mixin = mixin;
DoubleScore.timer = timer;

/**
 * We use this export syntax in combination with esModuleInterop: true.
 *
 * This allows for maintaining our interface that pre-dates the TypeScript for JS based consumers of this library.
 * Using export = results in compiled JS that looks like this:
 *
 * module.exports = DoubleScore;
 *
 * Whereas, this:
 *
 * export default DoubleScore;
 *
 * Results in this:
 *
 * exports.default = DoubleScore;
 *
 */
export = DoubleScore;
