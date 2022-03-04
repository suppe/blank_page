import { snippets_default, Themes } from "./const.js";

var snippets = [];

function load_theme() {
    chrome.storage.sync.get('theme', function(data) {
        setBackgroundColor(data.theme);
    });
    chrome.storage.sync.get('snippets', function(data) {
        snippets = data.snippets;
        setRandomQuote();
    });
    
}



function setBackgroundColor(color) {
    document.body.style.backgroundColor = color === Themes.dark ? '#555555' : 'white';
}

function setRandomQuote() {
    
    var randomNumber = Math.floor(Math.random() * (snippets != null && snippets.length ? snippets.length : snippets_default.length));
    document.getElementById('quoteDisplay').innerHTML = snippets != null && snippets.length ? snippets[randomNumber] : snippets_default[randomNumber];
}

window.onload = function newQuote() {
    load_theme();
    
}

chrome.storage.onChanged.addListener((changes, area) => {
    load_theme();
});