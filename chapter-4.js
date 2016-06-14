function range(start, end, step) {
  if(!step) {
    step = 1; //default value for step if not given
  }
  var rangeArray = [];

  if(step > 0){
    for (start; start <= end; start += step) {
      rangeArray.push(start);
    }
  }
    else {
      for(start; start >= end; start += step) {
        rangeArray.push(start);
      }
    }
  return rangeArray;
}

function sum(array) {
  var sum = 0;

  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

function reverseArray(array) {
  var reversedArray = [];

  for(var i = array.length - 1; i >= 0; i--) {
    reversedArray.push(array[i]);
  }
  return reversedArray;
}

function reverseArrayInPlace(array) {
  for (var i = 0; i < Math.floor(array.length / 2); i++) {
    var toSwap = array[i]; //swaping values in array
    array[i] = array[array.length - 1 -i];
    array[array.length -1 - i] = toSwap;
  }
  return array;
}

function arrayToList(array) {
  var list = null;

  for (var i = array.length - 1; i >= 0; i--) {
    list = {value: array[i], rest: list}; //building list from inside to outside
  }
  return list;
}

function listToArray(list) {
  var array = [];

  for (var node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

function prepend(value, list) {
  return {value: value, rest: list};
}

function nth(list, x) {
  if(!list) { //checking if list is given
    return undefined;
  }
  else if(x == 0) {
    return list.value;
  }
  else {
    return nth(list.rest, x - 1);
  }
}

function deepEqual(x, y) {
  if (x === y) {
    return true;
  }

  if(x == null || typeof x != "object" || y == null || typeof y != "object") { //typeof null returnes 'objet'
    return false;
  }

  var propsInX = 0, propsInY = 0;

  for (var prop in x) { //counting properties in first object
    propsInX += 1;
  }
  for (var prop in y) { //comparing properties and its values with second object
    propsInY += 1;
    if (!(prop in x) || !deepEqual(x[prop], y[prop]))
    return false;
}

return propsInX == propsInY;
}


console.log(range(1, 10));
console.log(range(5, 2, -1));
console.log(sum(range(1, 10)));

console.log(reverseArray(["A", "B", "C"]));
var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);

console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(nth(arrayToList([10, 20, 30]), 1));

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
