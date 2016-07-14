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
