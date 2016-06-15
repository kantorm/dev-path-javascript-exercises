function SmartPlantEater() {
  this.energy = 30;
  this.direction = "e";
}
SmartPlantEater.prototype.act = function(view) {
  var space = view.find(" ");
  if (this.energy > 90 && space)
    return {type: "reproduce", direction: space};
  var plants = view.findAll("*");
  if (plants.length > 1)
    return {type: "eat", direction: randomElement(plants)};
  if (view.look(this.direction) != " " && space)
    this.direction = space;
  return {type: "move", direction: this.direction};
};

function Tiger() {
  this.energy = 90;
  this.direction = "w";
  this.preySeen = []; // Used to track the amount of prey seen per turn in the last eight turns
}
Tiger.prototype.act = function(view) {
  var prey = view.findAll("O");
  this.preySeen.push(prey.length);
  var seenPerTurn = this.preySeen.reduce(function(a, b) {
  return a + b;
}, 0) / this.preySeen.length;   // Average number of prey seen per turn

  if (this.preySeen.length > 8)
    this.preySeen.shift();

  if (prey.length && seenPerTurn > 0.2)
    return {type: "eat", direction: randomElement(prey)};

  var space = view.find(" ");
  if (this.energy > 350 && space)
    return {type: "reproduce", direction: space};
  if (view.look(this.direction) != " " && space)
    this.direction = space;
  return {type: "move", direction: this.direction};
};
