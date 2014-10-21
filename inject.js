var injected = injected || (function(){

  // An object that will contain the "methods"
  // we can use from our event script.
  var methods = {};

  // This method will eventually return
  // background colors from the current page.
  methods.autoCheck = function(){
    // var nodes = document.querySelectorAll('*');
    // return nodes.length;
    var inputs = document.getElementsByTagName('input')
    var s = ''
    for (var i = 0; i < inputs.length; i++)
      if (inputs[i].type && inputs[i].type === 'checkbox')
        s += inputs[i].value + '\n'
    // alert(inputs[20].value)
    alert(s)
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