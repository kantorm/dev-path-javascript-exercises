var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var test = require('./test');


var uri = "mongodb://localhost:27017/data";
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
});

app.post('/', urlencodedParser, function (req, res) {
  res.send('<html><head></head><body><script>'+survey+'</script></body></html>');

  var response = req.body;
  console.log(response);
  res.end(MongoClient.connect(uri, function(error, db) {
    if (error)
      return console.dir(error);

      db.collection('answers').insertOne(response, function(err, result) {
        assert.equal(err, null);
        console.log('Inserted a document into the answers collection.');
        db.close();
      });
  }))
});

app.post('/surveys', urlencodedParser, function (req, res) {
  res.send('<html><head></head><body><script>'+survey+'</script></body></html>');

  var response = req.body;
  console.log(response);
  res.end(MongoClient.connect(uri, function(error, db) {
    if (error)
      return console.dir(error);

      db.collection('surveys').insertOne(response, function(err, result) {
        assert.equal(err, null);
        console.log('Inserted a document into the surveys collection.');
        db.close();
      });
  }))
});

var findAnswers = function(db, callback) {
  var cursor = db.collection('answers').find();
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      console.log(doc);
    } else {
      callback();
    }
  });
};

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Survey app listening at http://%s:%s", host, port)

})
