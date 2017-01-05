import { sort } from 'private';
import { $array } from 'dollar-array';

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
export default function ascend(property, useNewArr){
  if( !this.propExists(property) ){ throw Error('$arrayJS no correct key given'); }
  let arr = useNewArr ? $array( JSON.parse(JSON.stringify(this)) ) : this;
  return arr.sort(sort(property));
}
