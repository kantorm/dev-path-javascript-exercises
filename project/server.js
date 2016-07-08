var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var pug = require('pug');

var uri = "mongodb://localhost:27017/data";
var surveysArray = [];
var questionsArray = []
var givenCount = 0;
var allCount = 0;
var toHighChart = [];
var textQuestions = [];
var textAnswersArray = [];

var urlencodedParser = bodyParser.urlencoded({extended: false})
//finding surveys in database before rendering
MongoClient.connect(uri, function(error, db){
  if (error)
    return console.log(error);
  findSurveys(db);
});

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render('index', {answers: [], surveys: surveysArray, toHighChart: [], textAnswersArray: [], textQuestions: []});
});
//route for each created survey
app.get('/surveys/:surveyName', function(req, res) {
  var surveyName = req.params['surveyName'].replace(/-|_/g, ' ')
  var toGenerate = []

  surveysArray.forEach(function(survey) {
    if (JSON.parse(survey.survey).name == surveyName) {
      toGenerate.push(survey);
    }
  })
  res.render('index', {answers: [], toHighChart: [], textAnswersArray: [], textQuestions: [], surveys: toGenerate})
})

app.post('/', urlencodedParser, function (req, res) {

  //Adding answers in database
  MongoClient.connect(uri, function(error, db) {
    if (error)
      return console.log(error);

    db.collection('answers').insertOne(req.body, function(err, result) {
      assert.equal(err, null);
      console.log('Inserted a document into the answers collection.');
      findQuestions(db, req.body)
      //aggregation
       aggregateAnswers(db, req.body, res)
    })
  });
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
    findSurveys(db);
  });
});

//queries to database

//aggregation function
function aggregateAnswers(db, response, resp) {
  var obj = {};
  var flag = true;
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
            if (flag) {
              allAnswers(db, response, resp)
              flag = false
            }
        });
  }
}

//counting all answers
function allAnswers(db, response, resp) {
  db.collection('answers').aggregate(
    [
      {$match: {'surveyName': response.surveyName}},
      {$group: {'_id': response.surveyName, 'count': {$sum: 1}}}
    ]).toArray(function(err, result) {
        assert.equal(err, null);
        allCount = result[0].count;
        resp.render('index', {answers: response, allAnswersCount: allCount,
                     givenAnswersCount: givenCount, surveys: surveysArray, toHighChart: toHighChart,
                      textQuestions: textQuestions, textAnswersArray: textAnswersArray})
    })
}
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
// building questions array
function findQuestions(db, response) {
  var cursor = db.collection('surveys').find();
    cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null && JSON.parse(doc.survey).name == response.surveyName) {
        questionsArray = (JSON.parse(doc.survey).questions);
        answersCount(db, response);
        toHighChart=[]
      }
    })
}
//counting answers for each asnwer option for ech question in survey
function answersCount(db, response) {
  textQuestions = []
  questionsArray.forEach(function(question) {
    if(question.fieldType != 'input') {
      var toChartObj = {};
      var countersArray = [];

      toChartObj['questionName'] = question.questionName;
      toChartObj['answerOptions'] = question.answers;
      toChartObj['answers'] = [];
      question.answers.forEach (function(answerOption) {
        var matcher = {};
        matcher[question.questionName+'\r\n                '] = answerOption
        db.collection('answers').aggregate(
          [
              {$match: {$and: [{'surveyName': response.surveyName}, matcher]}},
              {$group: {'_id': answerOption, 'count': {$sum: 1}}}
          ]).toArray(function(err, result) {
              assert.equal(err, null)
              if (result.length == 0) {
                toChartObj.answers.push(0);
              } else {
                toChartObj.answers.push(result[0].count)
              }
              if (toChartObj.answers.length == toChartObj.answerOptions.length) {
                toHighChart.push(toChartObj);
              }
          });
      });
    } else {
        textQuestions.push(question.questionName+'\r\n                ')
        textAnswers(db, question, response)
      }
  })
}
//finding input text answers for listening
function textAnswers(db, question, response) {
  var cursor = db.collection('answers').find({'surveyName': response.surveyName})
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    textAnswersArray.push(doc);
  })
}
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Survey app listening at http://%s:%s", host, port)

});
