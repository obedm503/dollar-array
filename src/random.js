import { clone } from 'private';

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
export default function random(arr){
  let array = clone(arr);
  let index = Math.floor( Math.random() * array.length );
  let obj = array[index];
  let type = typeof obj;
  // just for safety
  if(type !== 'number' && type !== 'string' && type !== 'boolean' && type !== 'undefined' && obj !== null){
    Object.defineProperty( obj, 'index', {
      value: index
    });
  }
  return obj;
}
