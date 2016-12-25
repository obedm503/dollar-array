const $array = require('./dist/dollar-array.min.js');

var key = 'lastname',
filterByProp,
simple,
exampleArray = [
	{ "name": "Juan", "lastname": "Perez", "user_id":"1234", "age": 42 },
	{ "name": "John", "lastname": "Doe", "user_id":"6789", "age": 40 },
	{ "name": "Pedro", "lastname": "Algo", age: 30 }
],
array = $array(exampleArray);

function log(word, arr){
  console.log(`${ word }: \n--------------\n\n${ JSON.stringify(arr, null, 2) } \n\n`)
}


log(`key`, key);
log(`exampleArrayl`, exampleArray);
log(`propExists("${key}")`, array.propExists(key));
log(`filterByProp("${key}")`, array.filterByProp(key));
log(`invert()`, array.invert(true));
log(`ascend("${key}")`, array.ascend(key, true));
log(`descend("${key}")`, array.descend(key, true));
log(`randomize()`, array.randomize(true));
log(`random()`, array.random());
log(`toObject("${key}")`, array.toObject(key));
log(`group([])`, array.group([
  o => o[key][0] === 'A',
  o => o[key][0] === 'P'
]));
log(`group({})`, array.group({
  A: o => o[key][0] === 'A',
  P: o => o[key][0] === 'P'
}));
