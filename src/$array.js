

/**!
* @file $arrayJS: a simple JavaScript utility library for working with arrays of objects. Now available as a node module.
* @author [obedm503](https://github.com/obedm503/) <obedm503@gmail.com>
* @git [git repo](https://github.com/obedm503/dollar-array.git)
* @examples [https://obedm503.github.io/dollar-array/]
* @version 2.0.0
* @license MIT
*/
if(typeof $array === 'undefined'){
  var $a, $array;
  $array = $a = (function(){
    'use strict';
    const error = '$arrayJS: ';

    /**
    * @name _private
    * @private
    * @description private helper functions
    */
    const _private = {

      /**
      * @function sort
      * @memberof _private
      * @private
      * @description helper function used by $array#ascend and $array#descend
      */
      sort: function(key) {
        var sortOrder = 1;
        if(key[0] === "-") {
          sortOrder = -1;
          key = key.substr(1);
        }
        return function(a,b) {
          var result = (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0;
          return result * sortOrder;
        };
      },
      /**
      * @function push
      * @memberof _private
      * @private
      * @description helper function that pushes to an array through assignment
      */
      push: function(arr,item){
        arr[arr.length] = item;
      }

    };

    // public methods
    /** @lends $array.prototype */
    const _public = {

      // reference to constructor doesn't change anything because `array` doesn't return "this",
      // it returns an Array with a few extra methods
      // this is useful for type checking
      constructor: {
        value: $array
      },

      /**
      * @function propExists
      * @memberof $array.prototype
      * @description
      * The **propExists()** method checks if a *property* exists in ANY `element` in an `$array`.
      *```js
      *$array([1,2,3,'a string']).propExists('length') // returns "true" because strings have a "length" property
      *```
      * #### Syntax
      *```js
      *arr.propExists(property)
      *```
      * @param {String} property The *property* to look for.
      * @returns {Boolean} whether the *property* exists. Returns true as soon as the key is found.
      * @example
      * var exampleArray = [
      *   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      *   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      *   { name: "Pedro", lastname: "Algo", age:30  }
      * ];
      * $array(exampleArray).propExists('user_id'); // true
      */
      propExists: {
        value: function propExists(property){
          if(!property || typeof property !== 'string'){ throw Error(error + 'incorrect parameters'); }
          let i = this.length;
          while(i--){
            if( this[i][property] ){
              // property found
              return true;
            }
          }
          // got to end of loop, property not found
          return false;
        }
      },

      /**
      * @function filterByProp
      * @memberof $array.prototype
      * @description The **filterByProp()** method takes a key and removes all other key-value pairs in the objects in the array. If a `newKey` is provided, it will substitute the `oldKey`. **filterByProp()** skips objects whose value for the given `oldKey` is `undefined`. [Useful with dynamic ionic actionsheet buttons.](https://github.com/ncai-developers/studentaccess/blob/master/components/homework/homework.controller.js#L42)
      *```js
      *$array({ type: 'car', year: 2014 }, { type: 'bike', year: 2015 }).filterByProp('type', 'vehicle')
      * // [ {"vehicle":"car"}, {"vehicle":"bike"} ]
      *```
      * #### Syntax
      *```js
      *arr.filterByProp(propertyName[, newPropertyName[, returnNew$array ]])
      *```
      * @param {String} oldKey The property name to look for in each object.
      * @param {String} [newKey] Optional. Substitutes the `oldKey`.
      * @param {Boolean} [useNewArr=false] Optional. whether to create a deep clone and not modify original array.
      * @returns {$array} An array of objects, each with a single key-value pair.
      * @example
      *var exampleArray = [
      *  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      *  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      *  { name: "Pedro", lastname: "Algo", age:30  }
      *];
      *
      *$array(exampleArray).filterByProp('name');
      * // [{name:"Juan"},{name:"John"},{name:"Pedro"}] modifies "array"
      *
      *$array(exampleArray).filterByProp('name', null, true);
      * // [{name:"Juan"},{name:"John"},{name:"Pedro"}] creates new "array"
      *
      *$array(exampleArray).filterByProp('user_id');
      * // [{user_id:"1234"}, {user_id:"6789"}] modifies "array"
      *
      *$array(exampleArray).filterByProp('user_id','id');
      * // [{id:"1234"}, {id:"6789"}] modifies "array"
      */
      filterByProp: {
        value: function filterByProp(oldKey, newKey, useNewArr){
          if(typeof oldKey === 'undefined' || !this){ throw TypeError(); }
          let key = ( typeof newKey === 'undefined' || newKey === null ) ? oldKey : newKey;
          let arr = useNewArr ? $array( JSON.parse(JSON.stringify(this)) ) : this;
          for(let i = 0, l = arr.length; i < l; i++){
            let obj = {};
            let value = arr[i];
            obj[key] = value[oldKey];
            arr[i] = obj;
          }
          return arr;
        }
      },

      /**
      * @function invert
      * @memberof $array.prototype
      * @description The **invert()** method reverses the order of an `$array`'s elements. It's supposed to be faster than the `Array.prototype.reverse()` method.
      *```js
      *$array(1,2,3,4,5).invert() // returns [5,4,3,2,1]
      *```
      * #### Syntax
      *```js
      *arr.invert([useNewArr])
      *```
      * @param {Boolean} [useNewArr=false] whether to modify $array called upon or return a deep clone.
      * @returns {$array} The reversed array.
      * @example
      *var exampleArray = [
      *  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      *  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      *  { name: "Pedro", lastname: "Algo", age:30  }
      *];
      *$array(exampleArray).invert();
      * // returns
      *[
      *  {"name":"Pedro","lastname":"Algo","age":30},
      *  {"name":"John","lastname":"Doe","user_id":"6789","age":40},
      *  {"name":"Juan","lastname":"Perez","user_id":"1234","age":42}
      *]
      */
      invert: {
        value: function invert(useNewArr){
          let arr = useNewArr ? $array( JSON.parse(JSON.stringify(this)) ) : this;

          // actual invert
          // http://stackoverflow.com/questions/5276953/what-is-the-most-efficient-way-to-reverse-an-array-in-javascript
          let left;
          let right;
          let length = arr.length;
          for(left = 0; left < length / 2; left += 1){
            right = length - 1 - left;
            let temporary = arr[left];
            arr[left] = arr[right];
            arr[right] = temporary;
          }

          return arr;
        }
      },

      /**
      * @function randomize
      * @memberof $array.prototype
      * @description The **randomize()** method randomizes the order of elements in an `$array` using the [Knuth Shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) algorithm.
      *```js
      *$array(1,2,3,4).randomize() // returns random $array
      *```
      * #### Syntax
      *```js
      *arr.randomize([useNewArray])
      *```
      * @param {Boolean} [useNewArr=false] whether to modify `$array` called upon or return a deep clone.
      * @returns {$array} randomized `$array`.
      * @example
      * var exampleArray = [
      *   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      *   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      *   { name: "Pedro", lastname: "Algo", age:30  }
      * ];
      * $array(exampleArray).randomize(); //randomized array...
      */
      randomize: {
        value: function randomize(useNewArr){
          if(!this){ throw TypeError(error + '"this" is undefined'); }
          let arr = useNewArr? $array( JSON.parse(JSON.stringify(this)) ) : this;
          let currentIndex = arr.length, temporaryValue, randomIndex;

          while(0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
          }
          return arr;
        }
      },

      /**
      * @function random
      * @memberof $array.prototype
      * @description The **random()** method returns a random element in an `$array`. Adds an `index` property to that element with the index that element had in the array if the element is not `number`, a `string`, a `boolean`, `undefined`, or `null`. It does not modify the original `$array`;
      *```js
      *$array(1,2,3,4).random() // returns a random number
      *```
      * #### Syntax
      *```js
      *arr.random()
      *```
      * @returns {Object} random element in array, **NOT AN ARRAY**, unless an array of arrays was passed.
      * @example
      * var exampleArray = [
      *   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      *   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      *   { name: "Pedro", lastname: "Algo", age:30  }
      * ];
      * $array(exampleArray).random(); // a random element...
      */
      random: {
        value: function random(){
          let arr = JSON.parse(JSON.stringify(this));
          let index = Math.floor( Math.random() * arr.length );
          let obj = arr[index];
          let type = typeof obj;
          // just for safety
          if(type !== 'number' && type !== 'string' && type !== 'boolean' && type !== 'undefined' && obj !== null){
            Object.defineProperty( obj, 'index', {
              value: index
            });
          }
          return obj;
        }
      },

      /**
      * @function ascend
      * @memberof $array.prototype
      * @description The **ascend()** method sorts the elements in an array in ascending alphabetical or numerical order according to the passed property's value.
      *```js
      *$array([ { type: 'car' }, { type: 'bike' } ]).ascend('type')
      * // [ { type: 'bike' }, { type: 'car' } ]
      *```
      * #### Syntax
      *```js
      *arr.ascend(propertyName[, useNewArr])
      *```
      * @param {String|Number} property The property name with which to sort the `$array`
      * @param {Boolean} [useNewArr=false] whether to modify `$array` called upon or return a deep clone.
      * @returns {$array} sorted `$array`
      * @example
      * var exampleArray = [
      *   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      *   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      *   { name: "Pedro", lastname: "Algo", age:30  }
      * ];
      * $array(exampleArray).ascend('lastname');
      * //[
      * //  { name: "Pedro", lastname: "Algo", age:30  },
      * //  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      * //  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }
      * //]
      * $array(exampleArray).ascend('age');
      * //[
      * //  { name: "Pedro", lastname: "Algo", age:30  },
      * //  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      * //  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }
      * //]
      */
      ascend: {
        value: function ascend(property, useNewArr){
          if( !this.propExists(property) ){ throw Error(error + 'no correct key given'); }
          let arr = useNewArr ? $array( JSON.parse(JSON.stringify(this)) ) : this;
          return arr.sort(_private.sort(property));
        }
      },

      /**
      * @function descend
      * @memberof $array.prototype
      * @description The **descend()** method sorts the elements in an array in reverse/descending alphabetical/numerical order according to the passed property's value.
      *```js
      *$array([ { n: 2 }, { n: 8 } ]).descend('n')
      * // [ { n: 8 }, { n: 2 } ]
      *```
      * #### Syntax
      *```js
      *arr.descend(propertyName[, useNewArr])
      *```
      * @param {String|Number} key The key with which to sort the array.
      * @param {Boolean} [useNewArr=false] whether to modify `array` called upon or return a deep clone.
      * @returns {$array} sorted array
      * @example
      * var exampleArray = [
      *   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      *   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      *   { name: "Pedro", lastname: "Algo", age:30  }
      * ];
      * $array(exampleArray).descend('lastname');
      * //[
      * //  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      * //  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      * //  { name: "Pedro", lastname: "Algo", age:30  }
      * //]
      * $array(exampleArray).descend('age');
      * //[
      * //  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      * //  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      * //  { name: "Pedro", lastname: "Algo", age:30  }
      * //]
      */
      descend: {
        value: function descend(key, useNewArr){
          if( !this.propExists(key) ){ throw Error(error + 'no correct key given'); }
          let arr = useNewArr ? $array( JSON.parse(JSON.stringify(this)) ) : this;
          return arr.sort(_private.sort('-' + key));
        }
      },

      /**
      * @function toObject
      * @memberof $array.prototype
      * @description The **toObject()** converts an array of objects to an object literal. It was designed with the idea of eliminating the need to loop through an array in order to get a specific object. Does not modidy `$array` it was called on.
      *```js
      *$array([ { type: 'car', year: 2014 }, { type: 'bike', year: 2015 } ]).toObject('type')
      * // { "bike": { "type":"bike", "year":2015 }, "car": { "type":"car", "year":2014 } }
      *```
      * #### Syntax
      *```js
      *arr.toObject(propertyName)
      *```
      * @param {String} property The property that exists in all objects in the array. The value of this property will become the property to each object. The value to this property has to be unique for each object. If repeated values for that property are encountered it will `throw` an error.
      * @returns {Object} Returns the array of objects converted into an object.
      * @example
      *var exampleArray = [
      *  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      *  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      *  { name: "Pedro", lastname: "Algo", age:30  }
      *];
      *$array(exampleArray).toObject('lastname');
      * // returns
      *{
      *  "Perez": { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      *  "Doe": { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      *  "Algo": { name: "Pedro", lastname: "Algo", age:30  }
      *}
      */
      toObject: {
        value: function toObject(property){
          if( typeof property === 'undefined' || !this){ throw Error(error + 'property or context this: undefined'); }
          let obj = {};
          let i = this.length;
          while(i--){
            // property's value becomes the propertyName
            let newKey = this[i][ property ];
            // skip undefined values
            if( typeof newKey === 'undefined' ){ continue; }
            if( obj.hasOwnProperty(newKey) ){ throw Error(error + 'repeated values for property'); }

            obj[newKey] = this[i];
          }
          return obj;
        }
      },

      /**
      * @function group
      * @memberof $array.prototype
      * @description The **group()** method takes an array or object with functions that each return conditionals. Inspired after the [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method. Check the [StackOverflow question](http://stackoverflow.com/questions/38559281/array-filter-with-more-than-one-conditional).
      *```js
      *$array([1,2,3,4]).group([n=>x>2, n=>n<2]) // returns [ [3,4], [1], [2] ]
      *
      *$array([1,2,3,4]).group({"greater":n=>x>2,"less":n=>n<2]) // returns { "greater":[3,4], "less":[1], "unmatched":[2] }
      *```
      * #### Syntax
      *```js
      *arr.group(conditionals)
      *```
      * @param {Function[]|Object.<Function>} conds An array of callback functions which each take an object and return a conditional value. Each function is called with the current element in the loop, it's index, the complete array, and any other argument passed to **group()**.
      * @param {any} thisArg Similar to how `Array.prototype.filter` takes a `function` and a `thisArg`, `$array.prototype.group` also takes a `thisArg` which is passed to each `function` as its `this` context as second argument. If no `thisArg` is passed then the `function` is called with the current element as its `this` context, jQuery style.
      * @param {...any} otherArgs If more than 2 arguments are passed, **group()** will relay the extra arguments to each function after the current element, its index, and the array.
      * @returns {$array|Object} A new `array` or an object, depending on whether the conditionals were an array or an object. The array of arrays has the elements grouped in the same order according to the array of callbacks passed. All elements which match no conditional, are grouped on the last array or in the `"unmatched"` array if conditionals were an object. Does not modidy `array` it was called upon.
      * @example
      *var exampleArray = [
      *  { name: "Juan", lastname: "Perez", user_id:"1234", age:42},
      *  { name: "John", lastname: "Doe", user_id:"6789", age:40},
      *  { name: "Pedro", lastname: "Algo", age:30}
      *];
      *var array = $array(exampleArray);
      *array.group([
      *  (o)=> o.lastname === 'Doe',
      *  (o)=> o.age > 35
      *]);
      * // returns
      *[
      *  [
      *    { name: "John", lastname: "Doe", user_id:"6789", age:40 }
      *  ],
      *  [
      *    { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      *    { name: "John", lastname: "Doe", user_id:"6789", age:40 }
      *  ],
      *  [
      *    { name: "Pedro", lastname: "Algo", age:30 }
      *  ]
      *]
      *
      *array.group({
      *  Doe: (o)=> o.lastname === 'Doe',
      *  35: (o)=> o.age > 35
      *});
      * // returns
      *{
      *  35: [
      *    {"name":"John","lastname":"Doe","user_id":"6789","age":40},
      *    {"name":"Juan","lastname":"Perez","user_id":"1234","age":42}
      *  ],
      *  Doe: [
      *    {"name":"John","lastname":"Doe","user_id":"6789","age":40}
      *  ],
      *  unmatched: [
      *    {"name":"Pedro","lastname":"Algo","age":30}
      *  ]
      *}
      *
      *array.group([function(element, index, array, other1, other2){
      *  // this == 'a string'
      *  // other1 == 5
      *  // other2 == 'another string'
      *  return index > 1;
      *}], 'a string', 5, 'another string')
      * // returns
      *[
      * [
      *   {"name":"Pedro","lastname":"Algo","age":30}
      * ],
      * [
      *   {"name":"Juan","lastname":"Perez","user_id":"1234","age":42},
      *   {"name":"John","lastname":"Doe","user_id":"6789","age":40}
      * ]
      *]
      */
      group: {
        value: function group(conds, thisArg, ...otherArgs){
          let isArray = Array.isArray(conds);
          let condsKeys = Object.keys(conds);
          let condsKeysLen = condsKeys.length;
          // test arguments
          if( !arguments.length || !condsKeysLen || ( !isArray && typeof conds !== 'object') ){ throw Error(error + 'bad arguments'); }
          // if array, initialValue is an `array` of conds.length + 1 $arrays. else it's an object
          let initialValue = isArray ?
            $array( Array.apply(null, { length: condsKeysLen + 1 }).map(_=>$array()) ) :
            {};
          let usedBefore = [];
          let unmatchedKey = isArray ? condsKeysLen : 'unmatched' ;

          return this.reduce( ( accumulator, item, itemIndex )=>{
            let used;
            let i = condsKeysLen;

            // loop the conds
            while(i--){
              let condKey = condsKeys[i];

              // array matching a cond is itself or a $array() if it's undefineds
              accumulator[condKey] = ( typeof accumulator[condKey] !== 'undefined') ? accumulator[condKey] : $array();

              if( conds[condKey].call(thisArg || item, item, itemIndex, this, ...otherArgs) ){ // condition was met
                used = true;
                _private.push(accumulator[condKey], item);
              }
            }

            // used right now but not before
            if(used && usedBefore.indexOf(item) === -1){
              _private.push(usedBefore, item);
            }

            accumulator[unmatchedKey] = ( typeof accumulator[unmatchedKey] !== 'undefined') ? accumulator[unmatchedKey] : $array();
            // item isn't already in unmatched or alreadyMatched
            if( accumulator[unmatchedKey].indexOf(item) === -1 && usedBefore.indexOf(item) === -1 ){
              _private.push(accumulator[unmatchedKey], item);
            }

            return accumulator;
          }, initialValue);
        }
      }

    };

    /**
    * @function $array
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
    *>Remember: `$array`s are just `Array`s with a few extra and useful methods as properties.
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
    *> Fun Fact: $arrayJS adds a single function to the `Array.prototype`, `Array.prototype.to$array`. It's just another way to convert an `Array` to an `$array`.
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
      Object.defineProperties(array, _public);

      return array;
    };

    /**
    * @name $array.prototype
    * @memberof $array
    * @description `$array` instance methods. Inherits from `Array.prototype`. Added to allow people to use methods without "instantiating" a new `$array` using `Function#call` or `Function#apply`.
    */
    $array.prototype = Object.create(Array.prototype);
    let protoKeys = Object.keys(_public);
    let i = protoKeys.length;
    while(i--){
      let key = protoKeys[i];
      $array.prototype[key] = _public[key].value;
    }

    /**
    * @name version
    * @memberof $array
    * @static
    * @description current version of $arrayJS.
    */
    $array.version = '2.0.0';

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

    Array.prototype.to$array = function to$array() {
      return $array(this);
    };

    return $array;

  })();
  if(typeof module !== 'undefined'){
    module.exports = $array;
  }
}
