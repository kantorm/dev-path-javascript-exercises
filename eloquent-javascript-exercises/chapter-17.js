//Content negotiation
function requestAuthors(type) {
  var req = new XMLHttpRequest();
  req.open('GET', 'http://eloquentjavascript.net/author', false);
  req.setRequestHeader('accept', type);
  req.send();
  return req.responseText
}

var types = ["text/plain",
             "text/html",
             "application/json",
             "application/rainbows+unicorns"];
types.forEach(function(type){
  try {
    console.log(type +"\n"+ requestAuthors(type)+ "\n");
  } catch (err) {
    console.log("Raised error: "+ err)
  }
});
//Multiple promises
function all(promises) {
  return new Promise(function(success, fail) {
    var results = [], pending = promises.length;
    promises.forEach(function(promise, i){
      promise.then(function(result) {
        results[i] = result;
        pending--;
        if (pending == 0)
          succeed(results);
        }, function(error) {
          fail(error);
        });
      });
      if (promieses.length == 0)
        succeed(results);
    })
  });
}

// Test code.
all([]).then(function(array) {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise(function(success) {
    setTimeout(function() { success(val); },
               Math.random() * 500);
  });
}
all([soon(1), soon(2), soon(3)]).then(function(array) {
  console.log("This should be [1, 2, 3]:", array);
});
function fail() {
  return new Promise(function(success, fail) {
    fail(new Error("boom"));
  });
}
all([soon(1), fail(), soon(3)]).then(function(array) {
  console.log("We should not get here");
}, function(error) {
  if (error.message != "boom")
    console.log("Unexpected failure:", error);
