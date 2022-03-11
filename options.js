import { loadTheme, saveTheme, setTheme } from "./theme-service.js";
import { addSnippet, delSnippet, refreshSnippet, snippets } from "./list-service.js";


//List
const input = document.getElementById("txt");
input.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addSnippet(input.value);
    input.value = '';
    saveSnippets();
  }
});

const list = document.getElementById("list");
list.addEventListener("click", function(event) {
  delSnippet(event.target.innerText);
  saveSnippets();
});

//Theme Cloud
const select = document.getElementById('theme');
select.addEventListener('change', function() {
  saveTheme(select.value);
  setTheme(select.value);
});

//Snippets Cloud
function saveSnippets() {
  chrome.storage.sync.set({'snippets': snippets});
}

function loadSnippets() {
  chrome.storage.sync.get('snippets', callback);
  function callback(data) {
    if(data.snippets != null) {
      data.snippets.forEach(el => snippets.push(el));
      refreshSnippet();
    }
  }  
}

//On Load
window.onload = function listen() {
  loadTheme();
  loadSnippets();
}