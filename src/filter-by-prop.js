import { $array } from 'dollar-array';

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
export default function filterByProp(oldKey, newKey, useNewArr){
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
