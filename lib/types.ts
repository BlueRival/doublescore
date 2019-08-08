'use strict';

type TypeNames =
  'null'
  | 'array'
  | 'date'
  | 'regex'
  | 'number'
  | 'object'
  | 'function'
  | 'not-a-number'
  | 'infinity'
  | 'float'
  | 'integer'
  | 'undefined';


const isArray = ( arg: any ): boolean => {
  return Array.isArray( arg );
};

const isNumber = ( arg: any ): boolean => {
  return typeof arg === 'number' && !isNaN( arg );
};

const isObject = ( arg: any ): boolean => {
  return typeof arg === 'object' && !isArray( arg ) && !(arg instanceof Number) && arg !== null;
};

const getType = ( arg: any ): TypeNames => {

  // handle exceptions that typeof doesn't handle
  if ( arg === null ) {
    return 'null';
  } else if ( arg === undefined ) {
    return 'undefined';
  } else if ( isArray( arg ) ) {
    return 'array';
  } else if ( arg instanceof Date ) {
    return 'date';
  } else if ( arg instanceof RegExp ) {
    return 'regex';
  }

  if ( arg instanceof Number ) {
    arg = <number>arg * 1; // TODO figure out why we do this
  }

  const typeOfVal = typeof arg;

  let type: TypeNames;

  // more resolution on numbers
  if ( typeOfVal === 'number' ) {

    if ( isNaN( arg ) ) {
      type = 'not-a-number';
    } else if ( Infinity === arg ) {
      type = 'infinity';
    } else if ( Math.ceil( arg ) > Math.floor( arg ) ) {
      type = 'float';
    } else {
      type = 'integer';
    }

    return type;

  } else if ( typeOfVal === 'bigint' ) {
    return 'integer';
  } else {
    return <TypeNames>typeOfVal;
  }

};

export { isArray, isNumber, isObject, getType };
