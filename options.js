var inputText = document.getElementById("txt"),
  items = document.querySelectorAll("#list li"),
  tab = [],
  index,
  snippets = [],
  theme = null;

function addSnippet(snippet) {
  snippets.push(snippet);
}

function deleteSnippet(index) {
  if (snippets.length >= index) {
    snippets.splice(index, 1);
  }
}

function clearTab() {
  tab.splice(0, tab.length - 1);
}

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

function snippetToHtml(snippet) {
  var list = document.getElementById("list");

  var text = document.createTextNode(snippet)
  var li = document.createElement("LI");

  li.appendChild(text);
  list.appendChild(li);

  // add on click event on the new LI

  li.onclick = function() {

    deleteLI(tab.indexOf(li.innerHTML));
    console.log('del');
  }



  // li.onclick = function() {
  //   index = tab.indexOf(li.innerHTML);
  //   console.log(li.innerHTML + " INDEX = " + index);
  //   // set the selected li value into input text
  //   //inputText.value = li.innerHTML;
  //   deleteLI();

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

function loadLI(quotes) {
  deleteLI();
  var listNode = document.getElementById("list"),
    textNode = document.createNode(quotes[0]),
    liNode = document.createElement("LI");

  liNode.appendChild(textNode);
  listNode.appendChild(liNode);

  refreshArray();

  liNode.onclick = function() {
    index = tab.indexOf(liNode.innerHTML);
    console.log(liNode.innerHTML + " INDEX = " + index);
    // set the selected li value into input text
    //inputText.value = liNode.innerHTML;
  };
}

function editLI() {
  // edit the selected li using input text
  items[index].innerHTML = inputText.value;
  refreshArray();
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

function save_theme(value) {

  var quotes = ['flower', 'stone', 'sun'];

  chrome.storage.sync.set({'theme': value});
  //chrome.storage.sync.set({'quotes': quotes});
}

function load_theme() {
  chrome.storage.sync.get('theme', function(data){
    setColorThemeOption(data.theme);
    setBackgroundColor(data.theme);
  });
}

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

function setColorThemeOption(value) {
  document.getElementById('theme').value = value;
}

function setBackgroundColor(color) {
  if(color === 'dark') {
    document.body.style.backgroundColor = "#444444";
  } else {
    document.body.style.backgroundColor = "#ffffff";
  }
}

const select = document.getElementById('theme');
select.addEventListener('change', function() {
  save_theme(select.value);
  setBackgroundColor(select.value);
  setSnackbar();
});


window.onload = function listen() {
  load_theme();
  load_quote();
}

function setSnackbar() {
  let snackbar = document.getElementById('snackbar');
  snackbar.style.opacity = '1';
  snackbar.innerHTML = 'Gespeichert!';
  setTimeout(function() {
    snackbar.style.opacity = '0';
}, 2000);
}