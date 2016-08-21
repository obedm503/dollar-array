<a name="$array"></a>

## $array
$arrayJS: a simple JavaScript utility library for working with arrays of objects.

**Kind**: global variable  
**See**: [git repo](https://github.com/obedm503/obedm503-array.git)  
**Version**: 1.0.0  
**Author:** [obedm503](https://github.com/obedm503/) <obedm503@gmail.com>  
**License**: [MIT](./LICENSE.md)  

* [$array](#$array)
    * [.keyExists(arr, key)](#$array.keyExists) ⇒ <code>boolean</code>
    * [.filterByKey(arr, key, [newKey])](#$array.filterByKey) ⇒ <code>Array.&lt;object&gt;</code>
    * [.reverse(arr)](#$array.reverse) ⇒ <code>array</code>
    * [.sortRandom(arr)](#$array.sortRandom) ⇒ <code>array</code>
    * [.sortAscend(arr, key)](#$array.sortAscend) ⇒ <code>Array.&lt;object&gt;</code>
    * [.sortDescend(arr, key)](#$array.sortDescend) ⇒ <code>Array.&lt;object&gt;</code>
    * [.convertToObject(arr, key)](#$array.convertToObject) ⇒ <code>object</code>
    * [.groupObjects(arr, conds)](#$array.groupObjects) ⇒ <code>Array.&lt;array&gt;</code>

<a name="$array.keyExists"></a>

### $array.keyExists(arr, key) ⇒ <code>boolean</code>
Curried function with checks if a certain key exists within ANY object in the array.

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>boolean</code> - Whether the key exists within any object.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;object&gt;</code> | An array of objects. |
| key | <code>string</code> | The key to check within the objects. |

**Example**  
```js
var exampleArray = [
  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
  { name: "Pedro", lastname: "Algo", age:30  }
];
$array.keyExists(exampleArray)('user_id'); //true
```
<a name="$array.filterByKey"></a>

### $array.filterByKey(arr, key, [newKey]) ⇒ <code>Array.&lt;object&gt;</code>
Curried function which takes an array of objects, a key. Useful with dynamic ionic actionsheet buttons.

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>Array.&lt;object&gt;</code> - An array of objects, each with a single key-value pair.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;object&gt;</code> | An array of objects. |
| key | <code>string</code> | The key to look for in each object. |
| [newKey] | <code>string</code> | Optional. The key to substitute the old key with... if that makes sense. |

**Example**  
```js
var exampleArray = [
  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
  { name: "Pedro", lastname: "Algo", age:30  }
];
$array.filterByKey(exampleArray)('user_id'); //[{user_id:"1234"}, {user_id:"6789"}]
$array.filterByKey(exampleArray)('user_id','id'); //[{id:"1234"}, {id:"6789"}]
```
<a name="$array.reverse"></a>

### $array.reverse(arr) ⇒ <code>array</code>
Reverses the order of items in an array. It's supposed to be faster than the Array.prototype.reverse() method.

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>array</code> - The reversed array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |

**Example**  
```js
var exampleArray = [
  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
  { name: "Pedro", lastname: "Algo", age:30  }
];
$array.reverse(exampleArray);
//[
// { name: "Pedro", lastname: "Algo", age:30  }
// { name: "John", lastname: "Doe", user_id:"6789", age:40 },
// { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }
//]
```
<a name="$array.sortRandom"></a>

### $array.sortRandom(arr) ⇒ <code>array</code>
Randomizes the order of item in the array. Uses the knuth-shuffle.

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>array</code> - An array with randomized order.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>array</code> | An array. |

**Example**  
```js
var exampleArray = [
  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
  { name: "Pedro", lastname: "Algo", age:30  }
];
$array.sortRandom(exampleArray); //randomized array...
```
<a name="$array.sortAscend"></a>

### $array.sortAscend(arr, key) ⇒ <code>Array.&lt;object&gt;</code>
Curried function which sorts the objects in an array in alphabetical order according to the passed key's value.
    Also works if the key's value is a number.

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>Array.&lt;object&gt;</code> - Array with objects sorted  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;object&gt;</code> | An array of objects. |
| key | <code>string</code> | The key with which to sort the array |

**Example**  
```js
var exampleArray = [
  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
  { name: "Pedro", lastname: "Algo", age:30  }
];
$array.sortAscend(exampleArray)('lastname');
//[
//  { name: "Pedro", lastname: "Algo", age:30  },
//  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
//  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }
//]
$array.sortAscend(exampleArray)('age');
//[
//  { name: "Pedro", lastname: "Algo", age:30  },
//  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
//  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 }
//]
```
<a name="$array.sortDescend"></a>

### $array.sortDescend(arr, key) ⇒ <code>Array.&lt;object&gt;</code>
Curried function which sorts the objects in an array in reverse alphabetical order according to the passed key's value.
    Also works if the key's value is a number.

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>Array.&lt;object&gt;</code> - Array with objects sorted.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;object&gt;</code> | An array of objects. |
| key | <code>string</code> | The key with which to sort the array. |

**Example**  
```js
var exampleArray = [
  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
  { name: "Pedro", lastname: "Algo", age:30  }
];
$array.sortDescend(exampleArray)('lastname');
//[
//  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
//  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
//  { name: "Pedro", lastname: "Algo", age:30  }
//]
$array.sortDescend(exampleArray)('age');
//[
//  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
//  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
//  { name: "Pedro", lastname: "Algo", age:30  }
//]
```
<a name="$array.convertToObject"></a>

### $array.convertToObject(arr, key) ⇒ <code>object</code>
A functions which converts an array of objects to an object.
    Designed with the idea of eliminating the need to loop through an array in order to get a specific object.

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>object</code> - Returns the array of objects converted into an object.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;object&gt;</code> | An array of objects. |
| key | <code>string</code> | Takes the key that exisist in all objects in the array. The value of this key will become the key to each object. |

**Example**  
```js
var exampleArray = [
  { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
  { name: "John", lastname: "Doe", user_id:"6789", age:40 },
  { name: "Pedro", lastname: "Algo", age:30  }
];
$array.convertToObject(exampleArray)('lastname');
//{
//  Perez: { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
//  Doe: { name: "John", lastname: "Doe", user_id:"6789", age:40 },
//  Algo: { name: "Pedro", lastname: "Algo", age:30  }
//}
```
<a name="$array.groupObjects"></a>

### $array.groupObjects(arr, conds) ⇒ <code>Array.&lt;array&gt;</code>
A curried function which takes an array of objects to be filtered into groups, an array of function that each return conditionals.
    This funtion is inspired after the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    Array.prototype.filter} method.
    Check the SO [question](http://stackoverflow.com/questions/38559281/array-filter-with-more-than-one-conditional).

**Kind**: static method of <code>[$array](#$array)</code>  
**Returns**: <code>Array.&lt;array&gt;</code> - An array of arrays with the objects grouped in the same order according to the array of callbacks passed.
    All objects which match no conditional, are grouped on the last array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;object&gt;</code> | Array of objects to be grouped.     A function which takes an array of objects and returns an array of arrays with objects grouped according to the conditionals. |
| conds | <code>Array.&lt;callback&gt;</code> | An array of callback functions which each take an object and return a conditional value. |

**Example**  
```js
var exampleArray = [
  { name: "Juan", lastname: "Perez", user_id:"1234", age:42},
  { name: "John", lastname: "Doe", user_id:"6789", age:40},
  { name: "Pedro", lastname: "Algo", age:30}
];
$array.groupObjects(exampleArray)([function(o){ return o.lastname === 'Doe'; }, function(o){ return o.age > 35; }])
//[
//  [
//    { name: "John", lastname: "Doe", user_id:"6789", age:40 }
//  ],
//  [
//    { name: "Juan", lastname: "Perez", user_id:"1234", age:42 },
//    { name: "John", lastname: "Doe", user_id:"6789", age:40 }
//  ],
//  [
//    { name: "Pedro", lastname: "Algo", age:30 }
//  ]
//]
```
