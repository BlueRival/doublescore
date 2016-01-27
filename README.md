doublescore
====================

These are the available utility functions.

isObject() 

Will return TRUE for anything that is typeof object, is not an Array, and is not NULL.


getType() 

Will return 'null' for NULL, 'array' for an Array, 'float' for a non-integer number, 'integer' for an integer number, and typeof result for all else.


clone() 

Will return a distinct copy of the object it was called from. Date objects are cloned, arrays and objects are recursively cloned down 100 levels max and all else is just passed through.


mixin() 

Will return a clone of the original object, with any passed in objects merged in recursively up to 100 levels max. mixin() accepts an arbitrary number of arguments, they will be mixed in from left to right.


timer() 

Will return a function that will track time deltas with 1ms resolution and < 0.1% error on average. The returned function accepts a single parameter: reset, which if true will reset the timer, returning the last interval

NOTE: timer() is experimental. 0.5% margin of error for both precision and accuracy at best, probably closer to 1% for most intervals of time. However, deviance is constant regardless of actual time interval measured. Thus, error rates for higher intervals (> 100ms) will be considerably lower than those for short intervals (< 50ms).
 

Usage
====================

The usage for doublescore is patterned after other utility libraries like underscore.



```javascript

var __ = require( 'doublescore' );


function do( params, done ) {

	params = __( {
		deep: [
			{
				merge: 'on this default object of'
			}
		],
		strings: {
			objects: 'and',
			numbers: 1.5
		},
		and: null,
		boolean: true,
		etc: [ false, false ],
		from: 'params'
	} ).mixin( params );
	
	//... 
	
	done();

}


```


Documentation
====================

Please see the test cases in test/default.js for extensive examples of all supported use cases.


License
====================

(The MIT License)

Copyright (c) 2016 BlueRival Software <anthony@bluerival.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
