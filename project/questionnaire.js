function Questionnaire(name) {
  this.name = name;
  this.questions = [{
    question: this.question,
    answers: [],
    fieldType: this.type
  }];
}

var Questionnaires = [];

var nameInput = document.createElement('input');
document.body.appendChild(nameInput);

var createButton = document.createElement('button');
createButton.textContent = 'create';
document.body.appendChild(createButton);

createButton.addEventListener('click', function() {
    var que = new Questionnaire(nameInput.value);

    var questionInput = document.createElement('input');
    document.body.appendChild(questionInput);

    var answerInput = document.createElement('input');
    document.body.appendChild(answerInput);

    var addAnswerButton = document.createElement('button');
    addAnswerButton.textContent = 'add answer';
    document.body.appendChild(addAnswerButton);

    var addQuestionButton = document.createElement('button');
    addQuestionButton.textContent = 'add question';
    document.body.appendChild(addQuestionButton);

    var fieldTypeSelect = document.createElement('select');

    var checkbox = document.createElement('option');
    checkbox.value = 'checkbox'
    checkbox.textContent = 'checkbox';

    var radio = document.createElement('option');
    radio.value = 'radio';
    radio.textContent = 'radio';

    fieldTypeSelect.appendChild(radio)
    fieldTypeSelect.appendChild(checkbox);
    document.body.appendChild(fieldTypeSelect);

    var answersToAdd = [];

    addAnswerButton.addEventListener('click', function() {
      answersToAdd.push(answerInput.value);
      answerInput.value = "";
    });

    addQuestionButton.addEventListener('click', function() {
      var choose = fieldTypeSelect.value;
      que.questions.push({question: questionInput.value, answers: answersToAdd, type: choose});
      answersToAdd = [];
      questionInput.value = "";
      answerInput.value = "";
    });

    var generate = document.createElement('button');
    generate.textContent = 'generate';
    document.body.appendChild(generate);

    generate.addEventListener('click', function() {
        var container = document.createElement('div');
        document.body.appendChild(container);

        var header = document.createElement('h1');
        header.textContent = que.name;
        container.appendChild(header);

        que.questions.forEach(function(question) {
          var questionHeader = document.createElement('h3');
          questionHeader.textContent = question.question;
          container.appendChild(questionHeader);
          var type = question.type;

          question.answers.forEach(function(answer) {
            var label = document.createElement('label');
            label.textContent = answer;

            var answerOption = document.createElement('input');
            answerOption.type = type;
            answerOption.name = questionHeader.textContent;
            answerOption.value = answer;

            label.appendChild(answerOption);
            container.appendChild(label);
          });
        });

        Questionnaires.push(que);

        nameInput.value = "";
        document.body.removeChild(fieldTypeSelect);
        document.body.removeChild(questionInput);
        document.body.removeChild(answerInput);
        document.body.removeChild(addAnswerButton);
        document.body.removeChild(addQuestionButton);
        document.body.removeChild(generate);
      });
    });
