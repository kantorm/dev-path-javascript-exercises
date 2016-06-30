var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var pug = require('pug');

var uri = "mongodb://localhost:12345/data";
var surveyTemplate = "";
var answersArray = [];
var surveysArray = [];

fs.readFile('views/survey.js', 'utf8', function(error, script) {
  if (error)
    throw error
  surveyTemplate += script;
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render('index', {surveyTemplate: surveyTemplate, answers: []});
});

app.post('/', urlencodedParser, function (req, res) {
  var response = req.body;
  console.log();
  MongoClient.connect(uri, function(error, db) {
  //saving answers in database
    if (error)
      return console.log(error);
    db.collection('answers').insertOne(response, function(err, result) {
      assert.equal(err, null);
      console.log('Inserted a document into the answers collection.');

      res.render('index', {surveyTemplate: surveyTemplate, answers: response});
  })
});
});

app.post(/\w|\s/g , urlencodedParser, function (req, res) {
  var response = req.body;
  var response = JSON.parse(response.survey);
  console.log(response.questions);
  //Adding survey into databse
  MongoClient.connect(uri, function(error, db) {
    if (error)
      return console.log(error);
    db.collection('surveys').insertOne(response, function(err, result) {
      assert.equal(err, null);
      console.log('Inserted a document into the surveys collection.');
    });
  });
  res.render('index', {surveyTemplate: surveyTemplate, answers: []});
});

//queries to database
var findQuestionFromSurvey = function(db, response) {
  var cursor = db.collection('surveys').find({name: response.survey})
    cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        console.log(doc.questions);
    }
  });
};

var findAnswers = function(db, response) {
  var array = [];
  var cursor = db.collection('answers').find({survey: response.survey});
    cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      array.push(doc);
    } else {
      answersArray = array;
    }
  });
};

var findSurveys = function(db) {
  var array = [];
  var cursor = db.collection('surveys').find();
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      array.push(doc)
    } else {
      surveysArray = array;
    }
  });
};

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Survey app listening at http://%s:%s", host, port)

})
