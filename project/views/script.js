let surveyToGenerate = new Object();
surveyToGenerate.questions = [];

let answers = [];
$('#addAnswer').click( event => {
  let toAdd = $('#answerField').val();
  answers.push(toAdd);
  $('#answerField').val('').focus();
});

$('#addQuestion').click(event => {
  if (surveyToGenerate.name == undefined)
    surveyToGenerate.name = $('#nameField').val();

  let fieldType = $('#fieldType').val();
  surveyToGenerate.questions.push({
      questionName: $('#questionField').val(),
      answers: answers,
      fieldType: fieldType
  });

  answers = [];
  $('#questionField').val('').focus();
  $('#answerField').val('');
});

$('#surveyFields').submit(event => {

  let data = JSON.stringify(surveyToGenerate)
  $.post('/surveys', data)

  generateSurvey(surveyToGenerate);
  event.preventDefault();
});

function generateSurvey(toGenerate) {
  $('#generated').append(`<div id=${toGenerate.name.replace(/\s/g , '-')}>`)
  let formId = toGenerate.name.replace(/\s/g , '_');
  $(`#${toGenerate.name.replace(/\s/g , '-')}`).append($(`<form id=${formId}>`));
  formId = '#'+formId;
  $(formId).attr({action: '/', method: 'POST'});
  $(formId).append(`<h1>${toGenerate.name}</h1>`);
  $(formId).append(`<input style="display: none" value="${toGenerate.name}" name="surveyName">`)

  for (let question of toGenerate.questions) {
    $(formId).append(`<h3>${question.questionName}</h3>`)

    for (let answer of question.answers) {
      let input = `<label><input name="${question.questionName}
                " type="${question.fieldType}" value="${answer}">${answer}</label>`;
      $(formId).append($(input));
    }
  }
  let submit = '<input type = "submit"/>'
  $(formId).append(submit);

  $('#nameField').val('').focus();

  surveyToGenerate = {};
  surveyToGenerate.questions = [];

}
//highcharts
function generateHighChart(pattern) {
  $(`#${pattern.questionName.replace (/\s/g,'-')}`).highcharts({
    chart: {
      type: 'bar'
    },
    title: {
      text: pattern.questionName
    },
    xAxis: {
      categories: pattern.answerOptions
    },
    yAxis: {
      title: {
        text: 'Answers',
        align: 'high'
      }
    },
    plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                },
            colorByPoint: true
            }
        },
    series: [{
      name: 'Answers amount',
      data: pattern.answers
    }]
  });
}
