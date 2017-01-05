import { $array } from 'dollar-array';

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
export default function invert(useNewArr){
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
