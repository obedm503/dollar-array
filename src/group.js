import { push } from 'private';
import { $array } from 'dollar-array';

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
export default function group(arr, conds, thisArg, ...otherArgs){
  let isArray = Array.isArray(conds);
  let condsKeys = Object.keys(conds);
  let condsKeysLen = condsKeys.length;
  // test arguments
  if( !arguments.length || !condsKeysLen || ( !isArray && typeof conds !== 'object') ){
    throw Error('$arrayJS bad arguments');
  }
  
  // if array, initialValue is an `array` of conds.length + 1 $arrays. else it's an object
  let initialValue = isArray ?
    $array( Array.apply(null, { length: condsKeysLen + 1 }).map(_=>$array()) ) :
    {};
  let usedBefore = [];
  let unmatchedKey = isArray ? condsKeysLen : 'unmatched' ;

  return arr.reduce( ( accumulator, item, itemIndex )=>{
    let used;
    let i = condsKeysLen;

    // loop the conds
    while(i--){
      let condKey = condsKeys[i];

      // array matching a cond is itself or a $array() if it's undefineds
      accumulator[condKey] = ( typeof accumulator[condKey] !== 'undefined') ? accumulator[condKey] : $array();

      if( conds[condKey].call(thisArg || item, item, itemIndex, arr, ...otherArgs) ){ // condition was met
        used = true;
        push(accumulator[condKey], item);
      }
    }

    // used right now but not before
    if(used && usedBefore.indexOf(item) === -1){
      push(usedBefore, item);
    }

    accumulator[unmatchedKey] = ( typeof accumulator[unmatchedKey] !== 'undefined') ? accumulator[unmatchedKey] : $array();
    // item isn't already in unmatched or alreadyMatched
    if( accumulator[unmatchedKey].indexOf(item) === -1 && usedBefore.indexOf(item) === -1 ){
      push(accumulator[unmatchedKey], item);
    }

    return accumulator;
  }, initialValue);
}
