export var snippets = [];

export const snippetsDefault = [
    'hello world!',
    'free!',
    'now!',
    'thinking...',
    'minimal!',
    'have a nice day!'
];

export function addSnippet(snip) {
    if(snip !== "" && !snippets.filter(s => s === snip).length) {
        snippets.push(snip);
        refreshSnippet();
    }
}

export function delSnippet(snip) {
    snippets = snippets.filter(s => s !== snip);
    refreshSnippet();
}

export function refreshSnippet() {
    list.innerHTML = snippets.length ? "<li class='el'>" + snippets.join("</li><li class='el'>") + "</li>" : "";
}