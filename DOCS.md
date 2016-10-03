<a name="$array"></a>

## $array(array) ⇒ <code>Array</code>
adds helpful methods to an array's prototype. Intended to be used **without** the ``new`` keyword, but still seems work with it. Can be used through ``$array`` or through ``$a``. If one of the methods returns an array, that array inherits all of $array's methods: they're chainable.

**Kind**: global function  
**Returns**: <code>Array</code> - same array passed but with added methods to the its prototype  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;Object&gt;</code> | An array, generally of objects. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray);// ornew $array(exampleArray);// or$a(exampleArray);// ornew $a(exampleArray);
```

* [$array(array)](#$array) ⇒ <code>Array</code>
    * [.sort()](#$array.sort) ℗
    * [.keyExists(key)](#$array.keyExists) ⇒ <code>Boolean</code>
    * [.filterByKey(key, [newKey])](#$array.filterByKey) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.invert([transform])](#$array.invert) ⇒ <code>Array</code>
    * [.randomize()](#$array.randomize) ⇒ <code>Array</code>
    * [.random()](#$array.random) ⇒ <code>Object</code>
    * [.ascend(key)](#$array.ascend) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.descend(key)](#$array.descend) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.convertToObject(key)](#$array.convertToObject) ⇒ <code>Object</code>
    * [.groupObjects(conds)](#$array.groupObjects) ⇒ <code>Array.&lt;Array&gt;</code>

<a name="$array.sort"></a>

### $array.sort() ℗
helper function used by [$array().ascend](#$array.ascend) and [$array().descend](#$array.descend)

**Kind**: static method of <code>[$array](#$array)</code>  
**Access:** private  
<a name="$array.keyExists"></a>

### $array.keyExists(key) ⇒ <code>Boolean</code>
checks if a certain key exists within ANY object in the array.

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>Boolean</code> - whether the key exists within any object in the array. Returns true even if the key only exists within one object in the whole array.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The key to check within the objects. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).keyExists('user_id'); //true
```
<a name="$array.filterByKey"></a>

### $array.filterByKey(key, [newKey]) ⇒ <code>Array.&lt;Object&gt;</code>
method which takes a key and removes all other key-value pairs in the objects. Useful with dynamic ionic actionsheet buttons.

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>Array.&lt;Object&gt;</code> - An array of objects, each with a single key-value pair.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key to look for in each object. |
| [newKey] | <code>string</code> | Optional. The key to substitute the old key with... if that makes sense. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];var array = $array(exampleArray);array.filterByKey('user_id'); //[{user_id:"1234"}, {user_id:"6789"}]array.filterByKey('user_id','id'); //[{id:"1234"}, {id:"6789"}]
```
<a name="$array.invert"></a>

### $array.invert([transform]) ⇒ <code>Array</code>
Reverses the order of items in an array. It's supposed to be faster than the Array.prototype.reverse() method.

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>Array</code> - The reversed array.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [transform] | <code>Boolean</code> | <code>false</code> | whether to transform the original array. defaults to ``false``. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).invert();//[// { name: "Pedro", lastname: "Algo", age:30  }// { name: "John", lastname: "Doe", user_id:"6789", age:40 },// { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }//]
```
<a name="$array.randomize"></a>

### $array.randomize() ⇒ <code>Array</code>
Randomizes the order of item in the array. Uses the knuth-shuffle.

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>Array</code> - randomized array.  
**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).randomize(); //randomized array...
```
<a name="$array.random"></a>

### $array.random() ⇒ <code>Object</code>
returns a random element in an array. Adds an ``index`` property to the element's prototype corresponding to this element's index in the original array.

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>Object</code> - random element in array, **NOT AN ARRAY**, unless an array of arrays was passed.  
**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).random(); // a random element...
```
<a name="$array.ascend"></a>

### $array.ascend(key) ⇒ <code>Array.&lt;Object&gt;</code>
sorts the objects in an array in ascending alphabetical order according to the passed key's value. Also works if the key's value is a number.

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>Array.&lt;Object&gt;</code> - sorted array  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> &#124; <code>Number</code> | The key with which to sort the array |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).ascend('lastname');//[//  { name: "Pedro", lastname: "Algo", age:30  },//  { name: "John", lastname: "Doe", user_id:"6789", age:40 },//  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }//]$array(exampleArray).ascend('age');//[//  { name: "Pedro", lastname: "Algo", age:30  },//  { name: "John", lastname: "Doe", user_id:"6789", age:40 },//  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }//]
```
<a name="$array.descend"></a>

### $array.descend(key) ⇒ <code>Array.&lt;Object&gt;</code>
sorts the elements in an array in reverse/descending alphabetical order according to the passed key's value. Also works if the key's value is a number.

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>Array.&lt;Object&gt;</code> - sorted array  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> &#124; <code>Number</code> | The key with which to sort the array. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).descend('lastname');//[//  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },//  { name: "John", lastname: "Doe", user_id:"6789", age:40 },//  { name: "Pedro", lastname: "Algo", age:30  }//]$array(exampleArray).descend('age');//[//  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },//  { name: "John", lastname: "Doe", user_id:"6789", age:40 },//  { name: "Pedro", lastname: "Algo", age:30  }//]
```
<a name="$array.convertToObject"></a>

### $array.convertToObject(key) ⇒ <code>Object</code>
converts an array of objects to an object. Designed with the idea of eliminating the need to loop through an array in order to get a specific object.

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>Object</code> - Returns the array of objects converted into an object.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Takes the key that exists in all objects in the array. The value of this key will become the key to each object. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },  { name: "John", lastname: "Doe", user_id:"6789", age:40 },  { name: "Pedro", lastname: "Algo", age:30  }];$array(exampleArray).convertToObject('lastname');//{//  "Perez": { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },//  "Doe": { name: "John", lastname: "Doe", user_id:"6789", age:40 },//  "Algo": { name: "Pedro", lastname: "Algo", age:30  }//}
```
<a name="$array.groupObjects"></a>

### $array.groupObjects(conds) ⇒ <code>Array.&lt;Array&gt;</code>
takes an array of functions that each return conditionals. Inspired after the [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method. Check the [StackOverflow question](http://stackoverflow.com/questions/38559281/array-filter-with-more-than-one-conditional).

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>Array.&lt;Array&gt;</code> - An array of arrays with the objects grouped in the same order according to the array of callbacks passed. All objects which match no conditional, are grouped on the last array.  

| Param | Type | Description |
| --- | --- | --- |
| conds | <code>Array.&lt;callback&gt;</code> | An array of callback functions which each take an object and return a conditional value. |

**Example**  
```js
var exampleArray = [  { name: "Juan", lastname: "Perez", user_id:"1234", age:42},  { name: "John", lastname: "Doe", user_id:"6789", age:40},  { name: "Pedro", lastname: "Algo", age:30}];$array(exampleArray).groupObjects([  function(o){ return o.lastname === 'Doe'; },  function(o){ return o.age > 35; }]);//[//  [//    { name: "John", lastname: "Doe", user_id:"6789", age:40 }//  ],//  [//    { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },//    { name: "John", lastname: "Doe", user_id:"6789", age:40 }//  ],//  [//    { name: "Pedro", lastname: "Algo", age:30 }//  ]//]
```
