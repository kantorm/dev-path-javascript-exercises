var cx = document.querySelector('canvas').getContext('2d');
//trapezoid
function drawTrapezoid(x, y) {
  cx.beginPath();
  cx.moveTo(x, y);
  cx.lineTo(x + 50, y);
  cx.lineTo(x + 70, y + 50);
  cx.lineTo(x - 20, y + 50);
  cx.closePath();
  cx.stroke();
}
drawTrapezoid(30, 30);
//diamond
function drawDiamond(x, y) {
  cx.translate(x + 30, y + 30);
  cx.rotate(Math.PI / 4);
  cx.fillStyle = 'red';
  cx.fillRect(-30, -30, 60, 60);
  cx.resetTransform();
}
drawDiamond(140, 30);
//zigzag
function drawZigzag(x, y) {
  cx.beginPath();
  cx.moveTo(x, y);
  for (var i = 0; i < 8; i++) {
    cx.lineTo(x + 80, y + i * 8 + 4);
    cx.lineTo(x, y + i * 8 + 8);
  }
  cx.stroke();
}
drawZigzag(240, 20);
//spieral
function drawSpiral(x, y) {
  var radius = 50, xCenter = x + radius, yCenter = y + radius;
    cx.beginPath();
    cx.moveTo(xCenter, yCenter);
    for (var i = 0; i < 300; i++) {
      var angle = i * Math.PI / 25;
      var dist = radius * i / 300;
      cx.lineTo(xCenter + Math.cos(angle) * dist,
                yCenter + Math.sin(angle) * dist);
    }
    cx.stroke();
  }
drawSpiral(340, 20);
//star
function drawStar(x, y) {
  var radius = 50, xCenter = x + radius, yCenter = y + radius;
      cx.beginPath();
      cx.moveTo(xCenter + radius, yCenter);
      for (var i = 0; i <= 12; i++) {
        var angle = i * Math.PI / 6;
        cx.quadraticCurveTo(xCenter, yCenter,
          xCenter + Math.cos(angle) * radius, yCenter + Math.sin(angle) * radius)
      }
      cx.fillStyle = 'gold';
      cx.fill();
}
drawStar(440, 20);
//Thie pie chart
var cx = document.querySelector("canvas").getContext("2d");
  var total = results.reduce(function(sum, choice) {
    return sum + choice.count;
  }, 0);

  var currentAngle = -0.5 * Math.PI;
  var centerX = 300, centerY = 150;
  // Add code to draw the slice labels in this loop.
  results.forEach(function(result) {
    var sliceAngle = (result.count / total) * 2 * Math.PI;
    cx.beginPath();
    cx.arc(centerX, centerY, 100,
    currentAngle, currentAngle + sliceAngle);

    var middleAngle = currentAngle + 0.5 * sliceAngle;
    var textX = Math.cos(middleAngle) * 120 + centerX;
    var textY = Math.sin(middleAngle) * 120 + centerY;
    cx.textBaseLine = "middle";
    if (Math.cos(middleAngle) > 0)
      cx.textAlign = "left";
    else
      cx.textAlign = "right";
    cx.font = "15px sans-serif";
    cx.fillStyle = "black";
    cx.fillText(result.name, textX, textY);

    currentAngle += sliceAngle;
    cx.lineTo(centerX, centerY);
    cx.fillStyle = result.color;
    cx.fill();
  });
//Bouncing Ball
//Bouncing ball
var cx = document.querySelector("canvas").getContext("2d");

var lastTime = null;
function frame(time) {
  if (lastTime != null)
    updateAnimation(Math.min(100, time - lastTime) / 1000);
  lastTime = time;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

  var x = 100, y = 300;
  var radius = 10;
  var speedX = 100, speedY = 60;

function updateAnimation(step) {
  cx.clearRect(0, 0, 400, 400);
  cx.strokeStyle = "blue";
  cx.lineWidth = 4;
  cx.strokeRect(25, 25, 350, 350);

  x += step * speedX;
  y += step * speedY;
  if(x < 25 + radius || x > 375 - radius) {
    speedX -= speedX;
  }
  if(y < 25 +radius || y > 375 - radius) {
    speedY -= speedY;
  }
  cx.fillStyle = "red";
  cx.beginPath();
  cx.arc(x, y, radius, 0.7);
  cx.fill();
