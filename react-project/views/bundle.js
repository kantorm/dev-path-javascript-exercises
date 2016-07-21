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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SurveyForm)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.survey = {
            questions: [],
            surveyName: ''
        }, _this.answers = [], _this.fieldType = '', _this.saveSurveyName = function (name) {
            _this.survey.surveyName = name;
        }, _this.saveFieldType = function (type) {
            _this.fieldType = type;
        }, _this.addAnswer = function (answerOption) {
            _this.answers.push(answerOption);
        }, _this.addQuestion = function (questionName) {
            if (_this.fieldType == '') _this.fieldType = 'radio';
            _this.survey.questions.push({ questionName: questionName, answers: _this.answers, fieldType: _this.fieldType });
            _this.answers = [];
        }, _this.saveSurvey = function (event) {
            event.preventDefault();
            $.post('/surveys', _this.survey);
            surveysArray.unshift(_this.survey);
            alert('Survey has been saved!');
            _this.survey = {
                questions: [],
                surveyName: ''
            };
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
            var _this3 = this;

            return React.createElement('input', { name: 'surveyName', placeholder: 'Name', onChange: this.saveSurveyName, ref: function ref(c) {
                    return _this3._input = c;
                } });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._input.focus();
        }
    }]);

    return SurveyName;
}(React.Component);

