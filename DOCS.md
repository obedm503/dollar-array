<a name="$array"></a>

## `$array(array)` ⇒ <code>[$array](#$array)</code>
#### Syntax```js$array( element0, element1[, ...[, elementN]] )$array( [ element0, element1, ..., elementN ] )```An `$array` is simply an `Array` with extra methods. It is initialized  with the elements as parameters, except in the case where a single element of type `Array` is passed. Unlike `Array`, if a single integer is passed, `$array` will return an `$array` with the integer as it's sole element.```js$array(5) // pass single non-Array element, returns [ 5 ]$array( [2,5,6,4,3] ) // pass single Array element, returns [ 2, 5, 6, 4, 3 ]$array( 2, 5, 6, 4, 3 ) // pass multiple elements, returns [ 2, 5, 6, 4, 3 ]$array( [1,2,3,4], 5, 6, 4, 3 ) // pass multiple elements, still returns [ [1,2,3,4], 5, 6, 4, 3 ]````$array` is intended to be used **without** the `new` keyword because it doesn't return `this`. It can be used as `$array` or through the shortcut, `$a`. All methods that return `Array`s actually return `$array`s. That is to say that most methods are chainable.An `$array` is not *really* a subclass of `Array`. It's more of a *pseudo-subclass*. All `$array`s have the `$array.prototype` as well as the `Array.prototype` methods.>Remember: `$array`s are just `Array`s with a few extra and useful methods as properties.Becasue of the current lack of support for [JavaScript classes](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes), I was forced to find a workaround. I concluded in adding the `$array.prototype` methods as non-enumerable properties instead of modifying an `Array`'s `__proto__` property for performance and support reasons explained [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/The_performance_hazards_of__%5B%5BPrototype%5D%5D_mutation). In the future, when support for `class` and `extends` is wide, another rewrite will happen. Native code is a lot faster than workarounds. Also, you might ask: why not just use Babel and transpile the `class` syntax? Well, it turns out that extending `Array` is the one thing that Babel still can't do whilst maintaining the [exotic nature](http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects) of `Array`s.<br><br>In case you are interested in calling one of the methods whithout "instantiating" an `$array` you may do so using `Function.prototype.call` or `Function.prototype.apply` on the functions in `$array.prototype`.```js$array.prototype.invert.call([1,2,3,4]) // returns [4,3,2,1] an Array and not an $array$array.prototype.invert.call([1,2,3,4], true) // returns [4,3,2,1] an $array```#### DemoThrough this documentation, a common example `Array` will be used. It is special because it is composed of objects. All objects share most property names except for the third element which doesn't have a `user_id` property. Also two `global` variables, `exampleArray` and `array`, have been defined in case anyone wants to try `$array` in the browser console.```jsvar exampleArray = [ { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }, { name: "John", lastname: "Doe", user_id:"6789", age:40 }, { name: "Pedro", lastname: "Algo", age:30  }];var array = $array(exampleArray.slice(0)); // .slice(0) removes reference to original Array```> Fun Fact: $arrayJS adds a single function to the `Array.prototype`, `Array.prototype.to$array`. It's just another way to convert an `Array` to an `$array`.

