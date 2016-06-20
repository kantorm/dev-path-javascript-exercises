//First round
function charCounter(string) {
  var charsCounted = {};
  var chars = string.split("");
  chars.forEach(function(char) {
    if(!(char in charsCounted)) {
      var counter = 0;
      for(var i = 0; i< string.length; i++) {
        if(string.charAt(i) == char)
          counter++;
        }
      charsCounted[char] = counter;
    }
  });
  for(char in charsCounted) {
    console.log(char+ ": "+ charsCounted[char])
  }
}

//Second round
function specificCharCounter(string, charsToCount) {
  var charsCounted = {};
  charsToCount.forEach(function(char) {
    if(!(char in charsCounted)) {
      var counter = 0;
      for(var i = 0; i< string.length; i++) {
        if(string.charAt(i) == char)
          counter++;
        }
      charsCounted[char] = counter;
    }
  });
  for(char in charsCounted) {
    console.log(char+ ": "+ charsCounted[char])
  }
}

//Third round
function excludedCharCounter(string, excludedChars) {
  var charsCounted = {};
  var chars = string.split("");
  chars.forEach(function(char) {
    if(!(char in charsCounted) && excludedChars.indexOf(char) == -1) {
      var counter = 0;
      for(var i = 0; i< string.length; i++) {
        if(string.charAt(i) == char)
          counter++;
        }
      charsCounted[char] = counter;
    }
  });
  for(char in charsCounted) {
    console.log(char+ ": "+ charsCounted[char])
  }
}
charCounter("sssaaabbbasssadasds");
specificCharCounter("sssaaabbbasssadasds", ['d','a']);
excludedCharCounter("sssaaabbbasssadasds", ['d','a']);
