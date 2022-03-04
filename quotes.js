import { quotes, Themes } from "./const.js";


function load_theme() {
    chrome.storage.sync.get('theme', function(data){
      setBackgroundColor(data.theme);
    });
}

function setBackgroundColor(color) {
    document.body.style.backgroundColor = color === Themes.dark ? '#555555' : 'white';
}

function setRandomQuote() {
    var randomNumber = Math.floor(Math.random() * (quotes.length));
    document.getElementById('quoteDisplay').innerHTML = quotes[randomNumber];
}

window.onload = function newQuote() {
    load_theme();
    setRandomQuote();
}

chrome.storage.onChanged.addListener((changes, area) => {
    load_theme();
  });
