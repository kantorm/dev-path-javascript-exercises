(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SurveyForm = function (_React$Component) {
  _inherits(SurveyForm, _React$Component);

  function SurveyForm() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, SurveyForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SurveyForm)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.survey = { questions: [], surveyName: '' }, _this.answers = [], _this.fieldType = '', _this.saveSurveyName = function (name) {
      _this.survey.surveyName = name;
    }, _this.saveFieldType = function (type) {
      _this.fieldType = type;
    }, _this.addAnswer = function (answerOption) {
      _this.answers.push(answerOption);
    }, _this.addQuestion = function (questionName) {
      if (_this.fieldType == '') _this.fieldType = 'radio';
      _this.survey.questions.push({
        questionName: questionName,
        answers: _this.answers,
        fieldType: _this.fieldType
      });
      console.log(_this.survey);
      _this.answers = [];
    }, _this.saveSurvey = function (event) {
      event.preventDefault();
      $.post('/surveys', _this.survey);
      surveysArray.unshift(_this.survey);
      _this.survey = { questions: [], surveyName: '' };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // class properties


  _createClass(SurveyForm, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'form',
          { onSubmit: this.saveSurvey },
          React.createElement(SurveyName, { saveSurveyName: this.saveSurveyName }),
          React.createElement(Questions, { addQuestion: this.addQuestion }),
          React.createElement(FieldType, { saveFieldType: this.saveFieldType }),
          React.createElement(AnswerOption, { addAnswer: this.addAnswer }),
          React.createElement(SaveButton, null)
        )
      );
    }
  }]);

  return SurveyForm;
}(React.Component);

var SurveyName = function (_React$Component2) {
  _inherits(SurveyName, _React$Component2);

  function SurveyName() {
    var _Object$getPrototypeO2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, SurveyName);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(SurveyName)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this2), _this2.saveSurveyName = function (event) {
      _this2.props.saveSurveyName(event.target.value);
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  _createClass(SurveyName, [{
    key: 'render',
    value: function render() {
      return React.createElement('input', { name: 'surveyName', placeholder: 'Name',
        onChange: this.saveSurveyName });
    }
  }]);

  return SurveyName;
}(React.Component);

var Questions = function (_React$Component3) {
  _inherits(Questions, _React$Component3);

  function Questions() {
    _classCallCheck(this, Questions);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Questions).call(this));

    _this3.saveQuestionName = function (event) {
      _this3.setState({
        questionName: event.target.value
      });
    };

    _this3.addQuestion = function () {
      _this3.props.addQuestion(_this3.state.questionName);
      _this3.setState({
        questionName: ''
      });
    };

    _this3.state = {
      questionName: ''
    };
    return _this3;
  }

  _createClass(Questions, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { style: { display: 'inline' } },
        React.createElement('input', { name: 'questionName', placeholder: 'Question',
          value: this.state.questionName, onChange: this.saveQuestionName }),
        React.createElement('input', { type: 'button', value: 'Add question', onClick: this.addQuestion })
      );
    }
  }]);

  return Questions;
}(React.Component);

var FieldType = function (_React$Component4) {
  _inherits(FieldType, _React$Component4);

  function FieldType() {
    var _Object$getPrototypeO3;

    var _temp3, _this4, _ret3;

    _classCallCheck(this, FieldType);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp3 = (_this4 = _possibleConstructorReturn(this, (_Object$getPrototypeO3 = Object.getPrototypeOf(FieldType)).call.apply(_Object$getPrototypeO3, [this].concat(args))), _this4), _this4.saveFieldType = function (event) {
      _this4.props.saveFieldType(event.target.value);
    }, _temp3), _possibleConstructorReturn(_this4, _ret3);
  }

  _createClass(FieldType, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'select',
        { name: 'fieldType', onChange: this.saveFieldType },
        React.createElement(
          'option',
          { value: 'radio' },
          'radio'
        ),
        React.createElement(
          'option',
          { value: 'checkbox' },
          'checkbox'
        ),
        React.createElement(
          'option',
          { value: 'text' },
          'input'
        )
      );
    }
  }]);

  return FieldType;
}(React.Component);

var AnswerOption = function (_React$Component5) {
  _inherits(AnswerOption, _React$Component5);

  function AnswerOption() {
    _classCallCheck(this, AnswerOption);

    var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(AnswerOption).call(this));

    _this5.saveAnswerOption = function (event) {
      _this5.setState({
        answerOption: event.target.value
      });
    };

    _this5.addAnswer = function () {
      _this5.props.addAnswer(_this5.state.answerOption);
      _this5.setState({
        answerOption: ''
      });
    };

    _this5.state = {
      answerOption: ''
    };
    return _this5;
  }

  _createClass(AnswerOption, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { style: { display: 'inline' } },
        React.createElement('input', { name: 'answerOption', placeholder: 'Answer option',
          value: this.state.answerOption, onChange: this.saveAnswerOption }),
        React.createElement('input', { type: 'button', value: 'Add answer', onClick: this.addAnswer })
      );
    }
  }]);

  return AnswerOption;
}(React.Component);

var SaveButton = function (_React$Component6) {
  _inherits(SaveButton, _React$Component6);

  function SaveButton() {
    _classCallCheck(this, SaveButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SaveButton).apply(this, arguments));
  }

  _createClass(SaveButton, [{
    key: 'render',
    value: function render() {
      return React.createElement('input', { type: 'submit', value: 'Save Survey' });
    }
  }]);

  return SaveButton;
}(React.Component);

var SurveysBox = function (_React$Component7) {
  _inherits(SurveysBox, _React$Component7);

  function SurveysBox() {
    _classCallCheck(this, SurveysBox);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SurveysBox).apply(this, arguments));
  }

  _createClass(SurveysBox, [{
    key: 'render',
    value: function render() {
      return React.createElement(SurveyForm, null);
    }
  }]);

  return SurveysBox;
}(React.Component);

;
ReactDOM.render(React.createElement(SurveysBox, null), document.getElementById('create-survey-form'));

},{}]},{},[1]);
