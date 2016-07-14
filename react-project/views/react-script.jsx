//whole page component that should contain survey form, place to generate and place for highcharts
var SurveysBox = React.createClass({
  render: function() {
    return(
      <SurveyForm/>
    );
  }
});

//form that creates survey object to generate
var SurveyForm = React.createClass({
  survey: {questions: [], surveyName: ''},
  answers: [],
  fieldType: '',

  getInitialState: function() {
    return{
      surveyName: '',
      questionName: '',
      answerOption: ''
    };
  },
  saveSurveyName: function(event) {
    this.setState({
      surveyName: event.target.value,
    });
  },
  saveQuestionName: function(event) {
    this.setState({
      questionName: event.target.value,
    });
  },
  saveAnswerOption: function(event) {
    this.setState({
      answerOption: event.target.value
    });
  },
  fieldTypeChange: function(event) {
    this.setState({
      fieldType: event.target.value
    });
  },
  addAnswer: function() {
    this.answers.push(this.state.answerOption)
    this.setState({
      answerOption:''
    });
  },
  addQuestion: function() {
    this.survey.questions.push({
      questionName: this.state.questionName,
      answers: this.answers,
      fieldType: this.state.fieldType
    })
    this.answers= [];
    this.survey.surveyName = this.state.surveyName;
    this.setState({
      questionName:'',
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
          <input name='surveyName' placeholder='Name' value={this.state.surveyName} onChange={this.saveSurveyName}/>
          <input name='questionName' placeholder='Question' value={this.state.questionName} onChange={this.saveQuestionName}/>
          <select name='fieldType' onChange={this.fieldTypeChange}>
            <option value=''>Answer type</option>
            <option value='radio'>radio</option>
            <option value='checkbox'>checkbox</option>
            <option value='input'>input</option>
          </select>
          <input name='answerOption' placeholder='Answer option' value={this.state.answerOption} onChange={this.saveAnswerOption}/>
          <input type='button' value='Add answer' onClick={this.addAnswer}/>
          <input type='button' value='Add question' onClick={this.addQuestion}/>
          <input type='submit' value='Save'/>
        </form>
        <GeneratedSurveys survey={this.survey}/>
      </div>
    );
  }
});

//place where survey should be generated
var GeneratedSurveys = React.createClass({

  render: function() {
    var answers = this.props.survey.questions.map(function(question) {
        return  question.answers.map(function(answerOption) {
          return <label key={answerOption}><input type={question.fieldType} value={answerOption} name={question.questionName} />{answerOption}</label>
        })
    });
    var submitButton;
    if (this.props.survey.surveyName) {
      submitButton = <input type='submit' value='Send Answers'/>
    } else {
      submitButton=''
    }
    var action = `/surveys/${this.props.survey.surveyName.replace(/ /g,'-')}/results`;
    return(
      <div>
        <form key={this.props.survey.surveyName} action={action} method='POST' name={this.props.survey.surveyName}>
        <h1>{this.props.survey.surveyName}</h1>
          {this.props.survey.questions.map(function(question, index){
            return <div><h3 key={question.questionName}>{question.questionName}</h3>{answers[index]}</div>
            })
          }
          <input defaultValue={this.props.survey.surveyName} name='surveyName' style={{display: 'none'}}/>
          {submitButton}
        </form>
    </div>);
  }
});

ReactDOM.render( <SurveysBox/>,
  document.getElementById('content')
)
