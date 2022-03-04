import { Themes, Language } from "./const.js";

var snippets = [];
const list = document.getElementById("list");
const input = document.getElementById("txt");

/*ADD SNIPPETS*/
function addSnippet(snip) {
  if(snip != "" && !snippets.filter(s => s === snip).length) {
    snippets.push(snip);
    list.innerHTML = "<li class='el'>" + snippets.join("</li><li class='el'>") + "</li>";
  }
}

/*DELETE SNIPPETS*/
function delSnippet(snip) {
  snippets = snippets.filter(s => s !== snip);
  list.innerHTML = snippets.length ? "<li class='el'>" + snippets.join("</li><li class='el'>") + "</li>" : "";
}

/*LISTEN TO INPUT*/
input.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addSnippet(input.value);
    input.value = '';
  }
});

/*LISTEN TO LIST*/
list.addEventListener("click", function(event) {
  delSnippet(event.target.innerText);
});


//Chrome Cloud Storage
//Quotes
function load_quote() {
  chrome.storage.sync.get('quotes', function(data){
    addQuote(data.quotes);
  })
}

function addQuote(quotes) {
  for (let i in quotes) {
    var listNode = document.getElementById("list"),
    textNode = document.createTextNode(quotes[i]),
    liNode = document.createElement("LI");
    liNode.appendChild(textNode);
    listNode.appendChild(liNode);
  }
  //refreshArray();
}

//Themes
function save_theme(value) {
  chrome.storage.sync.set({'theme': value});
  //chrome.storage.sync.set({'quotes': quotes});
}

function load_theme() {
  chrome.storage.sync.get('theme', function(data){
    switchTheme(data.theme);
  });
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
  load_quote();
  setLanguage(navigator.language);
  addSnippet('bla');
  addSnippet('blub');
  delSnippet('bla');
  addSnippet('blub');
  addSnippet('blub2');
  addSnippet('blub3');
}