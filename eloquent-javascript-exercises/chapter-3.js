//min
function min(a, b) {
  if(a < b) {
    return a;
  }
  else {
    return b;
  }
}
//isEven
function isEven(a) {
  if (a == 0) {
    return true;
  }
  else if(a == 1) {
    return false;
  }
  else {
    return isEven(a-2);
  }
}
//Bean counter
function countBs(string) {
  var counter = 0;

  for (var i = 0; i < string.length; i++) {
    if(string.charAt(i) == "B") {
      counter++;
    }
  }
  return counter;
}

function countChar(string, charToCount) {
  var counter = 0;

  for (var i = 0; i < string.length; i++) {
    if(string.charAt(i) == charToCount) {
      counter++;
    }
  }
  return counter;
}

console.log(min(0, 10));
console.log(min(0, -10));

console.log(isEven(50));
console.log(isEven(75));
//console.log(isEven(-1));

console.log(countBs("BBC"));
console.log(countChar("kakkerlak", "k"));
