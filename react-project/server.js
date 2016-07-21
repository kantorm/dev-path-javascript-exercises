const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const pug = require('pug');

const uri = "mongodb://localhost:12345/data";

let surveysArray = [];
let questionsArray = []
let givenCount = 0;
let allCount = 0;
let toHighChart = [];
let textQuestions = [];
let textAnswersArray = [];

let urlencodedParser = bodyParser.urlencoded({
    extended: true
})

//finding surveys in database before rendering
MongoClient.connect(uri, (error, db) => {
    if (error)
        return console.log(error);
    findSurveys(db);
});

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {
        answers: [],
        surveys: surveysArray,
        toHighChart: [],
        textAnswersArray: [],
        textQuestions: []
    });
});

//rendering specified survey that is arleady stored in db
app.get('/surveys/:surveyName', (req, res) => {
    let surveyName = req.params['surveyName'].replace(/-|_/g, ' ')
    let toGenerate = []

    surveysArray.forEach((survey) => {
        if (survey.surveyName == surveyName) {
            toGenerate.push(survey);
        }
    })
    res.render('index', {
        answers: [],
        toHighChart: [],
        textAnswersArray: [],
        textQuestions: [],
        surveys: toGenerate
    })
});

//saving surveys in database
app.post('/surveys', urlencodedParser, (req, res)  => {
    MongoClient.connect(uri, (error, db) => {
        if (error)
            return console.log(error);

        db.collection('surveys').insertOne(req.body, (err, result) => {
            assert.equal(err, null);
            console.log('Inserted a document into the surveys collection.');
        });
        findSurveys(db)
    });
})

app.post('/surveys/:surveyName/results', urlencodedParser, (req, res) => {
    //Adding answers in database
    MongoClient.connect(uri, (error, db)  => {
        if (error)
            return console.log(error);

        db.collection('answers').insertOne(req.body, (err, result) => {
            assert.equal(err, null);
            console.log('Inserted a document into the answers collection.');
            //aggregation
            findQuestions(db, req.body)
            aggregateAnswers(db, req.body, res)
        })
    });
});
//queries to database

//aggregation function
function aggregateAnswers(db, response, resp) {
    let obj = {};
    let flag = true;
    for (let prop in response) {
        if (prop != 'surveyName' && prop != '_id')
            obj[prop] = response[prop]
    }
    for (let question in obj) {
        db.collection('answers').aggregate(
            [{
                $match: {
                    $and: [{
                        'surveyName': response.surveyName
                    }, obj]
                }
            }, {
                $group: {
                    "_id": obj[question],
                    "count": {
                        $sum: 1
                    }
                }
            }]).toArray((err, result) => {
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
        [{
            $match: {
                'surveyName': response.surveyName
            }
        }, {
            $group: {
                '_id': response.surveyName,
                'count': {
                    $sum: 1
                }
            }
        }]).toArray((err, result) => {
        assert.equal(err, null);
        allCount = result[0].count;
        resp.render('index', {
            answers: response,
            allAnswersCount: allCount,
            givenAnswersCount: givenCount,
            surveys: [],
            toHighChart: toHighChart,
            textQuestions: textQuestions,
            textAnswersArray: textAnswersArray
        })
    })
}
//finding surveys to pass to generate function
function findSurveys(db) {
    let array = [];
    let cursor = db.collection('surveys').find();
    cursor.each((err, doc) => {
        assert.equal(err, null);
        if (doc != null) {
            array.push(doc);
        } else {
            surveysArray = array;
            if (surveysArray.length)
                console.log('Found surveys');
        }
    })
}
//building questions array
function findQuestions(db, response) {
    let cursor = db.collection('surveys').find();
    cursor.each((err, doc) => {
        assert.equal(err, null);
        if (doc != null && doc.surveyName == response.surveyName) {
            questionsArray = doc.questions;
            answersCount(db, response);
            toHighChart = []
        }
    })
}
//counting answers for each asnwer option for ech question in survey
function answersCount(db, response) {
    textQuestions = []
    questionsArray.forEach((question) => {
        if (question.fieldType != 'text') {
            let toChartObj = {};
            let countersArray = [];

            toChartObj['questionName'] = question.questionName;
            toChartObj['answerOptions'] = question.answers;
            toChartObj['answers'] = [];
            question.answers.forEach((answerOption) => {
                let matcher = {};
                matcher[question.questionName] = answerOption
                db.collection('answers').aggregate(
                    [{
                        $match: {
                            $and: [{
                                'surveyName': response.surveyName
                            }, matcher]
                        }
                    }, {
                        $group: {
                            '_id': answerOption,
                            'count': {
                                $sum: 1
                            }
                        }
                    }]).toArray((err, result) => {
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
            textQuestions.push(question.questionName)
            textAnswers(db, question, response)
        }
    })
}
//finding input text answers for listening
function textAnswers(db, question, response) {
    let cursor = db.collection('answers').find({
        'surveyName': response.surveyName
    })
    cursor.each((err, doc) => {
        assert.equal(err, null);
        textAnswersArray.push(doc);
    })
}

const server = app.listen(8080, () => {

    const host = server.address().address
    const port = server.address().port

    console.log("React survey app listening at http://%s:%s", host, port)

});
