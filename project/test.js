function Questionnaire(name) {
  this.name = name;
  this.questions = [{
    question: this.question,
    answers: []
  }]
}
var example1 = new Questionnaire('example1');

example1.questions.push({question: "to be or", answers: [1,2,3,4]});
example1.questions.push({question: "not to be", answers: [5,6,7,8]});

console.log(example1.questions);
// example1.questions.forEach(function(question){
//   console.log(question.question + " " + question.answers);
// })
