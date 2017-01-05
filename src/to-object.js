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
export default function toObject(property){
  if( typeof property === 'undefined' || !this){ throw Error('$arrayJS: property or context this: undefined'); }
  let obj = {};
  let i = this.length;
  while(i--){
    // property's value becomes the propertyName
    let newKey = this[i][ property ];
    // skip undefined values
    if( typeof newKey === 'undefined' ){ continue; }
    if( obj.hasOwnProperty(newKey) ){ throw Error('$arrayJS repeated values for property'); }

    obj[newKey] = this[i];
  }
  return obj;
}
