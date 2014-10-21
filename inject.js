var injected = injected || (function(){

  // An object that will contain the "methods"
  // we can use from our event script.
  var methods = {};

  methods.autoCheck = function(){
    // var inputs = document.getElementsByTagName('input')
    var s = ''
    // for (var i = 0; i < inputs.length; i++)
    //   if (inputs[i].type && inputs[i].type === 'checkbox')
    //     // s += inputs[i].value + '\n'
    //     inputs[i].checked = true
    var inputs = document.getElementsByTagName('input')
    var tests = []
    for (var i = 0; i < inputs.length; i++)
      if (inputs[i].type && inputs[i].type === 'checkbox') 
        tests.push(inputs[i])
    
    var lastCheckedTest = getLastCheckedTest(tests)
    for (var i = lastCheckedTest - 1; i >= 0; i--)
      tests[i].checked = false
    for (var i = 0; i < 10 && lastCheckedTest + i < tests.length; i++)
      tests[lastCheckedTest + i].checked = true
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

function getLastCheckedTest(tests) {
  for (var i = tests.length - 1; i > 0 && tests[i].checked === false; i--);
  return i
}