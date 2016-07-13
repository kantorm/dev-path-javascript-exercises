var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var uri = "mongodb://localhost:27017/data";

var urlencodedParser = bodyParser.urlencoded({extended: true})
//finding surveys in database before rendering
MongoClient.connect(uri, function(error, db){
  if (error)
    return console.log(error);
  findSurveys(db);
});

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  console.log('get is on fire');
  //res.send("index")

});

app.post('/surveys', urlencodedParser, function(req, res) {
  MongoClient.connect(uri, function(error, db) {
    if (error)
      return console.log(error);

    db.collection('surveys').insertOne(req.body, function(err, result) {
      assert.equal(err, null);
      console.log('Inserted a document into the surveys collection.');
    });
  });
})
//database queries
//finding surveys to pas to generate function
function findSurveys(db) {
  var array = [];
  var cursor = db.collection('surveys').find();
    cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        array.push(doc);
      } else {
        surveysArray = array;
        console.log('foud surveys');
      }
    })
}


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("React survey app listening at http://%s:%s", host, port)

});
