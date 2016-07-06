var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var pug = require('pug');

var uri = "mongodb://localhost:27017/data";
var surveysArray = [];
var givenCount = 0;
var allCount = 0;

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get(/\w*|\s/g, function (req, res) {
  MongoClient.connect(uri, function(error, db){
    findSurveys(db);
    res.render('index', {answers: 0, surveys: surveysArray});
  })
});

app.post('/', urlencodedParser, function (req, res) {

  //Adding answers in database
  MongoClient.connect(uri, function(error, db) {
    if (error)
      return console.log(error);

    db.collection('answers').insertOne(req.body, function(err, result) {
      assert.equal(err, null);
      console.log('Inserted a document into the answers collection.');

      //aggregation
       aggregateAnswers(db, req.body)
       allAnswers(db, req.body)
    })
  });
  res.render('index', {answers: req.body, allAnswersCount: allCount, givenAnswersCount: givenCount});
});

app.post('/surveys' , urlencodedParser, function (req, res) {
  var response = {}
  for (var element in req.body) {
    response.survey = element
  }

 //Adding survey into databse
  MongoClient.connect(uri, function(error, db) {
    if (error)
      return console.log(error);

    db.collection('surveys').insertOne(response, function(err, result) {
      assert.equal(err, null);
      console.log('Inserted a document into the surveys collection.');
    });
  });
});

//queries to database

//beta2.0 aggregation function
function aggregateAnswers(db, response) {
  var obj = {};
  for (var prop in response) {
    if(prop != 'surveyName' && prop != '_id')
      obj[prop] = response[prop]
  }
  for (var question in obj) {
     db.collection('answers').aggregate(
        [
          {$match: {$and: [{'surveyName': response.surveyName}, obj]}},
          {$group: {"_id": obj[question], "count": {$sum: 1}}}
        ]).toArray(function(err, result) {

            assert.equal(err, null);
            givenCount = result[0].count;
        });
  }
}
function allAnswers(db, response) {
  db.collection('answers').aggregate(
    [
      {$match: {'surveyName': response.surveyName}},
      {$group: {'_id': response.surveyName, 'count': {$sum: 1}}}
    ]).toArray(function(err, result) {
        assert.equal(err, null);
        allCount = result[0].count;
    })
}
//finding surveys to pas to generate function
var findSurveys = function(db) {
  var array = [];
  var cursor = db.collection('surveys').find();
    cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        array.push(doc);
      } else {
        surveysArray = array;
      }
    })
}

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Survey app listening at http://%s:%s", host, port)

})
