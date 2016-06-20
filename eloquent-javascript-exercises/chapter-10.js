//Month names
(function(exports) {
  var monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "Sptember", "October", "November", "December"];
  exports.name = function(number) {
    return monthNames[number];
  };
  exports.number = function(name) {
    return monthNames.indexOf(name);
  };
})(this.month = {});
//The module is based on example presented in book.
