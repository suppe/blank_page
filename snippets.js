import { loadTheme } from "./theme-service.js";
import { snippetsDefault } from "./list-service.js";


let snippets = [];

//Load Snippets
function loadSnippets() {
    chrome.storage.sync.get('snippets', function(data) {
        snippets = data.snippets;
        setRandomSnippet();
    });
}

chrome.storage.onChanged.addListener(() => {
    loadTheme(false);
    loadSnippets();
});

//Set Snippets
function setRandomSnippet() {
    document.getElementById('snippetDisplay').innerHTML = snippets != null && snippets.length 
    ? snippets[Math.floor(Math.random() * snippets.length)]
    : snippetsDefault[Math.floor(Math.random() * snippetsDefault.length)];
}

//On load
window.onload = function() {
    loadTheme(false);
    loadSnippets();
}