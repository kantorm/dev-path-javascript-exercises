//Flattening
function flattening(array) {
  var flattened = array.reduce(function(a, b) {
    return a.concat(b);
  });
  return flattened;
}

//Mother-child age difference
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

var differencesInAge = ancestry.filter(function(person) {
  return byName[person.mother] != null; //people who has a mother
}).map(function(person) {
  return person.born - byName[person.mother].born;
});

//Historical life expectancy
function groupBy(array, groupOf) {
  var groups = {};
  array.forEach(function(element) {
    var groupName = groupOf(element);
    if (groupName in groups)
      groups[groupName].push(element);
    else
      groups[groupName] = [element];
  });
  return groups;
}

var byCentury = groupBy(ancestry, function(person) {
  return Math.ceil(person.died / 100);
});

for (var century in byCentury) {
  var ages = byCentury[century].map(function(person) {
    return person.died - person.born;
  });
  console.log(century + ": " + average(ages));
}

//Every and then some
function every(array, criterion) {
  var isEvery;
  array.forEach(function(element) {
    if(!criterion(element))
      isEvery = false;
    else
      isEvery = true;
  })
  return isEvery;
}

function some(array, criteria) {
  for (var i = 0; i < array.length; i++) {
    if (criteria(array[i]))
      return true;
  }
  return false;
}


console.log(flattening([[1, 2, 3], [4, 5], [6]]));

console.log(average(ancestry(differences)));

console.log(every([NaN, NaN, NaN], isNaN));
console.log(every([NaN, NaN, 4], isNaN));

console.log(some([NaN, 3, 4], isNaN));
console.log(some([2, 3, 4], isNaN));
