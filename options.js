import { Themes, Language } from "./const.js";

var inputText = document.getElementById("txt"),
  items = document.querySelectorAll("#list li"),
  tab = [],
  index,
  snippets = [];

// get the selected li index using array
// populate array with li values

for (var i = 0; i < items.length; i++) {
  console.log('hhhhhh');
  tab.push(items[i].innerHTML);
}

// get li index onclick
for (var i = 0; i < items.length; i++) {

  items[i].onclick = function() {
    index = tab.indexOf(this.innerHTML);
    console.log(this.innerHTML + " INDEX = " + index);
    // set the selected li value into input text
    deleteLI();
    //inputText.value = this.innerHTML;
  };

}

function refreshArray() {
  // clear array
  tab.length = 0;
  items = document.querySelectorAll("#list li");
  // fill array
  for (var i = 0; i < items.length; i++) {
    tab.push(items[i].innerHTML);
  }
}

function addLI() {
  if (input.value != "") {
    var listNode = document.getElementById("list"),

      textNode = document.createTextNode(inputText.value),
      liNode = document.createElement("LI");

    liNode.appendChild(textNode);
    listNode.appendChild(liNode);

    refreshArray();

    // add event to the new LI

    liNode.onclick = function() {
      index = tab.indexOf(liNode.innerHTML);
      console.log(liNode.innerHTML + " INDEX = " + index);
      // set the selected li value into input text
      //inputText.value = liNode.innerHTML;
      deleteLI();
    };
  }
}

function deleteLI(ind) {
  refreshArray();
  if (items.length >= 0) {
    if (items[ind].parentNode != null) {
      items[ind].parentNode.removeChild(items[ind]);
      inputText.value = "";
    }
  }
}

//Add snippets via Enter
var input = document.getElementById("txt");
input.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addLI();
    inputText.value = "";
  }
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
  refreshArray();
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
}