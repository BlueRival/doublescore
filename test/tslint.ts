'use strict';

import * as assert from 'assert';
import * as fs from 'fs';
import * as glob from 'glob';
import { Linter, Configuration, LintResult } from 'tslint';


const formatError = ( result: LintResult ): string => {

  let message = '';

  result.failures.forEach( failure => {

    const fileName = failure.getFileName();
    const start = failure.getStartPosition().getLineAndCharacter();
    const stop = failure.getEndPosition().getLineAndCharacter();
    const error = failure.getFailure();

    message += `\n${fileName} ${start.line}:${start.character},${stop.line}:${stop.character} - ${error}`;

  } );

  return message;

};

let linter: Linter;

export default function () {
  describe( 'TSLint', () => {

    linter = new Linter( {
      fix: false,
      formatter: 'json'
    } );

    const paths: string[] = glob.sync( process.cwd() + '/*.ts' )
      .concat( glob.sync( process.cwd() + '/lib/**/*.ts' ) )
      .concat( glob.sync( process.cwd() + '/test/**/*.ts' ) );

    paths.forEach( ( path: string ) => {

      it( `should validate ${path}`, () => {

        assert.ok( linter, 'TSLint Engine not created' );

        const fileContents = fs.readFileSync( path, 'utf8' );
        const configuration = Configuration.findConfiguration( 'tslint.json', path ).results;

        linter.lint( path, fileContents, configuration );

        const result = linter.getResult();

        if ( result.errorCount > 0 ) {
          assert.fail( formatError( result ) );
        }

      } );

    } );

  } );
}
