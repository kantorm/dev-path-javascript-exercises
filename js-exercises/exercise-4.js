//generating table
function generateTable() {
  var table = document.createElement('table');
  table.setAttribute('style', 'width: 90%; height: 90%; border: solid 2px black; border-collapse: collapse; margin: 5em');
  document.body.appendChild(table);

  for (var i = 0; i < 12; i++) {
    var row = document.createElement('tr');

    for (var j = 0; j < 12; j++) {
      var cell = document.createElement('td');
      cell.setAttribute('style', 'height: 50px; width:50px; border: solid black 1px;')
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
    var cells = document.querySelectorAll("td");

    cells.forEach(function(cell) {
      cell.addEventListener("mouseover", function(event) {
          cell.style.background = "#000";
      });
      cell.addEventListener("mouseout", function(event) {
          cell.style.background = "";
      });
    });
  }
generateTable();
