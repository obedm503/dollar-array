/**!
* @file $arrayJS: a simple JavaScript utility library for working with arrays of objects. Now available as a node module.
* @author [obedm503](https://github.com/obedm503/) <obedm503@gmail.com>
* @git [git repo](https://github.com/obedm503/dollar-array.git)
* @examples [https://obedm503.github.io/dollar-array/]
* @version 2.0.2
* @license MIT
*/

import propExists from 'prop-exists';
import filterByProp from 'filter-by-prop';
import invert from 'invert';
import randomize from 'randomize';
import random from 'random';
import ascend from 'ascend';
import descend from 'descend';
import toObject from 'to-object';
import group from 'group';

/**
* @class $array
* @description
* #### Syntax
*```js
*$array( element0, element1[, ...[, elementN]] )
*$array( [ element0, element1, ..., elementN ] )
*```
* An `$array` is simply an `Array` with extra methods. It is initialized  with the elements as parameters, except in the case where a single element of type `Array` is passed. Unlike `Array`, if a single integer is passed, `$array` will return an `$array` with the integer as it's sole element.
* ```js
*$array(5) // pass single non-Array element, returns [ 5 ]
*$array( [2,5,6,4,3] ) // pass single Array element, returns [ 2, 5, 6, 4, 3 ]
*$array( 2, 5, 6, 4, 3 ) // pass multiple elements, returns [ 2, 5, 6, 4, 3 ]
*$array( [1,2,3,4], 5, 6, 4, 3 ) // pass multiple elements, still returns [ [1,2,3,4], 5, 6, 4, 3 ]
* ```
* `$array` is intended to be used **without** the `new` keyword because it doesn't return `this`. It can be used as `$array` or through the shortcut, `$a`. All methods that return `Array`s actually return `$array`s. That is to say that most methods are chainable.
* An `$array` is not *really* a subclass of `Array`. It's more of a *pseudo-subclass*. All `$array`s have the `$array.prototype` as well as the `Array.prototype` methods.
*>**Remember:** `$array`s are just `Array`s with a few extra and useful methods as properties.
*
* Becasue of the current lack of support for [JavaScript classes](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes), I was forced to find a workaround. I concluded in adding the `$array.prototype` methods as non-enumerable properties instead of modifying an `Array`'s `__proto__` property for performance and support reasons explained [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/The_performance_hazards_of__%5B%5BPrototype%5D%5D_mutation). In the future, when support for `class` and `extends` is wide, another rewrite will happen. Native code is a lot faster than workarounds. Also, you might ask: why not just use Babel and transpile the `class` syntax? Well, it turns out that extending `Array` is the one thing that Babel still can't do whilst maintaining the [exotic nature](http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects) of `Array`s.
*<br><br>
* In case you are interested in calling one of the methods whithout "instantiating" an `$array` you may do so using `Function.prototype.call` or `Function.prototype.apply` on the functions in `$array.prototype`.
*```js
*$array.prototype.invert.call([1,2,3,4]) // returns [4,3,2,1] an Array and not an $array
*$array.prototype.invert.call([1,2,3,4], true) // returns [4,3,2,1] an $array
*```
* #### Demo
* Through this documentation, a common example `Array` will be used. It is special because it is composed of objects. All objects share most property names except for the third element which doesn't have a `user_id` property.
*```js
*var exampleArray = [
*  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
*  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
*  { name: "Pedro", lastname: "Algo", age:30  }
*];
*var array = $array(exampleArray.slice(0)); // .slice(0) removes reference to original Array
*```
*> **Fun Fact:** $arrayJS adds a single function to the `Array.prototype`, `Array.prototype.to$array`. It's just another way to convert an `Array` to an `$array`.
*
* @extends Array
* @param {Array|any} array A single `Array` or *n* elements
* @returns {$array} same array passed but with added methods, AKA an $array.
*/
function $array(array){
  // if more than 1 argument and it's not an array
  if( !(Array.isArray(array) && arguments.length === 1) ){
    array = Array.prototype.slice.call( arguments, 0 );
  }
  // methods are not enumerable, writable, or configurable
  // significantly faster than changing the prototype
  Object.defineProperties(array, properties);

  return array;
}

// public methods
/** @lends $array.prototype */
const properties = {
  propExists: { value: propExists },
  filterByProp: { value: filterByProp },
  invert: { value: invert },
  randomize: { value: randomize },
  random: { value: random },
  ascend: { value: ascend },
  descend: { value: descend },
  toObject: { value: toObject },
  group: { value: group },
};
// reference to constructor doesn't change anything because `$array` doesn't return "this",
// it returns an Array with a few extra methods
// this is useful for type checking
properties.constructor = { value: $array };

/**
* @name $array.prototype
* @memberof $array
* @description `$array` instance methods. Inherits from `Array.prototype`. Added to allow people to use methods without "instantiating" a new `$array` using `Function#call` or `Function#apply`.
*/
$array.prototype = Object.create(Array.prototype);
Object.defineProperties($array.prototype, properties);

/**
* @name version
* @memberof $array
* @static
* @description current version of $arrayJS.
*/
$array.version = '2.0.2';

/**
* @function isArray
* @memberof $array
* @static
* @description checks whether an array is a $array
* @param {Array} arr to check
* @returns {Boolean} whether the param is an $array
* @example
* $array.isArray( $array() ); // true
* $array.isArray( [] ); // false
*/
$array.isArray = function isArray(arr){
  return Array.isArray(arr) && arr.constructor === $array;
};

Object.defineProperty(Array.prototype, 'to$array', { value: function to$array() {
  return $array(this);
}});

// set global myself
((set)=>{
  set( typeof global !== 'undefined' ? global : window );
})((g)=>{
  g['$array'] = $array;
});

export { $array };
