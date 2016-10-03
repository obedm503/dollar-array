const $array = require('./dist/$array.min.js');

var key = 'lastname',
filterByKey,
simple,
exampleArray = [
	{ "name": "Juan", "lastname": "Perez", "user_id":"1234", "age": 42 },
	{ "name": "John", "lastname": "Doe", "user_id":"6789", "age": 40 },
	{ "name": "Pedro", "lastname": "Algo", age: 30 }
],
array = $array(exampleArray);

console.log('key: ', `"${key}"`);
console.log('exampleArray: ', exampleArray);
console.log('keyExists: ', array.keyExists(key));
console.log('filterByKey: ', array.filterByKey(key));
console.log('invert: ', array.invert());
console.log('ascend: ', array.ascend(key));
console.log('descend: ', array.descend(key));
console.log('randomize: ', array.randomize());
console.log('random: ', array.random());
console.log('convertToObject: ', array.convertToObject(key));
console.log('groupObjects: ', array.groupObjects([
	o => o[key][0] === 'P',
	o => o[key][0] === 'A'
]));
