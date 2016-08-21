# $arrayJS

### A simple JavaScript front end utility library for working with arrays of objects. Originally designed for use in [StudentAccess](https://github.com/ncai-developers/studentaccess) project.
----
## Installation
  npm i -S obedm503-array
----
## Example Usage
For more examples check the DOCS.md file.
```js
var exampleArray = [
  { name: "Juan", lastname: "Perez", user_id:"1234", age:42},
  { name: "John", lastname: "Doe", user_id:"6789", age:40},
  { name: "Pedro", lastname: "Algo", age:30}
];

$array.groupObjects(exampleArray)([
	function(o){ return o.lastname === 'Doe'; },
	function(o){ return o.age > 35; }
]);

//returns:
[
  [
    {
      name: "John",
      lastname: "Doe",
      user_id:"6789",
      age:40
    }
  ],
  [
    {
      name: "Juan",
      lastname: "Perez",
      user_id:"1234",
      age:42
    },
    {
      name: "John",
      lastname: "Doe",
      user_id:"6789",
      age:40
    }
  ],
  [
    {
      name: "Pedro",
      lastname: "Algo",
      age:30
    }
  ]
]
```
----
## Docs
Docs live in the DOCS.md file.
----
## License
MIT
