        var surveyToGenerate = new Object();
        surveyToGenerate.questions = [];

        var answers = [];
        $('#addAnswer').click(function() {
          var toAdd = $('#answerField').val();
          answers.push(toAdd);
          $('#answerField').val('').focus();
        });

        $('#addQuestion').click(function() {
            if (surveyToGenerate.name == undefined)
              surveyToGenerate.name = $('#nameField').val();

            var fieldType = $('#fieldType').val();
            surveyToGenerate.questions.push({
              questionName: $('#questionField').val(),
              answers: answers,
              fieldType: fieldType
              });

            answers = [];
            $('#questionField').val('').focus();
            $('#answerField').val('');
        });

        $('#surveyFields').submit(function(event) {

          var data = JSON.stringify(surveyToGenerate)
          $.post('/surveys', data)

          sessionStorage.setItem(surveyToGenerate.name, data);
          generateSurvey(surveyToGenerate);

          event.preventDefault();
          });

        var generateSurvey = function(toGenerate) {

          var formId = toGenerate.name.replace(/\s/g , '_');
          $('#generated').append($('<form id='+formId+'>'));
          formId = '#'+formId;
          $(formId).attr({action: '/', method: 'POST'});
          $(formId).append('<h1>'+toGenerate.name+'</h1>');
          $(formId).append('<input style="display: none" value="'+toGenerate.name+'" name="surveyName">')

          toGenerate.questions.forEach(function(question){
            $(formId).append('<h3>'+question.questionName+'</h3>')

              question.answers.forEach(function(answer) {
                var input = '<label><input name="'+question.questionName+
                '" type="'+question.fieldType+'" value="'+answer+'">'+answer+'</label>';
                $(formId).append($(input));
                });
              });
              var submit = '<input type = "submit"/>'
              $(formId).append(submit);

              $('#nameField').val('').focus();

              surveyToGenerate = {};
              surveyToGenerate.questions = [];
          }
          function generateFormStorage() {
            for (var survey in sessionStorage) {
              var parsed = JSON.parse(sessionStorage[survey]);
              generateSurvey(parsed);
            }
          }
          function sampleFunc(arg) {
            console.log(arg);
          }

        $(document).ready(generateFormStorage())
