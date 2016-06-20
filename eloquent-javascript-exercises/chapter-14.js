//Censored keyboard
var field = document.querySelectr("input");
field.addEventListener('keydown', function(event){
  if (event.keyCode == 'Q'.charCodeAt(0) ||
      event.keyCode == 'W'.charCodeAt(0) ||
      event.keyCode == 'Y'.charCodeAt(0))
    event.preventDefault();
});

//Mouse Trail
var dots = [];
for (var i = 0; i < 10; i++) {
  var node = document.createElement('div');
  node.className = 'trail';
  document.body.appendChild(node);
}
var currentDot = 0;

adEventListener('mousemove', function(event){
    var dot = dots[currentDot];
    dot.style.left = (event.pageX - 3) + 'px';
    dot.style.top = (event.pageY - 3) + 'px';
    currentDot = (currentDot + 1) % dots.length;
});
//Tabs
function asTabs(node) {
    var tabs = [];
    for (var i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i];
      if (child.nodeType == document.ELEMENT_NODE)
        tabs.push(child);
    }

    var tabList = document.createElement("div");
    tabs.forEach(function(tab, tabIndex) {
      var button = document.createElement("button");
      button.textContent = tab.getAttribute("data-tabname");
      button.addEventListener("click", function() { selectTab(tabIndex); });
      tabList.appendChild(button);
    });
    node.insertBefore(tabList, node.firstChild);

    function selectTab(n) {
      tabs.forEach(function(tab, i) {
        if (i == n)
          tab.style.display = "";
        else
          tab.style.display = "none";
      });
    }
    selectTab(0);
  }
  asTabs(document.querySelector("#wrapper"));
