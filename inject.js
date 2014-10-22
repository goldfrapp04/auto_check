
var injected = injected || (function(){

  // An object that will contain the "methods"
  // we can use from our event script.
  var methods = {};

  methods.autoCheck = function(){
    var inputs = document.getElementsByTagName('input')
    var tests = []
    var checkedCount = 0

    for (var i = 0; i < inputs.length; i++)
      if (inputs[i].type && inputs[i].type === 'checkbox') {
        tests.push(inputs[i])
        if (inputs[i].checked)
          checkedCount++
      }

    if (checkedCount === 1) {
      var checkedTest = getCheckedTest(tests)
      for (var i = 0; i < 10 && checkedTest + i < tests.length; i++)
        tests[checkedTest + i].checked = true
    } else 
      for (var i = 0; i < tests.length; i++)
        tests[i].checked = false
  };

  // This tells the script to listen for
  // messages from our extension.
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var data = {};
    // If the method the extension has requested
    // exists, call it and assign its response
    // to data.
    if (methods.hasOwnProperty(request.method))
      data = methods[request.method]();
    // Send the response back to our extension.
    sendResponse({ data: data });
    return true;
  });

  return true;
})();

function getCheckedTest(tests) {
  for (var i = 0; i < tests.length && tests[i].checked === false; i++);
  return i
}