var Questions = function (_React$Component3) {
    _inherits(Questions, _React$Component3);

    function Questions() {
        _classCallCheck(this, Questions);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Questions).call(this));

        _this4.saveQuestionName = function (event) {
            _this4.setState({ questionName: event.target.value });
        };

        _this4.addQuestion = function () {
            _this4.props.addQuestion(_this4.state.questionName);
            _this4.setState({ questionName: '' });
        };

        _this4.state = {
            questionName: ''
        };
        return _this4;
    }

    _createClass(Questions, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { style: {
                        display: 'inline'
                    } },
                React.createElement('input', { name: 'questionName', placeholder: 'Question', value: this.state.questionName, onChange: this.saveQuestionName }),
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

        var _temp3, _this5, _ret3;

        _classCallCheck(this, FieldType);

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return _ret3 = (_temp3 = (_this5 = _possibleConstructorReturn(this, (_Object$getPrototypeO3 = Object.getPrototypeOf(FieldType)).call.apply(_Object$getPrototypeO3, [this].concat(args))), _this5), _this5.saveFieldType = function (event) {
            _this5.props.saveFieldType(event.target.value);
        }, _temp3), _possibleConstructorReturn(_this5, _ret3);
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

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(AnswerOption).call(this));

        _this6.saveAnswerOption = function (event) {
            _this6.setState({ answerOption: event.target.value });
        };

        _this6.addAnswer = function () {
            _this6.props.addAnswer(_this6.state.answerOption);
            _this6.setState({ answerOption: '' });
        };

        _this6.state = {
            answerOption: ''
        };
        return _this6;
    }

    _createClass(AnswerOption, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { style: {
                        display: 'inline'
                    } },
                React.createElement('input', { name: 'answerOption', placeholder: 'Answer option', value: this.state.answerOption, onChange: this.saveAnswerOption }),
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

ReactDOM.render(React.createElement(SurveyForm, null), document.getElementById('create-survey-form'));

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ2aWV3cy9zcGxpdGVkLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBTSxVOzs7Ozs7Ozs7Ozs7Ozs0TUFFRixNLEdBQVM7QUFDTCx1QkFBVyxFQUROO0FBRUwsd0JBQVk7QUFGUCxTLFFBSVQsTyxHQUFVLEUsUUFDVixTLEdBQVksRSxRQUVaLGMsR0FBaUIsVUFBQyxJQUFELEVBQVU7QUFDdkIsa0JBQUssTUFBTCxDQUFZLFVBQVosR0FBeUIsSUFBekI7QUFDSCxTLFFBQ0QsYSxHQUFnQixVQUFDLElBQUQsRUFBVTtBQUN0QixrQkFBSyxTQUFMLEdBQWlCLElBQWpCO0FBQ0gsUyxRQUNELFMsR0FBWSxVQUFDLFlBQUQsRUFBa0I7QUFDMUIsa0JBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsWUFBbEI7QUFDSCxTLFFBQ0QsVyxHQUFjLFVBQUMsWUFBRCxFQUFrQjtBQUM1QixnQkFBSSxNQUFLLFNBQUwsSUFBa0IsRUFBdEIsRUFDSSxNQUFLLFNBQUwsR0FBaUIsT0FBakI7QUFDSixrQkFBSyxNQUFMLENBQVksU0FBWixDQUFzQixJQUF0QixDQUEyQixFQUFDLGNBQWMsWUFBZixFQUE2QixTQUFTLE1BQUssT0FBM0MsRUFBb0QsV0FBVyxNQUFLLFNBQXBFLEVBQTNCO0FBQ0Esa0JBQUssT0FBTCxHQUFlLEVBQWY7QUFDSCxTLFFBQ0QsVSxHQUFhLFVBQUMsS0FBRCxFQUFXO0FBQ3BCLGtCQUFNLGNBQU47QUFDQSxjQUFFLElBQUYsQ0FBTyxVQUFQLEVBQW1CLE1BQUssTUFBeEI7QUFDQSx5QkFBYSxPQUFiLENBQXFCLE1BQUssTUFBMUI7QUFDQSxrQkFBTSx3QkFBTjtBQUNBLGtCQUFLLE1BQUwsR0FBYztBQUNWLDJCQUFXLEVBREQ7QUFFViw0QkFBWTtBQUZGLGFBQWQ7QUFJSCxTOztBQWhDRDs7Ozs7aUNBaUNTO0FBQ0wsbUJBQ0k7QUFBQTtBQUFB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QUNULDBCQUFjO0FBREwsU0FBYjtBQUZVO0FBS2I7Ozs7aUNBUVE7QUFDTCxtQkFDSTtBQUFBO0FBQUEsa0JBQUssT0FBTztBQUNSLGlDQUFTO0FBREQscUJBQVo7QUFHSSwrQ0FBTyxNQUFLLGNBQVosRUFBMkIsYUFBWSxlQUF2QyxFQUF1RCxPQUFPLEtBQUssS0FBTCxDQUFXLFlBQXpFLEVBQXVGLFVBQVUsS0FBSyxnQkFBdEcsR0FISjtBQUlJLCtDQUFPLE1BQUssUUFBWixFQUFxQixPQUFNLFlBQTNCLEVBQXdDLFNBQVMsS0FBSyxTQUF0RDtBQUpKLGFBREo7QUFRSDs7OztFQXZCc0IsTUFBTSxTOztJQTBCM0IsVTs7Ozs7Ozs7Ozs7aUNBQ087QUFDTCxtQkFBUSwrQkFBTyxNQUFLLFFBQVosRUFBcUIsT0FBTSxhQUEzQixHQUFSO0FBQ0g7Ozs7RUFIb0IsTUFBTSxTOztBQU0vQixTQUFTLE1BQVQsQ0FDSSxvQkFBQyxVQUFELE9BREosRUFDbUIsU0FBUyxjQUFULENBQXdCLG9CQUF4QixDQURuQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBTdXJ2ZXlGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICAvLyBjbGFzcyBwcm9wZXJ0aWVzXG4gICAgc3VydmV5ID0ge1xuICAgICAgICBxdWVzdGlvbnM6IFtdLFxuICAgICAgICBzdXJ2ZXlOYW1lOiAnJ1xuICAgIH1cbiAgICBhbnN3ZXJzID0gW11cbiAgICBmaWVsZFR5cGUgPSAnJ1xuXG4gICAgc2F2ZVN1cnZleU5hbWUgPSAobmFtZSkgPT4ge1xuICAgICAgICB0aGlzLnN1cnZleS5zdXJ2ZXlOYW1lID0gbmFtZVxuICAgIH1cbiAgICBzYXZlRmllbGRUeXBlID0gKHR5cGUpID0+IHtcbiAgICAgICAgdGhpcy5maWVsZFR5cGUgPSB0eXBlXG4gICAgfVxuICAgIGFkZEFuc3dlciA9IChhbnN3ZXJPcHRpb24pID0+IHtcbiAgICAgICAgdGhpcy5hbnN3ZXJzLnB1c2goYW5zd2VyT3B0aW9uKTtcbiAgICB9XG4gICAgYWRkUXVlc3Rpb24gPSAocXVlc3Rpb25OYW1lKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmZpZWxkVHlwZSA9PSAnJylcbiAgICAgICAgICAgIHRoaXMuZmllbGRUeXBlID0gJ3JhZGlvJ1xuICAgICAgICB0aGlzLnN1cnZleS5xdWVzdGlvbnMucHVzaCh7cXVlc3Rpb25OYW1lOiBxdWVzdGlvbk5hbWUsIGFuc3dlcnM6IHRoaXMuYW5zd2VycywgZmllbGRUeXBlOiB0aGlzLmZpZWxkVHlwZX0pXG4gICAgICAgIHRoaXMuYW5zd2VycyA9IFtdXG4gICAgfVxuICAgIHNhdmVTdXJ2ZXkgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJC5wb3N0KCcvc3VydmV5cycsIHRoaXMuc3VydmV5KVxuICAgICAgICBzdXJ2ZXlzQXJyYXkudW5zaGlmdCh0aGlzLnN1cnZleSlcbiAgICAgICAgYWxlcnQoJ1N1cnZleSBoYXMgYmVlbiBzYXZlZCEnKVxuICAgICAgICB0aGlzLnN1cnZleSA9IHtcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW10sXG4gICAgICAgICAgICBzdXJ2ZXlOYW1lOiAnJ1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuc2F2ZVN1cnZleX0+XG4gICAgICAgICAgICAgICAgICAgIDxTdXJ2ZXlOYW1lIHNhdmVTdXJ2ZXlOYW1lPXt0aGlzLnNhdmVTdXJ2ZXlOYW1lfS8+XG4gICAgICAgICAgICAgICAgICAgIDxRdWVzdGlvbnMgYWRkUXVlc3Rpb249e3RoaXMuYWRkUXVlc3Rpb259Lz5cbiAgICAgICAgICAgICAgICAgICAgPEZpZWxkVHlwZSBzYXZlRmllbGRUeXBlPXt0aGlzLnNhdmVGaWVsZFR5cGV9Lz5cbiAgICAgICAgICAgICAgICAgICAgPEFuc3dlck9wdGlvbiBhZGRBbnN3ZXI9e3RoaXMuYWRkQW5zd2VyfS8+XG4gICAgICAgICAgICAgICAgICAgIDxTYXZlQnV0dG9uLz5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuY2xhc3MgU3VydmV5TmFtZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc2F2ZVN1cnZleU5hbWUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5zYXZlU3VydmV5TmFtZShldmVudC50YXJnZXQudmFsdWUpXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuICg8aW5wdXQgbmFtZT0nc3VydmV5TmFtZScgcGxhY2Vob2xkZXI9J05hbWUnIG9uQ2hhbmdlPXt0aGlzLnNhdmVTdXJ2ZXlOYW1lfSByZWY9eyhjKSA9PiB0aGlzLl9pbnB1dCA9IGN9Lz4pXG4gICAgfVxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuX2lucHV0LmZvY3VzKCk7XG4gIH1cbn1cblxuY2xhc3MgUXVlc3Rpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHF1ZXN0aW9uTmFtZTogJydcbiAgICAgICAgfVxuICAgIH1cbiAgICBzYXZlUXVlc3Rpb25OYW1lID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3F1ZXN0aW9uTmFtZTogZXZlbnQudGFyZ2V0LnZhbHVlfSlcbiAgICB9XG4gICAgYWRkUXVlc3Rpb24gPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMuYWRkUXVlc3Rpb24odGhpcy5zdGF0ZS5xdWVzdGlvbk5hbWUpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3F1ZXN0aW9uTmFtZTogJyd9KVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZSdcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIDxpbnB1dCBuYW1lPSdxdWVzdGlvbk5hbWUnIHBsYWNlaG9sZGVyPSdRdWVzdGlvbicgdmFsdWU9e3RoaXMuc3RhdGUucXVlc3Rpb25OYW1lfSBvbkNoYW5nZT17dGhpcy5zYXZlUXVlc3Rpb25OYW1lfS8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J2J1dHRvbicgdmFsdWU9J0FkZCBxdWVzdGlvbicgb25DbGljaz17dGhpcy5hZGRRdWVzdGlvbn0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmNsYXNzIEZpZWxkVHlwZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc2F2ZUZpZWxkVHlwZSA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLnNhdmVGaWVsZFR5cGUoZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VsZWN0IG5hbWU9J2ZpZWxkVHlwZScgb25DaGFuZ2U9e3RoaXMuc2F2ZUZpZWxkVHlwZX0+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0ncmFkaW8nPnJhZGlvPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nY2hlY2tib3gnPmNoZWNrYm94PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0ndGV4dCc+aW5wdXQ8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICApXG4gICAgfVxufVxuXG5jbGFzcyBBbnN3ZXJPcHRpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYW5zd2VyT3B0aW9uOiAnJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBzYXZlQW5zd2VyT3B0aW9uID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2Fuc3dlck9wdGlvbjogZXZlbnQudGFyZ2V0LnZhbHVlfSk7XG4gICAgfVxuICAgIGFkZEFuc3dlciA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5hZGRBbnN3ZXIodGhpcy5zdGF0ZS5hbnN3ZXJPcHRpb24pXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2Fuc3dlck9wdGlvbjogJyd9KVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZSdcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIDxpbnB1dCBuYW1lPSdhbnN3ZXJPcHRpb24nIHBsYWNlaG9sZGVyPSdBbnN3ZXIgb3B0aW9uJyB2YWx1ZT17dGhpcy5zdGF0ZS5hbnN3ZXJPcHRpb259IG9uQ2hhbmdlPXt0aGlzLnNhdmVBbnN3ZXJPcHRpb259Lz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nYnV0dG9uJyB2YWx1ZT0nQWRkIGFuc3dlcicgb25DbGljaz17dGhpcy5hZGRBbnN3ZXJ9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5jbGFzcyBTYXZlQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoPGlucHV0IHR5cGU9J3N1Ym1pdCcgdmFsdWU9J1NhdmUgU3VydmV5Jy8+KVxuICAgIH1cbn1cblxuUmVhY3RET00ucmVuZGVyKFxuICAgIDxTdXJ2ZXlGb3JtLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtc3VydmV5LWZvcm0nKSlcbiJdfQ==
