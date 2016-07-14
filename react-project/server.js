var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var pug = require('pug');

var uri = "mongodb://localhost:12345/data";
var surveysArray = [];
var questionsArray = []
var givenCount = 0;
var allCount = 0;
var toHighChart = [];
var textQuestions = [];
var textAnswersArray = [];

var urlencodedParser = bodyParser.urlencoded({extended: true})
//finding surveys in database before rendering
MongoClient.connect(uri, function(error, db){
  if (error)
    return console.log(error);
  findSurveys(db);
});

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index', {surveys: surveysArray})
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

app.post('/surveys/:surveyName/results', urlencodedParser, function (req, res) {
  //Adding answers in database
  console.log(req.body);
  MongoClient.connect(uri, function(error, db) {
    if (error)
      return console.log(error);

    db.collection('answers').insertOne(req.body, function(err, result) {
      assert.equal(err, null);
      console.log('Inserted a document into the answers collection.');
      // findQuestions(db, req.body)
      // //aggregation
      //  aggregateAnswers(db, req.body, res)
    })
  });
});

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


var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("React survey app listening at http://%s:%s", host, port)

});
