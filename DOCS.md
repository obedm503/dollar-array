<a name="$array"></a>

## `$array(array)` ⇒ <code>[$array](#$array)</code>
adds helpful methods to an array. Intended to be used **without** the `new` keyword, but still works with it. Can be used through `$array` or through `$a`. If one of the methods returns an array, that array inherits all of $array's methods: they're chainable.

**Kind**: global function  
**Extends:** <code>Array</code>  
**Returns**: <code>[$array](#$array)</code> - same array passed but with added methods AKA an $array.  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | An array, generally of objects. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray);// or$a(exampleArray);
```

* [`$array(array)`](#$array) ⇒ <code>[$array](#$array)</code>
    * _instance_
        * [`.keyExists(key)`](#$array+keyExists) ⇒ <code>Boolean</code>
        * [`.filterByKey(oldKey, [newKey])`](#$array+filterByKey) ⇒ <code>[$array](#$array)</code>
        * [`.invert([useNewArr])`](#$array+invert) ⇒ <code>[$array](#$array)</code>
        * [`.randomize([useNewArr])`](#$array+randomize) ⇒ <code>[$array](#$array)</code>
        * [`.random()`](#$array+random) ⇒ <code>Object</code>
        * [`.ascend(key, [useNewArr])`](#$array+ascend) ⇒ <code>[$array](#$array)</code>
        * [`.descend(key, [useNewArr])`](#$array+descend) ⇒ <code>[$array](#$array)</code>
        * [`.toObject(key)`](#$array+toObject) ⇒ <code>Object</code>
        * [`.group(conds)`](#$array+group) ⇒ <code>[$array](#$array)</code> &#124; <code>Object</code>
    * _static_
        * [`.version`](#$array.version)
        * [`.isArray(arr)`](#$array.isArray) ⇒ <code>Boolean</code>

<a name="$array+keyExists"></a>

### `$array.keyExists(key)` ⇒ <code>Boolean</code>
checks if a certain property exists in ANY object in the array.

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>Boolean</code> - whether the key exists within any object in the array. Returns true even as soon as the key is found.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The key to check within the objects. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).keyExists('user_id'); //true
```
<a name="$array+filterByKey"></a>

### `$array.filterByKey(oldKey, [newKey])` ⇒ <code>[$array](#$array)</code>
method which takes a key and removes all other key-value pairs in the objects. If a `newKey` is provided, it will substitute the `oldKey`. It skips objects whose value for that key is undefined. Useful with dynamic ionic actionsheet buttons.

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>[$array](#$array)</code> - An array of objects, each with a single key-value pair.  

| Param | Type | Description |
| --- | --- | --- |
| oldKey | <code>String</code> | The key to look for in each object. |
| [newKey] | <code>String</code> | Optional. The key to substitute the old key with |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];var array = $array(exampleArray);array.filterByKey('name'); //[{name:"Juan"},{name:"John"},{name:"Pedro"}]array.filterByKey('user_id'); //[{user_id:"1234"}, {user_id:"6789"}]array.filterByKey('user_id','id'); //[{id:"1234"}, {id:"6789"}]
```
<a name="$array+invert"></a>

### `$array.invert([useNewArr])` ⇒ <code>[$array](#$array)</code>
Reverses the order of items in an array. It's supposed to be faster than the Array#reverse() method.

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>[$array](#$array)</code> - The reversed array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [useNewArr] | <code>Boolean</code> | <code>false</code> | whether to modify $array called upon or return a copy. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).invert();// [//   {"name":"Pedro","lastname":"Algo","age":30},//   {"name":"John","lastname":"Doe","user_id":"6789","age":40},//   {"name":"Juan","lastname":"Perez","user_id":"1234","age":42}// ]
```
<a name="$array+randomize"></a>

### `$array.randomize([useNewArr])` ⇒ <code>[$array](#$array)</code>
Randomizes the order of item in the array. Uses the knuth shuffle.

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>[$array](#$array)</code> - randomized array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [useNewArr] | <code>Boolean</code> | <code>false</code> | whether to modify $array called upon or return a copy. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).randomize(); //randomized array...
```
<a name="$array+random"></a>

### `$array.random()` ⇒ <code>Object</code>
returns a random element in an array. Adds an `index` property to that element with the index that element had in the array.

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>Object</code> - random element in array, **NOT AN ARRAY**, unless an array of arrays was passed.  
**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).random(); // a random element...
```
<a name="$array+ascend"></a>

### `$array.ascend(key, [useNewArr])` ⇒ <code>[$array](#$array)</code>
sorts the objects in an array in ascending alphabetical order according to the passed key's value. Also works if the key's value is a number.

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>[$array](#$array)</code> - sorted array  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>String</code> &#124; <code>Number</code> |  | The key with which to sort the array |
| [useNewArr] | <code>Boolean</code> | <code>false</code> | whether to modify $array called upon or return a copy. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).ascend('lastname');//[//  { name: "Pedro", lastname: "Algo", age:30  },//  { name: "John", lastname: "Doe", user_id:"6789", age:40 },//  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }//]$array(exampleArray).ascend('age');//[//  { name: "Pedro", lastname: "Algo", age:30  },//  { name: "John", lastname: "Doe", user_id:"6789", age:40 },//  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }//]
```
<a name="$array+descend"></a>

### `$array.descend(key, [useNewArr])` ⇒ <code>[$array](#$array)</code>
sorts the elements in an array in reverse/descending alphabetical order according to the passed key's value. Also works if the key's value is a number.

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>[$array](#$array)</code> - sorted array  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>String</code> &#124; <code>Number</code> |  | The key with which to sort the array. |
| [useNewArr] | <code>Boolean</code> | <code>false</code> | whether to modify $array called upon or return a copy. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).descend('lastname');//[//  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },//  { name: "John", lastname: "Doe", user_id:"6789", age:40 },//  { name: "Pedro", lastname: "Algo", age:30  }//]$array(exampleArray).descend('age');//[//  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },//  { name: "John", lastname: "Doe", user_id:"6789", age:40 },//  { name: "Pedro", lastname: "Algo", age:30  }//]
```
<a name="$array+toObject"></a>

### `$array.toObject(key)` ⇒ <code>Object</code>
converts an array of objects to an object. Designed with the idea of eliminating the need to loop through an array in order to get a specific object. Does not modidy $array it was called upon.

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>Object</code> - Returns the array of objects converted into an object.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Takes the key that exists in all objects in the array. The value of this key will become the key to each object. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).toObject('lastname');//{//  "Perez": { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },//  "Doe": { name: "John", lastname: "Doe", user_id:"6789", age:40 },//  "Algo": { name: "Pedro", lastname: "Algo", age:30  }//}
```
<a name="$array+group"></a>

### `$array.group(conds)` ⇒ <code>[$array](#$array)</code> &#124; <code>Object</code>
takes an array of functions that each return conditionals. Inspired after the [Array#filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method. Check the [StackOverflow question](http://stackoverflow.com/questions/38559281/array-filter-with-more-than-one-conditional).

**Kind**: instance method of <code>[$array](#$array)</code>  
**Returns**: <code>[$array](#$array)</code> &#124; <code>Object</code> - A new $array or an object, depending on whether the conditionals were an array or an object. The array of arrays has the elements grouped in the same order according to the array of callbacks passed. All elements which match no conditional, are grouped on the last array or in the `"unmatched"` array if conditionals were an object. Does not modidy $array it was called upon.  

| Param | Type | Description |
| --- | --- | --- |
| conds | <code>Array.&lt;callback&gt;</code> &#124; <code>Object</code> | An array of callback functions which each take an object and return a conditional value. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42},  { name: "John", lastname: "Doe", user_id:"6789", age:40},  { name: "Pedro", lastname: "Algo", age:30}];var array = $array(exampleArray);array.group([  (o)=> o.lastname === 'Doe',  (o)=> o.age > 35]);//[//  [//    { name: "John", lastname: "Doe", user_id:"6789", age:40 }//  ],//  [//    { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },//    { name: "John", lastname: "Doe", user_id:"6789", age:40 }//  ],//  [//    { name: "Pedro", lastname: "Algo", age:30 }//  ]//]array.group({  Doe: (o)=> o.lastname === 'Doe',  35: (o)=> o.age > 35});// {//   35: [//     {"name":"John","lastname":"Doe","user_id":"6789","age":40},//     {"name":"Juan","lastname":"Perez","user_id":"1234","age":42}//   ],//   Doe: [//     {"name":"John","lastname":"Doe","user_id":"6789","age":40}//   ],//   unmatched: [//     {"name":"Pedro","lastname":"Algo","age":30}//   ]// }
```
<a name="$array.version"></a>

### `$array.version`
current version of $array.

**Kind**: static property of <code>[$array](#$array)</code>  
**Properties**

| Name |
| --- |
| version |

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
$array.isArray($array());// true$array.isArray([]); // false
```
