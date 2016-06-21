var gridNode = document.createElement('div');
var next = document.createElement('button');
var run = document.createElement('button');
var height = 30, width = 100;
next.textContent = "Next generation";
run.textContent = "Auto run";

var elements = [gridNode, next, run];

elements.forEach(function(element){
  document.body.appendChild(element)
});

  var checkboxes = [];
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var box = document.createElement("input");
      box.type = "checkbox";
      gridNode.appendChild(box);
      checkboxes.push(box);
    }
    gridNode.appendChild(document.createElement("br"));
  }
function gridFromCheckboxes() {
  return checkboxes.map(function(box) { return box.checked; });
}
function checkboxesFromGrid(grid) {
  return grid.forEach(function(value, i) { checkboxes[i].checked = value; });
}
function randomGrid() {
  var result = [];
  for (var i = 0; i < width * height; i++)
    result.push(Math.random() < 0.3);
  return result;
}

checkboxesFromGrid(randomGrid());

function countNeighbors(grid, x, y) {
  var count = 0;
  for (var y1 = Math.max(0, y - 1); y1 <= Math.min(height - 1, y + 1); y1++) {
    for (var x1 = Math.max(0, x - 1); x1 <= Math.min(width - 1, x + 1); x1++) {
      if ((x1 != x || y1 != y) && grid[x1 + y1 * width])
        count += 1;
    }
  }
  return count;
}

function nextGeneration(grid) {
  var newGrid = new Array(width * height);
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var neighbors = countNeighbors(grid, x, y);
      var offset = x + y * width;
      if (neighbors < 2 || neighbors > 3)
        newGrid[offset] = false;
      else if (neighbors == 2)
        newGrid[offset] = grid[offset];
      else
        newGrid[offset] = true;
    }
  }
  return newGrid;
}

function turn() {
  checkboxesFromGrid(nextGeneration(gridFromCheckboxes()));
}

next.addEventListener("click", turn);

var running = null;
run.addEventListener("click", function() {
  if (running) {
    clearInterval(running);
    running = null;
  } else {
    running = setInterval(turn, 400);
  }
});
