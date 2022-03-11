import { Themes } from "./const.js";
import { snippetsDefault } from "./list-service.js";


let snippets = [];

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
    document.getElementById('snippetDisplay').innerHTML = snippets != null && snippets.length 
    ? snippets[Math.floor(Math.random() * snippets.length)]
    : snippetsDefault[Math.floor(Math.random() * snippetsDefault.length)];
}

//On load
window.onload = function() {
    loadTheme();
}