/**
* @function propExists
* @memberof $array.prototype
* @description
* The **propExists()** method checks if a *property* exists in ANY `element` in an `$array`.
*```js
*$array([1,2,3,'a string']).propExists('length') // returns "true" because strings have a "length" property
*```
* #### Syntax
*```js
*arr.propExists(property)
*```
* @param {String} property The *property* to look for.
* @returns {Boolean} whether the *property* exists. Returns true as soon as the key is found.
* @example
* var exampleArray = [
*   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
*   { name: "John", lastname: "Doe", user_id:"6789", age:40 },
*   { name: "Pedro", lastname: "Algo", age:30  }
* ];
* $array(exampleArray).propExists('user_id'); // true
*/
export default function propExists(arr, property){
  if(!property || typeof property !== 'string'){
    throw Error('$arrayJS incorrect parameters');
  }
  
  let i = arr.length;
  while(i--){
    if( arr[i][property] ){
      // property found
      return true;
    }
  }
  // got to end of loop, property not found
  return false;
}
