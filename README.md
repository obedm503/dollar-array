# $arrayJS

>A simple JavaScript front end utility library for working with arrays. Originally designed for use in the [StudentAccess](https://github.com/ncai-developers/studentaccess) project.

----
## Installation
```
$ bower install --save dollar-array
```
or
```
$ npm install --save dollar-array
```
----
## Example Usage
```js
var exampleArray = [
  { name: "Juan", lastname: "Perez", user_id:"1234", age:42},
  { name: "John", lastname: "Doe", user_id:"6789", age:40},
  { name: "Pedro", lastname: "Algo", age:30}
];
var array = $array(exampleArray);
array.toObject('lastname');

{
 "Perez": {
  "name": "Juan",
  "lastname": "Perez",
  "user_id": "1234",
  "age": 42
 },
 "Doe": {
  "name": "John",
  "lastname": "Doe",
  "user_id": "6789",
  "age": 40
 },
 "Algo": {
  "name": "Pedro",
  "lastname": "Algo",
  "age": 30
 }
}
```
