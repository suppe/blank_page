import { list, input, select, Themes } from "./const.js";

var snippets = [];

//List
function addSnippet(snip) {
  if(snip !== "" && !snippets.filter(s => s === snip).length) {
    snippets.push(snip);
    refreshSnippet();
  }
}
input.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addSnippet(input.value);
    input.value = '';
    saveSnippets();
  }
});

function delSnippet(snip) {
  snippets = snippets.filter(s => s !== snip);
  refreshSnippet();
}
list.addEventListener("click", function(event) {
  delSnippet(event.target.innerText);
  saveSnippets();
});

function refreshSnippet() {
  list.innerHTML = snippets.length ? "<li class='el'>" + snippets.join("</li><li class='el'>") + "</li>" : "";
}

//Theme Cloud
function saveTheme(value) {
  chrome.storage.sync.set({'theme': value});
}

function loadTheme() {
  chrome.storage.sync.get('theme', callback);
  function callback(data) {
    if(data.theme != null) {
      switchTheme(data.theme);
    }
  }  
}

function switchTheme(theme) {
  select.value = theme || 'light';
  const cl = document.body.classList;
  theme === Themes.dark ? cl.replace('light', 'dark') : cl.replace('dark', 'light');
}
select.addEventListener('change', function() {
  saveTheme(select.value);
  switchTheme(select.value);
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