function createInput(){
    var input = document.createElement('input');
    var styleInput = document.createElement('textarea');

    document.body.appendChild(input);
    document.body.appendChild(styleInput);

    input.id = "inputId";
    input.placeholder = "type in tag to geerate";

    styleInput.id = "styleInputId";
    styleInput.placeholder = "style the tag";

    input.onblur = function() {

    var inputValue = document.getElementById('inputId').value;

    var tagToGenerate = {
      tagType: function() {
        return inputValue.split(/\#|\.|\s/).shift()
      },
      tagId: function() {
        if (inputValue.indexOf('#') != -1 && inputValue.indexOf('.') != -1)
          return inputValue.slice(inputValue.indexOf('#') + 1, inputValue.indexOf('.'));
        else if(inputValue.indexOf('#') != -1)
          return inputValue.slice(inputValue.indexOf('#') + 1);
        else
          return null;
      },
      tagClasses: function() {
        if (inputValue.indexOf('.') != -1 && inputValue.indexOf(' ') != -1)
          return inputValue.slice(inputValue.indexOf('.')+1, inputValue.indexOf(' ')).split('.');
        else if (inputValue.indexOf('.') != -1)
          return inputValue.slice(inputValue.indexOf('.') + 1).split('.');
        else
          return null;
      },
      tagContent: function() {
        if(inputValue.indexOf(' ') != -1)
          return inputValue.slice(inputValue.indexOf(' ')+1, inputValue.length).split(' ');
      }
    };
    var generated = generteTag(tagToGenerate);
    console.log(Object.keys(generated));
    styleInput.onblur = function() {
      var styleInputValue = document.getElementById('styleInputId').value;

      generated.setAttribute("style", styleInputValue);
    }
  }
}
function generteTag(toGenerate, preTag) {
  var element = document.createElement(toGenerate.tagType());
  document.body.appendChild(element);

  if(toGenerate.tagId())
    element.id = toGenerate.tagId();

  var classNames = toGenerate.tagClasses();

  if(classNames != null)
  classNames.forEach(function(className){
    element.classList.add(className);
  });

  var content = toGenerate.tagContent();
  if(content)
    element.textContent = content.join(' ');
  return element;
}

createInput();
