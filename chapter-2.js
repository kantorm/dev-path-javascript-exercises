function loopingTheTriangle() {
  var triangle = "";

  while(triangle.length < 7) {
    triangle += "#";
    console.log(triangle);
  }
}

function fizzBuzz() {
  for (var i = 1; i <= 100; i++) {
    if(i % 3 == 0 && i % 5 == 0) {
      console.log("FizzBuzz");
    }
    else if(i % 3 == 0) {
      console.log("Fizz");
    }
    else if(i % 5 == 0) {
      console.log("Buzz");
    }
    else {
      console.log(i);
    }
  }
}

function chessBoard() {
  var board = "";
  var size = 8;

  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if((i + j) % 2 == 0) {
        board += " ";
      }
      else {
        board += "#";
      }
    }
    board += "\n";
  }
  console.log(board);
}

//loopingTheTriangle();
//fizzBuzz();
//chessBoard();
