import { $array } from 'dollar-array';
import { clone } from 'private';

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
export default function randomize(arr, useNewArr){
  let array = useNewArr ? $array( clone(arr) ) : arr;
  let currentIndex = array.length, temporaryValue, randomIndex;

  while(0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
