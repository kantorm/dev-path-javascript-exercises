function Questionnaire(name) {
  this.name = name;
  this.questions = [{
    question: this.question,
    answers: []
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

    var answersToAdd = [];

    addAnswerButton.addEventListener('click', function() {
      answersToAdd.push(answerInput.value);
      answerInput.value = "";
    });

    addQuestionButton.addEventListener('click', function() {
      que.questions.push({question: questionInput.value, answers: answersToAdd});
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

          question.answers.forEach(function(answer) {
            var label = document.createElement('label');
            label.textContent = answer;

            var answerOption = document.createElement('input');
            answerOption.type = 'radio';
            answerOption.name = questionHeader.textContent;
            answerOption.value = answer;

            label.appendChild(answerOption);
            container.appendChild(label);
          });
        });

        Questionnaires.push(que);
        
        nameInput.value = "";
        document.body.removeChild(questionInput);
        document.body.removeChild(answerInput);
        document.body.removeChild(addAnswerButton);
        document.body.removeChild(addQuestionButton);
        document.body.removeChild(generate);
      });
    });
