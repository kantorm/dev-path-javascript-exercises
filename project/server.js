var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var pug = require('pug');

var uri = "mongodb://localhost:27017/data";
var surveysArray = [];
var questionsArray = [];

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get(/\w*|\s/g, function (req, res) {
    res.render('index', {answers: 0});
});

app.post('/', urlencodedParser, function (req, res) {
  var response = req.body;
  MongoClient.connect(uri, function(error, db) {
  //saving answers in database
    if (error)
      return console.log(error);
    db.collection('answers').insertOne(response, function(err, result) {
      assert.equal(err, null);
      console.log('Inserted a document into the answers collection.');
//aggregation
      // findQuestionFromSurvey(db, response);
      // console.log(questionsArray);
      // aggregateAnswers(db, response);

      res.render('index', {answers: response});
    })
  });
});

app.post('/surveys' , urlencodedParser, function (req, res) {
  var response = req.body;
  console.log(response);
  // //Adding survey into databse
  MongoClient.connect(uri, function(error, db) {
    if (error)
      return console.log(error);
    db.collection('surveys').insertOne(response, function(err, result) {
      assert.equal(err, null);
      console.log('Inserted a document into the surveys collection.');
    });
  });
  // res.render('index', {surveyTemplate: surveyTemplate, answers: []});
});

//queries to database
//fiding questions for aggregation
var findQuestionFromSurvey = function(db, response) {
  var array = [];
  var cursor = db.collection('surveys').find({name: response.survey})
    cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        array.push(doc.questions);
    } else {
      questionsArray = array;
    }
  });
};

//beta aggregation function
function aggregateAnswers(db, response) {
  questionsArray.forEach(function(question) {
    var aggregateAnswers = function(db) {
      db.collection('answers').aggregate(
        [
          {$match: {'survey': $response.survey}},
          {$group: {"_id": $question.question, "count": {$sum: 1}}}
        ]).toArray(function(err, result) {
          assert.equal(err, null);
          console.log(result);
        });
    };
  });
}

//finding surveys to pas to generate function
var findSurveys = function(db) {
  var array = [];
  var cursor = db.collection('surveys').find();
    surveysArray = cursor.toArray();
}

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Survey app listening at http://%s:%s", host, port)

})
