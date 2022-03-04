import { snippets_default, Themes } from "./const.js";

var snippets = [];

//Load from Cloud
function loadTheme() {
    chrome.storage.sync.get('theme', function(data) {
        setTheme(data.theme);
    });
    chrome.storage.sync.get('snippets', function(data) {
        snippets = data.snippets;
        setRandomSnippet();
    });
}

chrome.storage.onChanged.addListener(_ => loadTheme());

//Set Theme & Snippets
function setTheme(color) {
    document.body.style.backgroundColor = color === Themes.dark ? '#555555' : 'white';
}

function setRandomSnippet() {
    const randomNumber = Math.floor(Math.random());
    document.getElementById('quoteDisplay').innerHTML = (snippets != null && snippets.length) 
    ? snippets[randomNumber * snippets.length] 
    : snippets_default[randomNumber * snippets_default.length];
}

//On load
window.onload = function() {
    loadTheme();
}