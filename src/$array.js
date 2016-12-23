

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

    // private methods
    const _private = {

      /**
      * @function sort
      * @memberof $array
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
      * @memberof $array
      * @private
      * @description helper function that pushes to an array through assignment
      */
      push: function(arr,item){
        arr[arr.length] = item;
      }

    };

    // public methods
    const _public = {

      /**
      * @function keyExists
      * @memberof $array
      * @instance
      * @description checks if a certain property exists in ANY object in the array.
      * @param {String} key The key to check within the objects.
      * @returns {Boolean} whether the key exists within any object in the array. Returns true even as soon as the key is found.
      * @example
      * var exampleArray = [
      *   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      *   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      *   { name: "Pedro", lastname: "Algo", age:30  }
      * ];
      * $array(exampleArray).keyExists('user_id'); //true
      */
      keyExists: {
        value: function keyExists(key){
          if(!key || typeof key !== 'string'){ throw Error(error + 'no correct key given'); }
          let i = this.length;
          while(i--){
            if( this[i][key] ){
              // key found
              return true;
            }
          }
          // got to end of loop, key not found
          return false;
        }
      },

      /**
      * @function filterByKey
      * @memberof $array
      * @instance
      * @description method which takes a key and removes all other key-value pairs in the objects. If a `newKey` is provided, it will substitute the `oldKey`. It skips objects whose value for that key is undefined. Useful with dynamic ionic actionsheet buttons.
      * @param {String} oldKey The key to look for in each object.
      * @param {String} [newKey] Optional. The key to substitute the old key with
      * @returns {$array} An array of objects, each with a single key-value pair.
      * @example
      * var exampleArray = [
      *   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      *   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      *   { name: "Pedro", lastname: "Algo", age:30  }
      * ];
      * var array = $array(exampleArray);
      * array.filterByKey('name'); //[{name:"Juan"},{name:"John"},{name:"Pedro"}]
      * array.filterByKey('user_id'); //[{user_id:"1234"}, {user_id:"6789"}]
      * array.filterByKey('user_id','id'); //[{id:"1234"}, {id:"6789"}]
      */
      filterByKey: {
        value: function filterByKey(oldKey, newKey){
          if(typeof oldKey === 'undefined' || !this){ throw TypeError(); }
          let key = ( typeof newKey === 'undefined' ) ? oldKey : newKey;
          let returned = $array();
          for(let i = 0, l = this.length; i < l; i++){
            let obj = {};
            let value = this[i];
            obj[key] = value[oldKey];
            _private.push( returned, obj );
          }
          return returned;
        }
      },

      /**
      * @function invert
      * @memberof $array
      * @instance
      * @description Reverses the order of items in an array. It's supposed to be faster than the Array#reverse() method.
      * @param {Boolean} [useNewArr=false] whether to modify $array called upon or return a copy.
      * @returns {$array} The reversed array.
      * @example
      * var exampleArray = [
      *   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      *   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      *   { name: "Pedro", lastname: "Algo", age:30  }
      * ];
      * $array(exampleArray).invert();
      * // [
      * //   {"name":"Pedro","lastname":"Algo","age":30},
      * //   {"name":"John","lastname":"Doe","user_id":"6789","age":40},
      * //   {"name":"Juan","lastname":"Perez","user_id":"1234","age":42}
      * // ]
      */
      invert: {
        value: function invert(useNewArr){
                              // create copy             use original
          let arr = useNewArr ? $array( this.slice(0) ) : this;

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
      * @memberof $array
      * @instance
      * @description Randomizes the order of item in the array. Uses the knuth shuffle.
      * @param {Boolean} [useNewArr=false] whether to modify $array called upon or return a copy.
      * @returns {$array} randomized array.
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
          let arr = useNewArr? this.slice(0) : this;
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
      * @memberof $array
      * @instance
      * @description returns a random element in an array. Adds an `index` property to that element with the index that element had in the array.
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
          let index = Math.floor( Math.random() * this.length );
          let obj = this[index];
          Object.defineProperty( obj, 'index', {
            value: index
          });
          return obj;
        }
      },

      /**
      * @function ascend
      * @memberof $array
      * @instance
      * @description sorts the objects in an array in ascending alphabetical order according to the passed key's value. Also works if the key's value is a number.
      * @param {String|Number} key The key with which to sort the array
      * @param {Boolean} [useNewArr=false] whether to modify $array called upon or return a copy.
      * @returns {$array} sorted array
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
        value: function ascend(key, useNewArr){
          if( !this.keyExists(key) ){ throw Error(error + 'no correct key given'); }
          let arr = useNewArr ? $array(this.slice(0)) : this;
          return arr.sort(_private.sort(key));
        }
      },

      /**
      * @function descend
      * @memberof $array
      * @instance
      * @description sorts the elements in an array in reverse/descending alphabetical order according to the passed key's value. Also works if the key's value is a number.
      * @param {String|Number} key The key with which to sort the array.
      * @param {Boolean} [useNewArr=false] whether to modify $array called upon or return a copy.
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
          if( !this.keyExists(key) ){ throw Error(error + 'no correct key given'); }
          let arr = useNewArr ? $array(this.slice(0)) : this;
          return arr.sort(_private.sort('-' + key));
        }
      },

      /**
      * @function toObject
      * @memberof $array
      * @instance
      * @description converts an array of objects to an object. Designed with the idea of eliminating the need to loop through an array in order to get a specific object. Does not modidy $array it was called upon.
      * @param {String} key Takes the key that exists in all objects in the array. The value of this key will become the key to each object.
      * @returns {Object} Returns the array of objects converted into an object.
      * @example
      * var exampleArray = [
      *   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      *   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      *   { name: "Pedro", lastname: "Algo", age:30  }
      * ];
      * $array(exampleArray).toObject('lastname');
      * //{
      * //  "Perez": { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      * //  "Doe": { name: "John", lastname: "Doe", user_id:"6789", age:40 },
      * //  "Algo": { name: "Pedro", lastname: "Algo", age:30  }
      * //}
      */
      toObject: {
        value: function toObject(key){
          if( typeof key === 'undefined' || !this){ throw Error(); }
          let obj = {};
          let i = this.length;
          while(i--){
            // key's value becomes the key
            let newKey = this[i][ key ];
            // skip undefined values
            if( typeof newKey === 'undefined' ){ continue; }
            obj[newKey] = this[i];
          }
          return obj;
        }
      },

      /**
      * @function group
      * @memberof $array
      * @instance
      * @description takes an array of functions that each return conditionals. Inspired after the [Array#filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method. Check the [StackOverflow question](http://stackoverflow.com/questions/38559281/array-filter-with-more-than-one-conditional).
      * @param {callback[]|Object} conds An array of callback functions which each take an object and return a conditional value.
      * @returns {$array|Object} A new $array or an object, depending on whether the conditionals were an array or an object. The array of arrays has the elements grouped in the same order according to the array of callbacks passed. All elements which match no conditional, are grouped on the last array or in the `"unmatched"` array if conditionals were an object. Does not modidy $array it was called upon.
      * @example
      * var exampleArray = [
      *   { name: "Juan", lastname: "Perez", user_id:"1234", age:42},
      *   { name: "John", lastname: "Doe", user_id:"6789", age:40},
      *   { name: "Pedro", lastname: "Algo", age:30}
      * ];
      * var array = $array(exampleArray);
      * array.group([
      *   (o)=> o.lastname === 'Doe',
      *   (o)=> o.age > 35
      * ]);
      * //[
      * //  [
      * //    { name: "John", lastname: "Doe", user_id:"6789", age:40 }
      * //  ],
      * //  [
      * //    { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
      * //    { name: "John", lastname: "Doe", user_id:"6789", age:40 }
      * //  ],
      * //  [
      * //    { name: "Pedro", lastname: "Algo", age:30 }
      * //  ]
      * //]
      *
      * array.group({
      *   Doe: (o)=> o.lastname === 'Doe',
      *   35: (o)=> o.age > 35
      * });
      * // {
      * //   35: [
      * //     {"name":"John","lastname":"Doe","user_id":"6789","age":40},
      * //     {"name":"Juan","lastname":"Perez","user_id":"1234","age":42}
      * //   ],
      * //   Doe: [
      * //     {"name":"John","lastname":"Doe","user_id":"6789","age":40}
      * //   ],
      * //   unmatched: [
      * //     {"name":"Pedro","lastname":"Algo","age":30}
      * //   ]
      * // }
      */
      group: {
        value: function group(conds, thisArg, ...otherArgs){
          let isArray = Array.isArray(conds);
          let condsKeys = Object.keys(conds);
          let condsKeysLen = condsKeys.length;
          // test arguments
          if( !arguments.length || !condsKeysLen || ( !isArray && typeof conds !== 'object') ){ throw Error(error + 'bad arguments'); }
          // if array, initialValue is an $array of conds.length + 1 $arrays. else it's an object
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
    * @description adds helpful methods to an array. Intended to be used **without** the `new` keyword, but still works with it. Can be used through `$array` or through `$a`. If one of the methods returns an array, that array inherits all of $array's methods: they're chainable.
    * @extends Array
    * @param {Array} array An array, generally of objects.
    * @returns {$array} same array passed but with added methods AKA an $array.
    * @example
    * var exampleArray = [
    *   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
    *   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
    *   { name: "Pedro", lastname: "Algo", age:30  }
    * ];
    * $array(exampleArray);
    * // or
    * $a(exampleArray);
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
    * @property prototype
    * @memberof $array
    * @static
    * @description `$array` instance methods. Inherits from `Array.prototype`. Added to allow people to use methods without "instantiating" a new `$array` using `Function#call` or `Function#apply`.
    */
    $array.prototype = Object.create(Array.prototype);
    Object.keys(_public).forEach((key)=>{
      $array.prototype[key] = _public[key].value;
    });
    // this doesn't change anything because $array doesn't return "this",
    // it returns an Array with a few extra methods
    $array.prototype.constructor = $array;

    /**
    * @property version
    * @memberof $array
    * @static
    * @description current version of $array.
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
    * $array.isArray($array());// true
    * $array.isArray([]); // false
    */
    $array.isArray = function isArray(arr){
      return Array.isArray(arr) && typeof arr.keyExists !== 'undefined' && typeof arr.filterByKey !== 'undefined';
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
