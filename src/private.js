/**
* Helper functions
* @module private
* @private
*/

/**
* @function sort
* @description helper function used by $array#ascend and $array#descend
*/
export function sort(key){
  var sortOrder = 1;
  if(key[0] === "-") {
    sortOrder = -1;
    key = key.substr(1);
  }
  return function(a,b) {
    var result = (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0;
    return result * sortOrder;
  };
}

/**
* @function push
* @description helper function that pushes to an array through assignment
*/
export function push(arr,item){
  arr[arr.length] = item;
}

/**
* @function clone
* @description deep clones an array
*/
export function clone(arr){
  return JSON.parse( JSON.stringify(arr) );
}
