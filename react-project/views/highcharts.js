//generating a chart
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
//listing text answers
function listingAnswers(textQuestions, textAnswersArray) {
  for (question of textQuestions) {
    $('#listing').append(`<ul id=${question.replace(/\s/g, '-')}>`)
    for (answer of textAnswersArray) {
      if(answer != null && answer.hasOwnProperty(question) && answer[question] != '')
        $(`#${question.replace(/\s/g, '-')}`).append(`<li> ${answer[question]}</li>`)
      }
    }
}
