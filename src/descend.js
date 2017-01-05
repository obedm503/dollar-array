import { sort } from 'private';
import { $array } from 'dollar-array';

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
export default function descend(key, useNewArr){
  if( !this.propExists(key) ){ throw Error('$arrayJS no correct key given'); }
  let arr = useNewArr ? $array( JSON.parse(JSON.stringify(this)) ) : this;
  return arr.sort(sort('-' + key));
}
