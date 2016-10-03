/**!
* @file $arrayJS: a simple JavaScript utility library for working with arrays of objects. Now available as a node module.
* @author [obedm503](https://github.com/obedm503/) <obedm503@gmail.com>
* @git [git repo](https://github.com/obedm503/dollar-array.git)
* @examples [https://obedm503.github.io/dollar-array/]
* @version 2.0.0
* @license MIT
*/
if(typeof $array === 'undefined'){
	$a = $array = (function(){
	  'use strict';
    var error = '$arrayJS: ';
		var _private = {

			/**
			* @function sort
			* @memberof $array
			* @private
			* @description helper function used by [$array().ascend](#$array.ascend) and [$array().descend](#$array.descend)
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
	    }

		};

		var methods = {

			/**
			* @function keyExists
			* @memberof $array
			* @description checks if a certain key exists within ANY object in the array.
			* @param {String} key The key to check within the objects.
			* @returns {Boolean} whether the key exists within any object in the array. Returns true even if the key only exists within one object in the whole array.
			* @example
			* var exampleArray = [
			*   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
			*   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
			*   { name: "Pedro", lastname: "Algo", age:30  }
			* ];
			* $array(exampleArray).keyExists('user_id'); //true
			*/
			keyExists: function(key){
				if(key && typeof key === 'string'){
					var is = false;
					for(var i = 0, len = this.length; i < len; i++){
						if(this[i][key]){ is = true ;}
					}
					return is;
				} else { console.error(error + 'no correct key given'); return undefined; }
			},

			/**
	    * @function filterByKey
	    * @memberof $array
	    * @description method which takes a key and removes all other key-value pairs in the objects. Useful with dynamic ionic actionsheet buttons.
	    * @param {string} key The key to look for in each object.
	    * @param {string} [newKey] Optional. The key to substitute the old key with... if that makes sense.
	    * @returns {Object[]} An array of objects, each with a single key-value pair.
	    * @example
	    * var exampleArray = [
	    *   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
	    *   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
	    *   { name: "Pedro", lastname: "Algo", age:30  }
	    * ];
			* var array = $array(exampleArray);
	    * array.filterByKey('user_id'); //[{user_id:"1234"}, {user_id:"6789"}]
	    * array.filterByKey('user_id','id'); //[{id:"1234"}, {id:"6789"}]
	    */
	    filterByKey: function(key, newKey){
	      if(key && this.keyExists(key)){
	        var obj = {}, mid = [];
	        var returned = this.map(function(o){
	          obj = {};
	          if(mid.indexOf(o[key]) < 0){
	            mid.push(o[key]);
	            if(newKey){ obj[newKey] = o[key]; }
	            else { obj[key] = o[key]; }
	            return obj;
	          } else { return;}
	        }).filter(function(o){ return (o && JSON.stringify(o) !== '{}'); });
					Object.setPrototypeOf(returned, Object.getPrototypeOf(this));
					return returned;
	      } else { console.error(error + '"' + key  + '" is not a key in array'); return undefined; }
	    },

			/**
	    * @function invert
	    * @memberof $array
	    * @description Reverses the order of items in an array. It's supposed to be faster than the Array.prototype.reverse() method.
	    * @param {Boolean} [transform=false] whether to transform the original array. defaults to ``false``.
	    * @returns {Array} The reversed array.
	    * @example
	    * var exampleArray = [
	    *   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
	    *   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
	    *   { name: "Pedro", lastname: "Algo", age:30  }
	    * ];
	    * $array(exampleArray).invert();
	    * //[
	    * // { name: "Pedro", lastname: "Algo", age:30  }
	    * // { name: "John", lastname: "Doe", user_id:"6789", age:40 },
	    * // { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }
	    * //]
	    */
	    invert: function(transform){
				var arr;
				if(transform){
					//invert original array and return it
					arr = this;
				} else {
					//invert copy array without modifying original and return it
					arr = Object.setPrototypeOf(this.slice(0), Object.getPrototypeOf(this));
				}
				for(var left = 0; left < arr.length / 2; left += 1){
          var right = arr.length - 1 - left;
          var temporary = arr[left];
          arr[left] = arr[right];
          arr[right] = temporary;
        }
        return arr;
	    },

			/**
	    * @function randomize
	    * @memberof $array
	    * @description Randomizes the order of item in the array. Uses the knuth-shuffle.
	    * @returns {Array} randomized array.
	    * @example
	    * var exampleArray = [
	    *   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
	    *   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
	    *   { name: "Pedro", lastname: "Algo", age:30  }
	    * ];
	    * $array(exampleArray).randomize(); //randomized array...
	    */
	    randomize: function(transform){
				var arr, currentIndex = this.length, temporaryValue, randomIndex;
				if(transform){
					//randomize original array and return it
					arr = this;
				} else {
					//randomized copy array without modifying original and return it
					arr = Object.setPrototypeOf(this.slice(0), Object.getPrototypeOf(this));
				}
		    while(0 !== currentIndex) {
		      randomIndex = Math.floor(Math.random() * currentIndex);
		      currentIndex -= 1;
		      temporaryValue = arr[currentIndex];
		      arr[currentIndex] = arr[randomIndex];
		      arr[randomIndex] = temporaryValue;
		    }
		    return arr;
	    },

			/**
			* @function random
			* @memberof $array
			* @description returns a random element in an array. Adds an ``index`` property to the element's prototype corresponding to this element's index in the original array.
			* @returns {Object} random element in array, **NOT AN ARRAY**, unless an array of arrays was passed.
			* @example
			* var exampleArray = [
			*   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
			*   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
			*   { name: "Pedro", lastname: "Algo", age:30  }
			* ];
			* $array(exampleArray).random(); // a random element...
			*/
			random: function(){
				var index = Math.floor( Math.random() * this.length );
				return Object.setPrototypeOf(this[index], {
					index: index
				});
			},

			/**
	    * @function ascend
	    * @memberof $array
	    * @description sorts the objects in an array in ascending alphabetical order according to the passed key's value. Also works if the key's value is a number.
	    * @param {String|Number} key The key with which to sort the array
	    * @returns {Object[]} sorted array
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
	    ascend: function(key){
	      if(key && this.keyExists(key)){
	        return this.sort(_private.sort(key));
	      } else { console.error(error + 'no correct key given'); return undefined; }
	    },

			/**
	    * @function descend
	    * @memberof $array
	    * @description sorts the elements in an array in reverse/descending alphabetical order according to the passed key's value. Also works if the key's value is a number.
	    * @param {String|Number} key The key with which to sort the array.
	    * @returns {Object[]} sorted array
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
	    descend: function(key){
	      if(key && this.keyExists(key)){
	        return this.sort(_private.sort('-' + key));
	      } else { console.error(error + 'no correct key given'); return undefined; }
	    },

			/**
	    * @function convertToObject
	    * @memberof $array
	    * @description converts an array of objects to an object. Designed with the idea of eliminating the need to loop through an array in order to get a specific object.
	    * @param {String} key Takes the key that exists in all objects in the array. The value of this key will become the key to each object.
	    * @returns {Object} Returns the array of objects converted into an object.
	    * @example
	    * var exampleArray = [
	    *   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
	    *   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
	    *   { name: "Pedro", lastname: "Algo", age:30  }
	    * ];
	    * $array(exampleArray).convertToObject('lastname');
	    * //{
	    * //  "Perez": { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
	    * //  "Doe": { name: "John", lastname: "Doe", user_id:"6789", age:40 },
	    * //  "Algo": { name: "Pedro", lastname: "Algo", age:30  }
	    * //}
	    */
	  	convertToObject: function(key){
		    if(key && this.keyExists(key)){
		      var obj = {},
		          keyFound = true;
		      for(var i = 0, arrLen = this.length; i < arrLen; i++){
		        if(this[i][key]){
							obj[ this[i][ key ] ] = this[i];
						} else {
							keyFound = false;
						}
		      }
		      if(keyFound){
						return obj;
					} else { console.error(error + 'key not found'); return undefined; }
		    } else { console.error(error + 'bad params'); return undefined; }
	    },

			/**
	    * @function groupObjects
	    * @memberof $array
	    * @description takes an array of functions that each return conditionals. Inspired after the [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method. Check the [StackOverflow question](http://stackoverflow.com/questions/38559281/array-filter-with-more-than-one-conditional).
	    * @param {callback[]} conds An array of callback functions which each take an object and return a conditional value.
	    * @returns {Array[]} An array of arrays with the objects grouped in the same order according to the array of callbacks passed. All objects which match no conditional, are grouped on the last array.
	    * @example
	    * var exampleArray = [
	    *   { name: "Juan", lastname: "Perez", user_id:"1234", age:42},
	    *   { name: "John", lastname: "Doe", user_id:"6789", age:40},
	    *   { name: "Pedro", lastname: "Algo", age:30}
	    * ];
	    * $array(exampleArray).groupObjects([
			*   function(o){ return o.lastname === 'Doe'; },
			*   function(o){ return o.age > 35; }
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
	    */
	    groupObjects: function(conds){
	      var returned = this.reduce(function(groups, entry){
	        var indices = [];
					for(var i = 0, len = conds.length; i < len; i++){
						if(conds[i](entry)){
							indices.push(i);
						}
					}
	        if(indices.length === 0){
						groups[groups.length - 1].push(entry);
					} else {
						indices.forEach(function(ind){
							return groups[ind].push(entry);
						});
					}
	        return groups;
	      }, Array.apply(null, { length: conds.length + 1 }).map(function(e){ return []; }));
				return Object.setPrototypeOf(returned, Object.getPrototypeOf(this));
	    }

		};

		/**
		* @function $array
		* @description adds helpful methods to an array's prototype. Intended to be used **without** the ``new`` keyword, but still seems work with it. Can be used through ``$array`` or through ``$a``. If one of the methods returns an array, that array inherits all of $array's methods: they're chainable.
		* @param {Object[]} array An array, generally of objects.
		* @returns {Array} same array passed but with added methods to the its prototype
		* @example
		* var exampleArray = [
		*   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
		*   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
		*   { name: "Pedro", lastname: "Algo", age:30  }
		* ];
		* $array(exampleArray);
		* // or
		* new $array(exampleArray);
		* // or
		* $a(exampleArray);
		* // or
		* new $a(exampleArray);
		*/
		return function(array){
			return Object.setPrototypeOf(
				array,
			 	Object.setPrototypeOf(
					methods,
					Object.getPrototypeOf([])//inherit Array's prototype
				)
			);
		};
	})();
	if(typeof module !== 'undefined'){
		module.exports = $array;
	}
}
