'use strict';

const buttonContainer = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');

    button.style.backgroundColor = item;

    button.addEventListener('click', function() {
      chrome.storage.local.set({color: item}, function() {
        console.log('color is ' + item);
      })
    });

    buttonContainer.appendChild(button);
  }
}
constructOptions(kButtonColors);
