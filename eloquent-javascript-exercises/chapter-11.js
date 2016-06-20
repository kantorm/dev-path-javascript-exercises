//Arrays
topEnv["array"] = function() {
  return Array.prototype.slice.call(arguments, 0);
};

topEnv["length"] = function(array) {
  return array.length;
};

topEnv["element"] = function(array, i) {
  return array[i];
};
//Comments
function skipSpace(string) {
  var skippable = string.match(/^(\s|#.*)*/);
  return string.slice(skippable[0].length);
}
