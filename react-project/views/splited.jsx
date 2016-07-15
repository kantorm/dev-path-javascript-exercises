var SurveysBox = React.createClass({
  render: function() {
    return(
        <SurveyForm/>
    );
  }
});

var SurveyForm = React.createClass({
  survey: {questions: [], surveyName: ''},
  answers: [],
  fieldType: '',

  saveSurveyName: function(name) {
    this.survey.surveyName = name
  },
  saveFieldType: function(type) {
    this.fieldType = type
  },
  saveQuestionName: function(question) {

  },
  addAnswer: function(answerOption) {
    this.answers.push(answerOption)
  },
  addQuestion: function(questionName) {
    this.survey.questions.push({
      questionName: questionName,
      answers: this.answers,
      fieldType: this.fieldType
    })
  },
  saveSurvey: function(event) {
    event.preventDefault();
    $.post('/surveys', this.survey)
    this.survey = {questions: [], surveyName: ''}
  },
  render: function() {
    return(
      <div>
        <form onSubmit={this.saveSurvey}>
          <SurveyName saveSurveyName={this.saveSurveyName}/>
          <Questions addQuestion={this.addQuestion}/>
          <FieldType saveFieldType={this.saveFieldType}/>
          <AnswerOption addAnswer={this.addAnswer}/>
          <SaveButton/>
        </form>
        <GeneratedSurveys survey={this.survey}/>
      </div>
    )
  }
})

var SurveyName = React.createClass({
  saveSurveyName: function(event) {
    this.props.saveSurveyName(event.target.value)
  },
  render: function() {
    return(
        <input name='surveyName' placeholder='Name'
                  onChange={this.saveSurveyName}/>
    )
  }
})

var Questions= React.createClass({
  getInitialState: function() {
    return{
      questionName: ''
    }
  },
  saveQuestionName: function(event) {
    this.setState({
      questionName: event.target.value
    })
  },
  addQuestion: function() {
    this.props.addQuestion(this.state.questionName)
    this.setState({
      questionName: ''
    })
  },
  render: function() {
    return(
      <div style={{display: 'inline'}}>
        <input name='questionName' placeholder='Question'
            value={this.state.questionName}  onChange={this.saveQuestionName}/>
        <input type='button' value='Add question' onClick={this.addQuestion}/>
      </div>
    )
  }
})

var FieldType = React.createClass({
  saveFieldType: function(event) {
    this.props.saveFieldType(event.target.value)
  },
  render: function() {
    return(
      <select name='fieldType' onChange={this.saveFieldType}>
        <option value='radio'>radio</option>
        <option value='checkbox'>checkbox</option>
        <option value='text'>input</option>
      </select>
    )
  }
})

var AnswerOption = React.createClass({
  getInitialState: function() {
    return{
      answerOption: ''
    }
  },
  saveAnswerOption: function(event) {
    this.setState({
      answerOption: event.target.value
    });
  },
  addAnswer: function() {
    this.props.addAnswer(this.state.answerOption)
    this.setState({
      answerOption:''
    })
  },
  render: function() {
    return(
      <div style={{display: 'inline'}}>
        <input name='answerOption' placeholder='Answer option'
                    value={this.state.answerOption} onChange={this.saveAnswerOption}/>
        <input type='button' value='Add answer' onClick={this.addAnswer}/>
      </div>
    )
  }
})

var SaveButton = React.createClass({
  render: function() {
    return(
        <input type='submit' value='Save Survey'/>
    )
  }
})

var GeneratedSurveys = React.createClass({
  render: function() {
    var submitButton;
    if (this.props.survey.surveyName) {
      submitButton = <input type='submit' value='Send Answers'/>
    } else {
      submitButton=''
    }

    var action = `/surveys/${this.props.survey.surveyName.replace(/ /g,'-')}/results`;

    return(
      <div>
        <form action={action} method='POST' name={this.props.survey.surveyName} key={new Date()}>
          <h1>{this.props.survey.surveyName}</h1>
            {this.props.survey.questions.map(function(question){
              return <div>
                        <h3>{question.questionName}</h3> {question.answers.map(function(answerOption){
                          if(question.fieldType == 'text')
                            return <label><input name={question.questionName}/></label>
                          else
                            return <label><input name={question.questionName} type={question.fieldType} value={answerOptipn}/>{answerOptipn}</label>
              })}</div>
          })}<input defaultValue={this.props.survey.surveyName} name='surveyName' style={{display: 'none'}}/>
        {submitButton}
        </form>
      </div>
    )
  }
})
ReactDOM.render( <SurveysBox/>,
  document.getElementById('content')
)