**Kind**: global function  
**Extends:** <code>Array</code>  
**Returns**: <code>[$array](#$array)</code> - same array passed but with added methods, AKA an $array.  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> &#124; <code>any</code> | A single `Array` or *n* elements |


* [`$array(array)`](#$array) ⇒ <code>[$array](#$array)</code>
    * _instance_
        * [`.propExists(property)`](#$array+propExists) ⇒ <code>Boolean</code>
        * [`.filterByProp(oldKey, [newKey], [useNewArr])`](#$array+filterByProp) ⇒ <code>[$array](#$array)</code>
        * [`.invert([useNewArr])`](#$array+invert) ⇒ <code>[$array](#$array)</code>
        * [`.randomize([useNewArr])`](#$array+randomize) ⇒ <code>[$array](#$array)</code>
        * [`.random()`](#$array+random) ⇒ <code>Object</code>
        * [`.ascend(property, [useNewArr])`](#$array+ascend) ⇒ <code>[$array](#$array)</code>
        * [`.descend(key, [useNewArr])`](#$array+descend) ⇒ <code>[$array](#$array)</code>
        * [`.toObject(property)`](#$array+toObject) ⇒ <code>Object</code>
        * [`.group(conds, thisArg, ...otherArgs)`](#$array+group) ⇒ <code>[$array](#$array)</code> &#124; <code>Object</code>
    * _static_
        * [`.version`](#$array.version)
        * [`.isArray(arr)`](#$array.isArray) ⇒ <code>Boolean</code>

<a name="$array+propExists"></a>

### `$array.propExists(property)` ⇒ <code>Boolean</code>
The **propExists()** method checks if a *property* exists in ANY `element` in an `$array`.```js$array([1,2,3,'a string']).propExists('length') // returns "true" because strings have a "length" property```#### Syntax```jsarr.propExists(property)```

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>Boolean</code> - whether the *property* exists. Returns true as soon as the key is found.  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>String</code> | The *property* to look for. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).propExists('user_id'); // true
```
<a name="$array+filterByProp"></a>

### `$array.filterByProp(oldKey, [newKey], [useNewArr])` ⇒ <code>[$array](#$array)</code>
The **filterByProp()** method takes a key and removes all other key-value pairs in the objects in the array. If a `newKey` is provided, it will substitute the `oldKey`. **filterByProp()** skips objects whose value for the given `oldKey` is `undefined`. [Useful with dynamic ionic actionsheet buttons.](https://github.com/ncai-developers/studentaccess/blob/master/components/homework/homework.controller.js#L42)```js$array({ type: 'car', year: 2014 }, { type: 'bike', year: 2015 }).filterByProp('type', 'vehicle')// [ {"vehicle":"car"}, {"vehicle":"bike"} ]```#### Syntax```jsarr.filterByProp(propertyName[, newPropertyName[, returnNew$array ]])```

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>[$array](#$array)</code> - An array of objects, each with a single key-value pair.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| oldKey | <code>String</code> |  | The property name to look for in each object. |
| [newKey] | <code>String</code> |  | Optional. Substitutes the `oldKey`. |
| [useNewArr] | <code>Boolean</code> | <code>false</code> | Optional. whether to create a deep clone and not modify original array. |

**Example**  
```js
var exampleArray = [ { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }, { name: "John", lastname: "Doe", user_id:"6789", age:40 }, { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).filterByProp('name');// [{name:"Juan"},{name:"John"},{name:"Pedro"}] modifies "array"$array(exampleArray).filterByProp('name', null, true);// [{name:"Juan"},{name:"John"},{name:"Pedro"}] creates new "array"$array(exampleArray).filterByProp('user_id');// [{user_id:"1234"}, {user_id:"6789"}] modifies "array"$array(exampleArray).filterByProp('user_id','id');// [{id:"1234"}, {id:"6789"}] modifies "array"
```
<a name="$array+invert"></a>

### `$array.invert([useNewArr])` ⇒ <code>[$array](#$array)</code>
The **invert()** method reverses the order of an `$array`'s elements. It's supposed to be faster than the `Array.prototype.reverse()` method.```js$array(1,2,3,4,5).invert() // returns [5,4,3,2,1]```#### Syntax```jsarr.invert([useNewArr])```

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>[$array](#$array)</code> - The reversed array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [useNewArr] | <code>Boolean</code> | <code>false</code> | whether to modify $array called upon or return a deep clone. |

**Example**  
```js
var exampleArray = [ { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }, { name: "John", lastname: "Doe", user_id:"6789", age:40 }, { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).invert();// returns[ {"name":"Pedro","lastname":"Algo","age":30}, {"name":"John","lastname":"Doe","user_id":"6789","age":40}, {"name":"Juan","lastname":"Perez","user_id":"1234","age":42}]
```
<a name="$array+randomize"></a>

### `$array.randomize([useNewArr])` ⇒ <code>[$array](#$array)</code>
The **randomize()** method randomizes the order of elements in an `$array` using the [Knuth Shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) algorithm.```js$array(1,2,3,4).randomize() // returns random $array```#### Syntax```jsarr.randomize([useNewArray])```

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>[$array](#$array)</code> - randomized `$array`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [useNewArr] | <code>Boolean</code> | <code>false</code> | whether to modify `$array` called upon or return a deep clone. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).randomize(); //randomized array...
```
<a name="$array+random"></a>

### `$array.random()` ⇒ <code>Object</code>
The **random()** method returns a random element in an `$array`. Adds an `index` property to that element with the index that element had in the array if the element is not `number`, a `string`, a `boolean`, `undefined`, or `null`. It does not modify the original `$array`;```js$array(1,2,3,4).random() // returns a random number```#### Syntax```jsarr.random()```

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>Object</code> - random element in array, **NOT AN ARRAY**, unless an array of arrays was passed.  
**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).random(); // a random element...
```
<a name="$array+ascend"></a>

### `$array.ascend(property, [useNewArr])` ⇒ <code>[$array](#$array)</code>
The **ascend()** method sorts the elements in an array in ascending alphabetical or numerical order according to the passed property's value.```js$array([ { type: 'car' }, { type: 'bike' } ]).ascend('type')// [ { type: 'bike' }, { type: 'car' } ]```#### Syntax```jsarr.ascend(propertyName[, useNewArr])```

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>[$array](#$array)</code> - sorted `$array`  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| property | <code>String</code> &#124; <code>Number</code> |  | The property name with which to sort the `$array` |
| [useNewArr] | <code>Boolean</code> | <code>false</code> | whether to modify `$array` called upon or return a deep clone. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).ascend('lastname');//[//  { name: "Pedro", lastname: "Algo", age:30  },//  { name: "John", lastname: "Doe", user_id:"6789", age:40 },//  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }//]$array(exampleArray).ascend('age');//[//  { name: "Pedro", lastname: "Algo", age:30  },//  { name: "John", lastname: "Doe", user_id:"6789", age:40 },//  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }//]
```
<a name="$array+descend"></a>

### `$array.descend(key, [useNewArr])` ⇒ <code>[$array](#$array)</code>
The **descend()** method sorts the elements in an array in reverse/descending alphabetical/numerical order according to the passed property's value.```js$array([ { n: 2 }, { n: 8 } ]).descend('n')// [ { n: 8 }, { n: 2 } ]```#### Syntax```jsarr.descend(propertyName[, useNewArr])```

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>[$array](#$array)</code> - sorted array  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>String</code> &#124; <code>Number</code> |  | The key with which to sort the array. |
| [useNewArr] | <code>Boolean</code> | <code>false</code> | whether to modify `array` called upon or return a deep clone. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).descend('lastname');//[//  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },//  { name: "John", lastname: "Doe", user_id:"6789", age:40 },//  { name: "Pedro", lastname: "Algo", age:30  }//]$array(exampleArray).descend('age');//[//  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },//  { name: "John", lastname: "Doe", user_id:"6789", age:40 },//  { name: "Pedro", lastname: "Algo", age:30  }//]
```
<a name="$array+toObject"></a>

### `$array.toObject(property)` ⇒ <code>Object</code>
The **toObject()** converts an array of objects to an object literal. It was designed with the idea of eliminating the need to loop through an array in order to get a specific object. Does not modidy `$array` it was called on.```js$array([ { type: 'car', year: 2014 }, { type: 'bike', year: 2015 } ]).toObject('type')// { "bike": { "type":"bike", "year":2015 }, "car": { "type":"car", "year":2014 } }```#### Syntax```jsarr.toObject(propertyName)```

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>Object</code> - Returns the array of objects converted into an object.  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>String</code> | The property that exists in all objects in the array. The value of this property will become the property to each object. The value to this property has to be unique for each object. If repeated values for that property are encountered it will `throw` an error. |

**Example**  
```js
var exampleArray = [ { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }, { name: "John", lastname: "Doe", user_id:"6789", age:40 }, { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).toObject('lastname');// returns{ "Perez": { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }, "Doe": { name: "John", lastname: "Doe", user_id:"6789", age:40 }, "Algo": { name: "Pedro", lastname: "Algo", age:30  }}
```
<a name="$array+group"></a>

### `$array.group(conds, thisArg, ...otherArgs)` ⇒ <code>[$array](#$array)</code> &#124; <code>Object</code>
The **group()** method takes an array or object with functions that each return conditionals. Inspired after the [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method. Check the [StackOverflow question](http://stackoverflow.com/questions/38559281/array-filter-with-more-than-one-conditional).```js$array([1,2,3,4]).group([n=>x>2, n=>n<2]) // returns [ [3,4], [1], [2] ]$array([1,2,3,4]).group({"greater":n=>x>2,"less":n=>n<2]) // returns { "greater":[3,4], "less":[1], "unmatched":[2] }```#### Syntax```jsarr.group(conditionals)```

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>[$array](#$array)</code> &#124; <code>Object</code> - A new `array` or an object, depending on whether the conditionals were an array or an object. The array of arrays has the elements grouped in the same order according to the array of callbacks passed. All elements which match no conditional, are grouped on the last array or in the `"unmatched"` array if conditionals were an object. Does not modidy `array` it was called upon.  

| Param | Type | Description |
| --- | --- | --- |
| conds | <code>Array.&lt;function()&gt;</code> &#124; <code>Object.&lt;function()&gt;</code> | An array of callback functions which each take an object and return a conditional value. Each function is called with the current element in the loop, it's index, the complete array, and any other argument passed to **group()**. |
| thisArg | <code>any</code> | Similar to how `Array.prototype.filter` takes a `function` and a `thisArg`, `$array.prototype.group` also takes a `thisArg` which is passed to each `function` as its `this` context as second argument. If no `thisArg` is passed then the `function` is called with the current element as its `this` context, jQuery style. |
| ...otherArgs | <code>any</code> | If more than 2 arguments are passed, **group()** will relay the extra arguments to each function after the current element, its index, and the array. |

**Example**  
```js
var exampleArray = [ { name: "Juan", lastname: "Perez", user_id:"1234", age:42}, { name: "John", lastname: "Doe", user_id:"6789", age:40}, { name: "Pedro", lastname: "Algo", age:30}];var array = $array(exampleArray);array.group([ (o)=> o.lastname === 'Doe', (o)=> o.age > 35]);// returns[ [   { name: "John", lastname: "Doe", user_id:"6789", age:40 } ], [   { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },   { name: "John", lastname: "Doe", user_id:"6789", age:40 } ], [   { name: "Pedro", lastname: "Algo", age:30 } ]]array.group({ Doe: (o)=> o.lastname === 'Doe', 35: (o)=> o.age > 35});// returns{ 35: [   {"name":"John","lastname":"Doe","user_id":"6789","age":40},   {"name":"Juan","lastname":"Perez","user_id":"1234","age":42} ], Doe: [   {"name":"John","lastname":"Doe","user_id":"6789","age":40} ], unmatched: [   {"name":"Pedro","lastname":"Algo","age":30} ]}array.group([function(element, index, array, other1, other2){ // this == 'a string' // other1 == 5 // other2 == 'another string' return index > 1;}], 'a string', 5, 'another string')// returns[[  {"name":"Pedro","lastname":"Algo","age":30}],[  {"name":"Juan","lastname":"Perez","user_id":"1234","age":42},  {"name":"John","lastname":"Doe","user_id":"6789","age":40}]]
```
<a name="$array.version"></a>

### `$array.version`
current version of $arrayJS.

**Kind**: static property of <code>[$array](#$array)</code>  
<a name="$array.isArray"></a>

### `$array.isArray(arr)` ⇒ <code>Boolean</code>
checks whether an array is a $array

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>Boolean</code> - whether the param is an $array  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | to check |

**Example**  
```js
$array.isArray( $array() ); // true$array.isArray( [] ); // false
```
