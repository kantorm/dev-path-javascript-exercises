var express = require('express');
var app = express();
var fs = require('fs');

var survey = ""
fs.readFile('survey.js', 'utf8', function(error, script) {
  if (error)
  throw error
  survey += script;
})

app.get('/', function (req, res) {
  res.send('<html><head></head><body><script>'+survey+'</script></body></html>');
})



var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
