//Build table
function buildTable(data) {
  var table = document.createElement('table');

  var fields = Object.keys(data[0]);

  var headRow = document.createElement('tr');
  fields.forEach(function(field) {
    var headCell = document.createElement('th');
    headCell.textContent = field;
    headRow.appendChild(headCell);
  });
  table.appendChild(headRow);

  data.forEach(function(object){
    var row = document.createElement('tr');
    fields.forEach(function(field){
      var cell = document.createElement('td');
      cell.textContent = object[field];
      if (typeof object[field] == "number")
        cell.style.textAlign = "right";
    row.appendChild(cell);
  });
    table.appendChild(row);
  });

  return table;
}
//By tag name
function byTagName(node, tagName) {
  var tagsArray = [];

  tagName = tagName.toUpperCase();

  function check(node) {
      for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        if (child.nodeType == document.ELEMENT_NODE) {
          if (child.nodeName == tagName)
            tagsArray.push(child);
          check(child); //checking for element inside other element
        }
      }
    }
    check(node);
    return found;
  }
}
//The cat's hat
var cat = document.querySelector("#cat");
var hat = document.querySelector("#hat");

var angle = 0, lastTime = null;
function animate(time) {
  if (lastTime != null)
    angle += (time - lastTime) * 0.0015;
  lastTime = time;

  cat.style.top = (Math.sin(angle) * 50 + 80) + "px";
  cat.style.left = (Math.cos(angle) * 200 + 250) + "px";

  hat.style.top = (Math.sin(angle) * 50 + 80) + "px";
  hat.style.left = (Math.cos(angle) * 200 + 250) + "px";

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
