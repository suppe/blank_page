export const SnippetService = {
    snippets: [],

    snippetsDefault: [
    'hello world!',
    'free!',
    'now!',
    'thinking...',
    'minimal!',
    'have a nice day!'
    ],

    list: document.getElementById('list'),

    //Snippet Operations
    addSnippet(snip) {
        if(snip !== "" && SnippetService.snippets.filter(s => s === snip).length === 0) {
            SnippetService.snippets.push(snip);
            SnippetService.refreshSnippet();
            SnippetService.saveSnippets();
        }
    },

    delSnippet(snip) {
        SnippetService.snippets = SnippetService.snippets.filter(s => s !== snip);
        SnippetService.refreshSnippet();
        SnippetService.saveSnippets();
    },

    refreshSnippet() {
        SnippetService.list.innerHTML = SnippetService.snippets.length ? "<li class='el'>" + SnippetService.snippets.join("</li><li class='el'>") + '</li>' : '';
    },

    //Cloud Operations
    saveSnippets() {
        chrome.storage.sync.set({'snippets': SnippetService.snippets});
    },

    loadSnippets() {
        chrome.storage.sync.get('snippets', callback);
        function callback(data) {
            if(data.snippets !== null) {
                SnippetService.snippets = data.snippets;
                SnippetService.list ? SnippetService.refreshSnippet() : SnippetService.setRandomSnippet(data.snippets);
            }
        }
    },

    //Set Random Snips
    setRandomSnippet(snip) {
        document.getElementById('snippetDisplay').innerHTML = snip != null && snip.length 
        ? snip[Math.floor(Math.random() * snip.length)]
        : SnippetService.snippetsDefault[Math.floor(Math.random() * SnippetService.snippetsDefault.length)];
    }
};