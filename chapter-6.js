//Vector Type
function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(anotherVector) {
  return new Vector((this.x + anotherVector.x), (this.y + anotherVector.y));
}

Vector.prototype.minus = function(anotherVector) {
  return new Vector((this.x - anotherVector.x), (this.y - anotherVector.y));
}

Object.defineProperty(Vector.prototype, "length", {
  get: function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
})

//Another Cell
function StretchCell(inner, width, height) {
  this.inner = inner;
  this.width = width;
  this.height = height;
}

StretchCell.prototype.minWidth = function() {
  return Math.max(this.width, this.inner.minWidth());
}
StretchCell.prototype.minHeight = function() {
  return Math.max(this.height, this.inner.minHeight());
}
StretchCell.prototype.draw = function(height, width) {
  return this.inner.draw(width, height);
}

//Sequence Interface

function logFive(sequence) {
  for (var i = 0; i < 5; i++) {
    if (!sequence.next())
      break;
    console.log(sequence.current());
  }
}

function ArraySeq(array) {
  this.pos = -1;
  this.array = array;
}
ArraySeq.prototype.next = function() {
  if (this.pos >= this.array.length - 1)
    return false;
  this.pos++;
  return true;
};
ArraySeq.prototype.current = function() {
  return this.array[this.pos];
};

function RangeSeq(start, end) {
  this.pos = start - 1;
  this.end = end;
}
RangeSeq.prototype.next = function() {
  if (this.pos >= this.end)
    return false;
  this.pos++;
  return true;
};
RangeSeq.prototype.current = function() {
  return this.pos;
};

logFive(new ArraySeq([1, 2]));
logFive(new RangeSeq(100, 1000));
