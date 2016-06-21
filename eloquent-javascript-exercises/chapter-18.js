//JavaScript Workbench
function jsWorkbench() {
  var button = document.querySelector('#button');

  button.addEventListener('clikck', function(){
    var code = document.querySelector('#code');
    var output = document.querySelector('#output');

    try {
      var result = new Function(code)();
      output.innerText = String(result);
    } catch (err) {
      output.innerText = "Error: " + err;
    }
  });
}
//Autocompletion
// Builds up an array with global variable names, like
  // 'alert', 'document', and 'scrollTo'
  var terms = [];
  for (var name in window)
    terms.push(name);

  var text = document.querySelector('#field');
  var suggestions = document.querySelector('#suggestions');

  text.addEventListener('input', function(){
    var matching = terms.filter(function(term){
      return term.ondexOf(text.value);
    });
    suggestions.textContent = "";
    matching.slice(0, 20).forEach(function(term){
      var node = document.createElement('div');
      node.textContent = term;
      node.addEventListener('click', function(){
        text.value = term;
        suggestions.tetContent = "";
      });
      suggestions.appendChild(node);
    });
  });
//Game of Life
