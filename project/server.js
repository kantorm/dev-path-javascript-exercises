var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

var survey = ""
fs.readFile('survey.js', 'utf8', function(error, script) {
  if (error)
  throw error
  survey += script;
})

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('<html><head></head><body><script>'+survey+'</script></body></html>');
})

app.post('/results', urlencodedParser, function (req, res) {
  var response = req.body;
  res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Survey app listening at http://%s:%s", host, port)

})
