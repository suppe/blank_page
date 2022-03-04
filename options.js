import { Themes, Language } from "./const.js";

var snippets = [];
const list = document.getElementById("list");
const input = document.getElementById("txt");

//List
function addSnippet(snip) {
  if(snip != "" && !snippets.filter(s => s === snip).length) {
    snippets.push(snip);
    list.innerHTML = "<li class='el'>" + snippets.join("</li><li class='el'>") + "</li>";
  }
}

function delSnippet(snip) {
  snippets = snippets.filter(s => s !== snip);
  list.innerHTML = snippets.length ? "<li class='el'>" + snippets.join("</li><li class='el'>") + "</li>" : "";
}

function refreshSnippet() {
  list.innerHTML = snippets.length ? "<li class='el'>" + snippets.join("</li><li class='el'>") + "</li>" : "";
}

input.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addSnippet(input.value);
    input.value = '';
    savesnippets();
  }
});

list.addEventListener("click", function(event) {
  delSnippet(event.target.innerText);
  savesnippets();
});

document.getElementById('clear').addEventListener("click", function(event) {
  chrome.storage.sync.set({'snippets': []});
});


//Chrome Cloud Storage

//Themes
function save_theme(value) {
  chrome.storage.sync.set({'theme': value});
}

function savesnippets() {
  chrome.storage.sync.set({'snippets': snippets});
}

function load_theme() {
  chrome.storage.sync.get('theme', function(data){
    switchTheme(data.theme);
  });
}

function loadsnippets() {
  
  chrome.storage.sync.get('snippets', callback);

  function callback(data) {
    if(data.snippets != null) {
      data.snippets.forEach(el => snippets.push(el));
      refreshSnippet();
    }
  }

  
}

const select = document.getElementById('theme');
select.addEventListener('change', function() {
  save_theme(select.value);
  switchTheme(select.value)   
});

function switchTheme(theme) {
  document.getElementById('theme').value = theme || 'light';
  const cl = document.body.classList;
  theme === Themes.dark ? cl.replace('light', 'dark') : cl.replace('dark', 'light');
}

function setLanguage(lang) {
  console.log(lang === Language.de ? 'deutsch' : 'englisch');
} 

window.onload = function listen() {
  load_theme();
  setLanguage(navigator.language);
  loadsnippets();
}