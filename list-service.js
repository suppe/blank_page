var snippets = [];

const snippetsDefault = [
    'hello world!',
    'free!',
    'now!',
    'thinking...',
    'minimal!',
    'have a nice day!'
];

const list = document.getElementById('list');

//Snippets List
export function addSnippet(snip) {
    if(snip !== "" && snippets.filter(s => s === snip).length === 0) {
        snippets.push(snip);
        refreshSnippet();
        saveSnippets();
    }
}

export function delSnippet(snip) {
    snippets = snippets.filter(s => s !== snip);
    refreshSnippet();
    saveSnippets();
}

function refreshSnippet() {
    list.innerHTML = snippets.length ? "<li class='el'>" + snippets.join("</li><li class='el'>") + '</li>' : '';
}

//Snippets Cloud
function saveSnippets() {
    chrome.storage.sync.set({'snippets': snippets});
  }
  
export function loadSnippets() {
    chrome.storage.sync.get('snippets', callback);
    function callback(data) {
        if(data.snippets !== null) {
            snippets = data.snippets;
            list ? refreshSnippet() : setRandomSnippet();
        }
    }
}

//Random Snippets
function setRandomSnippet() {
    document.getElementById('snippetDisplay').innerHTML = snippets != null && snippets.length 
    ? snippets[Math.floor(Math.random() * snippets.length)]
    : snippetsDefault[Math.floor(Math.random() * snippetsDefault.length)];
}