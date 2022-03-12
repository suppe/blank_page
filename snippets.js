import { loadTheme } from "./theme-service.js";
import { SnippetService } from "./snippet-service.js";


chrome.storage.onChanged.addListener(() => {
    loadTheme();
    //loadSnippets();
    SnippetService.loadSnippets();
});

//On load
window.onload = function() {
    loadTheme();
    //loadSnippets();

    SnippetService.loadSnippets();
}