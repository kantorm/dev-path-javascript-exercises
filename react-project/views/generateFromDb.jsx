var GenerateFromDb = React.createClass({
  render: function() {
    return (
      <div>{surveysArray.map(function(survey) {
        var action = `/surveys/${survey.surveyName.replace(/ /g,'-')}/results`;

          return <form key={survey._id}action={action} method='POST' name={survey.surveyName}>
                    <h1>{survey.surveyName}</h1> {survey.questions.map(function(question){
            return    <div key={survey._id+question.questionName}>
                        <h3>{question.questionName}</h3> {question.answers.map(function(answerOption){
              return      <label key={survey._id+answerOption}><input name={question.questionName} type={question.fieldType} value={answerOption} />
                  {answerOption}</label>
            })}</div>
        })}<input defaultValue={survey.surveyName} name='surveyName' style={{display: 'none'}}/>
        <input type='submit' value='Send Answers'/></form>
        })}
    </div>
    )
  }
})
ReactDOM.render(<GenerateFromDb/>, document.getElementById('from-database'))
