function injectedMethod (tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function(){
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}

function autoCheck (tab) {
  injectedMethod(tab, 'autoCheck', function (response) {
    // alert('Elements in tab: ' + response.data);
    return true;
  });
}

chrome.browserAction.onClicked.addListener(autoCheck);