//Retry
function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
	for(;;) {
    try{
    	return primitiveMultiply(a, b)
    } catch (err) {
      if(!(err instanceof MultiplicatorUnitFailure))
        throw err;
    }
}
//The Locked Box
function withBoxUnlocked(body) {
  var locked = box.locked;
  if(!locked)
    return body();

  box.unlock();
  try{
    return body();
  }  finally{
    box.lock();
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (err) {
  console.log("Error raised:", err);
}
console.log(box.locked);
