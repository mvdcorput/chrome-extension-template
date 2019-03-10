'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    chrome.tabs.sendMessage(tabId, {text: 'get_background_color'}, storeDefaultColor);

    chrome.tabs.sendMessage(tabId, {text: 'erase_images'}, storeDefaultColor);
    
    return true;
  }
})

function storeDefaultColor(color) {
  chrome.storage.local.set({originalColor: color}, function() {});
  debugger;
}