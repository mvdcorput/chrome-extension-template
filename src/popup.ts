"use strict";

// Change color button
let changeColor = document.getElementById('changeColor');

chrome.storage.local.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = (element.target as HTMLElement).getAttribute('value');

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: `document.body.style.backgroundColor="${color}";`
    });
  });
};

// Reset button
let reset = document.getElementById('reset');

reset.onclick = function(element) {
  chrome.storage.local.get('originalColor', function(data) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, {
        code:
          `document.body.style.backgroundColor="${data.originalColor}";`
      });
    });
  });
};
